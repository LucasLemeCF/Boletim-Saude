package boletimdasaude.application.usecases.backup;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

public class BackupInteractor {

    Logger logger = Logger.getLogger(getClass().getName());

    @Value("${db.name}")
    private String dbName;

    @Value("${db.user}")
    private String dbUser;

    @Value("${db.password}")
    private String dbPassword;

    @Value("${db.host}")
    private String host;

    @Value("${db.port}")
    private String port;

    public ResponseEntity<InputStreamResource> gerarBackup() throws IOException, InterruptedException {
        Path arquivoTemporario = criarArquivoTemporario();
        adicionarBackupAoArquivoTemporario(arquivoTemporario);
        byte[] backupEmBytes = converterBackupEmBytes(arquivoTemporario);
        InputStreamResource backupEmInputStreamResource = converterBackupEmInputStreamResource(backupEmBytes);
        excluiArquivoTemporario(arquivoTemporario);
        HttpHeaders headers = criarHeader();

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(backupEmBytes.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(backupEmInputStreamResource);
    }

    private InputStreamResource converterBackupEmInputStreamResource(byte[] arquivoEmBytes) {
        ByteArrayInputStream backupEmByteArrayInputStream = converterParaByteArrayInputStream(arquivoEmBytes);
        return converterParaInputStreamResource(backupEmByteArrayInputStream);
    }

    private Path criarArquivoTemporario() throws IOException {
        String nomeArquivo = buscarDataAtual() + ".sql";

        Path diretorioTemporario = Paths.get(System.getProperty("java.io.tmpdir"));
        Path arquivoTemporario = diretorioTemporario.resolve(nomeArquivo);

        if (Files.exists(arquivoTemporario)) {
            Files.delete(arquivoTemporario);
        }

        return Files.createFile(arquivoTemporario);
    }

    private ProcessBuilder adicionarBackupAoArquivoTemporario(Path arquivoTemporario) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("pg_dump", "-h", host, "-p", port, "-U", dbUser, "-d", dbName, "-F", "c", "-b", "-v", "-f", arquivoTemporario.toString());
        processBuilder.environment().put("PGPASSWORD", dbPassword);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("O processo de backup falhou com o código de saída: " + exitCode);
        }

        return processBuilder;
    }

    private byte[] converterBackupEmBytes(Path arquivoTemporario) throws IOException {
        return Files.readAllBytes(arquivoTemporario);
    }

    private ByteArrayInputStream converterParaByteArrayInputStream(byte[] arquivoEmBytes) {
        return new ByteArrayInputStream(arquivoEmBytes);
    }

    private InputStreamResource converterParaInputStreamResource(ByteArrayInputStream byteArrayInputStream) {
        return new InputStreamResource(byteArrayInputStream);
    }

    private HttpHeaders criarHeader() {
        HttpHeaders headers = new HttpHeaders();
        String dataAtual = buscarDataAtual();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + dataAtual + ".sql");
        return headers;
    }

    private String buscarDataAtual() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return LocalDate.now().format(formatter);
    }

    private void excluiArquivoTemporario(Path arquivoTemporario) throws IOException {
        Files.delete(arquivoTemporario);
    }

    public ResponseEntity<String> restaurarBackup(MultipartFile file, int ambiente) throws IOException, InterruptedException {
        Path arquivoTemporario = criarArquivoTemporario();
        Files.copy(file.getInputStream(), arquivoTemporario, StandardCopyOption.REPLACE_EXISTING);

        ProcessBuilder processBuilder = new ProcessBuilder();
        List<String> command = new ArrayList<>(Arrays.asList(
                "pg_restore",
                "-h", host,
                "-p", port,
                "-U", dbUser,
                "-d", dbName,
                "--clean",
                "-v",
                "--no-owner",
                arquivoTemporario.toString()
        ));
        corrigeRestorePorAmbiente(command, ambiente);

        processBuilder.command(command);
        processBuilder.environment().put("PGPASSWORD", dbPassword);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                logger.info(line);
            }
        }

        int exitCode = process.waitFor();
        excluiArquivoTemporario(arquivoTemporario);

        if (exitCode != 0) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("O processo de restauração falhou com o código de saída: " + exitCode);
        }

        return ResponseEntity.ok("Restauração do banco de dados concluída com sucesso.");
    }

    private void corrigeRestorePorAmbiente(List<String> command, int ambiente) {
        if (ambiente == 2) {
            command.add(command.size() - 1, "--if-exists");
            command.add(command.size() - 1, "--create");
        }
    }
}

package boletimdasaude.application.usecases.backup;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class BackupInteractor {

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
        return Files.createTempFile("backup_", ".sql");
    }

    private ProcessBuilder adicionarBackupAoArquivoTemporario(Path arquivoTemporario) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("pg_dump", "-h", host, "-p", port, "-U", dbUser, "-d", dbName, "-F", "c", "-b", "-v", "-f", arquivoTemporario.toString());
        processBuilder.environment().put("PGPASSWORD", dbPassword);
        processBuilder.redirectErrorStream(true);

        System.out.println("Comando: " + processBuilder.command());

        Process process = processBuilder.start();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.err.println(line);
            }
        }

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

}

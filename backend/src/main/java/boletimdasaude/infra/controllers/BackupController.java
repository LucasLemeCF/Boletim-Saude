package boletimdasaude.infra.controllers;

import boletimdasaude.application.usecases.backup.BackupInteractor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class BackupController {

    private final BackupInteractor backupInteractor;

    public BackupController(BackupInteractor backupInteractor) {
        this.backupInteractor = backupInteractor;
    }

    @GetMapping(value ="/backup", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<InputStreamResource> backupDatabase() throws IOException, InterruptedException {
        return backupInteractor.gerarBackup();
    }

    @PostMapping(value = "/restore", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> restoreDatabase(@RequestParam("file") MultipartFile file) throws IOException, InterruptedException {
        return backupInteractor.restaurarBackup(file);
    }

}

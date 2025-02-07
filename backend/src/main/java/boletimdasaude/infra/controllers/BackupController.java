package boletimdasaude.infra.controllers;

import boletimdasaude.application.usecases.backup.BackupInteractor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/backup")
public class BackupController {

    private final BackupInteractor backupInteractor;

    public BackupController(BackupInteractor backupInteractor) {
        this.backupInteractor = backupInteractor;
    }

    @GetMapping(produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<InputStreamResource> backupDatabase() throws IOException, InterruptedException {
        return backupInteractor.gerarBackup();
    }

}

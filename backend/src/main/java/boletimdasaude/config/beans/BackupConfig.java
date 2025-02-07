package boletimdasaude.config.beans;

import boletimdasaude.application.usecases.backup.BackupInteractor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BackupConfig {

    @Bean
    BackupInteractor criarBackup() {
        return new BackupInteractor();
    }

}

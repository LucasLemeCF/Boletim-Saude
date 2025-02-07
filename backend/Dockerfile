# Usa a imagem base do OpenJDK 17 com o Maven pré-instalado
FROM maven:3.8.5-openjdk-17-slim AS build

# Instala dependências necessárias (wget, gnupg2 e lsb-release)
RUN apt-get update && apt-get install -y wget gnupg2 lsb-release && rm -rf /var/lib/apt/lists/*

# Adiciona o repositório oficial do PostgreSQL
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' && \
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Instala o PostgreSQL client (versão 16)
RUN apt-get update && apt-get install -y postgresql-client-16 && rm -rf /var/lib/apt/lists/*

# Copia os arquivos do seu projeto para a imagem
COPY pom.xml ./
COPY src/ ./src/

# Executa o Maven para construir o projeto
RUN mvn clean package

EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["java", "-jar", "target/boletim-medico-0.0.1.jar"]
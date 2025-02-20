# Boletim Saúde

![Login.png](/frontend/public/documentation/telas/Login.png)


## 📋 Índice
- [Boletim Saúde](#boletim-saúde)
  - [📋 Índice](#-índice)
  - [💻 Sobre o Projeto](#-sobre-o-projeto)
  - [⚙️ Funcionalidades](#️-funcionalidades)
    - [Boletim Diário](#boletim-diário)
    - [Relatórios Mensais](#relatórios-mensais)
    - [Edição do Boletim](#edição-do-boletim)
    - [Gerenciamento de Especialidades](#gerenciamento-de-especialidades)
    - [Gerenciamento de Cirurgiões](#gerenciamento-de-cirurgiões)
  - [🛠 Tecnologias](#-tecnologias)
    - [Infraestrutura](#infraestrutura)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [🏗 Arquitetura](#-arquitetura)
    - [API](#api)
  - [🎨 Design](#-design)
  - [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
    - [✅ Pré-requisitos](#-pré-requisitos)
    - [🎲 Configurando e Executando no Docker](#-configurando-e-executando-no-docker)
    - [🎲 Configurando e Executando Localmente](#-configurando-e-executando-localmente)
      - [Frontend](#frontend-1)
      - [Backend](#backend-1)
  - [🧪 Testando o Projeto](#-testando-o-projeto)
  - [🦸 Autor](#-autor)
    - [Lucas Leme](#lucas-leme)



## 💻 Sobre o Projeto

Projeto desenvolvido para a Prefeitura Municipal de Itaberá, com o objetivo de facilitar a criação de relátorios diários e mensais dos atendimentos medicos realizados do município.


## ⚙️ Funcionalidades

### Boletim Diário

- Criação de boletim
- Download do boletim
- Busca de boletins anteriores

![Boletim.png](/frontend/public/documentation/telas/Boletim.png)

### Relatórios Mensais

- Geração de relatórios
- Download de reatórios

![Relatorios.png](/frontend/public/documentation/telas/Relatorios.png)

### Edição do Boletim

- Edição de linha
  - Adição
  - Exclusão 
  - Alteração da ordem

![EdicaoBoletim.png](/frontend/public/documentation/telas/EdicaoBoletim.png)

### Gerenciamento de Especialidades

- Cadastro de especialidade
- Edição de especialidades
- Exclusão de especialidades

![Especialidades.png](/frontend/public/documentation/telas/Especialidades.png)

### Gerenciamento de Cirurgiões

- Cadastro de cirurgião
- Edição de especialidade
- Exclusão de especialidae

![Cirurgioes.png](/frontend/public/documentation/telas/Cirurgioes.png)


## 🛠 Tecnologias

### Infraestrutura

<table>
  <tr>
    <td align="center" style="width: 75px; text-align: center;">
      <a href="https://git-scm.com/downloads">
        <img src="frontend/public/documentation/icons/icon-git.svg" width="50" height="50" 
          style="color: blue;"
        />
      </a>
      <p style="text-align: center;">Git</p>
    </td>
    <td align="center" style="width: 75px; text-align: center;">
      <a href="https://nginx.org/">
        <img src="frontend/public/documentation/icons/icon-nginx.png" width="50" height="50" 
          style="color: blue;"
        />
      </a>
      <p style="text-align: center;">Nginx</p>
    </td>
    <td align="center" style="width: 75px; text-align: center;">
      <a href="https://www.docker.com/">
        <img src="frontend/public/documentation/icons/icon-docker.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;">Docker</p>
    </td>
  </tr>
</table>

### Backend

<table>
  <tr>
    <td align="center" style="width: 75px; text-align: center;" >
      <a href="https://www.java.com/pt-BR/">
        <img src="frontend/public/documentation/icons/icon-java.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;" width="50" height="50" >Java 21</p>
    </td>
    <td align="center" style="width: 75px; text-align: center;">
      <a href="https://maven.apache.org/">
        <img src="frontend/public/documentation/icons/icon-maven.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;" width="50" height="50" >Maven</p>
    </td>
    <td align="center" style="width: 75px; text-align: center;">
      <a href="https://spring.io/projects/spring-boot">
        <img src="frontend/public/documentation/icons/icon-spring.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;" width="50" height="50" >Spring Boot</p>
    </td>
    <td align="center" style="text-align: center;">
      <a href="https://www.postgresql.org/"  >
        <img src="frontend/public/documentation/icons/icon-postgresql.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;" width="50" height="50" >PostgreSQL</p>
    </td>
  </tr>
</table>

### Frontend

<table>
  <tr align="center" style="width: 75px; text-align: center;">
    <td style="width: 75px;">
      <a href="https://nextjs.org/">
        <img src="frontend/public/documentation/icons/icon-next.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;">Next 14</p>
    </td>
    <td align="center" style="width: 75px;">
      <a href="https://react.dev/">
        <img src="frontend/public/documentation/icons/icon-react.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;">React 18</p>
    </td>
    <td align="center" style="width: 75px; margin-left:10px;">
      <a href="https://nodejs.org/pt">
        <img src="frontend/public/documentation/icons/icon-node.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;">NodeJS</p>
    </td>
    <td align="center" style="width: 75px; margin-left:10px;">
      <a href="https://www.npmjs.com/">
        <img src="frontend/public/documentation/icons/icon-npm.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;">NPM</p>
    </td>
    <td align="center" style="width: 75px; margin-left:10px;">
      <a href="https://tailwindcss.com/">
        <img src="frontend/public/documentation/icons/icon-tailwindcss.svg" width="50" height="50" />
      </a>
      <p style="text-align: center;">TailwindCSS</p>
    </td>
    <td align="center" style="width: 75px; margin-left:10px;">
      <a href="https://ui.shadcn.com/">
        <img src="frontend/public/documentation/icons/icon-shadcn.png" width="50" height="50" />
      </a>
      <p style="text-align: center;">shadcn/ui</p>
    </td>
  </tr>
</table>


## 🏗 Arquitetura

### API
A API foi construida usando Clean Architecture baseado no livro de mesmo nome do autor Robert Martin (Uncle Bob).

<div align="center">
  <div style="display: flex; justify-content: center; align-items: center;">
    <img
      src="frontend/public/documentation/arquitetura/CleanArchitecture.png"
      style="width: 50%; height: 50%;"
      alt="Diagrama do clean architecture" 
    />
  </div>

  <div style="display: flex; justify-content: center; align-items: center;">
    <img
      src="frontend/public/documentation/arquitetura/Diagrama.png"
      style="width: 50%; height: 50%;"
      alt="Diagrama simplificado da arquitetura" 
    />
  </div>

  <div style="display: flex; justify-content: center; align-items: center;">
    <img
      src="frontend/public/documentation/arquitetura/DiagramaCompleto.png"
      style="width: 50%; height: 50%;"
      alt="Diagrama da arquitetura" 
    />
  </div>
</div>
</br>
Os diagramas da arquitetura foram feitos usando a ferramenta Miro, disponivel em: 

https://miro.com/app/board/uXjVK5NG8zs=/


## 🎨 Design

O design inicial do projeto foi criado utilizando a ferramenta Figma, disponível em: https://www.figma.com/design/Ena3r3kvJhocQlGNe5DT7i/Untitled?t=oyZD2n1bGHiyJxZm-0  


## 🚀 Como Executar o Projeto

### ✅ Pré-requisitos

Antes de baixar e iniciar o projeto, é necessário precisar ter instalado as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Docker](https://www.docker.com/get-started/)

### 🎲 Configurando e Executando no Docker

1. Abra o terminal na pasta em que deseja baixar o projeto, em seguida use o seguinte comando:
```bash
git clone https://github.com/LucasLemeCF/Boletim-Saude.git
```

1. Em seguida abra o arquivo .env e altere as variaveis de acordo com sua necessidade, essa etapa é opcional caso apens queira testar o projeto.

2. Rode o seguinte comando no terminal:
```bash
docker compose up -d
```

1. Aguarde um tempo até que o projeto inicie antes de testar.

</br>

Obs: Para parar a execução utilize o seguinte comando:
```bash
docker compose down
```

### 🎲 Configurando e Executando Localmente

#### Frontend
1. Na pasta "frontend" acesse o arquivo .env.example e remova os comentários das váveis de ambiente e renomeie o arquivo para ".env".
   
2. Abra um terminal na pasta "frontend" e use o seguinte comando:
```bash
npm install
```

3. Para executar o frontend digite no terminal:
```bash
npm run dev
```

#### Backend
1. Crie um banco de dados de acordo com o arquivo .env.example ques está na pasta "backend" (por padrão é BoletimSaude).

2. Configure a IDE para usar as variáveis de ambiente contidas no arquivo .env.example.
   
3. Instale e defina o Java 21 para a execução do projeto.
 
4. Execute o projeto a partir da IDE.

## 🧪 Testando o Projeto
A porta padrão de execução é a 8000, sendo assim para realizar o login acesse: http://localhost:8000/login

O usuário e senha estão configurados no arquivo .env nas variaveis de ambiente USUARIO_LOGIN e SENHA_LOGIN.

Para criar o bletim é necessário acessar a pagina "Especialidades" e cadastrar alguma, o mesmo para cirurgiões. Em seguida ir em "Editar Boletim", clicar em adicionar cabeçalho de especialidades/cirurgiões e selecionar a especialidade/médico, por fim é só clicar em "salvar", o modelo do boletim estará disponível em "Boletim Médico".


## 🦸 Autor
### Lucas Leme

<div>Linkedin: <a href="https://www.linkedin.com/in/lucas-leme/">https://www.linkedin.com/in/lucas-leme/</a></div>
<div>Github: <a href="https://github.com/LucasLemeCF">https://github.com/LucasLemeCF</a></div>

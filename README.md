# N2 Segurança de Software 

Este projeto é um exemplo de segurança de software com o objetivo de analisar uma versao do projeto sem protecao e outra com protecao utilizando recursos como JWT Token e Bcrypt

## Tecnologias Utilizadas

- **Node.js**
- **Sequelize**
- **PostgreSQL**
- **Docker**

## Pré-requisitos

Antes de rodar o projeto, é necessário ter o seguinte instalado:

- **Node.js**: [Instalar Node.js](https://nodejs.org/)
- **Docker**: [Instalar Docker](https://www.docker.com/products/docker-desktop)
  
## Passos para Execução

Siga os passos abaixo para rodar o projeto localmente.


### 1. Instalar Dependências

Execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```


### 2. Iniciar o Servidor
Após instalar as dependências, execute o comando abaixo para iniciar o servidor:

```bash
npm start
```


### 3. Iniciar o Banco de Dados com Docker
Para rodar o banco de dados PostgreSQL com Docker, execute o comando abaixo:

```bash
docker-compose up -d database
```
Isso irá iniciar o banco de dados em um container Docker.


### 4. Executar as Migrations do Sequelize
Para configurar o banco de dados, você precisa rodar as migrations do Sequelize. Execute o comando abaixo:

```bash
sequelize db:migrate
```


### 5. Acessando o Projeto
Após completar as etapas acima, você pode acessar a aplicação abrindo o arquivo index.html ou usando a extensao live server.

```bash
/client
  /css
  /node_modules       # Dependências do Node.js
  /pages
      login.html <----- # Arquivos para acessar a aplicação
      cadastro.html
      dashboard.html
      editar.html
      listar.html
      detalhes.html
/server                # Código fonte da aplicação
  /models           # Modelos do Sequelize
  /controllers      # Controladores da aplicação
  /routes           # Rotas da aplicação
  /config             # Configurações do projeto
    /database.json    # Configuração do banco de dados
  /sequelize-config   # Arquivos de configuração do Sequelize
```

### Scripts
Dentro da pastar server
```bash
npm install: Instala as dependências do projeto.

npm start: Inicia o servidor da aplicação.

docker-compose up -d database: Inicia o banco de dados PostgreSQL com Docker.

sequelize db:migrate: Executa as migrations do Sequelize.
```


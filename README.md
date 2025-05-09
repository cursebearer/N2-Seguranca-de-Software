# Projeto

Este projeto é um exemplo de aplicação com Docker, Node.js e Sequelize, e está configurado para ser facilmente executado localmente.

## Tecnologias Utilizadas

- **Node.js**
- **Sequelize**
- **PostgreSQL**
- **Docker**

## Pré-requisitos

Antes de rodar o projeto, é necessário ter o seguinte instalado:

- **Node.js**: [Instalar Node.js](https://nodejs.org/)
- **Docker**: [Instalar Docker](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)

## Passos para Execução

Siga os passos abaixo para rodar o projeto localmente.

### 1. Instalar Dependências

Execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```
2. Iniciar o Servidor
Após instalar as dependências, execute o comando abaixo para iniciar o servidor:

bash
Copiar
Editar
npm start
3. Iniciar o Banco de Dados com Docker
Para rodar o banco de dados PostgreSQL com Docker, execute o comando abaixo:

bash
Copiar
Editar
docker-compose up -d database
Isso irá iniciar o banco de dados em um container Docker.

4. Executar as Migrations do Sequelize
Para configurar o banco de dados, você precisa rodar as migrations do Sequelize. Execute o comando abaixo:

bash
Copiar
Editar
sequelize db:migrate
5. Acessando o Projeto
Após completar as etapas acima, você pode acessar a aplicação no seu navegador, geralmente em http://localhost:3000 (ou a porta configurada no seu projeto).

Scripts
npm install: Instala as dependências do projeto.

npm start: Inicia o servidor da aplicação.

docker-compose up -d database: Inicia o banco de dados PostgreSQL com Docker.

sequelize db:migrate: Executa as migrations do Sequelize.

Contribuindo
Faça um fork do repositório.

Crie uma branch para suas mudanças (git checkout -b minha-feature).

Faça commit das suas mudanças (git commit -am 'Adicionando nova feature').

Faça push para a branch (git push origin minha-feature).

Abra um pull request.

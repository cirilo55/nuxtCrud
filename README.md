# Nuxt 3 
# CRUD com Login 

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```


## SCRIPTS E BANCO DE DADOS

# Foi usado mysql e typescript dentro da api 'server' nativa do nuxt;
# Favor rodar os scripts de tabelas que estão dentro de scripts.sql;


create database nuxt3_blog;

use nuxt3_blog;

create TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
)


CREATE TABLE pacientes (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    cep VARCHAR(255) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    UF VARCHAR(5)  NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
)
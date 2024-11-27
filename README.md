# API para E-commerce de Aparelhos Telefônicos da Claro

## Descrição do Projeto

Este projeto é uma **API de E-commerce** desenvolvida para a Claro com o objetivo de gerenciar vendas de aparelhos telefônicos. A API permite a integração com sistemas front-end e oferece endpoints para gerenciar produtos, pedidos e autenticação de usuários.

### Funcionalidades

- **Autenticação de usuários**:
  - Registro de novos usuários.
  - Login para obter um token de acesso (JWT).
- **Gerenciamento de produtos**:
  - Listar produtos disponíveis.
  - Consultar detalhes de um produto específico.
- **Gerenciamento de pedidos**:
  - Criar e consultar pedidos.
  - Atualizar o status de um pedido (apenas administradores).
  - Cancelar pedidos (apenas administradores).



## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- Um gerenciador de pacotes como **npm** ou **yarn**



## Como executar o projeto localmente

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados MySQL. Execute o script SQL fornecido na pasta scripts, no arquivo db.sql, para criar as tabelas necessárias. Atualize o arquivo .env.example com as informações do seu banco de dados:

```bash
DB_HOST=localhost
DB_USER=root  #usuário padrão
DB_PASSWORD=sua_senha  #definida durante a instalação do MySQL 
DB_NAME=nome_do_banco  #nome escolhido para o banco de dados
JWT_SECRET=sua_chave_secreta  #obtido durante a execução da API
```

### 4. Inicie o servidor

```bash
npm start
```
O servidor estará disponível em http://localhost:3333

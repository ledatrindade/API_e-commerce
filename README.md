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

- [Node.js](https://nodejs.org/) - Para rodar o servidor da API.
- [MySQL](https://www.mysql.com/) - Para o gerenciamento do banco de dados.
- [Docker](https://www.docker.com/)  - **Opcional**, mas recomendado para configurar e executar o banco de dados MySQL de forma rápida e isolada.
- Um gerenciador de pacotes como **npm** ou **yarn**

## Extensões Recomendadas para Visual Studio Code

- Docker       
  ![Captura de tela 2024-11-27 171639](https://github.com/user-attachments/assets/38e79199-46d8-4807-8210-e919ad33ba32)
- Database Cliente    
![Captura de tela 2024-11-27 171712](https://github.com/user-attachments/assets/c3571b49-aedf-4562-8cf2-116e758e61d6)

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

### 2. Instale as dependências

```bash
npm install
```
### 3. Na extensão do Docker no Vscode adicine a imagem do MySql

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD= _senha_ -p 3333:3333 -d mysql:5.7
```
### 3.Faça a conexão com a extensão Database Client
![Captura de tela 2024-11-27 172637](https://github.com/user-attachments/assets/2ab83dc5-85ac-45ed-b881-e4bfafc837fc)

### 4. Configure o banco de dados

Crie um banco de dados MySQL na extensão Database Client. Execute o script SQL fornecido na pasta scripts, no arquivo db.sql, para criar as tabelas necessárias. Atualize o arquivo .env.example com as informações do seu banco de dados:

```bash
DB_HOST=localhost
DB_USER=root  #usuário padrão
DB_PASSWORD=sua_senha  #definida durante a instalação do MySQL 
DB_NAME=nome_do_banco  #nome escolhido para o banco de dados
JWT_SECRET=sua_chave_secreta  #obtido durante a execução da API
```

### 5. Inicie o servidor

```bash
npm run dev
```

Lembre-se de inicar o servidor na pasta correta. _Pasta: Back-end_

O servidor estará disponível em http://localhost:3333


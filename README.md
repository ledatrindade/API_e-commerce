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
DB_HOST=localhost  # Endereço do servidor do banco de dados
DB_USER=root  # usuário padrão
DB_PASSWORD=sua_senha  # definida durante a instalação do MySQL
DB_NAME=nome_do_banco  # nome escolhido para o banco de dados
JWT_SECRET=sua_chave_secreta  # chave secreta usada para tokens JWT
PORT=3333  # porta do servidor
```

### 5. Inicie o servidor

```bash
npm run dev
```

Lembre-se de inicar o servidor na pasta correta. _Pasta: Back-end_

O servidor estará disponível em http://localhost:3333

--
### Iniciando o servidor, mostrando a imagem do MYSql e o banco de dados Commerce
https://github.com/user-attachments/assets/1fedfb34-8e8a-4964-9d1a-35413eb385d1

### [POST] - /register: Cadastrar usuários novos 
https://github.com/user-attachments/assets/3fcf4c0c-29e0-4a66-a538-b681f2ecdae8

_Obs.: Caso não tenha o campo "tipo_usuario" no momento de cadastrar um novo usuário é colocado automaticamente como "Cliente"._
--

### [POST] - /login: Logar com um usuário já cadastrado no banco de dados criando assim um Token de acesso.
https://github.com/user-attachments/assets/66aacf03-abeb-4ae7-9f33-e3f77084a817


### [GET] - /products: Retorna uma lista de todos os produtos disponíveis. e [GET] - /products/{id}: Retorna os detalhes de um produto específico.

https://github.com/user-attachments/assets/c7bad5cd-6398-4dbd-8b14-69d8ba2a4e19


### [POST] - /orders: Cria um novo pedido com base nos itens do carrinho.
https://github.com/user-attachments/assets/ab85031d-7563-4476-8ba6-7a9e9fcea6c7


### [GET] - /orders/{id}: Retorna os detalhes de um pedido específico.
https://github.com/user-attachments/assets/e54095a5-6736-4fbc-964d-d322c76c47f1


### [GET] - /orders: Retorna uma lista de pedidos (admin).
https://github.com/user-attachments/assets/a1f18e1d-7b22-474d-81c4-d21d7851e452


### [PUT] - /orders/{id}/status: Atualiza o status de um pedido (admin).
https://github.com/user-attachments/assets/d057dc35-fd87-43f8-9af0-44751b4bf6ba


### [DELETE] - /orders/{id}: Cancela um pedido (admin).
https://github.com/user-attachments/assets/7c728f50-3acf-4316-a35f-e8413e266415










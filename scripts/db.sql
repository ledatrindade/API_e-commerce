CREATE DATABASE commerce;

USE commerce;

-- Tabela usuario
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente'
);

-- Tabela status
CREATE TABLE status (
    id_status INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    data_criacao DATE  ,
    data_atualizacao DATE  NULL,
    ativo BOOLEAN 
);

-- Tabela pedido
CREATE TABLE pedido (
    numero_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    valor_total DECIMAL(10,2) NOT NULL,
    data DATE NOT NULL ,
    id_status INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_status) REFERENCES status(id_status) ON DELETE SET NULL
);

-- Tabela produto
CREATE TABLE produto (
    codigo_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT DEFAULT 0
);

-- Tabela variacao
CREATE TABLE variacao (
    id_variacao INT PRIMARY KEY AUTO_INCREMENT,
    codigo_produto INT,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    FOREIGN KEY (codigo_produto) REFERENCES produto(codigo_produto) ON DELETE CASCADE
);

-- Tabela pedido_produto
CREATE TABLE pedido_produto (
    numero_pedido INT,
    codigo_produto INT,
    quantidade INT NOT NULL,
    PRIMARY KEY (numero_pedido, codigo_produto),
    FOREIGN KEY (numero_pedido) REFERENCES pedido(numero_pedido) ON DELETE CASCADE,
    FOREIGN KEY (codigo_produto) REFERENCES produto(codigo_produto) ON DELETE CASCADE
);

-- Visualizações das tabelas criadas
select * from usuario;
select*from status;
select*from pedido;
select*from produto;
select*from variacao;
select*from pedido_produto;



DROP DATABASE IF EXISTS migration;

CREATE DATABASE migration;
USE migration;

-- 
DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS PRODUCT;
-- 

CREATE TABLE USER (
  id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username_user VARCHAR(50) NOT NULL,
  phone_user VARCHAR(14) NOT NULL,
  email_user VARCHAR(100) NOT NULL,
  password_user VARCHAR(60) NOT NULL
);

CREATE TABLE PRODUCT (
  id_product INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name_product VARCHAR(45) NOT NULL,
  description_product VARCHAR(100) NOT NULL,
  price_product INT NOT NULL,
  stock_product INT NOT NULL
);


INSERT INTO USER (username_user, phone_user, email_user, password_user)
VALUES ('usuario1', '1234567890', 'usuario1@example.com', 'contraseña123');

INSERT INTO USER (username_user, phone_user, email_user, password_user)
VALUES ('usuario2', '0987654321', 'usuario2@example.com', 'contraseña456');


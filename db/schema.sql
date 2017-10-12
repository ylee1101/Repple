CREATE DATABASE IF NOT EXISTS register;

USE register;

CREATE TABLE register (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    primary key(id)
);
DROP DATABASE IF EXISTS empolyee_db;

CREATE DATABASE empolyee_db;

USE empolyee_db;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department (id), 
PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES 
	("Sales"),
    ("Technology"),
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
	("Sales Lead", 50000, 1 ),
    ("Lead Engineer", 120000, 2),
    ("Accountant", 78000, 3),
	("Lawyer", 90000, 4);

CREATE TABLE empolyee (
id INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY (manager_id) REFERENCES empolyee (id), 
FOREIGN KEY (role_id) REFERENCES role (id), 
PRIMARY KEY(id)
);

INSERT INTO empolyee (first_name, last_name, role_id, manager_id)
VALUES 
	('John', 'Doe', 1, 1),
    ('Ashley', 'Smith', 2, 2),
    ('Mike', 'Chane', 3, 3),
    ('Malia', 'Brown', 4, 4),
    ('Jazz', 'April', 1, 3),
    ('Tabitha', 'Holmes', 1, 3),
    ('MJ', 'Braxton', 4, 4),
    ('Aubrey', 'Gram-Crackers', 3, 3),
    ('Toni', 'Tone', 3, 1);

SELECT * FROM empolyee;
SELECT * FROM role;
SELECT * FROM department;

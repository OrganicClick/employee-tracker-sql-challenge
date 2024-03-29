DROP DATABASE IF EXISTS employeeTracker_db;
CREATE  DATABASE employeeTracker_db;

USE  employeeTracker_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
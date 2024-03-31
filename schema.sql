-- Drop the database named employeeTracker_db if it exists
DROP DATABASE IF EXISTS employeeTracker_db;

-- Create a new database named employeeTracker_db
CREATE DATABASE employeeTracker_db;

-- Select the employeeTracker_db database for subsequent operations
USE employeeTracker_db;

-- Create a table named department
CREATE TABLE department (
    id INT PRIMARY KEY,             -- Unique identifier
    department_name VARCHAR(30) NOT NULL -- Name of the department
);

-- Create a table named role
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,     -- Title of the role
    salary DECIMAL NOT NULL,        -- Salary associated with the role
    department_id INT               -- Reference to department
);

-- Create a table named employee
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,-- First name of the employee
    last_name VARCHAR(30) NOT NULL, -- Last name of the employee
    role_id INT,                    -- Reference to role
    manager_id INT                  -- Reference to manager
);

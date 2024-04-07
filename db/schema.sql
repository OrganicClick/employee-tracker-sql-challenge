-- Drop the database named employeeTracker_db if it exists
DROP DATABASE IF EXISTS employeeTracker_db;

-- Create a new database named employeeTracker_db
CREATE DATABASE employeeTracker_db;

-- Select the employeeTracker_db database for subsequent operations
USE employeeTracker_db;

-- Create a table named department
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incremented unique identifier
    department_name VARCHAR(30) NOT NULL -- Name of the department
);

-- Create a table named role
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incremented unique identifier
    title VARCHAR(100) NOT NULL,        -- Title of the role
    salary DECIMAL(10, 2) NOT NULL,     -- Salary for the role
    department_id INT,                  -- Reference to department
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create a table named employee
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Auto-incremented unique identifier
    first_name VARCHAR(30) NOT NULL,            -- First name of the employee
    last_name VARCHAR(30) NOT NULL,             -- Last name of the employee
    role_id INT,                                -- Reference to role
    manager_id INT,                             -- Reference to manager
    department_id INT,                         -- Reference to department
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


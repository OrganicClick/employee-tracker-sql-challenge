-- Insert sample data into the department table
INSERT INTO department (id, department_name) VALUES
(1, 'Human Resources'),
(2, 'Finance'),
(3, 'IT');

-- Insert sample data into the role table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'HR Manager', 60000, 1),
(2, 'Accountant', 50000, 2),
(3, 'Software Engineer', 80000, 3);

-- Insert sample data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, 1),
(3, 'Michael', 'Johnson', 3, 1);

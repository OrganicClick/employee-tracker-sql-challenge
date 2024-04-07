-- Insert sample data into the department table
INSERT INTO department (department_name) VALUES
('Human Resources'),
('Finance'),
('IT'),
('Marketing'),
('Sales');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 60000, 1),          -- Department ID for Human Resources is 1
('Accountant', 50000, 2),          -- Department ID for Finance is 2
('Software Engineer', 80000, 3),   -- Department ID for IT is 3
('Marketing Specialist', 55000, 4),-- Department ID for Marketing is 4
('Sales Manager', 70000, 5);       -- Department ID for Sales is 5

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id) VALUES
('John', 'Doe', 1, NULL, 1),       -- John Doe is HR Manager (role ID 1) and has no manager
('Jane', 'Smith', 2, 1, 2),        -- Jane Smith is Accountant (role ID 2) and her manager is John Doe
('Michael', 'Johnson', 3, 1, 3),   -- Michael Johnson is Software Engineer (role ID 3) and his manager is John Doe
('Emily', 'Davis', 4, 1, 4),       -- Emily Davis is Marketing Specialist (role ID 4) and her manager is John Doe
('David', 'Wilson', 5, 4, 5);      -- David Wilson is Sales Manager (role ID 5) and his manager is Emily Davis

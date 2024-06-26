# Employee-Tracker-sql-Challenge

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Link to Video Walkthrough](#link-to-video-walkthrough)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [Contact](#contact)

## Description

This project is part of the SQL module and involves creating an Employee Tracker application using SQL databases. The Employee Tracker allows users to manage a company's employee database by performing various operations such as viewing employees, roles, and departments, adding new employees, updating employee roles, and deleting employees.

## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation

1. Clone the repository to your local machine using the following command:
   - git clone git@github.com:OrganicClick/employee-tracker-sql-challenge.git


2. Navigate to the project directory:
   - cd employee-tracker-sql-challenge


3. Install the necessary dependencies:
   - npm install

## Usage

1. First, set the .env variables (i.e. 'DB_HOST', 'DB_USER', 'DB_PASSWORD', and 'DB_DATABASE') to match the MySQL server
   configuration. In this case, you will likely need to adjust the DB_USER and DB_PASSWORD values to match your MySQL login credentials.

2. Be sure to create the database named 'employeeTracker_db' as specified in the server code. This is done by first
 accessing MySQL using the 'mysql' command:
   - mysql -u root -p

3. Once logged in, run the following SQL command to create the database:
   - CREATE DATABASE employeeTracker_db;

4. Run the following SQL command to load the schema.sql file
   - SOURCE path/to/schema.sql

5. (Optional) To seed the database with some data you, you can use the following SQL command to load the seeds.sql file
   - SOURCE path/to/seeds.sql

6. Exit MySQL

7. Run the application from the command line:
   - node server.js

8. To terminate the application, select "Exit" from the menu of options

9. Currently, you will need to clear the line of your CLI in order to end the session of node.js server and restart the server by running "node server.js" to restart the application.


## Contributing
If you have suggestions or contributions to add, please follow the guidelines listed below. Pull requests will be reviewed in the order that they are received.
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Push to the branch.
- Create a new Pull Request.

## License
This challenge is provided under the MIT License. See the [LICENSE](LICENSE) file for details.


## Link to Video Walkthrough

Please click the following link to view a video walkthrough of how to use the application:

[Link to Video Walkthrough](https://drive.google.com/file/d/1ctfFI1g094gMcunJPZT9ZMWS8vK9DiXd/view)


## Technologies Used
Node.js

Inquirer package

MySQL

MySQL2 Package

JavaScript

Git/GitHub


## Credits
Development was assisted by the following resources:
 - Xpert Learning Assistant provided by the GWU Coding Boot Camp
 - Initial file architecture suggested by Xpert Learning Assistant
 - Project guidelines, initial screenshots, reference mock-up, and accepted terms of submission provided by GWU Coding Boot Camp
 - Reference for correcting the package.json file type (https://nodejs.org/api/packages.html)
 - Installation documentation for MySQL2 (https://www.npmjs.com/package/mysql2#installation)
 - Setting Up a Database and Seed File (https://medium.com/@shannen.ye/setting-up-a-database-and-seed-file-7e73fe2a9fe6)
 - Installation/usage documentation for dotenv package (https://www.npmjs.com/package/dotenv)
 - General documentation for inquirer package (https://www.npmjs.com/package/inquirer)
 - Referenced for using async functions for inquirer.js (https://stackoverflow.com/questions/61417816/how-do-i-invoke-inquirer-js-menu-in-a-loop-using-promises)
 - Referenced for resetting root mysql password (https://stackoverflow.com/questions/50691977/how-to-reset-the-root-password-in-mysql-8-0-11)
 - Using Javascript Switch statements, including break and case (https://www.w3schools.com/js/js_switch.asp)
 - Referenced for syntax/structure of node.js functions for MySQL actions (e.g. Viewing, adding, deleting entries/tables from database) (https://github.com/EdenKhaos/12-mysql-employee-tracker/blob/master/server.js)
 - ChatGPT for assistance with functionality for updating employee manager, update employee role, viewing employees by manager, viewing employees by department, and view the total budget of a department (https://chat.openai.com/auth/login?utm_source=SEO&utm_medium=Clic&utm_campaign=google&utm_id=ChatGPT)
 - Referenced for temporarily disabling foreign key constraints (https://stackoverflow.com/questions/159038/how-can-foreign-key-constraints-be-temporarily-disabled-using-t-sql)

## Contact
To contact the owner of this repo, OrganicClick, please reach out via OrganicClick@exampleemail.com
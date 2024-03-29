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

1. Run the application from the command line:
   - node index.js

*** UPDATE MEEEE******


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

[Link to Video Walkthrough](https://drive.google.com/file/d/1cz8nlCtsDh6gUMv7SoBul7Esgs7DD5Mt/view)


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
 - Project guidelines, initial screenshots, reference mock-up, and accepted terms of submission provided by GWU Coding Boot Camp
 - Reference for correcting the package.json file type (https://nodejs.org/api/packages.html)

## Contact
To contact the owner of this repo, OrganicClick, please reach out via OrganicClick@exampleemail.com
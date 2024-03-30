
const express = require('express'); // Import and require express
const mysql = require('mysql2'); // Import and require mysql2
const inquirer = require('inquirer'); // Import and require inquirer
require('dotenv').config(); // Load environment variables from .env file in this directory


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// CONNECTION.JS FILE BELOW -- TO BE MODULARIZED AND SEPARATED INTO ITS OWN FILE LATER
// Connect to database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

console.log(`Connected to the ${process.env.DB_DATABASE} database.`);

// Attempt to establish the database connection
db.connect((err) => {
  if (err) {
    console.log('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// CONNECTION QUERIES.JS FILE BELOW -- TO BE MODULARIZED AND SEPARATED INTO ITS OWN FILE LATER

// Menu of user options to interact with employeeTracker_db
async function mainMenu() {
  const menuOptions = [
    {
      name: 'View departments',
      value: 'viewDepartments',
    },
    {
      name: 'View roles',
      value: 'viewRoles',
    },
    {
      name: 'View employees',
      value: 'viewEmployees',
    },
    {
      name: 'Add department',
      value: 'addDepartment',
    },
    {
      name: 'Add role',
      value: 'addRole',
    },
    {
      name: 'Add employee',
      value: 'addEmployee',
    },
    {
      name: 'Update employee role',
      value: 'updateEmployeeRole',
    },
    {
      name: 'Update employee manager',
      value: 'updateEmployeeManager',
    },
    {
      name: 'Delete department',
      value: 'deleteDepartment',
    },
    {
      name: 'Delete role',
      value: 'deleteRole',
    },
    {
      name: 'Delete employee',
      value: 'deleteEmployee',
    },
  ];

// Prompt the user with a list of options and await their choice
const { choice } = await inquirer.prompt({
  type: 'list', // Use the list prompt type to display options as a list
  name: 'choice', // Name of the property to store the user's choice
  message: 'What would you like to do?', // Message displayed to the user
  choices: menuOptions, // Array of menu options
});

// Return the user's choice
return choice;
}

async function run() {
  let userChoice = ''; // Initialize userChoice variable

  while (userChoice !== 'exit') { // Loop until user chooses to exit, UPDATE THIS SO THAT USER DOESN'T CYCLE OPTIONS INFINITELY
    userChoice = await mainMenu(); // Get user choice from main menu function

    // Handle user choice here
    switch (userChoice) {
      case 'viewDepartments':
        // Implement logic to view departments
        break;
      case 'viewRoles':
        // Implement logic to view roles
        break;
      case 'viewEmployees':
        // Implement logic to view employees
        break;
      case 'addDepartment':
        // Implement logic to add a department
        break;
      case 'addRole':
        // Implement logic to add a role
        break;
      case 'addEmployee':
        // Implement logic to add an employee
        break;
      case 'updateEmployeeRole':
        // Implement logic to update employee role
        break;
      case 'updateEmployeeManager':
        // Implement logic to update employee manager
        break;
      case 'deleteDepartment':
        // Implement logic to delete a department
        break;
      case 'deleteRole':
        // Implement logic to delete a role
        break;
      case 'deleteEmployee':
        // Implement logic to delete an employee
        break;
      default:
        console.log('Invalid choice');
    }
  }
}

run();

  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

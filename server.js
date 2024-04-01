
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
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database.');
  }
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
    {
      name: 'Exit', // Add an 'Exit' option
      value: 'exit', // Set the value to 'exit'
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

async function viewDepartments() {
  try {
    const [rows] = await db.promise().query('SELECT * FROM department');
    console.log('Department Table:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing department table:', error);
  }
}

async function viewEmployees() {
  try {
    const [rows] = await db.promise().query('SELECT * FROM employee');
    console.log('Employee Table:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing employee table:', error);
  }
}

async function viewRoles() {
  try {
    const [rows] = await db.promise().query('SELECT * FROM role');
    console.log('Roles Table:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing role table:', error);
  }
}

// Function to handle adding a department
async function addDepartment() {
  try {
    // Prompt the user for the department name
    const { departmentName } = await inquirer.prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the new department:',
    });

    // Execute SQL query to insert the new department into the database
    await db.promise().query('INSERT INTO department (department_name) VALUES (?)', [departmentName]);

    console.log(`New department '${departmentName}' added successfully.`);
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

async function run() {
  let continueLoop = true; // Variable to control the loop. This allows user to go back to menu after selecting their option.

  while (continueLoop) {
    let userChoice = ''; // Initialize userChoice variable

    // Get user choice from main menu function
    userChoice = await mainMenu(); 

    // Handle user choice here
    switch (userChoice) {
      case 'viewDepartments':
        // Implement logic to view departments
        await viewDepartments(); // Call viewDepartments function
        break;
      case 'viewRoles':
        // Implement logic to view roles
        await viewRoles(); // Call viewRoles function
        break;
      case 'viewEmployees':
        // Implement logic to view employees
        await viewEmployees(); // Call viewEmployees function
        break;
      case 'addDepartment':
        // Implement logic to add a department
        await addDepartment(); // Call addDepartment function
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
      case 'exit':
        continueLoop = false; // Set continueLoop to false to exit the loop
        break;
      default:
        console.log('Invalid choice');
    }
  }

   // Display a message when the user exits the program
   console.log('Exiting the program...');
}
run();


  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

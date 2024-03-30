
const express = require('express'); // Import and require express
const mysql = require('mysql2'); // Import and require mysql2
const inquirer = require('inquirer'); // Import and require inquirer
require('dotenv').config(); // Load environment variables from .env file


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

// CONNECTION QUERIES.JS FILE BELOW -- TO BE MODULARIZED AND SEPARATED INTO ITS OWN FILE LATER

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
      name: 'Exit',
      value: 'exit',
    },
  ];


  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

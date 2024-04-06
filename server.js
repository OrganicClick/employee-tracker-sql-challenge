
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
      name: 'View employees by manager',
      value: 'viewEmployeesByManager',
    },
    {
      name: 'View employees by department',
      value: 'viewEmployeesByDepartment',
    },
    {
      name: 'View budget of department',
      value: 'viewDepartmentBudget',
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

// Function for viewing departments
async function viewDepartments() {
  try {
    const [rows] = await db.promise().query('SELECT * FROM department');
    console.log('Department Table:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing department table:', error);
  }
}

// Function for viewing employees
async function viewEmployees() {
  try {
    const query = `
      SELECT 
          employee.id,
          employee.first_name,
          employee.last_name,
          role.title AS role,
          role.salary,
          department.department_name AS department,
          CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM 
          employee
      INNER JOIN 
          role ON employee.role_id = role.id
      LEFT JOIN 
          department ON role.department_id = department.id
      LEFT JOIN 
          employee manager ON employee.manager_id = manager.id;
    `;

    const [rows] = await db.promise().query(query);
    console.log('Employees Table:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing employee table:', error);
  }
}



// viewRoles() function to include the salary
async function viewRoles() {
  try {
    const query = `
      SELECT 
          role.id,
          role.title,
          role.salary,
          department.department_name AS department
      FROM 
          role
      LEFT JOIN
          department ON role.department_id = department.id;
    `;

    const [rows] = await db.promise().query(query);
    console.log('Roles Table:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing role table:', error);
  }
}

async function viewEmployeesByManager() {
  try {
    // Retrieve existing managers from the database
    const [managers] = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL)');
    const managerChoices = managers.map(manager => ({
      name: manager.full_name,
      value: manager.id
    }));

    // Prompt the user to select a manager
    const { managerId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'managerId',
        message: 'Select a manager to view their direct reports:',
        choices: managerChoices,
      }
    ]);

    // Retrieve employees reporting to the selected manager from the database
    const query = `
      SELECT 
          employee.id,
          employee.first_name,
          employee.last_name,
          role.title AS role,
          role.salary,
          department.department_name AS department
      FROM 
          employee
      INNER JOIN 
          role ON employee.role_id = role.id
      LEFT JOIN 
          department ON role.department_id = department.id
      WHERE 
          employee.manager_id = ?;
    `;
    const [rows] = await db.promise().query(query, [managerId]);

    if (rows.length === 0) {
      console.log('No direct reports found for the selected manager.');
    } else {
      console.log(`Employees reporting to the selected manager:`);
      console.table(rows);
    }
  } catch (error) {
    console.error('Error viewing employees reporting to the selected manager:', error);
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

// Function to handle adding roles
async function addRole() {
  try {
    // Retrieve existing departments from the database
    const [departments] = await db.promise().query('SELECT id, department_name FROM department');
    const departmentChoices = departments.map(department => ({
      name: department.department_name,
      value: department.id
    }));

    // Prompt the user for role details including department selection
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the new role:',
        choices: departmentChoices,
      }
    ]);

    // Execute SQL query to insert the new role into the database
    await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);

    console.log(`New role '${title}' added successfully.`);
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

// Function to add an employee
async function addEmployee() {
  try {
    // Retrieve existing roles from the database
    const [roles] = await db.promise().query('SELECT id, title FROM role');
    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));

    // Retrieve existing employees from the database to select the manager
    const [employees] = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee');
    const employeeChoices = employees.map(employee => ({
      name: employee.full_name,
      value: employee.id
    }));

    // Prompt the user for employee details including role selection and manager selection
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the new employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the new employee:',
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the role for the new employee:',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the manager for the new employee:',
        choices: employeeChoices,
      }
    ]);

    // Execute SQL query to insert the new employee into the database
    await db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);

    console.log(`New employee '${firstName} ${lastName}' added successfully.`);
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

async function updateEmployeeManager() {
  try {
    // Retrieve existing employees from the database
    const [employees] = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee');
    const employeeChoices = employees.map(employee => ({
      name: employee.full_name,
      value: employee.id
    }));

    // Prompt the user to select an employee whose manager they want to update
    const { employeeId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee whose manager you want to update:',
        choices: employeeChoices,
      }
    ]);

    // Remove the selected employee from the list of potential managers
    const managerChoices = employeeChoices.filter(employee => employee.value !== employeeId);

    // Prompt the user to select a new manager for the selected employee
    const { managerId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the new manager for the employee:',
        choices: managerChoices,
      }
    ]);

    // Execute SQL query to update the manager for the selected employee
    await db.promise().query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]);

    console.log(`New manager assigned successfully for the selected employee.`);
  } catch (error) {
    console.error('Error assigning new manager:', error);
  }
}

// Function to handle deleting a department
async function deleteDepartment() {
  try {
    // Retrieve existing departments from the database
    const [departments] = await db.promise().query('SELECT id, department_name FROM department');

    // Extract department names from the result
    const departmentNames = departments.map(department => department.department_name);

    // Prompt the user to select a department to delete
    const { departmentName } = await inquirer.prompt({
      type: 'list',
      name: 'departmentName',
      message: 'Select the department to delete:',
      choices: departmentNames,
    });

    // Find the ID of the selected department
    const selectedDepartment = departments.find(department => department.department_name === departmentName);
    const departmentId = selectedDepartment.id;

    // Delete the selected department from the database
    await db.promise().query('DELETE FROM department WHERE id = ?', [departmentId]);

    console.log(`Department '${departmentName}' deleted successfully.`);
  } catch (error) {
    console.error('Error deleting department:', error);
  }
}

// Function to handle deleting roles
  async function deleteRole() {
    try {
      // Retrieve existing roles from the database
      const [roles] = await db.promise().query('SELECT id, title FROM role');

      // Extract role titles from the result
      const roleTitles = roles.map(role => role.title);

      // Prompt the user to select a role to delete
      const { roleName } = await inquirer.prompt({
        type: 'list',
        name: 'roleName',
        message: 'Select the role to delete:',
        choices: roleTitles,
      });

      // Find the ID of the selected role
      const selectedRole = roles.find(role => role.title === roleName);
      const roleId = selectedRole.id;

      // Delete the selected role from the database
      await db.promise().query('DELETE FROM role WHERE id = ?', [roleId]);

      console.log(`Role '${roleName}' deleted successfully.`);
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  }

// Function to handle deleting employees

  async function deleteEmployee() {
    try {
      // Retrieve existing employees from the database
      const [employees] = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee');
  
      // Extract employee names from the result
      const employeeNames = employees.map(employee => employee.full_name);
  
      // Prompt the user to select an employee to delete
      const { employeeName } = await inquirer.prompt({
        type: 'list',
        name: 'employeeName',
        message: 'Select the employee to delete:',
        choices: employeeNames,
      });
  
      // Find the ID of the selected employee
      const selectedEmployee = employees.find(employee => employee.full_name === employeeName);
      const employeeId = selectedEmployee.id;
  
      // Delete the selected employee from the database
      await db.promise().query('DELETE FROM employee WHERE id = ?', [employeeId]);
  
      console.log(`Employee '${employeeName}' deleted successfully.`);
    } catch (error) {
      console.error('Error deleting employee:', error);
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
      case 'viewEmployeesByManager':
        // Implement logic to view employees by manager
        await viewEmployeesByManager(); // Call viewEmployeesByManager function
        break;
      case 'viewEmployeesByDepartment':
        // Implement logic to view employees by department

        break;
      case 'viewDepartmentBudget':
          // Implement logic to view budget of a department
  
          break;
      case 'addDepartment':
        // Implement logic to add a department
        await addDepartment(); // Call addDepartment function
        break;
      case 'addRole':
        // Implement logic to add a role
        await addRole(); // Call addRole function
        break;
      case 'addEmployee':
        // Implement logic to add an employee
        await addEmployee();
        break;
      case 'updateEmployeeManager':
        await updateEmployeeManager()// Implement logic to update employee manager
        break;
      case 'deleteDepartment':
        // Implement logic to delete a department
        await deleteDepartment(); // Call deleteDepartment function
        break;
      case 'deleteRole':
        // Implement logic to delete a role
        await deleteRole(); // Call deleteRole function
        break;
      case 'deleteEmployee':
        // Implement logic to delete an employee
        await deleteEmployee(); // Call deleteEmployee function
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

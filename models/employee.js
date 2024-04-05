/* viewEmployees. This will be to view ALL EMPLOYEES within the entire db */

async function viewEmployees() {
    try {
      const [rows] = await db.promise().query('SELECT * FROM employee');
      console.log('Employee Table:');
      console.table(rows);
    } catch (error) {
      console.error('Error viewing employee table:', error);
    }
  }  

  // Function to handle adding employees
  
  async function addEmployee() {
    try {
      // Retrieve existing roles from the database
      const [roles] = await db.promise().query('SELECT id, title FROM role');
      const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
      }));
  
      // Prompt the user for employee details including role selection
      const { firstName, lastName, roleId } = await inquirer.prompt([
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
        }
      ]);
  
      // Execute SQL query to insert the new employee into the database
      await db.promise().query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [firstName, lastName, roleId]);
  
      console.log(`New employee '${firstName} ${lastName}' added successfully.`);
    } catch (error) {
      console.error('Error adding employee:', error);
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
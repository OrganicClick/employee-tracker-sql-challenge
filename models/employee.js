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

/* addEmployee. Additional switch statement or logic to handle additions of employees,
like additional prompts for user to enter employee first name, last name, role id,
and manager id. */

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
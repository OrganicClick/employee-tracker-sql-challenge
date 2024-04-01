/* View all departments in the department table*/
async function viewDepartments() {
    try {
      const [rows] = await db.promise().query('SELECT * FROM department');
      console.log('Department Table:');
      console.table(rows);
    } catch (error) {
      console.error('Error viewing department table:', error);
    }
  }
/* Add a new department to the department table. Needs to provide user with prompt
asking what they want the new department name to be*/

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
  

/* Delete a department from the department table. Needs to provide user with prompt or list of options
to select and run delete on*/
  async function deleteDepartment() {

  }
/* View all employees within a department in the department table*/


  // Export the functions to make them accessible from other files
module.exports = {
    viewDepartments,
    addDepartment,
    deleteDepartment,
};
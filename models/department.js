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
    // Implement logic to prompt user for department details
    // Add the new department to the database
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
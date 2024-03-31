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
/* Add a new department to the department table*/

/* Delete a department from the department table*/

/* View all employees within a department in the department table*/


  // Function to handle adding a department
  async function addDepartment() {
    // Implement logic to prompt user for department details
    // Add the new department to the database
  }

  // Export the functions to make them accessible from other files
module.exports = {
    viewDepartments,
    addDepartment
};
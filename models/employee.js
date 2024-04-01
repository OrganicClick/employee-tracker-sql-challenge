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

/* deleteEmployee. Needs to be a menu selection for user to select which employee to delete.*/
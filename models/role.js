/* viewRoles. This will allow user to view ALL ROLES within the database. */

async function viewRoles() {
    try {
      const [rows] = await db.promise().query('SELECT * FROM role');
      console.log('Roles Table:');
      console.table(rows);
    } catch (error) {
      console.error('Error viewing role table:', error);
    }
  }  

/* addRole. Needs to have user prompts/menu selection for title of the new role, salary of the role, and department 
that role will belong to */


/* deleteRole. Needs to have user menu selection for which role they want to delete   */
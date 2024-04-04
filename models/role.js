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

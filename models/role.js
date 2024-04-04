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

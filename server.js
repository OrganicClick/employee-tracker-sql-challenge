
const express = require('express'); // Import and require express
const mysql = require('mysql2'); // Import and require mysql2
const inquirer = require('inquirer'); // Import and require inquirer
require('dotenv').config(); // Load environment variables from .env file


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

// CONNECTION QUERIES.JS FILE BELOW -- TO BE MODULARIZED AND SEPARATED INTO ITS OWN FILE LATER

/* inquirer
  .prompt([
    /* Pass your questions in here */
  /*])
  /* .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  }); */


  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

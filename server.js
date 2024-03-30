// Import and require express
const express = require('express');

// Import and require mysql2
const mysql = require('mysql2');

// Import and require inquirer
const inquirer = require('inquirer');

inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
# Employee Tracker

[![npm](https://badge.fury.io/js/inquirer.svg)](http://badge.fury.io/js/inquirer)

## Description
This is a command-line application built to help manage a company's employee database, using Node.js, Inquirer, and My SQL.

![alt text](https://github.com/jdeschat/Employee_tracker/blob/main/assets/img/employee-tracker.png)

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)
- [Tests](#tests)
- [Technology Used](#technology-used)
- [Questions](#questions)

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Installation
To install this application, clone the code into your terminal for the respective repository. Then, install npm by entering the command ```npm init```  into the terminal. Inquirer must then be installed by entering ```npm install inquirer```. Finally, the program can then be run by entering ```node app.js``` into the command line, and answering each question appropriately.

  ```JavaScript

  npm install inquirer

  var inquirer = require('inquirer');
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
 ```

To launch the MySQL command-line client, enter the flowing command in a Command Prompt window: ```mysql -u root -p ```. The ```-p``` option is needed only if a root password is defined for MySQL. Enter the password when prompted.

Create and populate a table with MySQL, for example:
1.	mysql> show databases;
2.	mysql> CREATE DATABASE animals_db;
3.	mysql> use animals_db;
4.	mysql> Create TABLE dogs(
a.	-> id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
b.	-> petName VARCHAR(100),
c.	-> petAge INTEGER(11)
d.	-> );
5.	mysql> show tables;
6.	mysql> INSERT INTO dogs(petName, petAge) VALUES (‘Sam’, 6)
a.	-> ;
7.	mysql> INSERT INTO dogs(petName, petAge) VALUES (‘Ginger’, 8)
a.	-> ;
8.	mysql> SELECT * FROM dogs;

## Usage
1. Clone the package in your terminal
2. Install npm: npm init -y
3. Install inquirer: npm i inquirer
4. Install mysql
5. In the command-line, run "node app.js"
6. Answer all of the questions in the command-line

## Contributors
To contribute to Employee_tracker, clone this repo locally and commit your code on a separate branch.
  
Contributors:

<a href="https://github.com/jdeschat/Employee_tracker/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jdeschat/Employee_tracker" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Tests
![GitHub license](https://img.shields.io/badge/test-100%25-success)

## Technology Used
- Node.js
- Inquirer
- MySQL
- JavaScript

## Questions
My Github username is jdeschat, which can be accessed here https://github.com/jdeschat/Employee_tracker.

The Github page for this project can be accessed using the following link: https://jdeschat.github.io/Employee_tracker/.

You can reach me at jdeschat@gmail.com with additional questions.
  
Below are links to my demo video and the video location on my Github, respectfully:
- [Link to Demo Video](https://youtu.be/)
- [Video location in Github](https://github.com/jdeschat/Employee_tracker/tree/main/assets/video)
const inquirer = require('inquirer');
const fs = require("fs");
const teamMembers = [];
// get the client
const mysql = require('mysql2');
require('console.table');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employeeDb',
    password: 'password'
})

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
        }])
        .then(userChoice => {
            switch (userChoice.menu) {
                case 'view all departments':
                    selectDepartments();
                    break;
                case 'view all roles':
                    selectRoles();
                    break;
                case 'view all employees':
                    selectEmployees();
                    break;
                case 'add a department':
                    promptAddDepartment();
                    break;
                case 'add a role':
                    promptAddRole();
                    break;
                case 'add an employee':
                    promptAddEmployee();
                    break;
                case 'update an employee role':
                    promptUpdateRole();
                    break;
                default:
                    process.exit();
            }
        });
};

const selectDepartments = () => {
    connection.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results); // results contains rows returned by server
            promptMenu();
        }
    )
};
const selectRoles = () => {
    connection.query(
        'SELECT * FROM role;',
        (err, results) => {
            console.table(results); // results contains rows returned by server
            promptMenu();
        }
    )
};
const selectEmployees = () => {
    connection.query(
        'SELECT * FROM employee;',
        (err, results) => {
            console.table(results); // results contains rows returned by server
            promptMenu();
        }
    )
};

// return inquirer.prompt([
//     {
//         type: 'input',
//         name: 'name',
//         message: 'What is your name? (Required)',
//         validate: nameInput => {
//             if (nameInput) {
//                 return true;
//             } else {
//                 console.log('Please enter your name!');
//                 return false;
//             }
//         }
//     },
//     {
//         type: 'input',
//         name: 'employeeId',
//         message: 'Enter your employee ID (Required)',
//         validate: employeeId => {
//             if (employeeId) {
//                 return true;
//             } else {
//                 console.log('Please enter your employee ID!');
//                 return false;
//             }
//         }
//     },
//     {
//         type: 'input',
//         name: 'email',
//         message: 'Enter your email address (Required)',
//         validate: email => {
//             if (email) {
//                 return true;
//             } else {
//                 console.log('Please enter your email address!');
//                 return false;
//             }
//         }
//     },
//     {
//         type: 'input',
//         name: 'officeNumber',
//         message: 'Enter your office number (Required)',
//         validate: officeNumber => {
//             if (officeNumber) {
//                 return true;
//             } else {
//                 console.log('Please enter your office number!');
//                 return false;
//             }
//         }
//     },
// ]).then(answers => {
//     console.log(answers);
//     const manager = new Manager(answers.name, answers.employeeId, answers.email, answers.officeNumber);
//     teamMembers.push(manager);
//     promptMenu();
// })

promptMenu();
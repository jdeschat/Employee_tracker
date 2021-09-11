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
        "SELECT E.id, E.first_name, E.last_name, R.title, D.name AS department, R.salary, CONCAT(M.first_name,' ',M.last_name) AS manager FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON R.department_id = D.id JOIN employee M ON E.manager_id = M.id;",
        (err, results) => {
            console.table(results); // results contains rows returned by server
            promptMenu();
        }
    )
};

const promptAddDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of your department!');
                    return false;
                }
            }
        },
    ]).then(answers => {
        console.log(answers);
        const manager = new Manager(answers.name, answers.employeeId, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        promptMenu();
    })
}

const promptAddRole = () => {
    return connection.promise().query(
        'SELECT * FROM department;',
    ).then((res) => {
        let departments = [];
        for (let i = 0; i > result[0].length; i++) {
            // push values into the array
            departments.push()
        }
        console.log(res[0].TextRow.name)
        // make it a drop down
        return {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: departments
        }
    }
    ).catch((err) =>
        console.log(err)
    )

    // return inquirer.prompt([
    //     {
    //         type: 'input',
    //         name: 'name',
    //         message: 'Enter the name of your title (Required)',
    //         validate: titleName => {
    //             if (titleName) {
    //                 return true;
    //             } else {
    //                 console.log('Please enter your title name!');
    //                 return false;
    //             }
    //         }
    //     },
    //     {
    //         type: 'list',
    //         name: 'department',
    //         message: 'Which department are you from?',
    //         choices: departmentChoices
    //     },
    //     {
    //         type: 'input',
    //         name: 'salary',
    //         message: 'Enter your salary (Required)',
    //         validate: salary => {
    //             if (salary) {
    //                 return true;
    //             } else {
    //                 console.log('Please enter your salary!');
    //                 return false;
    //             }
    //         }
    //     },
    //     {
    //         type: 'input',
    //         name: 'department',
    //         message: 'Enter your department name (Required)',
    //         validate: department => {
    //             if (department) {
    //                 return true;
    //             } else {
    //                 console.log('Please enter your department name!');
    //                 return false;
    //             }
    //         }
    //     }
}

promptMenu();
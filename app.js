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
            // const departmentChoices = results.map(data => ({
            //     value: data.id, name: data.name
            promptMenu();
        });
    // promptMenu(departmentChoices);
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


const promptAddDepartment = (departmentChoices) => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'departmentName',
            message: 'What is the name of your department? (Required)',
            choices: departmentChoices
        },
    ]).then(answers => {
        console.log("answers", answers.departmentName);
        // const manager = new Manager(answers.name, answers.employeeId, answers.email, answers.officeNumber);
        // teamMembers.push(manager);

        var query =
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  WHERE d.id = ?`

        connection.query(query, answers.departmentName, function (err, res) {
            if (err) throw err;

            console.table("response ", res);
            console.log(res.affectedRows + "Employees are viewed!\n");

            promptMenu();
        })
    });
}

// 

const promptAddRole = () => {

    return connection.promise().query(
        "SELECT department.id, department.name FROM department;"
    )
        .then(([departments]) => {
            let departmentChoices = departments.map(({
                id,
                name
            }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt(
                [{
                    type: 'input',
                    name: 'name',
                    message: 'Enter the name of your title (Required)',
                    validate: titleName => {
                        if (titleName) {
                            return true;
                        } else {
                            console.log('Please enter your title name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department are you from?',
                    choices: departmentChoices
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter your salary (Required)',
                    validate: salary => {
                        if (salary) {
                            return true;
                        } else {
                            console.log('Please enter your salary!');
                            return false;
                        }
                    }
                }
                ]
            )
                .then(roles => {
                    // TODO: Create the role with the responses.
                    console.log(roles);
                    //     let roleChoices = roles.map(({
                    //         id,
                    //         name
                    //     }) => ({
                    //         name: name,
                    //         value: id
                    //     }));
                });

        })
}

// const promptAddRole = () => {
//     function employeeFirstName() {
//         var employees = connection.query('SELECT first_name FROM employee;')
//         for (var i = 0; i < employees.length; i++) {
//             var employee = employees[i];
//             employees.map(employee);
//             console.log(employee);
//         }
//     }
//     employeeFirstName();

// ).then((res) => {
//     console.log(res[0])

//     let departments = [];
//     for (let i = 0; i > res[0].length; i++) {
//         // push values into the array
//         departments.push()
//     }
//     // make it a drop down
//     return {
//         type: 'list',
//         name: 'menu',
//         message: 'Which department are you from?',
//         choices: departments
//     }
// }
// ).catch((err) =>
//     console.log(err)
// )

// return connection.promise().query(
//     'SELECT * FROM department;',
// ).then((res) => {
//     console.log(res[0])

//     let departments = [];
//     for (let i = 0; i > res[0].length; i++) {
//         // push values into the array
//         departments.push()
//     }
//     // make it a drop down
//     return {
//         type: 'list',
//         name: 'menu',
//         message: 'Which department are you from?',
//         choices: departments
//     }
// }
// ).catch((err) =>
//     console.log(err)
// )

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
// }

const promptAddEmployee = () => {

    return connection.promise().query(
        "SELECT R.id, R.title FROM role R;"
    )
        .then(([employees]) => {
            let titleChoices = employees.map(({
                id,
                title

            }) => ({
                title: id,
                value: title
            }))

            inquirer.prompt(
                [{
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employees first name (Required)',
                    validate: firstName => {
                        if (firstName) {
                            return true;
                        } else {
                            console.log('Please enter the employees first name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employees last name (Required)',
                    validate: lastName => {
                        if (lastName) {
                            return true;
                        } else {
                            console.log('Please enter the employees last name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'employeesRole',
                    message: 'What is the employees role?',
                    choices: titleChoices
                },
                // {
                //     type: 'list',
                //     name: 'managersRole',
                //     message: 'Who is the employees manager?',
                //     choices: managerChoices
                // }
                {
                    type: 'input',
                    name: 'manager',
                    message: 'Who is the employees manager? (Required)',
                    validate: manager => {
                        if (manager) {
                            return true;
                        } else {
                            console.log('Please enter your employees manager!');
                            return false;
                        }
                    }
                }]

            ).then(employees => {
                // TODO: Create the role with the responses.
                console.table(employees);
                console.log(employees + "inserted successfully!\n");
            });

        })
}

const promptUpdateRole = () => {

    return connection.promise().query(
        "SELECT department.id, department.name FROM department;"
    )
        .then(([departments]) => {
            let departmentChoices = departments.map(({
                id,
                name
            }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt(
                [{
                    type: 'input',
                    name: 'name',
                    message: 'Enter the name of your title (Required)',
                    validate: titleName => {
                        if (titleName) {
                            return true;
                        } else {
                            console.log('Please enter your title name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department are you from?',
                    choices: departmentChoices
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter your salary (Required)',
                    validate: salary => {
                        if (salary) {
                            return true;
                        } else {
                            console.log('Please enter your salary!');
                            return false;
                        }
                    }
                }
                ]
            )
                .then(roles => {
                    // TODO: Create the role with the responses.
                    console.log(roles);
                    //     let roleChoices = roles.map(({
                    //         id,
                    //         name
                    //     }) => ({
                    //         name: name,
                    //         value: id
                    //     }));
                });

        })
}

promptMenu();
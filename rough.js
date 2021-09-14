const promptAddEmployee = (roles) => {

    return connection.promise().query(
        "SELECT R.id, R.title FROM role R;"
    )
        .then(([employees]) => {
            let titleChoices = employees.map(({
                id,
                title

            }) => ({
                value: id,
                name: title
            }))

            connection.promise().query(
                "SELECT E.id, CONCAT(E.first_name,' ',E.last_name) AS manager FROM employee E;"
            ).then(([managers]) => {
                let managerChoices = managers.map(({
                    id,
                    manager
                }) => ({
                    value: id,
                    name: manager
                }));

                inquirer.prompt(
                    [{


                        const promptUpdateRole = () => {

                            return connection.promise().query(
                                "SELECT E.role_id, E.manager_id, CONCAT(E.first_name,' ',E.last_name) AS employee, CONCAT(M.first_name,' ',M.last_name) AS manager FROM employee E JOIN employee M ON E.manager_id = M.id;"
                                // "SELECT E.id, E.first_name, E.last_name, R.title, D.name AS department, R.salary, CONCAT(M.first_name,' ',M.last_name) AS manager FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON R.department_id = D.id JOIN employee M ON E.manager_id = M.id;"
                            )
                                .then(([managers]) => {
                                    let managerChoices = managers.map(({
                                        manager_id,
                                        manager
                                    }) => ({
                                        name: manager,
                                        value: manager_id
                                    }))

                                    connection.promise().query(
                                        ""
                                        [{

                                            let employeeChoices = managers.map(({
                                                role_id,
                                                employee
                                            }) => ({
                                                name: employee,
                                                value: role_id
                                            }));

                                            inquirer.prompt(
                                                [{
                                                    type: 'input',
                                                    name: 'name',
                                                    message: 'Which employees manager would you like to update? (Required)',
                                                    choices: managerChoices
                                                },
                                                {
                                                    type: 'list',
                                                    name: 'department',
                                                    message: 'Which employee do you want to set as manager for the selected employee?',
                                                    choices: employeeChoices
                                                }
                                                ]
                                            )
                                                .then(managers => {
                                                    // TODO: Update the managers with the responses.
                                                    console.log(managers);
                                                });

                                        })
                                }
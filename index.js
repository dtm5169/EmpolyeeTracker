//installed npm packages

const mysql = require('mysql');
var inquirer = require('inquirer');
const cTable = require('console.table');
const Choices = require('inquirer/lib/objects/choices');

//connect with mysql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Apple3245$',
    database: 'empolyee_db',
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

const runSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add Empolyee',
                'Add Role',
                'Add Department',
                'View All Roles',
                'View All Empolyees',
                'View All Departments',
                'Update Empolyee',
                'Exit'
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add Empolyee':
                    addEmpolyee();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'View All Departments':
                    viewDepartment();
                    break;

                case 'View All Roles':
                    viewRole();
                    break;

                case 'View All Empolyees':
                    viewEmpolyee();
                    break;

                case 'Update Empolyee':
                    updateEmpolyee();
                    break;

                case 'Exit':
                    connection.end();
                    break;
            }
        });
}

//view empolyees
const viewEmpolyee = () => {
    
    var exe = "SELECT empolyee.id, empolyee.first_name, empolyee.last_name, role.title, empolyee.role_id, empolyee.manager_id, department.name FROM department, empolyee, role WHERE empolyee.role_id = role.id AND role.department_id = department.id GROUP BY empolyee.id;";
   
    connection.query(exe, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

//view department
const viewDepartment = () => {
    var query = `select id AS Department_ID, name AS department from department;`;
    connection.query(query, function (err, query) {
        console.table(query);
        runSearch();
    });
};

//view role
const viewRole = () => {
    const query = `SELECT id AS Role_ID, title, salary AS Salaries from role;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

//add empolyee
function addEmpolyee() {
    let roleChoice = [];
    connection.query("SELECT * FROM role", function (err, resRole) {
        if (err) throw err;
        for (var i = 0; i < resRole.length; i++) {
            var roleList = resRole[i].title;
            roleChoice.push(roleList);
        };
        let departmentChoice = [];
        connection.query("SELECT * FROM department", function (err, resDepartment) {
            if (err) throw err;
            for (var i = 0; i < resDepartment.length; i++) {
                var departmentList = resDepartment[i].name;
                departmentChoice.push(departmentList);
            }
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "Enter the new employee's first name?"
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "Enter the new employee's last name?"
                    },
                    {
                        type: "rawlist",
                        name: "role_id",
                        message: "Enter the new employee's role?",
                        choices: roleChoice
                    },
                    
                ])
                .then(function (answer) {

                    let choiceRole;
                    for (let i = 0; i < resRole.length; i++) {
                        if (resRole[i].title === answer.role_id) {
                            choiceRole = resRole[i];
                        }
                    };

                   let choiceDepartment;
                    for (let i = 0; i < resDepartment.length; i++) {
                        if (resDepartment[i].name === answer.department_id) {
                            choiceDepartment = resDepartment[i];
                        }
                    }; 
                    connection.query(
                        "INSERT INTO empolyee SET ?",
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: choiceRole.id,                   
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("Empolyee " + answer.first_name + " " + answer.last_name + " was added");
                            runSearch();
                        }
                    );
                })
        });
    })
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Enter the new department name:"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("The department " + answer.department + " was added");
                    runSearch();
                }
            );
        });
}

const addRole = () => {
    let departmentPick = [];
    connection.query("SELECT * FROM department", function (err, resDepartment) {
        if (err) throw err;
        for (var i = 0; i < resDepartment.length; i++) {
            let departmentList = resDepartment[i].name;
            departmentPick.push(departmentList);
        }

        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What is the new role:"
                },
                {
                    name: "department_id",
                    type: "rawlist",
                    message: "Select empolyee department:",
                    choices: departmentPick
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary?:"
                }
            ])

            .then(function (answer) {
                let departmentChoice;
                for (var i = 0; i < resDepartment.length; i++) {
                    if (resDepartment[i].name === answer.department_id) {
                        departmentChoice = resDepartment[i];
                    }
                };

                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: departmentChoice.id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("New role " + answer.title + " was added");
                        runSearch();
                    }
                );
            });
    })
};

//update empolyee

const updateEmpolyee = () => {
    let chosenEmpolyee = [];
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM empolyee",
        function (err, resEmpolyee) {
            if (err) throw err;
            for (var i = 0; i < resEmpolyee.length; i++) {
                var empolyeeList = resEmpolyee[i].name;
                chosenEmpolyee.push(empolyeeList);
            };

            let roleChoice = [];
            connection.query("SELECT * FROM role", function (err, resRole) {
                if (err) throw err;
                for (var i = 0; i < resRole.length; i++) {
                    var roleList = resRole[i].title;
                    roleChoice.push(roleList);
                };

                inquirer
                    .prompt([
                        {
                            name: "empolyee_id",
                            type: "rawlist",
                            message: " Which empolyee do you want to update:",
                            choices: chosenEmpolyee
                        },
                        {
                            name: "role_id",
                            type: "rawlist",
                            message: " What is the new empolyee role:",
                            choices: roleChoice
                        },
                    ])
                    .then(function (answer) {
                        let pickEmp;
                        for (var i = 0; i < resEmpolyee.length; i++) {
                            if (resEmpolyee[i].name === answer.empolyee_id) {
                                pickEmp = resEmpolyee[i];
                            }
                        };
                        let pickRole;
                        for (var i = 0; i < resRole.length; i++) {
                            if (resRole[i].title === answer.role_id) {
                                pickRole = resRole[i];
                            }
                        };
                        connection.query(
                            "UPDATE empolyee SET role_id = ? WHERE id = ?",
                            [pickRole.id, pickEmp.id],
                            function (err) {
                                if (err) throw err;
                                console.log("Empolyee role updated");
                                runSearch();
                            }

                        );
                    })
            })
        })
}
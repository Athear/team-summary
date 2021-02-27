const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//TODO: will need inputs for: name,id,email,ROLE,office(manager),github(engineer),school(intern)
//TODO: Should we only allow one manager?
//TODO: need to only allow role-specific questions for the respective role
const questions =[
    {
        type:"input",
        name:"name",
        message: "Input employee name"
    },
    {
        type:"number",
        name:"id",
        message: "Input employee ID"
    },
    {
        type:"input",
        name:"email",
        message: "Input employee email address"
    },
    {
        type:"list",
        name:"role",
        message: "Select employee role",
        choices: ["manager","engineer","intern"]
    },
    {
        type:"number",
        name:"office",
        message: "Input manager's office number"
    },
    {
        type:"input",
        name:"github",
        message: "Input engineer's github account name"
    },
    {
        type:"input",
        name:"school",
        message: "Input intern's school"
    }

]

//TODO: Have while loop with a condition based on a separate Inquirer call
//TODO: In the loop, call a separate function (with await) to create the employee.
//TODO: figure out what inquirer loop does



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

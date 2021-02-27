const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { rejects } = require("assert");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//TODO: Should we only allow one manager?
const questions =[
    {
        type:"list",
        name:"role",
        message: "Select employee role",
        choices: ["manager","engineer","intern"]
    },
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
        type:"number",
        name:"office",
        message: "Input manager's office number",
        when: function(answers){return answers.role==="manager"}
    },
    {
        type:"input",
        name:"github",
        message: "Input engineer's github account name",
        when: function(answers){return answers.role==="engineer"}
    },
    {
        type:"input",
        name:"school",
        message: "Input intern's school",
        when: function(answers){return answers.role==="intern"}
    }
]

const again = [{
    type:"list",
    name:"more",
    message:"would you like to enter additional employees?",
    choices:["yes","no"]
}]

function init() {
    const employeeList = [];
    doPrompts(employeeList);
}

function doPrompts(employeeList){
    inquirer.prompt(questions)
    .then((response)=>{
        let newEmployee = getEmployeeObject(response); //create an object for the employee
        employeeList.push(newEmployee); //List for holding all employees

        inquirer.prompt(again)//check for more employees
        .then((response)=>{
            if(response.more==="yes"){
                doPrompts(employeeList); //start the inquiry again.
            }
            else{
                processesEmployees(employeeList) //go do the actual processing
            }
        })
    })
    .catch((err)=>{console.error(err)});
}

function getEmployeeObject(employee){
    let empObj;
    switch (employee.role){
        case 'manager':
            empObj = new Manager(employee.name,employee.id,employee.email,employee.office);
            break;
        case 'engineer':
            empObj = new Engineer(employee.name,employee.id,employee.email,employee.github);
            break;
        case 'intern':
            empObj = new Intern(employee.name,employee.id,employee.email,employee.school);
            break;
        default:
            empObj = new Employee(employee.name,employee.id,employee.email);
    }
    return empObj;
}

function processesEmployees(employees){
    console.log(employees); //DEBUG;
    const renderedHTML = render(employees);
    ensureOutputDir
    .then(()=> {
        fs.writeFile(outputPath,renderedHTML,(err)=>{
            if(err){
                console.error(err);
            }
        });
    })
    .catch((reject)=>console.error(reject));
}

const ensureOutputDir = new Promise(function(resolve,reject){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdir(OUTPUT_DIR,(err)=>{
            if(err){
               reject(err);
            }
            resolve("Directory created");
        });
    } else{
        resolve("Directory exists");
    }
});

//DEBUG; verify ensureOutputDir functions as expected
function dirTest(){
    ensureOutputDir
    .then(response=>{
        console.log(response);
        fs.writeFile(path.join(OUTPUT_DIR, "test.txt"),"Test Text",(err)=>{
            if(err){
                console.error(err);
            }
        });
    })
    .catch(reject=>{console.log(reject)});
};


init();
// dirTest();


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
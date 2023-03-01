const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

 function getTeam() {
    let teamArr = []
    const managerDetails = () => inquirer.prompt([
        {
            type:"input",
            name:"managerName",
            message:"Enter Team Manager's Name:",
        },
        {
            type:"input",
            name:"employeeID",
            message:"Enter Team Manager's Employee ID:",
        },
        {
            type:"input",
            name:"email",
            message:"Enter Team Manager's Email Address:",
        },
        {
            type:"input",
            name:"officeNumber",
            message:"Enter Team Manager's Office Number:",
        },

    ]).then((answers)=>{
        
        const manager = new Manager(answers.managerName, answers.employeeID,answers.email,answers.officeNumber)
        teamArr.push(manager)

        const options= () => inquirer.prompt([
            {
                type:"list",
                name:"menu",
                message:"What do you want to do next:",
                choices: ["Add Engineer","Add Intern", "Finish Building Team"]
            }
           
    
        ]).then((answers)=> {
            if (answers.menu.toLowerCase().includes("engineer")){
                inquirer.prompt([
                    {
                        type:"input",
                        name:"engName",
                        message:"Enter Engineer's Name:",
                    },
                    {
                        type:"input",
                        name:"employeeID",
                        message:"Enter Engineers's Employee ID:",
                    },
                    {
                        type:"input",
                        name:"email",
                        message:"Enter Engineer's Email Address:",
                    },
                    {
                        type:"input",
                        name:"github",
                        message:"Enter Engineer's GitHub Username:",
                    },
            
                ]).then((answers) =>{
                    const engineer = new Engineer(answers.engName, answers.employeeID,answers.email,answers.github)
                    teamArr.push(engineer)
                    options()
                    return engineer

                })

            }else if(answers.menu.toLowerCase().includes("intern")){
                 inquirer.prompt([
                    {
                        type:"input",
                        name:"internName",
                        message:"Enter Intern's Name:",
                    },
                    {
                        type:"input",
                        name:"employeeID",
                        message:"Enter Intern's Employee ID:",
                    },
                    {
                        type:"input",
                        name:"email",
                        message:"Enter Intern's Email Address:",
                    },
                    {
                        type:"input",
                        name:"school",
                        message:"Enter Intern's School Name:",
                    },
            
                ]).then((answers) =>{
                    const intern = new Intern(answers.internName, answers.employeeID,answers.email,answers.school)
                    teamArr.push(intern)
                    options()

                    return intern

                })

            }else{
               let data = render(teamArr)
               fs.writeFileSync(outputPath,data)

                
            }

        })
        options()
    })

       

 managerDetails()
    

}

getTeam()
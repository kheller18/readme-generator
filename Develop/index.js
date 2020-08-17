const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
function promptUser() {
    return inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Project Name:"
        },
        {
          type: "input",
          name: "description",
          message: "Project Description:"
        },
        {
          type: "input",
          name: "installationInstructions",
          message: "Installation instructions:"
        },
        {
          type: "input",
          name: "usageInformation",
          message: "Usage information:"
        },
        {
          type: "input",
          name: "contributionGuidelines",
          message: "Contribution guidelines:"
        },
        {
          type: "input",
          name: "testInstructions",
          message: "Test instructions:"
        },
        {
        type: "input",
        name: "license",
        message: "License:"
        },
        {
        type: "input",
        name: "githubUsername",
        message: "Github username:"
        },
        {
        type: "input",
        name: "emailAddress",
        message: "Email address:"
        }  
    ]);
}


//function to write README file
function writeToFile(data) {
  return `# ${ data.title }\n
${ data.description }\n
## Table of Contents\n
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)\n
### Installation\n
${data.installationInstructions}\n
### Usage\n
${ data.usageInformation }\n
### License\n
${ data.license }\n
### Contributing\n
${ data.contributionGuidelines }\n
### Tests\n
${ data.testInstructions }\n
### Questions\n
[GitHub: ${ data.githubUsername }](https://github.com/${ data.githubUsername })\n
Email: ${ data.emailAddress }\n`
;
}

// function call to initialize program
function init() {
  promptUser()
  .then(function(data) {
    const sample = writeToFile(data);
    console.log(sample);
    return writeFileAsync("README.md", sample);
  })
  .then(function() {
    // console.log("successful");
  })
  .catch(function(error) {
    console.log(error);
  });
}

init();

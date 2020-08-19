const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const license = require("./license")

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "repositoryUrl",
        message: "What is the repository URL associated with this project?"
      },
      {
        type: "input",
        name: "repositoryName",
        message: "What is the name of your repository?"
      },
      {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
      },
      {
        type: "input",
        name: "description",
        message: "How would you describe this project?"
      },
      {
        type: "input",
        name: "screenshot",
        message: "What is the URL of a screenshot of your application?"
      },
      {
        type: "input",
        name: "installationInstructions",
        message: "What are the installation instructions?"
      },
      {
        type: "input",
        name: "usageInformation",
        message: "Usage information:"
      },
      {
        type: "input",
        name: "contributionGuidelines",
        message: "Who contributed to the development of this application?"
      },
      {
        type: "input",
        name: "testInstructions",
        message: "What are the test instructions?"
      },
      {
        type: "list",
        name: "license",
        message: "What license is your application under?",
        choices: ['MIT', 'Apache', 'GNU GPLv3']
      },
      {
        type: "input",
        name: "userName",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "githubUsername",
        message: "What is your GitHub username?"
      },
      {
        type: "input",
        name: "emailAddress",
        message: "What is your email address?"
      }  
    ]);
}


//function to write README file
function writeToFile(data) {
  return `# ${ data.title }
  ![alt text](https://img.shields.io/github/license/${ data.githubUsername }/${ data.repositoryName }?style=plastic)


### Description
  ${ data.description }


## Table of Contents
  1. [Installation](#1 installation)
  2. [Usage](#2 usage)
  3. [License](#3 license)
  4. [Contributing](#4 contributing)
  5. [Tests](#5 tests)
  6. [Questions](#6 questions)


## 1. Installation
  ${data.installationInstructions}


## 2. Usage
  ${ data.usageInformation }  
  

## 3. License



## 4. Contributing
  * [${ data.userName }](https://github.com/${ data.githubUsername })


## 5. Tests
  ${ data.testInstructions }


## 6. Questions
  [GitHub: ${ data.githubUsername }](https://github.com/${ data.githubUsername })
  Email: ${ data.emailAddress }
    * Please feel free to contact me at the email address provided above.  I will be happy to answer any questions.  Feedback is gladly welcomed and appreciated!
  `
;
}

function init() {
  promptUser()
  .then(function(data) {
    // console.log(data);
    const sample = writeToFile(data);
    // console.log(sample);
    return writeFileAsync("README.md", sample);
  })
  .then(function() {
    console.log("README creation succeeded!");
  })
  .catch(function(error) {
    console.log("README creation unsuccessful.");
  });
}

// function call to initialize program
init();

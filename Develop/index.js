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
          message: "Project name:"
        },
        {
          type: "input",
          name: "description",
          message: "Project description:"
        },
        {
          type: "input",
          name: "screenshot",
          message: "Screenshot of your application (url):"
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
          type: "list",
          name: "license",
          message: "License:",
          choices: ['MIT', 'Apache', 'GNU GPLv3']
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
Licensed under ${ data.license } ![alt text](https://img.shields.io/github/license/${ data.githubUsername }/${ data.title }?style=plastic)
\n
### Contributing\n
${ data.contributionGuidelines }\n
### Tests\n
${ data.testInstructions }\n
### Questions\n
[GitHub: ${ data.githubUsername }](https://github.com/${ data.githubUsername })\n
Email: ${ data.emailAddress }\n
  * Please feel free to contact me at the email address provided above.  I will be happy to answer any questions.  Feedback is gladly welcomed.
  `
  
;
}

// function getBadge(data) {
//   let url = '';
//   switch(data.license) {
//     case 'MIT': 
//       url = `(https://img.shields.io/github/license/${ data.githubUsername }/${ data.title }?style=plastic)`
//       break;
//     case "Apache":
//       url = `https://shields.io/category/license/aur/license/:${ npmPackage }`
//       break;
//     case "GNU GPLv3":
//       url = `https://shields.io/category/license/cran/l/:${ npmPackage }`
//       break;
//   }
//   return url;
// }

function init() {
  promptUser()
  .then(function(data) {
    console.log(data);
    // licenseType = getBadge(data);
    const sample = writeToFile(data);
    console.log(sample);
    // console.log(licenseType);
    return writeFileAsync("README.md", sample);
  })
  .then(function() {
    // console.log("successful");
  })
  .catch(function(error) {
    console.log(error);
  });
}

// function call to initialize program
init();

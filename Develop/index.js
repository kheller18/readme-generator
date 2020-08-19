const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

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
        choices: ['GNU AGPv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense']
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

function license(type, userName) {
  switch(type) {
    case "GNU AGPv3":
      return `
      Copyright (C) <year>  ${ userName }

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU Affero General Public License as published
      by the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Affero General Public License for more details.

      You should have received a copy of the GNU Affero General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/>.
      `

    case "GNU GPLv3":
      return `
      Copyright (C) <year>  ${ userName }

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/>.
      `

    case "GNU LGPLv3":
      return `
      Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
      Everyone is permitted to copy and distribute verbatim copies
      of this license document, but changing it is not allowed.
      `

    case "Mozilla Public License 2.0":
      return `
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this file,
      You can obtain one at https://mozilla.org/MPL/2.0/.
      `

    case "Apache License 2.0":
      return `
      Copyright [yyyy] ${ userName }

      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at

          http://www.apache.org/licenses/LICENSE-2.0

      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License.
      `

    case "MIT License":
      return `
      MIT License

      Copyright (c) 2020 ${ userName }

      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
      `
  
    case "Boost Software License 1.0":
      return `
      Boost Software License - Version 1.0 - August 17th, 2003

      Permission is hereby granted, free of charge, to any person or organization
      obtaining a copy of the software and accompanying documentation covered by
      this license (the "Software") to use, reproduce, display, distribute,
      execute, and transmit the Software, and to prepare derivative works of the
      Software, and to permit third-parties to whom the Software is furnished to
      do so, all subject to the following:

      The copyright notices in the Software and this entire statement, including
      the above license grant, this restriction and the following disclaimer,
      must be included in all copies of the Software, in whole or in part, and
      all derivative works of the Software, unless such copies or derivative
      works are solely in the form of machine-executable object code generated by
      a source language processor.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
      SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
      FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
      ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
      DEALINGS IN THE SOFTWARE.
      `

    case "The Unlicense":
      return `
      This is free and unencumbered software released into the public domain.

      Anyone is free to copy, modify, publish, use, compile, sell, or
      distribute this software, either in source code form or as a compiled
      binary, for any purpose, commercial or non-commercial, and by any
      means.

      In jurisdictions that recognize copyright laws, the author or authors
      of this software dedicate any and all copyright interest in the
      software to the public domain. We make this dedication for the benefit
      of the public at large and to the detriment of our heirs and
      successors. We intend this dedication to be an overt act of
      relinquishment in perpetuity of all present and future rights to this
      software under copyright law.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
      IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
      OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
      ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
      OTHER DEALINGS IN THE SOFTWARE.

      For more information, please refer to <https://unlicense.org>
      `

    default:
      return `
      This is free and unencumbered software released into the public domain.

      Anyone is free to copy, modify, publish, use, compile, sell, or
      distribute this software, either in source code form or as a compiled
      binary, for any purpose, commercial or non-commercial, and by any
      means.

      In jurisdictions that recognize copyright laws, the author or authors
      of this software dedicate any and all copyright interest in the
      software to the public domain. We make this dedication for the benefit
      of the public at large and to the detriment of our heirs and
      successors. We intend this dedication to be an overt act of
      relinquishment in perpetuity of all present and future rights to this
      software under copyright law.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
      IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
      OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
      ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
      OTHER DEALINGS IN THE SOFTWARE.

      For more information, please refer to <https://unlicense.org>
      `
  }
}


//function to write README file
function writeToFile(data, licenseInfo) {
  return `
# ${ data.title }
![alt text](https://img.shields.io/github/license/${ data.githubUsername }/${ data.repositoryName }?style=plastic)


### Description
  ${ data.description }


## Table of Contents
  1. [Installation](#1-installation)
  2. [Usage](#2-usage)
  3. [License](#3-license)
  4. [Contributing](#4-contributing)
  5. [Tests](#5-tests)
  6. [Questions](#6-questions)


## 1. Installation
  ${data.installationInstructions}


## 2. Usage
  ${ data.usageInformation }  
  

## 3. License
\t${ licenseInfo }


## 4. Contributing
  * [${ data.userName }](https://github.com/${ data.githubUsername })


## 5. Tests
  ${ data.testInstructions }


## 6. Questions\n
  * [GitHub: ${ data.githubUsername }](https://github.com/${ data.githubUsername })\n
  * Email: ${ data.emailAddress }
    * Please feel free to contact me at the email address provided above.  I will be happy to answer any questions.  Feedback is gladly welcomed and appreciated!
  `
;
}

function init() {
  promptUser()
  .then(function(data) {
    // console.log(data);
    const licenseText = license(data.license, data.userName);
    const sample = writeToFile(data, licenseText);
    // console.log(licenseText);
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

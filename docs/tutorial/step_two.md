## Step 2 - Set Up The Neo4j Driver

This step requires the prerequists introduced in the [introductory file](/docs/tutorial/index.md). 

Now that you have you own Aura database instance, we've got to get that database connected to your project. We do this throuhg using a neo4j driver object.

First, we need to install all the files and resources the neo4j driver needs. This is done by running the following command in your terminal:

```
npm i neo4j-driver
```

**Note:** be sure you run this at the top level of your project

The output from this function should look a bit like this:

![Output](/docs/tutorial/tutorial_images/DriverDownloadOutput.png)

If you successfully did not recieve and errors or vulnerabilities, then you've successfully downloaded the neo4j driver!

Now it's time to test and see if we can connect to the database!

**Note:** if you are commiting your code to github, or any other public source, please do not commit your project after this point until finishing step 3
(setting up your .env file) of the tutorial, there will be some sensitive information regarding your aura instance and if you commit that information you 
may run the risk of your database being accessed by someone else. These next few instructions are purely for testing connection.

Locate your home page in the next.js framework, which should be under the file path /your-app-name/src/app/page.js

In this file, above the Home() function, inputing this javascript code, replacing the URI, USER, and PASSWORD with the given strings from the file you recieved in 
step one titled something simiarly to " Neo4j-b16d193f-Created-2024-11-12 ":

```
var neo4j = require('neo4j-driver');
(async () => {
  const URI = '<URI to Neo4j database>'
  const USER = '<Username>'
  const PASSWORD = '<Password>'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    await driver.close()
  }
})();
```
When you run your project, and open the home page in your browser, this causes that function to run. If successful, the terminal should have an output that 
looks a bit like:

![Connection Output](/docs/tutorial/tutorial_images/DBConnectionOutput.png)

If it does, that means you've created a successful connection to your aura instance database!

Now, let's get that sensitive information out of the code and into an .env file. Follow this link to [Step 3](/docs/tutorial/step_three.md).

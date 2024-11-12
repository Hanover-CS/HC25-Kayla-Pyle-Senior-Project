## Step 3 - Using .env

With your database set up and connected, it's important to use a .env file to hide away sensitive information from view.

Before, we just put the URI, USER, and PASSWORD strings directly into the code. For minimal and uncommited testing, this is fine, however i we want to continue using
and growing our project, or sharing it on site such as github, it's important for that information to not be public. This is where the .env file comes in, a file that
holds those strings on your local workspace, but is not inlcuded in commits.

If you do not have an .env file, you will first need to make one. The full name of the file will be .env and it should be located on the very top level of your project,
the same as your package.json file.

In the .env file, you want to put in the following lines, replacing the values of URI, USER, and PASSWORD for the strings in the file given to you in step one, exactly
as you did for the code in step two.

```
URI = '<URI to Neo4j database>'
USER = '<Username>'
PASSWORD = '<Password>'
```

Next, let's revisit the code from step two, and replace the direct strings we were using before to instead call upon the env variables we just created using process.env:

```
var neo4j = require('neo4j-driver');
(async () => {
  const URI = process.env.URI
  const USER = process.env.USER
  const PASSWORD = process.env.PASSWORD
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

Now, run and test the code again to ensure you get the same output in the terminal as you did before.

Finally, if you are using github or another public repositiory space, be sure to include the .env file in the files to be ignored when commiting.

For github, this is done through the .gitignore file at the top level of your project. Put this line into that file:

```
.env*
```

Once that is done, your project is safe to commit and the sensitive database information is accessible by you and only you!

Now, this connection to the driver would be acceptable if all you had was a single page in your project, or only a single file which needed access to the databse.
However, this tends not to be the case with more complex projects, so we need to move that driver into it's own class where it can be accessed by several pages and
files. Follow this link to [Step 4](/docs/tutorial/step_four.md).

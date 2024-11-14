## Step 4 - Putting The Driver Into a Class

When it comes to organized and clean code, we don't want too much duplication. To repeat the code we used to make the driver in step two for every page that needs
database access would be redundant, and we don't want to run the risk of have multiple sessions with the driver open at once.

So, we want to start by making a file that will be the new home for our driver object. Lets make a neo4j.js file in the /your-project-name/src/app/lib/ directory.

If you do not have a lib directory in the /src/app directory, you will need to make one.

Once you've created that file, put this code we started in step two into this new neo4j.js file, and remove it from the home page.js file:

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

The console.log commands are a bit redundant now, but may be helpful if any issues occur with the database down the road. For the sake of the tutorial, we will be
keeping them, but feel free to remove them.

In this file, we may want to use helper methods so that the driver does not need to be called on directly.

Add these read and write functions under the function that creates the driver:

```
export async function read(cypher, params = {}) {
    // 1. Open a session
    const session = driver.session()
  
    try {
      // 2. Execute a Cypher Statement
      const res = await session.executeRead(tx => tx.run(cypher, params))
  
      // 3. Process the Results
      const values = res.records.map(record => record.toObject())
  
      return values
    }
    finally {
      // 4. Close the session 
      await session.close()
    }
  }
  
export async function write(cypher, params = {}) {
    // 1. Open a session
    const session = driver.session()
  
    try {
      // 2. Execute a Cypher Statement
      const res = await session.executeWrite(tx => tx.run(cypher, params))
  
      // 3. Process the Results
      const values = res.records.map(record => record.toObject())
  
      return values
    }
    finally {
      // 4. Close the session 
      await session.close()
    }
  }
```

*the code above was written by Adam Cowley in his post you can view linked [here](https://dev.to/adamcowley/using-neo4j-in-your-next-nextjs-project-77)*

However, to use these functions, the driver needs to be a global variable, able to be accessed outside of the function in which it is created.

To do this, we move the line of code 

```
let driver
```

To the very beginning of the file. In the end, our file will look something like this:

```
let driver

var neo4j = require('neo4j-driver')
(async () => {  
    const URI = process.env.URI
    const USER = process.env.USER
    const PASSWORD = process.env.PASSWORD
  
    try {
      driver = neo4j.driver(URI,  neo4j.auth.basic(USER, PASSWORD))
      const serverInfo = await driver.getServerInfo()
      console.log('Connection established')
      console.log(serverInfo)
    } catch(err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`)
      await driver.close()
    }

  })();

export async function read(cypher, params = {}) {
    // 1. Open a session
    const session = driver.session()
  
    try {
      // 2. Execute a Cypher Statement
      const res = await session.executeRead(tx => tx.run(cypher, params))
  
      // 3. Process the Results
      const values = res.records.map(record => record.toObject())
  
      return values
    }
    finally {
      // 4. Close the session 
      await session.close()
    }
  }
  
export async function write(cypher, params = {}) {
    // 1. Open a session
    const session = driver.session()
  
    try {
      // 2. Execute a Cypher Statement
      const res = await session.executeWrite(tx => tx.run(cypher, params))
  
      // 3. Process the Results
      const values = res.records.map(record => record.toObject())
  
      return values
    }
    finally {
      // 4. Close the session 
      await session.close()
    }
  }
```

With that, the driver is successfully localized to a single file, and can be used by calling the read and write functions.

Now, lets see some examples on how to query the database! Follow this link to our final step, [Step 5](/docs/tutorial/step_five.md).

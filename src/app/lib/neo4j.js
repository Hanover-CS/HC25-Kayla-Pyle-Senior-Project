
let driver

(async () => {

    var neo4j = require('neo4j-driver')
  
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
      return
    }
  
    // Use the driver to run queries

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
import neo4j from "neo4j-driver"

(async () => {
  
    const URI = process.env.URI
    const USER = process.env.USER
    const PASSWORD = process.env.PASSWORD
    let driver
  
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
  
    await driver.close()
  })();

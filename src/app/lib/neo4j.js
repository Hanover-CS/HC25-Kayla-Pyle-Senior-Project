let driver;

(async () => {
  var neo4j = require("neo4j-driver");

  const URI = process.env.URI;
  const USER = process.env.USER;
  const PASSWORD = process.env.PASSWORD;

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.getServerInfo();
    console.log("Connection established");
    console.log(serverInfo);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
    if(driver == null) { return; }
    await driver.close();
  }
})();

export async function getAllEntries() {
  return await read('MATCH (e:Entry) RETURN e.name AS name')
}

export async function readEntry(name) {
  let query = 'MATCH (e:Entry { name: ' + name + ' }) RETURN e.name AS name'
  return read(query)
}

async function read(cypher, params = {}) {
  // 1. Open a session
  const session = driver.session();

  try {
    // 2. Execute a Cypher Statement
    const res = await session.executeRead((tx) => tx.run(cypher, params));

    // 3. Process the Results
    const values = res.records.map((record) => record.toObject());

    return values;
  } finally {
    // 4. Close the session
    await session.close();
  }
}

async function write(cypher, params = {}) {
  // 1. Open a session
  const session = driver.session();

  try {
    // 2. Execute a Cypher Statement
    const res = await session.executeWrite((tx) => tx.run(cypher, params));

    // 3. Process the Results
    const values = res.records.map((record) => record.toObject());

    return values;
  } finally {
    // 4. Close the session
    await session.close();
  }
}

// read example:
//    await read('MATCH (e:Entry) RETURN e.name AS name')
// write example:
//    await write("MERGE (:Entry:Character {name: 'The Green Knight', text:''})")

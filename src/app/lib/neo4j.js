// neo4j.js
// This file creates the neo4j database driver object and exports functions used to interact with database

const URI = process.env.URI;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const neo4j = require("neo4j-driver");

export class Neo4jDriver {

  static driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

  static async getDriver() {
    try {
      const serverInfo = await Neo4jDriver.driver.getServerInfo();
      console.log("Connection established");
      console.log(serverInfo);
    } catch (err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`);
      if (Neo4jDriver.driver == null) {
        return;
      }
      await Neo4jDriver.driver.close();
    }
  }

  static async getAllEntries() {
    return await this.#read("MATCH (e:Entry) RETURN e.name AS name");
  }
  
  static async readEntry(name) {
    let query = "MATCH (e:Entry { name: '" + name + "' }) RETURN e.name AS name";
    return this.#read(query);
  }
  
  static async createEntry(name) {
    let query = "MERGE (:Entry {name: '" + name + "', text:''})";
    return this.#write(query);
  }
  
  static async deleteEntry(name) {
    let query = "MATCH (e:Entry {name: '" + name + "'}) DELETE e";
    const session = Neo4jDriver.driver.session();
    try {
      await session.run(query);
    } catch (error) {
      console.error("Error deleting node:", error);
    } finally {
      await session.close();
    }
  }
  
  static async #read(cypher, params = {}) {
    // 1. Open a session
    const session = Neo4jDriver.driver.session();
  
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
  
  static async #write(cypher, params = {}) {
    // 1. Open a session
    const session = Neo4jDriver.driver.session();
  
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

}

await Neo4jDriver.getDriver()

// read example:
//    await read('MATCH (e:Entry) RETURN e.name AS name')
// write example:
//    await write("MERGE (:Entry:Character {name: 'The Green Knight', text:''})")


const URI = process.env.URI;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const neo4j = require("neo4j-driver");
import Entry from "./entry";

/**
 * @class Holds the Neo4j driver object instance.
 * @description This singleton class interacts with the Neo4j database to retrive and write information.
 * 
 * @constructor
 */
export class Neo4jDriver {

  static driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
  static hasConnected = false;

  /**
    * Checks to ensure connection with the database was successful, outputting relevant databse data
    * @function
    * @returns {void}
    */
  static async checkConnection() {
    if (Neo4jDriver.hasConnected) {
      return;
    }
    try {
      const serverInfo = await Neo4jDriver.driver.getServerInfo();
      console.log("Connection established");
      console.log(serverInfo);
      Neo4jDriver.hasConnected = true;
    } catch (err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`);
      if (Neo4jDriver.driver == null) {
        return;
      }
      await Neo4jDriver.driver.close();
    }
  }

  /**
    * Gets all entires from database
    * @function
    * @returns {list}
    */
  static async getAllEntries() {
    await this.checkConnection()
    const records = await this.#read("MATCH (e:Entry) RETURN e.name AS name, e.type AS type, e.text");
    let entries = []
    for (let i = 0; i < records.length; i++) {
      entries.push(new Entry(records[i].name, records[i].type, records[i].text))
    }
    console.log(entries)
    return await this.#read("MATCH (e:Entry) RETURN e.name AS name");
  }
  
  /**
    * Gets one entry by name
    * @function
    * @param {string}
    * @returns {object}
    */
  static async readEntry(name) {
    await this.checkConnection()
    let query = `MATCH (e:Entry { {name: '${name}' }) RETURN e.name AS name`;
    let record = this.#read(query);
    let entry = new Entry(record[0].name, record[0].type, record[0].text)
    return entry;
  }
  
  /**
    * Creates new entry in database
    * @function
    * @param {string}
    * @returns {void}
    */
  static async createEntry(entry) {
    await this.checkConnection()
    let query = `MERGE (:Entry {name: '${entry.name}', type: '${entry.type}', text: '${entry.text}' })`;
    this.#write(query);
    return
  }
  
  /**
    * Deletes entry from database by name
    * @function
    * @param {string}
    * @returns {void}
    */
  static async deleteEntry(entry) {
    await this.checkConnection()
    let query = `MATCH (e:Entry {name: '${entry.name}'}) DELETE e`;
    const session = Neo4jDriver.driver.session();
    try {
      await session.run(query);
    } catch (error) {
      console.error("Error deleting node:", error);
    } finally {
      await session.close();
    }
  }
  
  /**
    * Reads from the database using a session
    * @function
    * @param {cypher}
    * @param {object}
    * @returns {list}
    */
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
  
  /**
    * Writes to the database using a session
    * @function
    * @param {cypher}
    * @param {object}
    * @returns {list}
    */
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

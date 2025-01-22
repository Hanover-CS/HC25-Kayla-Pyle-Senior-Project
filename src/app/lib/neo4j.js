const URI = process.env.URI;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const neo4j = require("neo4j-driver");

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
    await this.checkConnection();
    return await this.#read(
      "MATCH (e:Entry) RETURN e.name AS name, e.type AS type",
    );
  }

  /**
   * Gets one entry by name
   * @function
   * @param {string}
   * @returns {object}
   */
  static async readEntry(name) {
    await this.checkConnection();
    let query = `MATCH (e:Entry { name: '${name}' }) RETURN e.name AS name, e.type AS type, e.text AS text`
    let result = await this.#read(query)
    return result
  }

  /**
   * Creates new entry in database
   * @function
   * @param {string}
   * @param {string}
   * @returns {void}
   */
  static async createEntry(name, type = "None") {
    await this.checkConnection();
    let query = `MERGE (:Entry {name: '${name}', type:'${type}', text:''})`
    await this.#write(query)
  }

  /**
   * Deletes entry from database by name
   * @function
   * @param {string}
   * @returns {void}
   */
  static async deleteEntry(name) {
    await this.checkConnection();
    let query = `MATCH (e:Entry {name: '${name}'}) DELETE e`;
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
   * Modifies text property of given entry
   * @function
   * @param {string}
   * @param {string}
   * @returns {void}
   */
  static async modifyText(name, text) {
    await this.checkConnection()
    let query = `MATCH (e:Entry {name: '${name}'}) SET e.text = '${text}'`
    await this.#write(query)
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

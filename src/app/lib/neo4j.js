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
  static async getAllEntries(user) {
    await this.checkConnection();
    return await this.#read(
      `MATCH (p:Profile {username: "${user}"})-[:HAS_ENTRY]-> (e:Entry) 
      RETURN e.name AS name, e.type AS type`,
    );
  }

  /**
   * Gets one entry by name
   * @function
   * @param {string}
   * @returns {object}
   */
  static async readEntry(user, name) {
    await this.checkConnection();
    let query = 
    `MATCH (p:Profile {username: "${user}"})-[:HAS_ENTRY]-> (e:Entry { name: "${name}" }) 
    RETURN e.name AS name, e.type AS type, e.text AS text`;
    let result = await this.#read(query);
    return result;
  }

  /**
   * Creates new entry in database
   * @function
   * @param {string}
   * @param {string}
   * @returns {void}
   */
  static async createEntry(user, name, type = "None") {
    await this.checkConnection();
    const uniqueName = await this.uniqueName(user, name)
    let query = 
    `MATCH (p:Profile {username: "${user}"} )
    CREATE (e:Entry {name: "${uniqueName}", type: "${type}", text:""})
    MERGE (p)-[:HAS_ENTRY]->(e)`
    await this.#write(query);
  }

  /**
   * Creates new profile in database
   * @function
   * @param {string}
   * @param {string}
   * @returns {void}
   */
  static async createProfile(username, password) {
    await this.checkConnection();
    let query = `MERGE (:Profile {username: "${username}", password:"${password}"})`;
    await this.#write(query);
  }

  /**
   * Get a profile by username from database
   * @function
   * @param {string}
   * @returns {list}
   */
  static async getProfile(username) {
    await this.checkConnection();
    return await this.#read(
      `MATCH (p:Profile  {username: "${username}" }) RETURN p.username AS username, p.password AS password`,
    );
  }

  /**
   * Deletes entry from database by name
   * @function
   * @param {string}
   * @returns {void}
   */
  static async deleteEntry(user, name) {
    await this.checkConnection();
    let query = 
    `MATCH (p:Profile {username: "${user}"})-[:HAS_ENTRY]-> (e:Entry { name: "${name}" })
     DELETE e`;
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
  static async modifyText(user, name, text) {
    await this.checkConnection();
    let query = 
    `MATCH (p:Profile {username: "${user}"})-[:HAS_ENTRY]-> (e:Entry { name: "${name}" }) 
    SET e.text = "${text}"`;
    await this.#write(query);
  }

  /**
   * Modifies name property of given entry
   * @function
   * @param {string}
   * @param {string}
   * @returns {void}
   */
  static async modifyName(user, currName, newName) {
    await this.checkConnection();
    const uniqueNewName = await this.uniqueName(user, newName)
    let query = 
    `MATCH (p:Profile {username: "${user}"})-[:HAS_ENTRY]-> (e:Entry { name: "${currName}" }) 
    SET e.name = "${uniqueNewName}"`;
    await this.#write(query);
  }

  /**
   * Helper function to ensure no two entries have the same name
   * @function
   * @param {string}
   * @returns {string}
   */
  static async uniqueName(user, name) {
    const entries = await this.getAllEntries(user)
    const entryNames = entries.map(entry => entry.name)
    if (!entryNames.includes(name)) {
      return name
    } else {
      let count = 1;
      let newName = `${name}(${count})`;
      while (entryNames.includes(newName)) {
        count++;
        newName = `${name}(${count})`;
      }
      return newName;
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

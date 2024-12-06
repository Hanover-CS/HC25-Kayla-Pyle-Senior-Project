
/**
 * @class Holds the Neo4j driver object instance.
 * @description This singleton class interacts with the Neo4j database to retrive and write information.
 * 
 * @constructor
 */
class Entry {

    constructor(name, type='None', text='') {
        this.type = type;
        this.name = name;
        this.text = text;
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getText() {
        return this.text;
    }

}

export default Entry;
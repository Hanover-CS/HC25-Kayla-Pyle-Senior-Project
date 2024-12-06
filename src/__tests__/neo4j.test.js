
import { expect, test } from 'vitest'
import { Neo4jDriver } from '../app/lib/neo4j'

/**
 * @fileoverview Unit tests for the `createEntry`, `readEntry`, and `deleteEntry` 
 * functions of the Neo4jDriver class.
 */

function clearDB() {
    const entries = Neo4jDriver.getAllEntries()
    for (let i = 0; i < entries.length; i++) {
        Neo4jDriver.deleteEntry(entry)
    }
}

test('createEntry method adds Bob', async () => {
    let bob = new Entry('Bob')
    await Neo4jDriver.createEntry(bob)
    let result = await Neo4jDriver.readEntry('Bob')
    expect(result).toEqual(new Entry('Bob'))
    clearDB()
})

test('deleteEntry deletes Bob', async () => {
    let bob = new Entry('Bob')
    await Neo4jDriver.createEntry(bob)
    await Neo4jDriver.deleteEntry(bob)
    let result = await Neo4jDriver.readEntry('Bob')
    expect(result).toEqual([])
})

test('getAllEntries returns Bob, Sally, and Monica', async () => {
    let bob = new Entry('Bob')
    await Neo4jDriver.createEntry(bob)
    let sally = new Entry('Sally')
    await Neo4jDriver.createEntry(sally)
    let monica = new Entry('Monica')
    await Neo4jDriver.createEntry(monica)
    let result = await Neo4jDriver.getAllEntries()
    expect(result).toEqual([new Entry('Bob'), new Entry('Sally'), new Entry('Monica')])
    clearDB()
})
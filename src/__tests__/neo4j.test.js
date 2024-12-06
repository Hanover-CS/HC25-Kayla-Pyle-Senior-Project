
import { expect, test, afterEach } from 'vitest'
import { Neo4jDriver } from '../app/lib/neo4j'

/**
 * @fileoverview Unit tests for the `createEntry`, `readEntry`, and `deleteEntry` 
 * functions of the Neo4jDriver class.
 */

afterEach(async () => {
    const entries = await Neo4jDriver.getAllEntries()
    for (let i = 0; i < entries.length; i++) {
        await Neo4jDriver.deleteEntry(entries[i].name)
    }
});

test('createEntry method adds Bob', async () => {
    await Neo4jDriver.createEntry('Bob')
    let result = await Neo4jDriver.readEntry('Bob')
    expect(result).toEqual([{name: 'Bob', type: 'None', text:''}])
})

test('createEntry method adds Bob with specified type', async () => {
    await Neo4jDriver.createEntry('Bob', 'Character')
    let result = await Neo4jDriver.readEntry('Bob')
    expect(result).toEqual([{name: 'Bob', type: 'Character', text:''}])
} )

test('deleteEntry deletes Bob', async () => {
    await Neo4jDriver.createEntry('Bob')
    await Neo4jDriver.deleteEntry('Bob')
    let result = await Neo4jDriver.readEntry('Bob')
    expect(result).toEqual([])
})

test('deleteEntry deletes Bob and not Sally or Monica', async () => {
    await Neo4jDriver.createEntry('Bob')
    await Neo4jDriver.createEntry('Sally')
    await Neo4jDriver.createEntry('Monica')
    await Neo4jDriver.deleteEntry('Bob')
    let result = await Neo4jDriver.getAllEntries()
    expect(result).toEqual(expect.arrayContaining([
        {name: 'Sally', type: 'None'}, {name: 'Monica', type: 'None'} ]))
})

test('getAllEntries returns Bob, Sally, and Monica', async () => {
    await Neo4jDriver.createEntry('Bob')
    await Neo4jDriver.createEntry('Sally')
    await Neo4jDriver.createEntry('Monica')
    let result = await Neo4jDriver.getAllEntries()
    expect(result).toEqual(expect.arrayContaining([
        {name: 'Sally', type: 'None'}, {name: 'Monica', type: 'None'}, {name: 'Bob', type: 'None'} ]))
})

test('getAllEntries returns empty list when DB is empty', async () => {
    let result = await Neo4jDriver.getAllEntries()
    expect(result).toEqual([])
})
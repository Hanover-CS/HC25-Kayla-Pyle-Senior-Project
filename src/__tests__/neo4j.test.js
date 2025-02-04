
import { expect, test, afterEach, beforeEach } from 'vitest'
import { Neo4jDriver } from '../app/lib/neo4j'

const USER1 = "user1"
const USER2 = "user2"
const USER3 = "user3"
const BOB = "Bob"
const SALLY = "Sally"
const MONICA = "Monica"

/**
 * @fileoverview Unit tests for the `createEntry`, `readEntry`, and `deleteEntry` 
 * functions of the Neo4jDriver class.
 */

afterEach(async () => {
    [USER1, USER2].forEach(async (user) => {
        const entries = await Neo4jDriver.getAllEntries(user)
        entries.forEach(async (entry) => {
            await Neo4jDriver.deleteEntry(user, entry.name)
        })
    })   
}, 10000);

test('createEntry method adds Bob', async () => {
    await Neo4jDriver.createEntry(USER1, BOB)
    let result = await Neo4jDriver.readEntry(USER1, BOB)
    expect(result).toEqual([{name: BOB, type: 'None', text:''}])
}, 10000)

test('createEntry method adds Bob with specified type', async () => {
    await Neo4jDriver.createEntry(USER3, BOB, 'Character')
    let result = await Neo4jDriver.readEntry(USER3, BOB)
    expect(result).toEqual([{name: BOB, type: 'Character', text:''}])
} )

test('createEntry method does not add Bob for user2', async () => {
    await Neo4jDriver.createEntry(USER1, BOB)
    let result = await Neo4jDriver.readEntry(USER2, BOB)
    expect(result).toEqual([])
})

test('createEntry method does not create entries with identical name Bob', async () => {
    await Neo4jDriver.createEntry(USER2, BOB)
    await Neo4jDriver.createEntry(USER2, BOB)
    await Neo4jDriver.createEntry(USER2, BOB)
    let result = await Neo4jDriver.getAllEntries(USER2)
    expect(result).toEqual(expect.arrayContaining([
        {name: BOB, type: 'None'}, {name: 'Bob(1)', type: 'None'}, {name: 'Bob(2)', type: 'None'} ]))
})

test('deleteEntry deletes Bob', async () => {
    await Neo4jDriver.createEntry(USER1, BOB)
    await Neo4jDriver.deleteEntry(USER1, BOB)
    let result = await Neo4jDriver.readEntry(USER1, BOB)
    expect(result).toEqual([])
})

test('deleteEntry deletes Bob only from user1', async () => {
    await Neo4jDriver.createEntry(USER1, BOB)
    await Neo4jDriver.createEntry(USER2, BOB)
    await Neo4jDriver.deleteEntry(USER1, BOB)
    let result = await Neo4jDriver.readEntry(USER2, BOB)
    expect(result).toEqual([{name: BOB, type: 'None', text:''}])
})

test('deleteEntry deletes Bob and not Sally or Monica', async () => {
    await Neo4jDriver.createEntry(USER1, BOB)
    await Neo4jDriver.createEntry(USER1, SALLY)
    await Neo4jDriver.createEntry(USER1, MONICA)
    await Neo4jDriver.deleteEntry(USER1, BOB)
    let result = await Neo4jDriver.getAllEntries(USER1)
    expect(result).toEqual(expect.arrayContaining([
        {name: SALLY, type: 'None'}, {name: MONICA, type: 'None'} ]))
})

test('getAllEntries returns Bob, Sally, and Monica', async () => {
    await Neo4jDriver.createEntry(USER2, BOB)
    await Neo4jDriver.createEntry(USER2, SALLY)
    await Neo4jDriver.createEntry(USER2, MONICA)
    let result = await Neo4jDriver.getAllEntries(USER2)
    expect(result).toEqual(expect.arrayContaining([
        {name: SALLY, type: 'None'}, {name: MONICA, type: 'None'}, {name: BOB, type: 'None'} ]))
})

test('getAllEntries returns Bob, not Sally and Monica', async () => {
    await Neo4jDriver.createEntry(USER1, BOB)
    await Neo4jDriver.createEntry(USER2, SALLY)
    await Neo4jDriver.createEntry(USER2, MONICA)
    let result = await Neo4jDriver.getAllEntries(USER1)
    expect(result).toEqual([{name: BOB, type: 'None'}])
})

test('getAllEntries returns Bob, Sally, and Monica with types', async () => {
    await Neo4jDriver.createEntry(USER2, BOB, 'Character')
    await Neo4jDriver.createEntry(USER2, SALLY, 'Organization')
    await Neo4jDriver.createEntry(USER2, MONICA, 'Character')
    let result = await Neo4jDriver.getAllEntries(USER2)
    expect(result).toEqual(expect.arrayContaining([
        {name: 'Sally', type: 'Organization'}, {name: 'Monica', type: 'Character'}, {name: 'Bob', type: 'Character'} ]))
})

test('getAllEntries returns empty list when user has no entries', async () => {
    let result = await Neo4jDriver.getAllEntries(USER1)
    expect(result).toEqual([])
})

test('getAllEntries returns empty list, even when another user has entries', async () => {
    await Neo4jDriver.createEntry(USER1, BOB)
    await Neo4jDriver.createEntry(USER1, SALLY)
    await Neo4jDriver.createEntry(USER1, MONICA)
    let result = await Neo4jDriver.getAllEntries(USER2)
    expect(result).toEqual([])
})
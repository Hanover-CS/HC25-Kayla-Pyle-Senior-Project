// neo4j.test.js
// Testing the createEntry, readEntry, deleteEntry functions of neo4j.js

import { expect, test } from 'vitest'
import { createEntry, readEntry, getAllEntries, deleteEntry } from '../app/lib/neo4j'

function clearDB() {
    const entries = getAllEntries()
    for (let i = 0; i < entries.length; i++) {
        deleteEntry(entries[i].name)
    }
}

test('createEntry method adds Bob', async () => {
    await createEntry('Bob')
    let result = await readEntry('Bob')
    expect(result).toEqual([{name: 'Bob'}])
    clearDB()
})

test('deleteEntry deletes Bob', async () => {
    await createEntry('Bob')
    deleteEntry('Bob')
    let result = await readEntry('Bob')
    expect(result).toEqual([])
})

test('getAllEntries returns Bob, Sally, and Monica', async () => {
    await createEntry('Bob')
    await createEntry('Sally')
    await createEntry('Monica')
    let result = await getAllEntries()
    expect(result).toEqual([{name: 'Bob'}, {name: 'Sally'}, {name: 'Monica'}])
    clearDB()
})

// test('readEntry method does not read an entry that is not there', async () => {
//     let result = await readEntry('Bob')
//     expect(result).toEqual([{}])
// })
// driver.test.js
import { expect, test } from 'vitest'
import { read, write } from '../app/lib/neo4j'



test('write method', async () => {
    await write("MERGE (:Entry:Event {name: 'Jousting Tournament', text:''})")

    // expect(1 + 2).toBe(3)
})
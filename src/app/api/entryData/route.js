import { Neo4jDriver } from '../../lib/neo4j'

export async function GET(req) {
  const url = new URL(req.url);
  const entryName = url.searchParams.get('entryName')
  try {
    const data = await Neo4jDriver.readEntry(entryName)
    return new Response(JSON.stringify(data[0]), {status: 200})
  } catch (err) {
    console.log(`API fetching error\n${err}\nCause: ${err.cause}`)
  }
}

export async function POST(req) {
    const { name, text } = await req.json()
    try {
        await Neo4jDriver.modifyText(name, text)
        return new Response(JSON.stringify("Successfully saved text"), {status: 200})
      } catch (err) {
        console.log(`API posting error\n${err}\nCause: ${err.cause}`)
      }
  }
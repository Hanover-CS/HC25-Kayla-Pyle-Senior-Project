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
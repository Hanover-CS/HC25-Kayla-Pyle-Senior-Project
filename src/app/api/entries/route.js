import { Neo4jDriver } from "../../lib/neo4j";

export async function GET(req) {
  try {
    const data = await Neo4jDriver.getAllEntries();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.log(`API fetching error\n${err}\nCause: ${err.cause}`);
  }
}

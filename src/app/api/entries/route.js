import { Neo4jDriver } from "../../lib/neo4j";

export async function GET(req) {
  const url = new URL(req.url);
  const user = url.searchParams.get("user");
  try {
    const data = await Neo4jDriver.getAllEntries(user);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.log(`API fetching error\n${err}\nCause: ${err.cause}`);
  }
}

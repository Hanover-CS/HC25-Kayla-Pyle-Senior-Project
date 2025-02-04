import { Neo4jDriver } from "../../lib/neo4j";

export async function POST(req) {
  const { user, name, type } = await req.json();
  try {
    await Neo4jDriver.createEntry(user, name, type);
    return new Response(JSON.stringify("Successfully created entry"), {
      status: 200,
    });
  } catch (err) {
    console.log(`API posting error\n${err}\nCause: ${err.cause}`);
  }
}

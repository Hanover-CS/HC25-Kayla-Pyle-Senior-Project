import { Neo4jDriver } from "../../lib/neo4j";

export async function GET(req) {
  const url = new URL(req.url);
  const entryName = url.searchParams.get("entryName");
  const user = url.searchParams.get("user")
  try {
    const data = await Neo4jDriver.readEntry(user, entryName);
    return new Response(JSON.stringify(data[0]), { status: 200 });
  } catch (err) {
    console.log(`API fetching error\n${err}\nCause: ${err.cause}`);
  }
}

export async function POST(req) {
  const { user, name, text } = await req.json();
  try {
    await Neo4jDriver.modifyText(user, name, text);
    return new Response(JSON.stringify("Successfully saved text"), {
      status: 200,
    });
  } catch (err) {
    console.log(`API posting error\n${err}\nCause: ${err.cause}`);
  }
}

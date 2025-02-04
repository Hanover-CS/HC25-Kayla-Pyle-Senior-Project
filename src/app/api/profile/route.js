import { Neo4jDriver } from "../../lib/neo4j";

export async function GET(req) {
  const url = new URL(req.url);
  const username = url.searchParams.get("user");
  try {
    const data = await Neo4jDriver.getProfile(username);
    if (!data[0]) {
      data[0] = { username: null, password: null };
    }
    return new Response(JSON.stringify(data[0]), { status: 200 });
  } catch (err) {
    console.log(`API fetching error\n${err}\nCause: ${err.cause}`);
  }
}

export async function POST(req) {
  const { user, password } = await req.json();
  try {
    await Neo4jDriver.createProfile(user, password);
    return new Response(JSON.stringify("Successfully saved profile"), {
      status: 200,
    });
  } catch (err) {
    console.log(`API posting error\n${err}\nCause: ${err.cause}`);
  }
}


let selectedEntry = null;

export async function GET(req) {
    try {
        return new Response(JSON.stringify(selectedEntry), {status: 200})
      } catch (err) {
        console.log(`API fetching error\n${err}\nCause: ${err.cause}`)
    }
}

export async function POST(req, res) {
    const { value } = req.body
    selectedEntry = value
    return new Response()
}

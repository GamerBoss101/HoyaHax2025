export async function POST(req) {
  try {
    const body = await req.json();
    const { query } = body;

    const response = await fetch("https://api.friendli.ai/dedicated", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.FRIENDLI_API_KEY}`,
      },
      body: JSON.stringify({ id: "idv6w0upi158", query }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Friendli API error:", errorDetails);
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from Friendli API" }),
        { status: 500 }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify({ answer: data.answer }), { status: 200 });
  } catch (error) {
    console.error("Backend error:", error);
    return new Response(JSON.stringify({ error: "Error generating response" }), {
      status: 500,
    });
  }
}

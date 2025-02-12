export async function POST(req) {
  try {
    const token = process.env.FRIENDLI_API_KEY;
    const body = await req.json();
    const { query } = body;

    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };

    const requestBody = {
      model: "meta-llama-3.3-70b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You\u0027re an assistant for possibly elderly or ill patients. Give responses to medical questions in a brief, understandable, and kind way.",
        },
        {
          role: "user",
          content: query,
        },
      ],
      tools: [],
      min_tokens: 0,
      max_tokens: 2048,
      temperature: 1,
      top_p: 0.8,
      frequency_penalty: 0,
      stop: [],
      response_format: null,
      stream: false,
    };

    const response = await fetch(
      "https://api.friendli.ai/serverless/v1/chat/completions",
      {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Friendli API error:", errorDetails);
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from Friendli API" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || "No answer found"; 

    return new Response(JSON.stringify({ answer }), { status: 200 });
  } catch (error) {
    console.error("Backend error:", error);
    return new Response(
      JSON.stringify({ error: "Error processing the request" }),
      { status: 500 }
    );
  }
}

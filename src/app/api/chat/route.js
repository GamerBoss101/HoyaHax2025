import { HuggingFaceInference } from "@langchain/community/llms/hf";

export async function POST(req) {
  try {
    const body = await req.json();
    const { query } = body;

    const model = new HuggingFaceInference({
      model: "m42-health/Llama3-Med42-8B",
      apiKey: process.env.HUGGING_FACE_API_KEY,
    });

    const response = await model.invoke(query);

    return new Response(JSON.stringify({ answer: response }), {
      status: 200,
    });
  } catch (error) {
    console.error("Backend error:", error);
    return new Response(JSON.stringify({ error: "Error generating response" }), {
      status: 500,
    });
  }
}

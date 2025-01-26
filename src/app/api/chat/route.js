import { HuggingFaceInference } from "@langchain/community/llms/hf";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { query } = req.body;

      const model = new HuggingFaceInference({
        model: 'm42-health/Llama3-Med42-8B',
        apiKey: process.env.HUGGING_FACE_API_KEY,
      });

      const response = await model.invoke(query);

      res.status(200).json({ answer: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating response' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

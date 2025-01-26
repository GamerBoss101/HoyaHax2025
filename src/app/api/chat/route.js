import { InferenceAPI } from '@huggingface/inference';

const hfAPI = new InferenceAPI({ apiKey: process.env.HUGGING_FACE_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { query } = req.body;

      const response = await hfAPI.query('m42-health/Llama3-Med42-8B', { inputs: { text: query } });

      res.status(200).json({ answer: response.data[0].generated_text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating response' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

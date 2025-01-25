import mongoose from 'mongoose';
import { User } from '../../../models/User';
import crypto from 'crypto';

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const webhookSignature = req.headers['clerk-signature'];
    const payload = JSON.stringify(req.body);

    const hmac = crypto.createHmac('sha256', CLERK_WEBHOOK_SECRET);
    hmac.update(payload);
    const computedSignature = hmac.digest('hex');

    if (computedSignature !== webhookSignature) {
      return res.status(400).send('Invalid webhook signature');
    }

    await connectDB();

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).send('Name and email are required');
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    user = new User({
      name,
      email,
      role: 'patient',
      medicalConditions: [],
      medications: [],
    });

    await user.save();

    res.status(200).json({ message: 'User successfully created' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

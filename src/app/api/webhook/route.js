import mongoose from 'mongoose';
import { User } from '../../../models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    );
  }

  try {
    const webhookSignature = req.headers.get('clerk-signature');
    const payload = JSON.stringify(await req.json());

    const hmac = crypto.createHmac('sha256', CLERK_WEBHOOK_SECRET);
    hmac.update(payload);
    const computedSignature = hmac.digest('hex');

    if (computedSignature !== webhookSignature) {
      return NextResponse.json(
        { message: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    await connectDB();

    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    user = new User({
      name,
      email,
      role: 'patient',
      medicalConditions: [],
      medications: [],
    });

    await user.save();

    return NextResponse.json(
      { message: 'User successfully created' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

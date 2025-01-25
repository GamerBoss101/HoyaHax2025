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
  console.log('Received request:', req);

  if (req.method !== 'POST') {
    console.log('Method not allowed'); 
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    );
  }

  try {
    const webhookSignature = req.headers.get('clerk-signature');
    const payload = JSON.stringify(await req.json());
    console.log('Webhook Payload:', payload);
    console.log('Received Clerk Signature:', webhookSignature);

    const hmac = crypto.createHmac('sha256', CLERK_WEBHOOK_SECRET);
    hmac.update(payload);
    const computedSignature = hmac.digest('hex');
    console.log('Computed Signature:', computedSignature);

    if (computedSignature !== webhookSignature) {
      console.log('Invalid webhook signature');
      return NextResponse.json(
        { message: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    await connectDB();

    const { first_name, last_name, email_addresses } = await req.json();
    const email = email_addresses && email_addresses[0] ? email_addresses[0].email_address : null;

    console.log('Clerk Data:', { first_name, last_name, email });

    const name = first_name && last_name ? `${first_name} ${last_name}` : first_name || last_name;

    if (!name || !email) {
      console.log('Missing name or email');
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
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
    console.log('User created successfully');

    return NextResponse.json(
      { message: 'User successfully created' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during webhook processing:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

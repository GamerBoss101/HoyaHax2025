import mongoose from 'mongoose';
import { User } from '../../../models/User';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

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

  const payload = await req.text();
  const headers = {
    'svix-id': req.headers.get('svix-id'),
    'svix-timestamp': req.headers.get('svix-timestamp'),
    'svix-signature': req.headers.get('svix-signature'),
  };

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.log('Invalid webhook signature');
    return NextResponse.json(
      { message: 'Invalid webhook signature' },
      { status: 400 }
    );
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { first_name, last_name, email_addresses } = evt.data;
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

    await connectDB();

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
  } else {
    console.log(`Unhandled event type: ${eventType}`);
    return NextResponse.json(
      { message: `Unhandled event type: ${eventType}` },
      { status: 400 }
    );
  }
}

import { User } from '../../../models/User';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { connectDB } from '../../../lib/utils';

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req) {
  console.log('Received request:', req);

  if (!CLERK_WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is missing');
    return NextResponse.json(
      { message: 'Internal server error: Secret missing' },
      { status: 500 }
    );
  }

  if (req.method !== 'POST') {
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

  console.log('Webhook headers:', headers);

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers);
    console.log('Webhook verified:', evt);
  } catch (err) {
    console.error('Invalid webhook signature:', err);
    return NextResponse.json(
      { message: 'Invalid webhook signature' },
      { status: 400 }
    );
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, first_name, last_name, email_addresses } = evt.data;
    const email = email_addresses?.[0]?.email_address || null;

    if (!email) {
      console.log('Email missing from webhook data');
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const name = `${first_name || ''} ${last_name || ''}`.trim();

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
      id,
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

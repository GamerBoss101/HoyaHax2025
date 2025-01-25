import { User } from '../../../models/User';
import { connectDB } from '../../../lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Fetching patients...');

  await connectDB();

  try {
    const patients = await User.find({ role: 'patient' });
    console.log('Fetched patients:', patients);
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

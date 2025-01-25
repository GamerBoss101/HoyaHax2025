import { User } from '../../models/User';
import { connectDB } from '../../lib/utils';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get('userId');

  console.log('Received GET request with userId:', userId);

  if (!userId) {
    console.error('No userId provided');
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  await connectDB();

  const user = await User.findOne({ id: userId });

  if (!user) {
    console.error('User not found for userId:', userId);
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  console.log('Returning user data:', user);
  return NextResponse.json(user, { status: 200 });
}

export async function PUT(req) {
  const userId = req.nextUrl.searchParams.get('userId');
  const { role } = await req.json();

  console.log('Received PUT request with userId:', userId, 'and role:', role);

  if (!userId) {
    console.error('No userId provided');
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  await connectDB();

  const user = await User.findOne({ id: userId });

  if (!user) {
    console.error('User not found for userId:', userId);
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  if (!role) {
    console.error('No role provided in request body');
    return NextResponse.json(
      { message: 'Role is required' },
      { status: 400 }
    );
  }

  user.role = role;
  await user.save();

  console.log('User role updated successfully');
  return NextResponse.json(user, { status: 200 });
}

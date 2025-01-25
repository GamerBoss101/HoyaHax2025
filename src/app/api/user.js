import User from '../../models/User';
import { connectDB } from '../../lib/utils';

export default async (req, res) => {
  await connectDB();
  const { userId } = req.query;

  console.log('Received request with userId:', userId);

  if (!userId) {
    console.log('No userId provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    console.log('User not found for clerkId:', userId);
    return res.status(404).json({ message: 'User not found' });
  }

  if (req.method === 'GET') {
    console.log('Returning user data:', user);
    res.json(user);
  } else if (req.method === 'PUT') {
    const { role } = req.body;
    console.log('Updating user role to:', role);
    user.role = role;
    await user.save();
    console.log('User role updated successfully');
    res.json(user);
  } else {
    console.log('Method not allowed:', req.method);
    res.status(405).json({ message: 'Method not allowed' });
  }
};
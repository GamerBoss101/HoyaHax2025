import User from '../../models/User';
import { connectDB } from '../../lib/utils';

export default async (req, res) => {
  await connectDB();
  const { userId } = req.query;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (req.method === 'GET') {
    res.json(user);
  } else if (req.method === 'PUT') {
    const { role } = req.body;
    user.role = role;
    await user.save();
    res.json(user);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
import User from '../../models/User';
import { connectDB } from '../../lib/utils';

export default async (req, res) => {
  await connectDB();

  const patients = await User.find({ role: 'patient' });
  res.json(patients);
};
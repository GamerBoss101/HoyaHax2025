import User from '../../../models/User';
import connectDB from '../../../lib/utils';

export default async (req, res) => {
  await connectDB();

  const { email } = req.query;
  const { medications, medicalConditions } = req.body;

  const patient = await User.findOne({ email });

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  patient.medications = medications;
  patient.medicalConditions = medicalConditions;
  await patient.save();

  res.json(patient);
};
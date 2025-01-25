import User from '../../../models/User';
import connectDB from '../../../lib/utils';

export default async (req, res) => {
  await connectDB();

  const { email } = req.query;
  const { medications, medicalConditions } = req.body;

  console.log('Received request to update patient with email:', email);
  console.log('Medications:', medications);
  console.log('Medical Conditions:', medicalConditions);

  const patient = await User.findOne({ email });

  if (!patient) {
    console.log('Patient not found for email:', email);
    return res.status(404).json({ message: 'Patient not found' });
  }

  patient.medications = medications;
  patient.medicalConditions = medicalConditions;
  await patient.save();

  console.log('Patient data updated successfully:', patient);

  res.json(patient);
};
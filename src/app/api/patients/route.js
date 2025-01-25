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

export async function PUT(req) {
  console.log('Processing patient update request...');
  
  await connectDB();

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      console.log('No email provided');
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { medications, medicalConditions } = body;

    console.log('Updating patient with email:', email);
    console.log('Medications:', medications);
    console.log('Medical Conditions:', medicalConditions);

    const patient = await User.findOne({ email });

    if (!patient) {
      console.log('Patient not found for email:', email);
      return NextResponse.json(
        { message: 'Patient not found' },
        { status: 404 }
      );
    }

    patient.medications = medications;
    patient.medicalConditions = medicalConditions;
    await patient.save();

    console.log('Patient data updated successfully:', patient);
    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error('Error updating patient data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

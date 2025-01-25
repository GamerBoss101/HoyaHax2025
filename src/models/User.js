import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["patient", "caregiver"],
      default: "patient",
    },
    dateOfBirth: {
      type: Date,
    },
    medicalConditions: {
      type: [String],
      default: [],
    },
    medications: {
      type: [
        {
          name: String,
          dosage: String,
          frequency: String,
        },
      ],
      default: [],
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    patients: {
      type: [
        {
          patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          relationship: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model("User", UserSchema);

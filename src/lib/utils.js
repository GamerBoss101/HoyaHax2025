import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  const DATABASE_URL = process.env.MONGO_URI;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
      throw new Error('Error connecting to MongoDB');
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}
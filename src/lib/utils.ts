import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose, { Mongoose } from "mongoose";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: Cached;
}

export async function connectDB(): Promise<Mongoose> {
  const DATABASE_URL = process.env.MONGO_URI as string;

  let cached: Cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
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
  return cached.conn;
}
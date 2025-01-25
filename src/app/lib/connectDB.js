import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGO_URI;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    try {
      cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      throw new Error('Error connecting to MongoDB');
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

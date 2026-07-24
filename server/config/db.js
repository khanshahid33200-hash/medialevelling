import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || (process.env.VERCEL && !uri.startsWith('mongodb'))) {
    console.log('[DB] No remote MONGODB_URI configured. Operating in high-speed memory fallback mode.');
    return;
  }

  try {
    console.log(`[DB] Connecting to MongoDB...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000 // Prevents hanging serverless functions
    });
    console.log(`[DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[DB] Connection Warning: ${error.message}. Continuing with memory fallback.`);
  }
};

export default connectDB;

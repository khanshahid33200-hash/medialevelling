import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/media-levelling-payments';
    console.log(`Connecting to MongoDB...`);
    const conn = await mongoose.connect(connUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Warning: ${error.message}`);
    console.error(`Please make sure MongoDB is running or specify MONGODB_URI in server/.env`);
  }
};

export default connectDB;

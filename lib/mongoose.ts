import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined');
  }

  if (isConnected) {
    return console.log('Using existing MongoDB database connection');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'dev_overflow',
    });

    isConnected = true;

    console.log('MongoDB database connected successfully');
  } catch (error) {
    console.log('error connecting to MongoDB database', error);
  }
};

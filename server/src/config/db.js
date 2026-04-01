import mongoose from 'mongoose';

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected');
    return true;
  } catch (err) {
    console.warn('⚠️  MongoDB connection error:', err.message);
    console.warn('   Continuing in mock mode. Some API features will be limited.');
    return false;
  }
}

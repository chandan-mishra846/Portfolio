import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGODB_URI ? 'Found' : 'Missing');

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB Atlas!');
  
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));
  
  process.exit(0);
} catch (error) {
  console.error('❌ Connection failed:', error.message);
  process.exit(1);
}

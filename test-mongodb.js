// Test MongoDB connection script using Mongoose
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.DATABASE_URL;

async function main() {
  try {
    if (!MONGODB_URI) {
      throw new Error('DATABASE_URL is not set in .env file');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB!');
    
    const User = mongoose.model('User', new mongoose.Schema({}, { collection: 'users', strict: false }));
    const FavoriteSong = mongoose.model('FavoriteSong', new mongoose.Schema({}, { collection: 'favorite_songs', strict: false }));
    
    const userCount = await User.countDocuments();
    console.log(`📊 Total users: ${userCount}`);
    
    const songCount = await FavoriteSong.countDocuments();
    console.log(`🎵 Total favorite songs: ${songCount}`);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. MongoDB is running (local) or MongoDB Atlas is accessible');
    console.error('   2. DATABASE_URL is set correctly in .env file');
    console.error('   3. Your IP is whitelisted (for MongoDB Atlas)');
  } finally {
    await mongoose.disconnect();
  }
}

main()

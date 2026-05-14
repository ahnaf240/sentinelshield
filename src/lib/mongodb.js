import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!uri) {
  console.error('CRITICAL: MONGODB_URI missing from .env.local');
  // এরর থ্রো না করে একটি নাল প্রমিস দিন যাতে সাইট ক্রাশ না করে
  clientPromise = Promise.resolve(null);
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect().catch(err => {
    console.error("Database connection failed:", err);
    return null;
  });
}

export default clientPromise;
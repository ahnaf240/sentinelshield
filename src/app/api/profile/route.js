import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

// প্রোফাইল ডাটা ডাটাবেস থেকে আনার জন্য (GET Request)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sentinel_db");
    
    // ডাটাবেস থেকে প্রথম প্রোফাইলটি খোঁজা হচ্ছে
    const profile = await db.collection("profile").findOne({});

    if (!profile) {
      return NextResponse.json({ 
        name: "Agent (Local)", 
        designation: "Security Expert", 
        status: "Offline",
        bio: "Initialize your profile to start monitoring." 
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Database GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// প্রোফাইল ডাটা আপডেট বা নতুন করে সেভ করার জন্য (POST Request)
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("sentinel_db");
    const data = await request.json();

    // ডাটাবেসে যদি আগে প্রোফাইল থাকে তবে আপডেট করবে, না থাকলে নতুন তৈরি করবে (upsert: true)
    const result = await db.collection("profile").updateOne(
      {}, 
      { 
        $set: {
          name: data.name,
          designation: data.designation,
          status: data.status,
          bio: data.bio,
          updatedAt: new Date()
        } 
      }, 
      { upsert: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Sentinel Identity Updated Successfully" 
    });
  } catch (error) {
    console.error("Database POST Error:", error);
    return NextResponse.json({ error: "Failed to update database" }, { status: 500 });
  }
}
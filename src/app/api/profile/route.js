import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

// ১. ডাটাবেস থেকে তথ্য আনা (GET)
export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ name: "Ahnaf (Local)", role: "Security Expert", status: "Offline" });
    }
    const db = client.db("sentinel_db");
    const profile = await db.collection("profile").findOne({});
    return NextResponse.json(profile || { name: "Ahnaf", role: "Cybersecurity Analyst", status: "Active" });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// ২. ডাটাবেসে তথ্য আপডেট করা (POST)
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("sentinel_db");
    const data = await request.json();

    // ডাটা আপডেট করা (না থাকলে নতুন তৈরি হবে)
    await db.collection("profile").updateOne(
      {}, 
      { $set: data }, 
      { upsert: true }
    );

    return NextResponse.json({ message: "Profile Updated Successfully" });
  } catch (e) {
    return NextResponse.json({ error: "Update Failed" }, { status: 500 });
  }
}
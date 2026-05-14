import { NextResponse } from 'next/server';

export async function GET() {
  // ড্যাশবোর্ডের জন্য প্রয়োজনীয় সব ডাটা একবারে পাঠানো হচ্ছে
  const dashboardData = {
    // ১. সিস্টেম স্ট্যাটাস এবং প্রোটোকল তথ্য
    systemInfo: {
      status: "Operational",
      node: "SENTINEL-MAIN-01",
      version: "v2.4.1",
      uptime: "99.98%",
      encryption: "AES-256-GCM",
      lastSync: new Date().toISOString()
    },

    // ২. স্ট্যাটাস কার্ডের জন্য ডাটা (Stats)
    stats: [
      { id: 1, label: "Total Threats Blocked", value: "2,405,122", change: "+12%", trend: "up" },
      { id: 2, label: "Active Firewall Nodes", value: "142", change: "Stable", trend: "neutral" },
      { id: 3, label: "Detection Rate", value: "99.9%", change: "+0.2%", trend: "up" },
      { id: 4, label: "Dark Web Alerts", value: "12", change: "-5%", trend: "down" }
    ],

    // ৩. লাইভ ইন্ট্রুশন লগের ডাটা (IntrusionTracker এর জন্য)
    intrusionLogs: [
      { id: "log-1", ip: "192.168.1.45", location: "Local Network", status: "Blocked", time: "10:45 AM", method: "Brute Force" },
      { id: "log-2", ip: "45.22.11.90", location: "Moscow, RU", status: "Isolated", time: "10:42 AM", method: "SQL Injection" },
      { id: "log-3", ip: "103.45.2.14", location: "Beijing, CN", status: "Blocked", time: "10:35 AM", method: "XSS Attempt" },
      { id: "log-4", ip: "172.16.0.12", location: "Unknown", status: "Logged", time: "10:30 AM", method: "DDoS Simulation" }
    ],

    // ৪. থ্রেট লেভেল অ্যানালাইসিস (যদি চার্ট বানাতে চাও)
    threatAnalysis: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [120, 450, 300, 900, 600, 200, 150]
    },

    // ৫. সিকিউরিটি নিউজ বা অ্যালার্ট
    alerts: [
      { id: "alt-1", message: "Critical Patch available for OpenSSL", severity: "High" },
      { id: "alt-2", message: "New login detected from unusual IP", severity: "Medium" }
    ]
  };

  // ডাটা রিটার্ন করা হচ্ছে
  return NextResponse.json(dashboardData);
}
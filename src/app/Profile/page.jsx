"use client";

import { useState, useEffect } from "react";
import { Shield, Save, Loader2, User, Activity } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    status: "Active",
    bio: ""
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data) setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) alert("Sentinel Database Updated!");
    } catch (error) {
      alert("Error saving profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-950 text-white"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-900/20">
            <Shield size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Sentinel Profile Control</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Agent Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Designation</label>
            <input type="text" value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})} 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Security Status</label>
            <select value={profile.status} onChange={(e) => setProfile({...profile, status: e.target.value})}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="Active">Active</option>
              <option value="Offline">Offline</option>
              <option value="Encrypted">Encrypted</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mission Bio</label>
            <textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 mt-1 h-24 resize-none outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <button onClick={handleSave} disabled={isSaving} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Update Identity
          </button>
        </div>
      </div>
    </div>
  );
}
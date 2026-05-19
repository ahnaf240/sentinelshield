"use client";

import React, { useState, useEffect } from "react";
import { User, Shield, Mail, Briefcase, Save, Loader2, RefreshCcw, Terminal } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    designation: "Security Analyst",
    status: "Online",
    bio: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data from MongoDB
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data && !data.error) {
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setIsLoading(false);
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
      if (res.ok) {
        alert("Identity Updated in Sentinel Database!");
      }
    } catch (err) {
      alert("Update Failed!");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-2xl bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl animate-in fade-in zoom-in duration-500">
          
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <Shield className="text-blue-400" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sentinel Profile Control</h1>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Authorized Access Only</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Agent Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <User size={14} /> Agent Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Enter Agent Name"
              />
            </div>

            {/* Designation & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                  <Briefcase size={14} /> Designation
                </label>
                <input
                  type="text"
                  value={profile.designation}
                  onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                  <RefreshCcw size={14} /> Security Status
                </label>
                <select
                  value={profile.status}
                  onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="Online">Online / Active</option>
                  <option value="Offline">Offline / Stealth</option>
                  <option value="Away">Away / On Mission</option>
                </select>
              </div>
            </div>

            {/* Mission Bio */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Terminal size={14} /> Mission Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                placeholder="Briefly describe your expertise..."
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Updating Identity...
                </>
              ) : (
                <>
                  <Save size={20} /> Update Identity
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
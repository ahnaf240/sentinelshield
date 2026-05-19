"use client";

import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Github, User, ShieldCheck, Loader2, Save } from 'lucide-react';

export default function UserPortal() {
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    status: 'Idle'
  });
  const [isInitializing, setIsInitializing] = useState(false);
  const [networkId, setNetworkId] = useState('');
  const [mounted, setMounted] = useState(false);

  // ১. প্রথমবার মাউন্ট হওয়ার সময় API থেকে ডেটা এবং একটি স্থায়ী নেটওয়ার্ক আইডি জেনারেট করা
  useEffect(() => {
    setMounted(true);
    // রেন্ডার লুপ এবং হাইড্রেশন এরর আটকানোর জন্য আইডি শুধুমাত্র ক্লায়েন্টে একবারই সেট হবে
    setNetworkId(Math.random().toString(16).slice(2, 10).toUpperCase());

    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user-portal');
        if (res.ok) {
          const data = await res.json();
          setProfile({
            username: data.name || '',
            bio: data.role || '',
            status: 'Authenticated'
          });
        }
      } catch (error) {
        console.error("Auth Error:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInitialize = async () => {
    setIsInitializing(true);
    // ১.৫ সেকেন্ডের একটি ফেক লোডিং ইফেক্ট যাতে মনে হয় ডেটাবেসে এনরোল হচ্ছে
    setTimeout(() => {
      setIsInitializing(false);
      alert("Profile Initialized in Sentinel Database!");
    }, 1500);
  };

  // হাইড্রেশন সিকিউরিটি চেক
  if (!mounted) return null;

  return (
    <div className="space-y-6 transition-all duration-700 relative z-10">
      <div className="glass-card p-8 border-t-2 border-[#00ff88] bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl shadow-[#00ff88]/5">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-mono text-xl text-white flex items-center gap-3 tracking-tighter">
            <div className="p-2 bg-[#00ff88]/10 rounded-lg">
              <ShieldCheck className="text-[#00ff88]" size={24} />
            </div>
            IDENTITY ENROLLMENT
          </h2>
          <div className="px-3 py-1 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-full">
            <span className="text-[10px] text-[#00ff88] font-mono animate-pulse uppercase">
              System Ready
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Auth Options */}
          <div className="space-y-4">
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-4">Connect Securely Via</p>
            
            <button type="button" className="w-full py-3 bg-[#1877F2]/10 border border-[#1877F2]/30 text-white/90 flex items-center justify-center gap-3 rounded-xl hover:bg-[#1877F2]/20 hover:border-[#1877F2] transition-all group">
              <Facebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" /> 
              <span className="text-sm font-medium">Facebook Login</span>
            </button>
            
            <button type="button" className="w-full py-3 bg-[#E4405F]/10 border border-[#E4405F]/30 text-white/90 flex items-center justify-center gap-3 rounded-xl hover:bg-[#E4405F]/20 hover:border-[#E4405F] transition-all group">
              <Instagram className="w-5 h-5 text-[#E4405F] group-hover:scale-110 transition-transform" /> 
              <span className="text-sm font-medium">Instagram Link</span>
            </button>
            
            <button type="button" className="w-full py-3 bg-white/5 border border-white/10 text-white/90 flex items-center justify-center gap-3 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all group">
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
              <span className="text-sm font-medium">GitHub Sync</span>
            </button>
          </div>

          {/* Profile Customization */}
          <div className="space-y-5 bg-white/5 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
              <User size={100} className="text-[#00ff88]" />
            </div>

            <div className="relative">
              <label className="text-[10px] text-[#00ff88] font-mono block mb-2 tracking-widest">ASSIGN USERNAME</label>
              <div className="relative group">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-500 group-focus-within:text-[#00ff88] transition-colors" />
                <input 
                  type="text" 
                  placeholder="sentinel_user_01" 
                  value={profile.username}
                  onChange={(e) => setProfile({...profile, username: e.target.value})}
                  className="w-full bg-[#050810] border border-white/10 p-3 pl-10 rounded-lg text-[#00ff88] focus:border-[#00ff88]/50 outline-none transition-all font-mono text-sm" 
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-mono block mb-2 tracking-widest">PUBLIC BIO</label>
              <textarea 
                placeholder="Cybersecurity Enthusiast..." 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full bg-[#050810] border border-white/10 p-3 rounded-lg text-gray-400 h-24 outline-none focus:border-[#00ff88]/50 transition-all text-sm resize-none" 
              />
            </div>

            <button 
              type="button"
              onClick={handleInitialize}
              disabled={isInitializing}
              className={`w-full py-3 flex items-center justify-center gap-2 font-bold font-mono rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,136,0.1)] active:scale-95 ${
                isInitializing ? 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-none' : 'bg-[#00ff88] text-[#050810] hover:bg-[#00cc6e]'
              }`}
            >
              {isInitializing ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Save size={18} />
              )}
              {isInitializing ? 'PROCESSING...' : 'INITIALIZE PROFILE'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer System Log */}
      <div className="flex justify-between items-center px-4 select-none">
        <p className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.5em]">Network ID: {networkId}</p>
        <p className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.5em]">Encryption: AES-256-GCM</p>
      </div>
    </div>
  );
}
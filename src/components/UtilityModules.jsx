import React from 'react';

// --- Named Export: LiveStatusBar ---
// এটি ড্যাশবোর্ডের উপরে একটি রিয়েল-টাইম স্ক্যানিং এফেক্ট দেখাবে
export const LiveStatusBar = () => (
  <div className="w-full bg-slate-900/50 border-t border-slate-800 h-10 flex items-center px-4 text-[10px] font-mono text-blue-400">
    <div className="animate-pulse mr-2 text-green-500">●</div> 
    <span className="uppercase tracking-widest">
      System Scanning: /usr/bin/security_core... 78%
    </span>
  </div>
);

// --- Named Export: UserProfile ---
// এটি আপনার প্রোফাইল কার্ড যা ড্যাশবোর্ডে অ্যাডমিন স্ট্যাটাস দেখাবে
export const UserProfile = () => (
  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-4 backdrop-blur-sm hover:border-blue-500/30 transition-all group">
    <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
      A
    </div>
    <div>
      <p className="text-sm font-bold text-slate-100 font-sans">Admin: Sentinel_User</p>
      <p className="text-[10px] text-blue-500 font-mono uppercase tracking-tighter">
        Rank: Security Specialist
      </p>
    </div>
  </div>
);

// --- Default Export ---
// এটি যোগ করার ফলে Modules.jsx থেকে ইমপোর্ট করার সময় আর কোনো এরর আসবে না
const UtilityModules = {
  LiveStatusBar,
  UserProfile
};

export default UtilityModules;
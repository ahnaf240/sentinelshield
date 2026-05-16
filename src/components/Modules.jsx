"use client";

import React from 'react';
import { Shield, Lock, Terminal, Eye, Zap, Database, Globe, Cpu } from 'lucide-react';

// --- ১. কোর এবং ইউজার ইন্টারফেস মডিউলস ---
export { default as AIChatbot } from './AIChatbot';
export { default as AttackMap } from './AttackMap';
export { default as BreachMonitor } from './BreachMonitor';
export { default as Dashboard } from './Dashboard';
export { default as HeroSection } from './HeroSection';
export { default as Navbar } from './Navbar';
export { default as NewsFeed } from './NewsFeed';

// --- ২. সিকিউরিটি এবং থ্রেট অ্যানালাইসিস মডিউলস ---
export { default as IntrusionTracker } from './IntrusionTracker';
export { default as LinkShield } from './LinkShield';
export { default as NetworkMapper } from './NetworkMapper';
export { default as PasswordVault } from './PasswordVault';
export { default as PhishGuard } from './PhishGuard';
export { default as PrivacyAudit } from './PrivacyAudit';
export { default as ThreatScanner } from './ThreatScanner';
export { default as VPNDashboard } from './VPNDashboard';

// --- ৩. এডভান্সড ফিচারসমূহ ---
export { default as ReportStorage } from './ReportStorage';
export { default as SafeBanking } from './SafeBanking';
export { default as SocialSafety } from './SocialSafety';

// --- ৪. ডিফল্ট এক্সপোর্ট (যা ড্যাশবোর্ডে সব ফিচার দেখাবে) ---
const Modules = () => {
  const features = [
    { name: "Live Attack Map", icon: <Globe size={18} />, status: "Monitoring" },
    { name: "Intrusion Detection", icon: <Zap size={18} />, status: "Active" },
    { name: "Encryption Vault", icon: <Lock size={18} />, status: "Secure" },
    { name: "Neural Network", icon: <Cpu size={18} />, status: "Optimized" }
  ];

  return (
    <div className="mt-10 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="flex items-center gap-3 px-2">
        <Shield className="text-blue-500" size={24} />
        <h2 className="text-2xl font-bold tracking-tight text-white">Sentinel Core Features</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, index) => (
          <div key={index} className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-blue-500/50 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-tighter">
                {f.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-200">{f.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modules;
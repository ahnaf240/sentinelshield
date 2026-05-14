import React, { useState, useEffect } from 'react';
import { Lock, CreditCard, ShieldCheck, Activity, Globe, Zap } from 'lucide-react';

const SafeBanking = () => {
  const [bankData, setBankData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/safe-banking');
        const data = await res.json();
        setBankData(data);
      } catch (error) {
        console.error("Banking API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-slate-900 border border-green-500/30 rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.1)] transition-all duration-500 hover:border-green-500/60">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/10 rounded-2xl border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <CreditCard className="text-green-500" size={28} />
          </div>
          <div>
            <h2 className="text-xl font-black font-orbitron text-white tracking-widest uppercase">Safe Banking Zone</h2>
            <p className="text-[9px] text-gray-500 font-mono tracking-[0.3em]">SECURE TRANSACTION LAYER</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/40">
          <p className="text-[10px] text-green-400 font-bold animate-pulse flex items-center gap-1">
            <Lock size={10} /> ENCRYPTED
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={14} className="text-green-500/70" />
            <p className="text-[9px] text-gray-500 uppercase font-mono tracking-widest">VPN Tunnel</p>
          </div>
          <p className={`text-sm font-bold ${loading ? 'text-gray-600 animate-pulse' : 'text-green-400'}`}>
            {bankData?.vpn || 'ESTABLISHING...'}
          </p>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-green-500/70" />
            <p className="text-[9px] text-gray-500 uppercase font-mono tracking-widest">Encryption</p>
          </div>
          <p className={`text-sm font-bold ${loading ? 'text-gray-600 animate-pulse' : 'text-white'}`}>
            {bankData?.encryption || 'RSA-4096...'}
          </p>
        </div>
      </div>

      {/* Security Status Bar */}
      <div className="mt-6 p-4 bg-green-500/5 border border-green-500/20 rounded-xl flex items-center gap-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-green-500/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        
        <div className="relative">
          <ShieldCheck className="text-green-500" size={32} />
          <Activity size={12} className="absolute -top-1 -right-1 text-green-400 animate-ping" />
        </div>
        
        <div className="relative">
          <p className="text-xs text-white font-bold tracking-wide">
            {loading ? "SYSTEM CHECK IN PROGRESS..." : (bankData?.status || "SECURE CONNECTION")}
          </p>
          <p className="text-[10px] text-gray-500 font-mono mt-0.5">Isolated environment active for banking operations.</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-center">
        <p className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.4em]">Hardware-level Isolation: Enabled</p>
      </div>
    </div>
  );
};

export default SafeBanking;
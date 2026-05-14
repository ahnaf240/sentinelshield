import React, { useState, useEffect } from 'react';
import { Globe, ShieldCheck, Power, Activity, ArrowDownUp, ShieldAlert, Cpu } from 'lucide-react';

const VPNDashboard = () => {
  const [connected, setConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [uptime, setUptime] = useState(0);

  // কানেক্টেড অবস্থায় টাইমার চালানো
  useEffect(() => {
    let interval;
    if (connected) {
      interval = setInterval(() => {
        setUptime((prev) => prev + 1);
      }, 1000);
    } else {
      setUptime(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [connected]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => {
    if (!connected) {
      setIsConnecting(true);
      // ১.৫ সেকেন্ডের একটা ফেক হ্যান্ডশেক অ্যানিমেশন
      setTimeout(() => {
        setIsConnecting(false);
        setConnected(true);
      }, 1500);
    } else {
      setConnected(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-green-500/30 text-white shadow-2xl shadow-green-500/5 relative overflow-hidden group">
      
      {/* Background Decorative Element */}
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <ShieldCheck size={150} className="text-green-500" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${connected ? 'bg-green-500/20' : 'bg-slate-800'}`}>
            <Globe className={connected ? 'text-green-400' : 'text-slate-500'} size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold font-orbitron tracking-tight">VIRTUAL TUNNEL</h2>
            <p className="text-[10px] text-green-400/60 font-mono uppercase tracking-[0.2em]">Secure Node: Tokyo_V41</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={`h-2 w-8 rounded-full transition-all duration-500 ${connected ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-slate-700'}`}></div>
          <span className="text-[9px] mt-1 font-mono text-slate-500 uppercase">{connected ? 'Encrypted' : 'Unprotected'}</span>
        </div>
      </div>

      {/* Power Button Section */}
      <div className="text-center mb-8 relative">
        <div className="inline-block relative">
          <button 
            onClick={handleToggle}
            disabled={isConnecting}
            className={`relative z-10 p-8 rounded-full border-2 transition-all duration-500 group active:scale-95 ${
              connected 
              ? 'border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.2)]' 
              : 'border-slate-700 hover:border-green-500/40 bg-transparent'
            }`}
          >
            {isConnecting ? (
              <Activity size={40} className="text-green-400 animate-pulse" />
            ) : (
              <Power size={40} className={`transition-colors duration-500 ${connected ? 'text-green-500' : 'text-slate-700 group-hover:text-green-500/50'}`} />
            )}
          </button>
          
          {/* Animated Ring during connection */}
          {isConnecting && (
            <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-50"></div>
          )}
        </div>
        <p className={`mt-4 text-xs font-mono tracking-widest transition-colors ${connected ? 'text-green-400' : 'text-slate-500'}`}>
          {isConnecting ? 'ESTABLISHING HANDSHAKE...' : connected ? `SESSION ACTIVE: ${formatTime(uptime)}` : 'READY TO SECURE'}
        </p>
      </div>

      {/* Network Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownUp size={12} className="text-blue-400" />
            <span className="text-[9px] text-slate-500 font-mono uppercase">Bandwidth</span>
          </div>
          <p className="text-sm font-bold font-mono">{connected ? '42.5 MB/s' : '0.00 MB/s'}</p>
        </div>
        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={12} className="text-purple-400" />
            <span className="text-[9px] text-slate-500 font-mono uppercase">CPU Load</span>
          </div>
          <p className="text-sm font-bold font-mono">{connected ? '14%' : '2%'}</p>
        </div>
      </div>

      {/* Connection Info */}
      <div className="bg-black/20 p-4 rounded-lg space-y-3 border border-white/5">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-500 font-mono uppercase">Virtual IP Address</span>
          <span className={`font-mono ${connected ? 'text-green-400' : 'text-slate-600'}`}>
            {connected ? '108.162.192.1' : 'NON_SECURE_MODE'}
          </span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-500 font-mono uppercase">Encryption Standard</span>
          <span className="text-green-400 font-mono">XCHACHA20-POLY1305</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-500 font-mono uppercase">Protocol</span>
          <span className="text-green-400 font-mono">WireGuard v2</span>
        </div>
      </div>

      {/* Warning Footer (Only if disconnected) */}
      {!connected && !isConnecting && (
        <div className="mt-4 flex items-center gap-2 justify-center py-1 bg-red-500/10 rounded border border-red-500/20">
          <ShieldAlert size={12} className="text-red-500" />
          <span className="text-[9px] text-red-500 font-mono uppercase animate-pulse">Your IP is currently exposed</span>
        </div>
      )}
    </div>
  );
};

export default VPNDashboard;
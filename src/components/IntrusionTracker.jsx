'use client';
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Terminal, Activity, Zap, RefreshCw } from 'lucide-react';

const IntrusionTracker = () => {
  const [intrusions, setIntrusions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  // এপিআই থেকে ডাটা নিয়ে আসার ফাংশন
  const fetchLogs = async () => {
    try {
      // তোমার দেওয়া এপিআই রুট অনুযায়ী ফেচ করা হচ্ছে
      const res = await fetch('/api/intrusion-logs'); 
      const data = await res.json();
      
      // নতুন ডাটাকে আগের ডাটার সাথে মিলিয়ে আপডেট করা
      setIntrusions(data);
      setLoading(false);
    } catch (error) {
      console.error("Connection Error: Unable to reach secure node", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // লাইভ রিফ্রেশ ইন্টারভাল (৫ সেকেন্ড পর পর)
    const interval = setInterval(() => {
      if (isLive) fetchLogs();
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="p-6 bg-[#0a0f1e] text-white rounded-xl border border-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.1)] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[size:15px_15px] bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)]"></div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
            <ShieldAlert size={20} className="text-red-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-black font-orbitron tracking-tighter text-red-500">
              INTRUSION LOGS
            </h2>
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              Threat Detection: <span className="text-green-500">Active</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md font-mono text-[10px] transition-all border ${
              isLive 
              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
              : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`}></div>
            {isLive ? 'LIVE FEED' : 'PAUSED'}
          </button>
          
          <button 
            onClick={fetchLogs}
            className="p-1.5 hover:bg-white/5 rounded border border-white/5 transition-all"
          >
            <RefreshCw size={14} className={`text-slate-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Logs Table Headers */}
      <div className="grid grid-cols-12 px-4 py-2 mb-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-white/5">
        <div className="col-span-4">Source IP</div>
        <div className="col-span-3 text-center">Location</div>
        <div className="col-span-3 text-center">Status</div>
        <div className="col-span-2 text-right">Time</div>
      </div>

      {/* Main Logs List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar relative z-10">
        {loading && intrusions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <Activity size={40} className="animate-pulse mb-2" />
            <p className="font-mono text-xs uppercase">Initializing Scan...</p>
          </div>
        ) : (
          intrusions.map((log) => (
            <div 
              key={log.id} 
              className="grid grid-cols-12 items-center px-4 py-3 bg-white/5 border border-white/5 rounded-lg hover:border-red-500/30 hover:bg-red-500/5 transition-all group"
            >
              {/* IP & Indicator */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-red-600 rounded-full group-hover:shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all"></div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold text-slate-200 group-hover:text-red-400 transition-colors">
                    {log.ip}
                  </span>
                  <span className="text-[8px] text-slate-500 font-mono">PORT: 443</span>
                </div>
              </div>

              {/* Location */}
              <div className="col-span-3 text-center">
                <span className="px-2 py-1 rounded bg-slate-800/50 text-[10px] font-mono text-slate-400">
                  {log.location}
                </span>
              </div>

              {/* Status Badge */}
              <div className="col-span-3 flex justify-center">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-red-500/20 bg-red-500/5">
                  <Zap size={10} className="text-red-500" />
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">
                    {log.status}
                  </span>
                </div>
              </div>

              {/* Time Stamp */}
              <div className="col-span-2 text-right">
                <span className="text-[10px] font-mono text-slate-500">
                  {log.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer / Console Output */}
      <div className="mt-6 p-3 bg-black/40 rounded-lg border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal size={12} className="text-slate-600" />
          <p className="text-[10px] font-mono text-slate-500 italic">
            $ journalctl -u sentinel-shield.service --live
          </p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
             <span className="text-[9px] font-mono text-slate-500">CRITICAL: 0</span>
           </div>
           <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
             <span className="text-[9px] font-mono text-slate-500">SECURE: OK</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IntrusionTracker;
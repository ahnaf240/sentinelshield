import React, { useState, useEffect } from 'react';
import { Crosshair, ShieldX, Terminal } from 'lucide-react';

const AttackMap = () => {
  const [logs, setLogs] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // এপিআই থেকে ডাটা নিয়ে আসা
  const fetchLogs = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/attack-map');
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error("Link Failure:", error);
    }
    setTimeout(() => setIsSyncing(false), 800);
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // প্রতি ৫ সেকেন্ডে আপডেট হবে
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-black text-green-500 rounded-xl border border-red-900 shadow-[0_0_20px_rgba(153,27,27,0.2)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center font-orbitron tracking-tighter">
          <span className="relative flex h-3 w-3 mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          LIVE INTRUSION MAP
        </h2>
        <div className="flex items-center gap-2">
          <Terminal size={14} className={isSyncing ? "animate-pulse text-green-400" : "text-slate-700"} />
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            {isSyncing ? 'Syncing...' : 'Encrypted Link'}
          </span>
        </div>
      </div>

      {/* Map Visualization Area */}
      <div className="h-56 bg-[#020617] rounded-lg relative overflow-hidden flex flex-col items-center justify-center border border-slate-800 group">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <p className="text-[10px] opacity-30 font-mono z-10">CORE_STATION_ALPHA: ACTIVE</p>
        
        {/* Dynamic Overlays from API */}
        {logs.map((log, index) => (
          <div 
            key={log.id}
            className={`absolute transition-all duration-1000 p-1 border rounded text-[9px] font-mono whitespace-nowrap bg-black/60 backdrop-blur-sm ${
              index % 2 === 0 ? 'animate-bounce' : ''
            }`}
            style={{
              top: `${20 + (index * 25)}%`,
              left: index % 2 === 0 ? '10%' : '50%',
              borderColor: log.severity === 'High' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'
            }}
          >
            <span className={log.severity === 'High' ? 'text-red-400' : 'text-blue-400'}>
              {log.severity === 'High' ? '⚠️ INBOUND: ' : '🛡️ BLOCKED: '}
            </span>
            {log.source} ({log.type}) {'->'} {log.target}
          </div>
        ))}

        <Crosshair className="absolute text-red-900/20 w-40 h-40" />
      </div>

      {/* Legend / Status Info */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-red-950/20 p-2 rounded border border-red-900/30 text-center">
          <p className="text-[8px] text-red-500 uppercase font-bold">Critical</p>
          <p className="text-xs font-mono">03</p>
        </div>
        <div className="bg-green-950/20 p-2 rounded border border-green-900/30 text-center">
          <p className="text-[8px] text-green-500 uppercase font-bold">Deflected</p>
          <p className="text-xs font-mono">142</p>
        </div>
        <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
          <p className="text-[8px] text-slate-500 uppercase font-bold">Threat Level</p>
          <p className="text-xs font-mono text-yellow-500">Elevated</p>
        </div>
      </div>
    </div>
  );
};

export default AttackMap;
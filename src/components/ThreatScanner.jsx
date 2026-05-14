import React, { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCw, Search, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';

const ThreatScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [foundThreats, setFoundThreats] = useState([]);
  const [currentProcess, setCurrentProcess] = useState('');

  const potentialThreats = [
    "Unauthorized Root Access Attempt",
    "Brute Force Pattern Detected",
    "Suspicious Repository Found",
    "Weak SSH Configuration",
    "Hidden Malicious Script in /tmp",
    "Port 445 (SMB) Exposure"
  ];

  const startScan = () => {
    setIsScanning(true);
    setFoundThreats([]);
    setScanProgress(0);
    
    // সিমুলেটেড স্ক্যানিং প্রসেস
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      
      if (progress >= 100) {
        setScanProgress(100);
        setIsScanning(false);
        clearInterval(interval);
        // স্ক্যান শেষে ১-২টি র‍্যান্ডম থ্রেট দেখানো
        setFoundThreats(potentialThreats.sort(() => 0.5 - Math.random()).slice(0, 2));
      } else {
        setScanProgress(progress);
        setCurrentProcess(`Checking: ${Math.random().toString(36).substring(7)}.so...`);
      }
    }, 600);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all duration-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isScanning ? 'bg-red-500/20 animate-pulse' : 'bg-red-500/10'}`}>
            <ShieldAlert className="text-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-orbitron tracking-tight">Sentinel Threat Scanner</h2>
            <p className="text-[9px] text-red-400/60 font-mono tracking-widest uppercase">System Vulnerability Engine</p>
          </div>
        </div>
        <Terminal size={18} className="text-gray-600" />
      </div>

      {/* Scan Display Area */}
      <div className="bg-black/40 p-5 rounded-lg border border-red-500/10 mb-6 min-h-[140px] flex flex-col justify-center">
        {isScanning ? (
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <p className="text-[10px] text-red-400 font-mono animate-pulse uppercase">{currentProcess}</p>
              <p className="text-xl font-black font-orbitron text-white">{scanProgress}%</p>
            </div>
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        ) : foundThreats.length > 0 ? (
          <div className="space-y-2">
            {foundThreats.map((threat, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-red-500/5 border border-red-500/20 rounded animate-in zoom-in-95">
                <AlertTriangle size={14} className="text-red-500" />
                <span className="text-xs text-red-200/90 font-mono">{threat}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle2 size={32} className="mx-auto text-green-500/50 mb-2" />
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">System Status: Secure</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button 
        onClick={startScan}
        disabled={isScanning}
        className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all font-orbitron text-xs tracking-widest ${
          isScanning 
            ? 'bg-slate-800 text-gray-500 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 active:scale-95'
        }`}
      >
        {isScanning ? (
          <RefreshCw size={18} className="animate-spin" />
        ) : (
          <Search size={18} />
        )}
        {isScanning ? "INITIALIZING DEEP SCAN..." : "RUN FULL SYSTEM AUDIT"}
      </button>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.2em]">Database: v4.2.1-Kali</p>
        <p className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.2em]">Heuristics: Active</p>
      </div>
    </div>
  );
};

export default ThreatScanner;
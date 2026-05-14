import React, { useState } from 'react';
import { Network, Globe, ShieldCheck, Loader2 } from 'lucide-react';

const NetworkMapper = () => {
  const [target, setTarget] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!target) return alert("Please enter a domain or IP address!");

    setLoading(true);
    setScanResult(null);

    try {
      const response = await fetch('/api/network-mapper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: target }),
      });

      const data = await response.json();
      setScanResult(data);
    } catch (error) {
      alert("Network scan failed. Check your connection!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-blue-500/20 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <Network className="text-blue-500" />
        <h2 className="text-xl font-bold font-orbitron uppercase tracking-widest text-blue-300">Network & Port Mapper</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input 
          type="text" 
          placeholder="Enter target (e.g. google.com)" 
          className="flex-1 bg-[#0a0f1a] border border-blue-500/20 p-3 rounded-lg text-sm font-mono outline-none focus:border-blue-500/50"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button 
          onClick={handleScan} 
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe size={18} />}
          {loading ? 'MAPPING...' : 'START SCAN'}
        </button>
      </div>

      {scanResult && (
        <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
          {/* Target Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-[10px] text-blue-400 font-mono uppercase">Target IP:</p>
              <p className="text-sm font-bold text-slate-200">{scanResult.ip}</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <p className="text-[10px] text-emerald-400 font-mono uppercase">WAF/Security:</p>
              <p className="text-sm font-bold text-slate-200">{scanResult.waf}</p>
            </div>
          </div>

          {/* Ports List */}
          <div className="mt-4">
            <p className="text-[10px] text-gray-500 font-mono mb-2 uppercase">Active Ports & Services:</p>
            <div className="space-y-2">
              {scanResult.ports.map((port, i) => (
                <div key={i} className="flex justify-between items-center bg-black/30 p-3 rounded border border-white/5 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-blue-500" />
                    <span className="text-xs font-mono">{port}</span>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-bold uppercase">Open</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkMapper;
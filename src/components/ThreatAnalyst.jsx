import React, { useState } from 'react';
import { FileWarning, HardDrive, Search, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function ThreatAnalyst() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const startAnalysis = async () => {
    if (!file) return alert("Please select a file first!");

    setLoading(true);
    setScanResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/threat-analyst', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setScanResult(data);
    } catch (error) {
      alert("Analysis failed. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Malware Shield (Dynamic Section) */}
      <div className="glass-card p-6 border-l-4 border-[#ff3366] animate-in fade-in duration-700">
        <div className="flex items-center gap-3 mb-6">
          <FileWarning className="text-[#ff3366]" />
          <h3 className="font-orbitron text-lg text-white">MALWARE SHIELD</h3>
        </div>
        
        <p className="text-[10px] text-gray-500 font-mono mb-4 uppercase">Inspect Files for malicious payloads</p>
        
        <div className="space-y-4">
          {/* File Input */}
          <div className="relative border-2 border-dashed border-white/10 p-6 text-center rounded-xl hover:border-[#ff336650] transition-all cursor-pointer group">
            <input 
              type="file" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-gray-500 text-xs font-mono group-hover:text-[#ff3366] transition-colors">
              {file ? `SELECTED: ${file.name}` : "Drop File to Analyze (MAX 32MB)"}
            </p>
          </div>

          <button 
            onClick={startAnalysis}
            disabled={loading}
            className={`w-full py-3 border font-bold text-xs font-orbitron transition-all flex items-center justify-center gap-2 ${
              loading 
              ? 'bg-gray-800 border-gray-700 text-gray-500' 
              : 'bg-[#ff336620] border-[#ff3366] text-[#ff3366] hover:bg-[#ff3366] hover:text-white'
            }`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'ANALYZING THREATS...' : 'START DEEP ANALYSIS'}
          </button>

          {/* Analysis Result Display */}
          {scanResult && (
            <div className={`p-4 rounded-lg border mt-4 animate-in zoom-in duration-300 ${
              scanResult.threatLevel === 'HIGH' ? 'bg-red-500/10 border-red-500/50' : 'bg-green-500/10 border-green-500/50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-gray-400">THREAT LEVEL:</span>
                <span className={`text-xs font-bold ${scanResult.threatLevel === 'HIGH' ? 'text-red-500' : 'text-green-400'}`}>
                  {scanResult.threatLevel}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 italic">"{scanResult.analysis}"</p>
              <div className="mt-2 text-[9px] text-gray-500 font-mono">
                SIZE: {scanResult.fileSize} | FILE: {scanResult.fileName}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Device Auditor (Static Mock for now) */}
      <div className="glass-card p-6 border-l-4 border-[#00d4ff]">
        <div className="flex items-center gap-3 mb-6">
          <HardDrive className="text-[#00d4ff]" />
          <h3 className="font-orbitron text-lg text-white">DEVICE AUDITOR</h3>
        </div>
        <div className="space-y-4">
          <div className="p-3 bg-[#00d4ff05] border border-[#00d4ff20] rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-gray-400 tracking-tighter">CAMERA ACCESS:</span>
              <span className="text-[10px] text-[#00ff88]">SECURE</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full"><div className="w-full bg-[#00ff88] h-full rounded-full" /></div>
          </div>
          <div className="p-3 bg-[#ffaa0005] border border-[#ffaa0020] rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-gray-400 tracking-tighter">HIDDEN TRACKERS:</span>
              <span className="text-[10px] text-[#ffaa00]">2 DETECTED</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full"><div className="w-[40%] bg-[#ffaa00] h-full rounded-full" /></div>
          </div>
          <button className="w-full py-3 bg-[#00d4ff20] border border-[#00d4ff] text-[#00d4ff] font-bold text-xs font-orbitron hover:bg-[#00d4ff] hover:text-white transition-all">
            AUDIT PERMISSIONS
          </button>
        </div>
      </div>
    </div>
  );
}
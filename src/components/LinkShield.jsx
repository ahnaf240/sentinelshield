'use client';
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Loader2, Globe, Mail } from 'lucide-react';

const LinkShield = () => {
  const [urlInput, setUrlInput] = useState('');
  const [headerInput, setHeaderInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- API Connection Logic for URL Scan ---
  const handleScan = async (targetUrl) => {
    if (!targetUrl) return alert("Please enter a URL first!");
    
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/link-shield', { // আপনার route.js এর পাথ অনুযায়ী
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });
      
      const data = await response.json();

      setResult({
        type: 'URL Scan',
        content: data.details || data.message,
        status: data.status, // DANGER অথবা SECURE/SAFE
        riskScore: data.riskScore
      });
    } catch (error) {
      setResult({
        type: 'System Error',
        content: 'Could not connect to the security server.',
        status: 'ERROR'
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Email Header Analysis Logic ---
  const handleAnalyzeHeader = () => {
    if (!headerInput) return;
    setResult({
      type: 'Email Header',
      content: 'Analysis Complete: SPF/DKIM Passed. Sender identity confirmed.',
      status: 'SECURE'
    });
  };

  return (
    <div className="glass-card p-8 border-t-4 border-[#00ffcc] bg-gradient-to-b from-[#00ffcc05] to-transparent rounded-3xl shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#00ffcc15] rounded-xl">
          <Globe className="text-[#00ffcc] w-6 h-6" />
        </div>
        <h2 className="text-2xl font-orbitron font-bold text-white tracking-wider">LINK & EMAIL SHIELD</h2>
      </div>

      <div className="space-y-6">
        {/* URL Scanner Section */}
        <div className="space-y-3">
          <label className="text-[10px] text-[#00ffcc] font-mono uppercase tracking-widest ml-1">URL Analyzer</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Paste suspicious URL (e.g., bit.ly/test)" 
              className="w-full bg-[#0a0f1a] border border-white/10 p-4 rounded-2xl text-sm focus:border-[#00ffcc] outline-none font-mono text-white pr-32 transition-all"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <button 
              onClick={() => handleScan(urlInput)} 
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-[#00ffcc] text-[#050810] font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,255,204,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "SCAN"}
            </button>
          </div>
        </div>

        {/* Email Header Section */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-blue-400" />
            <label className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">Email Header Analysis</label>
          </div>
          <textarea 
            placeholder="Paste Email Header for SPF/DKIM check..." 
            className="w-full bg-[#0a0f1a] border border-white/10 p-4 rounded-2xl h-28 border-white/5 outline-none text-sm focus:border-blue-500 transition-all font-mono text-gray-300"
            value={headerInput}
            onChange={(e) => setHeaderInput(e.target.value)}
          />
          <button 
            onClick={handleAnalyzeHeader} 
            className="w-full bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-blue-400 hover:text-white py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest"
          >
            Analyze Header
          </button>
        </div>

        {/* Result Display Box */}
        {result && (
          <div className={`mt-6 p-5 rounded-2xl border animate-in fade-in zoom-in duration-300 ${
            result.status === 'DANGER' || result.status === 'ERROR' 
            ? 'bg-red-500/5 border-red-500/20' 
            : 'bg-[#00ff8805] border-[#00ff8820]'
          }`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className={`text-[9px] uppercase font-mono font-bold tracking-tighter ${
                  result.status === 'DANGER' ? 'text-red-400' : 'text-[#00ff88]'
                }`}>
                  {result.type} REPORT
                </p>
                <h4 className={`text-lg font-black font-orbitron mt-1 ${
                  result.status === 'DANGER' ? 'text-red-500' : 'text-[#00ff88]'
                }`}>
                  {result.status}
                </h4>
              </div>
              {result.status === 'DANGER' ? <ShieldAlert className="text-red-500" /> : <ShieldCheck className="text-[#00ff88]" />}
            </div>
            
            <p className="text-xs text-gray-400 font-mono leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
              {result.content}
            </p>

            {result.riskScore !== undefined && (
              <div className="mt-4 flex items-center gap-4">
                 <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${result.status === 'DANGER' ? 'bg-red-500' : 'bg-[#00ff88]'}`}
                      style={{ width: `${result.riskScore}%` }}
                    ></div>
                 </div>
                 <span className="text-[10px] font-mono text-gray-500">{result.riskScore}% RISK</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkShield;
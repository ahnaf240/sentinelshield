'use client';
import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Search, Loader2, AlertTriangle } from 'lucide-react';

const PhishGuard = () => {
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!content) return;
    
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/phish-guard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis Error:", error);
      setResult({
        isSafe: false,
        riskLevel: 'ERROR',
        recommendation: 'Could not reach the security intelligence server.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 border-t-4 border-[#ffcc00] bg-gradient-to-b from-[#ffcc0005] to-transparent rounded-3xl shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#ffcc0015] rounded-xl">
          <ShieldAlert className="text-[#ffcc00] w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-white tracking-wider">PHISH GUARD AI</h2>
          <p className="text-[9px] text-[#ffcc00] font-mono tracking-[0.2em] uppercase italic">Real-time Social Engineering Protection</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <div className="relative">
          <textarea 
            placeholder="Paste suspicious email content or message phrases here..." 
            className="w-full bg-[#0a0f1a] border border-white/10 p-5 rounded-2xl h-32 text-sm focus:border-[#ffcc00] outline-none font-mono text-gray-300 transition-all resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="absolute bottom-4 right-4">
            <AlertTriangle className={`w-5 h-5 opacity-20 ${content.length > 0 ? 'text-[#ffcc00]' : 'text-gray-600'}`} />
          </div>
        </div>

        <button 
          onClick={handleAnalyze}
          disabled={loading || !content}
          className="w-full bg-[#ffcc0010] border border-[#ffcc0040] hover:bg-[#ffcc00] hover:text-[#050810] py-4 rounded-2xl text-[#ffcc00] font-black font-orbitron text-xs transition-all flex items-center justify-center gap-3 tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,204,0,0.05)]"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Search size={16} />
              INITIATE ANALYSIS
            </>
          )}
        </button>

        {/* Result UI */}
        {result && (
          <div className={`mt-6 p-5 rounded-2xl border animate-in fade-in zoom-in duration-300 ${
            !result.isSafe ? 'bg-red-500/5 border-red-500/30' : 'bg-[#00ff8805] border-[#00ff8820]'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${
                !result.isSafe ? 'text-red-400 border-red-400/20 bg-red-400/10' : 'text-[#00ff88] border-[#00ff88/20] bg-[#00ff88/10]'
              }`}>
                RISK LEVEL: {result.riskLevel}
              </span>
              {!result.isSafe ? <ShieldAlert className="text-red-500 w-5 h-5" /> : <ShieldCheck className="text-[#00ff88] w-5 h-5" />}
            </div>

            <p className="text-xs text-white font-mono leading-relaxed mb-4">
              {result.recommendation}
            </p>

            {result.findings && result.findings.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] text-gray-500 uppercase mb-2 font-bold tracking-widest">Flagged Keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {result.findings.map((word, idx) => (
                    <span key={idx} className="text-[10px] bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/20 font-mono italic">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhishGuard;
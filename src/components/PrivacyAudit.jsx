'use client';
import React, { useState, useEffect } from 'react';
import { EyeOff, ShieldCheck, AlertCircle, RefreshCw, Loader2, SearchCheck } from 'lucide-react';

const PrivacyAudit = () => {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAudit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/privacy-audit');
      const data = await response.json();
      setAuditData(data);
    } catch (error) {
      console.error("Audit failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAudit();
  }, []);

  return (
    <div className="glass-card p-8 border-t-4 border-[#ff6600] bg-gradient-to-b from-[#ff660005] to-transparent rounded-3xl shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#ff660015] rounded-xl">
            <EyeOff className="text-[#ff6600] w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-white tracking-wider">PRIVACY AUDIT</h2>
            <p className="text-[9px] text-[#ff6600] font-mono tracking-[0.2em] uppercase italic">Stealth & Tracker Analysis</p>
          </div>
        </div>
        <button 
          onClick={runAudit}
          disabled={loading}
          className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-500 hover:text-[#ff6600]"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading && !auditData ? (
        <div className="flex flex-col items-center py-12 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#ff6600]" />
          <p className="text-[10px] font-mono text-gray-500 animate-pulse uppercase tracking-widest text-center">
            Intercepting Tracker Scripts... <br/> Analyzing Metadata Leakage...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Audit Score Display */}
          <div className="flex items-center justify-between bg-black/40 p-6 rounded-2xl border border-white/5">
            <div>
              <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Privacy Health Score</p>
              <div className="text-4xl font-black font-orbitron text-white">
                {auditData?.overallScore || 0}<span className="text-[#ff6600] text-xl">%</span>
              </div>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-[#ff660030] flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-4 border-[#ff6600] border-t-transparent animate-spin-slow"></div>
               <SearchCheck className="text-[#ff6600] w-6 h-6" />
            </div>
          </div>

          {/* Audit Checks List */}
          <div className="space-y-3">
            <p className="text-[9px] text-gray-600 font-mono uppercase tracking-widest ml-1">System Integrity Checks</p>
            {auditData?.checks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-[#ff660030] transition-all">
                <div className="flex items-center gap-3">
                  {check.status === 'PASSED' ? (
                    <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
                  ) : (
                    <AlertCircle className={`w-4 h-4 ${check.status === 'CRITICAL' || check.impact === 'Critical' ? 'text-red-500' : 'text-[#ff6600]'}`} />
                  )}
                  <span className="text-xs font-bold text-gray-300 font-mono">{check.name}</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                  check.status === 'PASSED' ? 'bg-[#00ff8810] text-[#00ff88]' : 'bg-[#ff660010] text-[#ff6600]'
                }`}>
                  {check.status}
                </span>
              </div>
            ))}
          </div>

          {/* Alert Box */}
          <div className="p-4 bg-[#ff660010] border border-[#ff660020] rounded-2xl text-[#ff6600] text-xs font-mono leading-relaxed italic">
             <div className="flex gap-2">
                <span className="font-black underline">ALERT:</span>
                <span>System is currently hidden from 12 known trackers. Suggestions: {auditData?.suggestions[0]}</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyAudit;
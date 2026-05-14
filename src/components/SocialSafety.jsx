import React, { useState } from 'react';
import { ShieldCheck, Facebook, Instagram, Github, AlertCircle } from 'lucide-react';

const SocialSafety = () => {
  const [platform, setPlatform] = useState('Facebook');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runAudit = async () => {
    setLoading(true);
    const res = await fetch('/api/social-safety', {
      method: 'POST',
      body: JSON.stringify({ platform }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-slate-900 border border-pink-500/30 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="text-pink-500" />
        <h2 className="text-xl font-bold text-white font-orbitron">Social Safety Auditor</h2>
      </div>
      
      <div className="flex gap-4 mb-6">
        {['Facebook', 'Instagram', 'Github'].map(p => (
          <button 
            key={p}
            onClick={() => setPlatform(p)}
            className={`p-3 rounded-lg border transition-all ${platform === p ? 'bg-pink-500/20 border-pink-500' : 'bg-slate-800 border-white/10'}`}
          >
            {p === 'Facebook' && <Facebook size={20} />}
            {p === 'Instagram' && <Instagram size={20} />}
            {p === 'Github' && <Github size={20} />}
          </button>
        ))}
      </div>

      <button 
        onClick={runAudit}
        className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg transition-all"
      >
        {loading ? "Auditing..." : `Scan ${platform} Profile`}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-pink-500/20">
          <p className="text-xs text-pink-400 font-mono">Security Score: {result.score}%</p>
          <div className="mt-2">
            {result.threats.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-red-400 mt-1">
                <AlertCircle size={12} /> <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialSafety;
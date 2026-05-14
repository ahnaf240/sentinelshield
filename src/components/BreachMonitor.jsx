import React, { useState } from 'react';
import { ShieldAlert, Search, CheckCircle, Loader2 } from 'lucide-react';

const BreachMonitor = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, checking, safe, breached
  const [breachData, setBreachData] = useState(null);

  const checkBreach = async () => {
    if (!email) return alert("Please enter an email address!");
    
    setStatus('checking');
    setBreachData(null);

    try {
      const response = await fetch('/api/breach-monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      
      if (data.found) {
        setBreachData(data);
        setStatus('breached');
      } else {
        setStatus('safe');
      }
    } catch (error) {
      alert("Error checking breaches. Please try again.");
      setStatus('idle');
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-red-500/30 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-6">
        <ShieldAlert className="text-red-500" />
        <h2 className="text-xl font-bold text-white font-orbitron uppercase tracking-wider">Dark Web Breach Monitor</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input 
          type="email"
          placeholder="Enter email to scan (e.g. test@example.com)"
          className="flex-1 bg-slate-800 border border-red-500/20 rounded-lg px-4 py-2 text-white outline-none focus:border-red-500/50 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          onClick={checkBreach} 
          disabled={status === 'checking'}
          className={`px-6 py-2 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 ${
            status === 'checking' ? 'bg-red-900 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 active:scale-95'
          }`}
        >
          {status === 'checking' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search size={18} />}
          {status === 'checking' ? 'Scanning...' : 'Scan'}
        </button>
      </div>

      {/* Checking State */}
      {status === 'checking' && (
        <div className="flex flex-col items-center justify-center py-4">
          <p className="text-yellow-400 animate-pulse text-sm font-mono uppercase tracking-widest">Searching Dark Web Databases...</p>
        </div>
      )}

      {/* Safe State */}
      {status === 'safe' && (
        <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-lg flex items-center gap-3 animate-in zoom-in duration-300">
          <CheckCircle className="text-green-500 shrink-0" />
          <p className="text-green-200 text-sm italic">Good news! Your email was not found in any known data breaches.</p>
        </div>
      )}

      {/* Breached State */}
      {status === 'breached' && breachData && (
        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg flex flex-col gap-3 animate-in shake-in duration-300">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-red-500 shrink-0" />
            <p className="text-red-200 text-sm font-bold">ALERT! This email was found in {breachData.breaches.length} data breaches.</p>
          </div>
          
          <div className="mt-2 space-y-2">
            <p className="text-[10px] text-gray-400 uppercase font-mono">Compromised Platforms:</p>
            <div className="flex flex-wrap gap-2">
              {breachData.breaches.map((b, i) => (
                <span key={i} className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded border border-red-500/30">
                  {b}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-red-400 mt-2 font-bold animate-pulse">RECOMMENDATION: CHANGE PASSWORDS IMMEDIATELY.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreachMonitor;
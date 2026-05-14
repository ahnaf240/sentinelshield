import React, { useState } from 'react';
import { Smartphone, Search, ShieldAlert, UserCheck } from 'lucide-react';

export default function SpamGuard() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!phoneNumber) return alert("Please enter a phone number!");

    setLoading(true);
    try {
      const response = await fetch('/api/spam-guardian', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error connecting to Caller ID database!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 border-l-4 border-[#ffaa00] animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Smartphone className="text-[#ffaa00] w-6 h-6" />
          <h3 className="font-orbitron text-lg text-white">SPAM GUARDIAN</h3>
        </div>
        <span className="bg-[#ffaa0020] text-[#ffaa00] text-[8px] px-2 py-1 rounded font-mono animate-pulse">
          {loading ? 'SEARCHING...' : 'LIVE DATABASE'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input 
            type="tel" 
            placeholder="Enter Global Phone Number (+880...)" 
            className="w-full bg-[#0a0f1a] border border-white/10 p-4 rounded-xl text-white font-mono focus:border-[#ffaa00] outline-none"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className={`absolute right-2 top-2 p-2 bg-[#ffaa00] rounded-lg text-[#050810] transition-all ${loading ? 'opacity-50' : 'hover:scale-105 active:scale-95'}`}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* রেজাল্ট কার্ড (ডায়নামিক) */}
        {result && (
          <div className={`p-4 bg-white/5 rounded-xl border space-y-3 animate-in fade-in zoom-in duration-300 ${result.status === 'SPAM' ? 'border-red-500/50' : 'border-white/5'}`}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 font-mono">OWNER IDENTITY:</span>
              <span className="text-sm font-bold text-white uppercase tracking-widest">
                {result.callerName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 font-mono">SPAM RATING:</span>
              <span className={`text-sm font-bold ${result.riskScore > 50 ? 'text-red-500' : 'text-green-500'}`}>
                {result.riskScore}% - {result.status}
              </span>
            </div>
            
            {/* রিস্ক মিটার */}
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${result.riskScore > 50 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${result.riskScore}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
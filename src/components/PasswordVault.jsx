'use client';
import React, { useState, useEffect } from 'react';
import { Lock, RefreshCw, Copy, ShieldCheck, Database, KeyRound, Loader2 } from 'lucide-react';

const PasswordVault = () => {
  const [password, setPassword] = useState('S3ntin3l@2026');
  const [vaultEntries, setVaultEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // --- Password Generation Logic ---
  const generatePass = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPass = "";
    for (let i = 0; i < 16; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
  };

  // --- API Connection: Fetch Vault Entries ---
  // ছবির এরর অনুযায়ী পাথ পরিবর্তন করা হয়েছে: /api/passwordvault
  const fetchVault = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/passwordvault'); 
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setVaultEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Vault retrieval error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- API Connection: Save Password to Vault ---
  const saveToVault = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/passwordvault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          site: 'Manual Entry', 
          username: 'admin_user', 
          password: password 
        }),
      });
      if (response.ok) {
        alert("Credentials Encrypted & Stored Successfully!");
        fetchVault(); 
      }
    } catch (error) {
      console.error("Storage error:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchVault();
  }, []);

  return (
    <div className="glass-card p-8 border-t-4 border-[#b44dff] bg-gradient-to-b from-[#b44dff05] to-transparent rounded-3xl shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#b44dff15] rounded-xl">
            <Lock className="text-[#b44dff] w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-white tracking-wider">QUANTUM VAULT</h2>
            <p className="text-[9px] text-[#b44dff] font-mono tracking-[0.3em] uppercase tracking-widest">AES-256 Bit Encryption Active</p>
          </div>
        </div>
        <Database className="text-gray-700 w-8 h-8 opacity-20" />
      </div>

      <div className="space-y-6">
        <div className="bg-black/40 p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-[#b44dff05] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          
          <div className="relative flex justify-between items-center mb-4">
             <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Secure Output</span>
             <KeyRound className="w-3 h-3 text-[#b44dff] opacity-40" />
          </div>

          <div className="relative flex justify-between items-center bg-[#050810] p-4 rounded-xl border border-white/5">
            <code className="text-[#b44dff] font-mono text-xl tracking-tight break-all">{password}</code>
            <button 
              onClick={() => navigator.clipboard.writeText(password)} 
              className="ml-4 p-2 text-gray-500 hover:text-[#b44dff] hover:bg-[#b44dff10] rounded-lg transition-all"
            >
              <Copy size={18} />
            </button>
          </div>
          
          <div className="mt-4 flex gap-1.5">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-1.5 flex-1 bg-[#b44dff] rounded-full shadow-[0_0_10px_#b44dff40]"></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={generatePass} 
            className="group bg-[#b44dff15] border border-[#b44dff40] hover:bg-[#b44dff] hover:text-[#050810] py-4 rounded-2xl text-[#b44dff] font-black font-orbitron text-xs transition-all flex items-center justify-center gap-3 tracking-widest"
          >
            <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
            RE-GENERATE
          </button>
          
          <button 
            onClick={saveToVault}
            disabled={saving}
            className="bg-[#00ff8810] border border-[#00ff8840] hover:bg-[#00ff88] hover:text-[#050810] py-4 rounded-2xl text-[#00ff88] font-black font-orbitron text-xs transition-all flex items-center justify-center gap-3 tracking-widest disabled:opacity-50 shadow-[0_0_20px_#00ff8810]"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck size={16} />}
            SAVE TO CORE
          </button>
        </div>

        <div className="pt-6 border-t border-white/5">
          <h4 className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] mb-4 font-bold">Encrypted Records</h4>
          {loading ? (
            <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-gray-700" /></div>
          ) : (
            <div className="space-y-3">
              {vaultEntries.length > 0 ? vaultEntries.map((entry, index) => (
                <div key={entry.id || index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-[#b44dff30] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b44dff]" />
                    <span className="text-xs font-bold text-gray-300 font-mono">{entry.site}</span>
                  </div>
                  <span className="text-[9px] text-gray-600 font-mono">{entry.lastUsed || 'Just Now'}</span>
                </div>
              )) : (
                <p className="text-[10px] text-gray-700 font-mono text-center py-4 italic">No records found in local segment...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordVault;
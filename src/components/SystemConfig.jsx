"use client";

import React, { useState } from 'react';
import { Settings, Cpu, Radio, Shield, Zap, RefreshCw, Terminal } from 'lucide-react';

export default function SystemConfig() {
  const [config, setConfig] = useState({
    voiceFeedback: true,
    encryptionLevel: 'AES_256',
    firewallMode: 'Active Protection',
    autoHeal: true,
    stealthLog: false
  });

  const [syncStatus, setSyncStatus] = useState('SYNCHRONIZED');

  const toggleConfig = (key) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDropdown = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl max-w-md mx-auto font-mono text-slate-200 backdrop-blur-xl shadow-[0_0_50px_rgba(30,58,138,0.15)] border-blue-500/10 mt-10 animate-in fade-in zoom-in-95 duration-400">
      
      {/* HEADER HUD CONTROL */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Settings className="text-purple-500 animate-spin duration-3000" size={24} />
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider text-purple-400">System_Configuration</h2>
            <p className="text-[10px] text-slate-500">Core OS tuning parameters</p>
          </div>
        </div>
        <div className="text-[9px] bg-purple-950/30 border border-purple-500/20 text-purple-400 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-bold">
          <span className="w-1 h-1 rounded-full bg-purple-400 animate-ping" />
          {syncStatus}
        </div>
      </div>

      {/* MATRIX CONTROLS */}
      <div className="space-y-4 text-xs">
        
        {/* ROW 1: AI VOICE OUTPUT */}
        <div className="flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl hover:border-blue-500/20 transition-colors">
          <div className="flex items-center gap-2.5">
            <Radio size={16} className={config.voiceFeedback ? "text-emerald-400 animate-pulse" : "text-slate-600"} />
            <div>
              <p className="font-bold">AI Voice Output</p>
              <p className="text-[9px] text-slate-500">Enable universal vocal sync engine</p>
            </div>
          </div>
          <button 
            onClick={() => toggleConfig('voiceFeedback')}
            className={`w-10 h-5 rounded-full p-0.5 transition-all duration-300 ${config.voiceFeedback ? 'bg-emerald-500/30 border border-emerald-500/50' : 'bg-slate-800 border border-slate-700'}`}
          >
            <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${config.voiceFeedback ? 'bg-emerald-400 translate-x-5' : 'bg-slate-500'}`} />
          </button>
        </div>

        {/* ROW 2: ENCRYPTION ALGORITHM */}
        <div className="flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl hover:border-blue-500/20 transition-colors">
          <div className="flex items-center gap-2.5">
            <Cpu size={16} className="text-blue-400" />
            <div>
              <p className="font-bold">Encryption Algorithm</p>
              <p className="text-[9px] text-slate-500">Core cryptographic node cipher</p>
            </div>
          </div>
          <select 
            value={config.encryptionLevel} 
            onChange={(e) => handleDropdown('encryptionLevel', e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-blue-400 focus:outline-none font-bold text-[11px]"
          >
            <option value="AES_256">AES-256-GCM</option>
            <option value="RSA_4096">RSA-4096-BIT</option>
            <option value="ChaCha20">ChaCha20-POLY</option>
          </select>
        </div>

        {/* ROW 3: FIREWALL MATRIX */}
        <div className="flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl hover:border-blue-500/20 transition-colors">
          <div className="flex items-center gap-2.5">
            <Shield size={16} className="text-purple-400" />
            <div>
              <p className="font-bold">Firewall Matrix</p>
              <p className="text-[9px] text-slate-500">Security grid enforcement level</p>
            </div>
          </div>
          <select 
            value={config.firewallMode} 
            onChange={(e) => handleDropdown('firewallMode', e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-purple-400 focus:outline-none font-bold text-[11px]"
          >
            <option value="Active Protection">ACTIVE_GUARD</option>
            <option value="Stealth Mode">STEALTH_SHIELD</option>
            <option value="Aggressive Core">PARANOID_MODE</option>
          </select>
        </div>

        {/* ROW 4: AI THREAT AUTO-HEAL */}
        <div className="flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl hover:border-blue-500/20 transition-colors">
          <div className="flex items-center gap-2.5">
            <Zap size={16} className={config.autoHeal ? "text-yellow-400" : "text-slate-600"} />
            <div>
              <p className="font-bold">AI Threat Auto-Heal</p>
              <p className="text-[9px] text-slate-500">Autonomous integrity code patching</p>
            </div>
          </div>
          <button 
            onClick={() => toggleConfig('autoHeal')}
            className={`w-10 h-5 rounded-full p-0.5 transition-all duration-300 ${config.autoHeal ? 'bg-yellow-500/30 border border-yellow-500/50' : 'bg-slate-800 border border-slate-700'}`}
          >
            <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${config.autoHeal ? 'bg-yellow-400 translate-x-5' : 'bg-slate-500'}`} />
          </button>
        </div>

        {/* ROW 5: STEALTH LOG ENCRYPTION */}
        <div className="flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl hover:border-blue-500/20 transition-colors">
          <div className="flex items-center gap-2.5">
            <Terminal size={16} className={config.stealthLog ? "text-cyan-400" : "text-slate-600"} />
            <div>
              <p className="font-bold">Encrypted Kernel Logs</p>
              <p className="text-[9px] text-slate-500">Obfuscate terminal operational footprint</p>
            </div>
          </div>
          <button 
            onClick={() => toggleConfig('stealthLog')}
            className={`w-10 h-5 rounded-full p-0.5 transition-all duration-300 ${config.stealthLog ? 'bg-cyan-500/30 border border-cyan-500/50' : 'bg-slate-800 border border-slate-700'}`}
          >
            <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${config.stealthLog ? 'bg-cyan-400 translate-x-5' : 'bg-slate-500'}`} />
          </button>
        </div>

      </div>

      {/* FOOTER METRIC BANNER */}
      <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-between text-[8px] text-slate-600 uppercase tracking-widest">
        <span>Config_Version: v1.0.9</span>
        <span>Secure_Kernel_Linked</span>
      </div>
    </div>
  );
}
'use client';
// ============================================================
// CUSTOM TITLEBAR — Electron Desktop App-এর জন্য
// এটা শুধু Electron-এ দেখাবে, web browser-এ না
// ============================================================

import { useEffect, useState } from 'react';
import { Minus, Square, X, Shield } from 'lucide-react';

export default function ElectronTitleBar() {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check করো Electron-এ চলছে কিনা
    if (typeof window !== 'undefined' && window.electronAPI?.isElectron) {
      setIsElectron(true);
    }
  }, []);

  if (!isElectron) return null; // Web browser-এ দেখাবে না

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between select-none"
      style={{
        height: 36,
        background: 'rgba(5,8,16,0.98)',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
        WebkitAppRegion: 'drag', // এই অংশ drag করলে window move হবে
      }}>

      {/* Left: Logo */}
      <div className="flex items-center gap-2 px-4"
        style={{ WebkitAppRegion: 'no-drag' }}>
        <Shield className="w-4 h-4" style={{ color: '#00d4ff' }} />
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', color: '#00d4ff', letterSpacing: 2 }}>
          SENTINELSHIELD
        </span>
      </div>

      {/* Center: drag area */}
      <div className="flex-1" style={{ WebkitAppRegion: 'drag' }} />

      {/* Right: Window controls */}
      <div className="flex items-center" style={{ WebkitAppRegion: 'no-drag' }}>
        {/* Minimize */}
        <button
          onClick={() => window.electronAPI.minimize()}
          className="flex items-center justify-center transition-colors"
          style={{ width: 46, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(224,232,240,0.5)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#e0e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(224,232,240,0.5)'; }}>
          <Minus className="w-3.5 h-3.5" />
        </button>

        {/* Maximize */}
        <button
          onClick={() => window.electronAPI.maximize()}
          className="flex items-center justify-center transition-colors"
          style={{ width: 46, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(224,232,240,0.5)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#e0e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(224,232,240,0.5)'; }}>
          <Square className="w-3 h-3" />
        </button>

        {/* Close */}
        <button
          onClick={() => window.electronAPI.close()}
          className="flex items-center justify-center transition-colors"
          style={{ width: 46, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(224,232,240,0.5)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ff3366'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(224,232,240,0.5)'; }}>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
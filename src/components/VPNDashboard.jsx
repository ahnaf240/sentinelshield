'use client';
import React, { useState, useEffect } from 'react';
import {
  Globe, ShieldCheck, Power, Activity,
  ArrowDownUp, ShieldAlert, Cpu, MapPin, Zap
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────────
// VPNDashboard — Virtual Tunnel Shield
// Features: connect/disconnect toggle, uptime timer, bandwidth stats,
//           server switcher, encryption info, IP display
// ──────────────────────────────────────────────────────────────────

const servers = [
  { name: 'Tokyo_V41',      flag: '🇯🇵', ping: 28,  load: 22, ip: '108.162.192.1'  },
  { name: 'Frankfurt_DE09', flag: '🇩🇪', ping: 12,  load: 34, ip: '194.233.12.88'  },
  { name: 'NewYork_US03',   flag: '🇺🇸', ping: 98,  load: 67, ip: '172.64.155.209' },
  { name: 'London_GB02',    flag: '🇬🇧', ping: 25,  load: 55, ip: '104.21.45.77'   },
  { name: 'Singapore_SG07', flag: '🇸🇬', ping: 130, load: 41, ip: '172.67.68.99'   },
];

const VPNDashboard = () => {
  const [connected,     setConnected]     = useState(false);
  const [isConnecting,  setIsConnecting]  = useState(false);
  const [uptime,        setUptime]        = useState(0);
  const [selectedIdx,   setSelectedIdx]   = useState(0);
  const [bandwidth,     setBandwidth]     = useState(0);

  const server = servers[selectedIdx];

  /* uptime + bandwidth live ticker */
  useEffect(() => {
    let interval;
    if (connected) {
      interval = setInterval(() => {
        setUptime((p) => p + 1);
        setBandwidth(+(30 + Math.random() * 25).toFixed(1));
      }, 1000);
    } else {
      setUptime(0);
      setBandwidth(0);
    }
    return () => clearInterval(interval);
  }, [connected]);

  const formatTime = (s) => {
    const h   = Math.floor(s / 3600);
    const m   = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0
      ? `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
      : `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const handleToggle = () => {
    if (!connected) {
      setIsConnecting(true);
      setTimeout(() => { setIsConnecting(false); setConnected(true); }, 1500);
    } else {
      setConnected(false);
    }
  };

  const pingColor = (p) => p < 50 ? '#22c55e' : p < 100 ? '#fbbf24' : '#ef4444';

  return (
    <div
      className="rounded-xl p-6 text-white relative overflow-hidden"
      style={{
        background: 'rgb(15,23,42)',
        border:     '1px solid rgba(34,197,94,0.3)',
        boxShadow:  '0 25px 50px rgba(34,197,94,0.05)',
      }}
    >
      {/* Decorative bg shield */}
      <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
        <ShieldCheck size={150} className="text-green-500" />
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg transition-colors"
            style={{ background: connected ? 'rgba(34,197,94,0.18)' : 'rgba(30,41,59,1)' }}
          >
            <Globe
              size={20}
              style={{ color: connected ? '#4ade80' : 'rgb(100,116,139)' }}
            />
          </div>
          <div>
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              VIRTUAL TUNNEL
            </h2>
            <p
              className="text-[10px] uppercase"
              style={{ color: 'rgba(74,222,128,0.6)', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.2em' }}
            >
              Node: {server.name}
            </p>
          </div>
        </div>

        {/* Status pill */}
        <div className="flex flex-col items-end gap-1">
          <div
            className="h-2 w-8 rounded-full transition-all duration-500"
            style={{
              background:  connected ? '#22c55e' : 'rgb(51,65,85)',
              boxShadow:   connected ? '0 0 10px #22c55e' : 'none',
            }}
          />
          <span
            className="text-[9px] uppercase"
            style={{ fontFamily: 'Share Tech Mono, monospace', color: 'rgb(100,116,139)' }}
          >
            {connected ? 'Encrypted' : 'Unprotected'}
          </span>
        </div>
      </div>

      {/* ── Power Button ── */}
      <div className="text-center mb-8 relative">
        <div className="inline-block relative">
          <button
            onClick={handleToggle}
            disabled={isConnecting}
            className="relative z-10 p-8 rounded-full border-2 transition-all duration-500 active:scale-95"
            style={{
              border:     connected
                ? '2px solid #22c55e'
                : '2px solid rgb(51,65,85)',
              background: connected
                ? 'rgba(34,197,94,0.1)'
                : 'transparent',
              boxShadow:  connected
                ? '0 0 30px rgba(34,197,94,0.2)'
                : 'none',
              cursor:     isConnecting ? 'not-allowed' : 'pointer',
            }}
          >
            {isConnecting
              ? <Activity size={40} style={{ color: '#4ade80', animation: 'pulse 1s infinite' }} />
              : <Power
                  size={40}
                  style={{ color: connected ? '#22c55e' : 'rgb(51,65,85)', transition: 'color 0.5s' }}
                />}
          </button>

          {/* Ping ring while connecting */}
          {isConnecting && (
            <div
              className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-50"
            />
          )}
          {connected && (
            <div
              className="absolute inset-0 rounded-full border border-green-500/20 animate-ping"
              style={{ animationDuration: '3s' }}
            />
          )}
        </div>

        <p
          className="mt-4 text-xs tracking-widest transition-colors"
          style={{
            fontFamily: 'Share Tech Mono, monospace',
            color:      connected ? '#4ade80' : 'rgb(100,116,139)',
          }}
        >
          {isConnecting
            ? 'ESTABLISHING HANDSHAKE...'
            : connected
              ? `SESSION ACTIVE: ${formatTime(uptime)}`
              : 'READY TO SECURE'}
        </p>
      </div>

      {/* ── Server Selector ── */}
      <div className="mb-6">
        <p
          className="text-[9px] uppercase mb-2"
          style={{ color: 'rgb(100,116,139)', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.15em' }}
        >
          Select Exit Node
        </p>
        <div className="flex flex-wrap gap-2">
          {servers.map((s, i) => (
            <button
              key={s.name}
              onClick={() => { setSelectedIdx(i); if (connected) { setConnected(false); } }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-[10px]"
              style={{
                background: selectedIdx === i ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                border:     selectedIdx === i ? '1px solid rgba(34,197,94,0.5)' : '1px solid rgba(255,255,255,0.06)',
                color:      selectedIdx === i ? '#4ade80' : 'rgb(100,116,139)',
                cursor:     'pointer',
                fontFamily: 'Share Tech Mono, monospace',
              }}
            >
              <span>{s.flag}</span>
              <span>{s.name.split('_')[0]}</span>
              <span style={{ color: pingColor(s.ping) }}>{s.ping}ms</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div
          className="p-3 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownUp size={12} style={{ color: '#60a5fa' }} />
            <span
              className="uppercase"
              style={{ fontSize: 9, color: 'rgb(100,116,139)', fontFamily: 'Share Tech Mono, monospace' }}
            >
              Bandwidth
            </span>
          </div>
          <p
            className="font-bold"
            style={{ fontSize: '0.875rem', fontFamily: 'Share Tech Mono, monospace' }}
          >
            {connected ? `${bandwidth} MB/s` : '0.00 MB/s'}
          </p>
        </div>

        <div
          className="p-3 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={12} style={{ color: '#c084fc' }} />
            <span
              className="uppercase"
              style={{ fontSize: 9, color: 'rgb(100,116,139)', fontFamily: 'Share Tech Mono, monospace' }}
            >
              Ping
            </span>
          </div>
          <p
            className="font-bold"
            style={{ fontSize: '0.875rem', fontFamily: 'Share Tech Mono, monospace', color: pingColor(server.ping) }}
          >
            {server.ping} ms
          </p>
        </div>
      </div>

      {/* ── Connection Info ── */}
      <div
        className="p-4 rounded-lg space-y-3"
        style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        {[
          { label: 'Virtual IP Address',   value: connected ? server.ip : 'NON_SECURE_MODE',   color: connected ? '#4ade80' : 'rgb(71,85,105)' },
          { label: 'Encryption Standard',  value: 'XCHACHA20-POLY1305',                         color: '#4ade80' },
          { label: 'Protocol',             value: 'WireGuard v2',                               color: '#4ade80' },
          { label: 'Server Load',          value: `${server.load}%`,                            color: server.load > 60 ? '#fbbf24' : '#4ade80' },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center" style={{ fontSize: 10 }}>
            <span
              className="uppercase"
              style={{ color: 'rgb(100,116,139)', fontFamily: 'Share Tech Mono, monospace' }}
            >
              {row.label}
            </span>
            <span style={{ fontFamily: 'Share Tech Mono, monospace', color: row.color }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Warning footer (disconnected) ── */}
      {!connected && !isConnecting && (
        <div
          className="mt-4 flex items-center gap-2 justify-center py-1.5 rounded"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border:     '1px solid rgba(239,68,68,0.2)',
          }}
        >
          <ShieldAlert size={12} style={{ color: '#ef4444' }} />
          <span
            className="animate-pulse uppercase"
            style={{ fontSize: 9, color: '#ef4444', fontFamily: 'Share Tech Mono, monospace' }}
          >
            Your IP is currently exposed
          </span>
        </div>
      )}
    </div>
  );
};

export default VPNDashboard;
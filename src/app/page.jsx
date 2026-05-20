"use client";

import React, { useState, useEffect } from 'react';

// ─── Components ────────────────────────────────────────────
// প্রতিটা import এর file আছে কিনা confirm করা হয়েছে
import Navbar      from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Dashboard   from '@/components/Dashboard';
import UserPortal  from '@/components/UserPortal';

// এই তিনটা Modules.jsx থেকে re-export হয়
import ThreatScanner from '@/components/ThreatScanner';
import BreachMonitor from '@/components/BreachMonitor';
import VPNDashboard  from '@/components/VPNDashboard';

import {
  Shield,
  Terminal,
  Cpu,
  Network,
  Activity,
  Radio
} from 'lucide-react';

// ─── Page Component ────────────────────────────────────────
export default function Home() {
  // activePage controls which section is shown
  // values: 'hero' | 'dashboard' | 'threat-scanner' | 'breach-monitor' | 'vpn-shield' | 'profile'
  const [activePage, setActivePage] = useState('hero');

  // Live system metrics
  const [systemStatus,      setSystemStatus]      = useState('ONLINE');
  const [securityScore,     setSecurityScore]      = useState(98);
  const [firewallIntegrity, setFirewallIntegrity]  = useState('99.4%');
  const [networkLoad,       setNetworkLoad]        = useState('12.4 Gbps');
  const [activeThreats,     setActiveThreats]      = useState(0);
  const [mounted,           setMounted]            = useState(false);
  const [terminalLogs,      setTerminalLogs]       = useState([]);

  // Extra metrics (status bar)
  const [cipherAlgorithm,  setCipherAlgorithm]  = useState('AES_256_GCM');
  const [mainframeMemory,  setMainframeMemory]  = useState('STABLE');
  const [packetDropRate,   setPacketDropRate]   = useState('0%');
  const [linkSpeed,        setLinkSpeed]        = useState('10 GB/S');
  const [kernelVersion,    setKernelVersion]    = useState('v2.4.1');
  const [isShellSecure,    setIsShellSecure]    = useState(true);

  useEffect(() => {
    setMounted(true);

    // Initial terminal boot logs
    setTerminalLogs([
      "CRITICAL: Firewall handshake protocol initiated...",
      "SECURE_GATEWAY: Established encrypted tunnel on SSL_NODE_09",
      "MONITOR: Mainframe memory allocation verified stable.",
      "INTRUSION_DETECTOR: Running background scan... 0 anomalies found.",
      "SECURE_SHELL: RSA key handshake verified successfully.",
    ]);

    // Live metric fluctuation every 4 seconds
    const interval = setInterval(() => {
      const fluctuations = ['99.4%', '99.2%', '99.5%', '99.3%', '99.6%'];
      const loads        = ['12.4 Gbps', '14.1 Gbps', '11.8 Gbps', '13.5 Gbps', '12.9 Gbps'];
      const memories     = ['STABLE', 'OPTIMIZED', '94% FREE', 'NOMINAL'];

      setFirewallIntegrity(fluctuations[Math.floor(Math.random() * fluctuations.length)]);
      setNetworkLoad(loads[Math.floor(Math.random() * loads.length)]);
      setMainframeMemory(memories[Math.floor(Math.random() * memories.length)]);

      // Occasionally simulate a brief threat blip
      if (Math.random() > 0.75) {
        setActiveThreats(1);
        setTimeout(() => setActiveThreats(0), 2000);
      }

      // Rolling terminal log
      const timeString = new Date().toLocaleTimeString();
      const rollingLogs = [
        `KERNEL_UPDATE: Packet transaction verified at ${timeString} [OK]`,
        `NODE_SYNC: Cluster infrastructure database synchronization completed`,
        `FIREWALL: Outbound rule validated — no anomaly detected`,
        `CIPHER_CHECK: AES_256_GCM integrity confirmed [PASS]`,
      ];
      setTerminalLogs(prev => [
        rollingLogs[Math.floor(Math.random() * rollingLogs.length)],
        ...prev.slice(0, 4),
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch — render nothing until client mounts
  if (!mounted) return null;

  return (
    <main
      className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-x-hidden
                 selection:bg-blue-500/30 selection:text-blue-200 antialiased"
    >
      {/* ── Grid background ── */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
        }}
      />

      {/* ── Top neon border line ── */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.9), transparent)',
          boxShadow: '0 0 30px rgba(59,130,246,0.6)',
        }}
      />

      {/* ── Live System Status Bar (desktop only) ── */}
      <div
        className="fixed top-14 left-1/2 -translate-x-1/2 z-40 hidden lg:flex
                   items-center gap-5 px-5 py-1.5 rounded-full text-[9px] uppercase tracking-widest
                   backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        style={{
          background: 'rgba(2,6,23,0.82)',
          border: '1px solid rgba(59,130,246,0.12)',
          color: 'rgba(148,163,184,0.9)',
        }}
      >
        {/* Node Status */}
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
          SYSTEM_NODE:{' '}
          <span style={{ color: '#60a5fa', fontWeight: 700 }}>{systemStatus}</span>
        </span>

        <span style={{ color: '#1e293b' }}>|</span>

        {/* Cipher */}
        <span className="flex items-center gap-1.5">
          <Cpu size={11} style={{ color: '#c084fc' }} />
          CORE_CIPHER:{' '}
          <span style={{ color: '#c084fc', fontWeight: 700 }}>{cipherAlgorithm}</span>
        </span>

        <span style={{ color: '#1e293b' }}>|</span>

        {/* Security Score */}
        <span className="flex items-center gap-1.5">
          <Shield size={11} style={{ color: '#34d399' }} />
          SEC_SCORE:{' '}
          <span style={{ color: '#34d399', fontWeight: 700 }}>{securityScore}%</span>
        </span>

        <span style={{ color: '#1e293b' }}>|</span>

        {/* Firewall */}
        <span className="flex items-center gap-1.5">
          <Radio size={11} style={{ color: '#22d3ee', animation: 'pulse 2s infinite' }} />
          FW_INTEGRITY:{' '}
          <span style={{ color: '#22d3ee', fontWeight: 700 }}>{firewallIntegrity}</span>
        </span>

        <span style={{ color: '#1e293b' }}>|</span>

        {/* Traffic */}
        <span className="flex items-center gap-1.5">
          <Activity size={11} style={{ color: '#fbbf24' }} />
          TRAFFIC_LOAD:{' '}
          <span style={{ color: '#fbbf24', fontWeight: 700 }}>{networkLoad}</span>
        </span>

        <span style={{ color: '#1e293b' }}>|</span>

        {/* VPN */}
        <span className="flex items-center gap-1.5">
          <Network size={11} style={{ color: '#818cf8' }} />
          VPN_GATE:{' '}
          <span style={{ color: '#818cf8', fontWeight: 700 }}>SECURE_SSL</span>
        </span>
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-col min-h-screen relative z-10">
        {/* Navbar — pass both props so Navbar can control navigation */}
        <Navbar setActivePage={setActivePage} activePage={activePage} />

        {/* Content area — pt-32 clears Navbar + status bar, pb-48 clears bottom terminal */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48 relative">

          {/* Hero / Landing */}
          {activePage === 'hero' && (
            <div className="transition-all duration-500">
              <HeroSection setActivePage={setActivePage} />
            </div>
          )}

          {/* Full Dashboard (sidebar + all modules) */}
          {activePage === 'dashboard' && (
            <div className="transition-all duration-400">
              <Dashboard />
            </div>
          )}

          {/* Stand-alone Threat Scanner */}
          {activePage === 'threat-scanner' && (
            <div className="transition-all duration-300">
              <ThreatScanner />
            </div>
          )}

          {/* Stand-alone Breach Monitor */}
          {activePage === 'breach-monitor' && (
            <div className="transition-all duration-300">
              <BreachMonitor />
            </div>
          )}

          {/* Stand-alone VPN Dashboard */}
          {activePage === 'vpn-shield' && (
            <div className="transition-all duration-400">
              <VPNDashboard />
            </div>
          )}

          {/* User Profile / Settings */}
          {activePage === 'profile' && (
            <div className="transition-all duration-400">
              <UserPortal />
            </div>
          )}

        </div>
      </div>

      {/* ── Bottom Live Terminal Feed (desktop only) ── */}
      <div
        className="fixed bottom-14 left-6 right-6 hidden md:block z-30"
        style={{
          height: 96,
          background: 'rgba(2,6,23,0.92)',
          border: '1px solid rgba(16,185,129,0.06)',
          borderRadius: 12,
          padding: '10px 14px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.6)',
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: 10,
          color: 'rgba(52,211,153,0.8)',
          overflow: 'hidden',
        }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center gap-2 pb-1.5 mb-1.5"
          style={{
            borderBottom: '1px solid rgba(15,23,42,0.9)',
            color: 'rgba(100,116,139,0.9)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: 9,
          }}
        >
          <Terminal size={12} style={{ color: '#34d399', animation: 'pulse 2s infinite' }} />
          <span>Live_Core_Kernel_Feed</span>
        </div>

        {/* Log lines */}
        <div className="space-y-0.5 select-none" style={{ opacity: 0.85 }}>
          {terminalLogs.map((log, index) => (
            <div key={index} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'rgba(71,85,105,0.9)', marginRight: 8 }}>[{index}]</span>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Left Status Footer ── */}
      <div
        className="fixed bottom-4 left-6 hidden md:block z-40 pointer-events-none select-none"
        style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: 9,
          color: 'rgba(71,85,105,0.8)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        Mainframe_Secure // Thread_Pool_Active // Enforcer_{kernelVersion} //{' '}
        Secure_Shell_{isShellSecure ? 'Initiated' : 'Terminated'}
      </div>

      {/* ── Bottom Right Metrics Footer ── */}
      <div
        className="fixed bottom-4 right-6 hidden xl:block z-40 pointer-events-none select-none"
        style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: 9,
          color: 'rgba(51,65,85,0.9)',
          letterSpacing: '0.05em',
        }}
      >
        [ MEMORY_BLOCK: {mainframeMemory} // PACKET_DROP: {packetDropRate} // LINK_SPEED: {linkSpeed} // ACTIVE_THREATS: {activeThreats} ]
      </div>
    </main>
  );
}
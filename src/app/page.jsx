"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import ThreatScanner from '@/components/ThreatScanner';
import BreachMonitor from '@/components/BreachMonitorr'; // আপনার ফোল্ডারের বানান অনুযায়ী ডাবল 'rr' ফিক্স করা হলো
import VPNDashboard from '@/components/VPNDashboard';
import HeroSection from '@/components/HeroSection';
import VoiceAssistant from '@/components/VoiceAssistant';
import UserPortal from '@/components/UserPortal';
import SystemConfig from '@/components/SystemConfig';
import { 
  Shield, 
  Terminal, 
  Cpu, 
  Network, 
  Database, 
  Activity, 
  Server, 
  Radio, 
  Lock, 
  Globe,
  AlertTriangle,
  FileText,
  Sliders
} from 'lucide-react';

export default function Home() {
  const [activePage, setActivePage] = useState('hero');
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [securityScore, setSecurityScore] = useState(98);
  const [firewallIntegrity, setFirewallIntegrity] = useState('99.4%');
  const [networkLoad, setNetworkLoad] = useState('12.4 Gbps');
  const [activeThreats, setActiveThreats] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);

  // Core system hydration layer and advanced background multi-ticker
  useEffect(() => {
    setMounted(true);
    
    const logs = [
      "CRITICAL: Firewall handshake protocol initiated...",
      "SECURE_GATEWAY: Established encrypted tunnel on SSL_NODE_09",
      "MONITOR: Mainframe memory allocation verified stable.",
      "INTRUSION_DETECTOR: Running background scan... 0 anomalies found."
    ];
    setTerminalLogs(logs);

    const interval = setInterval(() => {
      const fluctuations = ['99.4%', '99.2%', '99.5%', '99.3%'];
      const loads = ['12.4 Gbps', '14.1 Gbps', '11.8 Gbps', '13.5 Gbps'];
      
      const randomValue = fluctuations[Math.floor(Math.random() * fluctuations.length)];
      const randomLoad = loads[Math.floor(Math.random() * loads.length)];
      
      setFirewallIntegrity(randomValue);
      setNetworkLoad(randomLoad);

      // Dynamically pushing matrix simulation logs
      setTerminalLogs(prev => [
        `KERNEL_UPDATE: Packet transaction verified at ${new Date().toLocaleTimeString()}`,
        ...prev.slice(0, 4)
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 antialiased">
      
      {/* ADVANCED PERSISTENT SCI-FI BACKGROUND VECTOR & MASK LAYERS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0" />
      
      {/* GLOBAL TOP AMBIENT NEON LINE EFFECT */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_30px_rgba(59,130,246,0.6)] z-50" />
      
      {/* COMPLEX OPERATIONAL COCKPIT HUD (HEADS UP DISPLAY) BAR */}
      <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-slate-950/80 border border-slate-900/80 px-5 py-1.5 rounded-full text-[9px] text-slate-500 uppercase tracking-widest flex items-center gap-5 backdrop-blur-md z-40 hidden lg:flex shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-blue-500/10">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
          SYSTEM_NODE: <span className="text-blue-400 font-bold">{systemStatus}</span>
        </span>
        <span className="text-slate-800">|</span>
        <span className="flex items-center gap-1.5">
          <Cpu size={11} className="text-purple-400" /> CORE_CIPHER: <span className="text-purple-400 font-bold">AES_256_GCM</span>
        </span>
        <span className="text-slate-800">|</span>
        <span className="flex items-center gap-1.5">
          <Shield size={11} className="text-emerald-400" /> SEC_SCORE: <span className="text-emerald-400 font-bold">{securityScore}%</span>
        </span>
        <span className="text-slate-800">|</span>
        <span className="flex items-center gap-1.5">
          <Radio size={11} className="text-cyan-400 animate-pulse" /> FW_INTEGRITY: <span className="text-cyan-400 font-bold">{firewallIntegrity}</span>
        </span>
        <span className="text-slate-800">|</span>
        <span className="flex items-center gap-1.5">
          <Activity size={11} className="text-amber-400" /> traffic_load: <span className="text-amber-400 font-bold">{networkLoad}</span>
        </span>
        <span className="text-slate-800">|</span>
        <span className="flex items-center gap-1.5">
          <Network size={11} className="text-indigo-400" /> VPN_GATE: <span className="text-indigo-400 font-bold">SECURE_SSL</span>
        </span>
      </div>

      {/* PERSISTENT FULL-MODULE INTERFACE LAYOUT STRUCTURE */}
      <div className="flex flex-col min-h-screen relative z-10">
        
        {/* TOP LEVEL NAVIGATION FRAMEWORK */}
        <Navbar setActivePage={setActivePage} activePage={activePage} />

        {/* CONTAINER SUB-SYSTEM FOR THE CYBERSECURITY VIEWPORTS */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-32 pb-48 relative">
          
          {/* VIEWPORT FRAME 01: HERO LANDING MAIN INTRO SECTION */}
          {activePage === 'hero' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
              <HeroSection setActivePage={setActivePage} />
            </div>
          )}

          {/* VIEWPORT FRAME 02: EXECUTED COMMAND CORE CONTROL PANEL */}
          {activePage === 'dashboard' && (
            <div className="animate-in slide-in-from-bottom-6 duration-400 ease-out">
              <Dashboard />
            </div>
          )}

          {/* VIEWPORT FRAME 03: CYBER ATTACK MAP AND ACTIVE RISK THREAT SCANNER */}
          {activePage === 'threat-scanner' && (
            <div className="animate-in zoom-in-95 duration-300 ease-out">
              <ThreatScanner />
            </div>
          )}

          {/* VIEWPORT FRAME 04: REAL-TIME BREACH MONITOR DATABASE CLUSTER */}
          {activePage === 'breach-monitor' && (
            <div className="animate-in fade-in duration-300">
              <BreachMonitor />
            </div>
          )}

          {/* VIEWPORT FRAME 05: ENCRYPTED NETWORK TRAFFIC TUNNEL AND VPN SHIELD */}
          {activePage === 'vpn-shield' && (
            <div className="animate-in slide-in-from-right-6 duration-400 ease-out">
              <VPNDashboard />
            </div>
          )}

          {/* VIEWPORT FRAME 06: ACCESS_PROFILE SECURE KEY CREDENTIAL USER PORTAL */}
          {activePage === 'profile' && (
            <div className="animate-in fade-in zoom-in-95 duration-400 ease-out">
              <UserPortal />
            </div>
          )}

          {/* VIEWPORT FRAME 07: CORE OPERATING MATRIX SYSTEM CONFIGURATION PANEL */}
          {activePage === 'system-config' && (
            <div className="animate-in fade-in zoom-in-95 duration-400 ease-out">
              <SystemConfig />
            </div>
          )}

        </div>
      </div>

      {/* LOWER MAINFRAME MATRIX TERMINAL DISPLAY GRID */}
      <div className="fixed bottom-14 left-6 right-6 h-24 bg-slate-950/90 border border-slate-900 rounded-xl p-3 font-mono text-[10px] text-emerald-500/80 overflow-hidden hidden md:block backdrop-blur-md z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] border-emerald-500/5">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-1.5 mb-1.5 text-slate-500 uppercase tracking-wider text-[9px]">
          <Terminal size={12} className="text-emerald-400 animate-pulse" />
          <span>Live_Core_Kernel_Feed</span>
        </div>
        <div className="space-y-0.5 select-none opacity-85">
          {terminalLogs.map((log, index) => (
            <div key={index} className="truncate">
              <span className="text-slate-600 mr-2">[{index}]</span> {log}
            </div>
          ))}
        </div>
      </div>

      {/* FLOAT LAYER: INTERACTIVE GALACTIC VOICE ENGINE TERMINAL UTILITY */}
      <div className="fixed bottom-6 right-6 z-50 group shadow-[0_0_50px_rgba(30,58,138,0.25)] border border-blue-500/10 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(59,130,246,0.35)]">
        <VoiceAssistant setActivePage={setActivePage} />
      </div>

      {/* AMBIENT RADAR BOTTOM INFRASTRUCTURE HUD WATERMARK */}
      <div className="fixed bottom-4 left-6 text-[9px] text-slate-600/80 tracking-[0.2em] pointer-events-none font-mono hidden md:block z-40 uppercase select-none">
        Mainframe_Secure // Thread_Pool_Active // Enforcer_v2.4.1 // Secure_Shell_Initiated
      </div>
      
      {/* ADDITIONAL BOTTOM SCI-FI SYSTEM DATA WATERMARK */}
      <div className="fixed bottom-4 right-6 text-[9px] text-slate-700 tracking-wider pointer-events-none font-mono hidden xl:block z-40 select-none">
        [ MEMORY_BLOCK: STABLE // PACKET_DROP: 0% // LINK_SPEED: 10GB/S // ACTIVE_THREATS: {activeThreats} ]
      </div>

    </main>
  );
}
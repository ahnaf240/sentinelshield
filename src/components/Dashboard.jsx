'use client';

/**
 * =============================================================================
 * PROJECT: SENTINELSHIELD V3.0 - THE ULTIMATE CYBERSECURITY ECOSYSTEM
 * DEVELOPER: SENTINEL_ADMIN
 * CORE ARCHITECTURE: NEXT.JS + TAILWIND CSS + LUCIDE-REACT
 * =============================================================================
 */

import { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Eye, 
  Lock, 
  Globe, 
  Activity, 
  MessageSquare, 
  AlertTriangle, 
  Menu, 
  X,
  Map, 
  MousePointer, 
  Database, 
  ShieldCheck, 
  Zap, 
  Mail, 
  LayoutGrid,
  Camera, 
  User, 
  Trash2, 
  Fingerprint, 
  KeyRound, 
  LogOut, 
  ChevronRight, 
  Settings, 
  Smartphone, 
  Search, 
  FileWarning, 
  UserCheck, 
  Github, 
  Instagram, 
  Facebook,
  Monitor,
  Cpu,
  RefreshCcw,
  Bell
} from 'lucide-react';

// --- মডিউল ইম্পোর্ট সেকশন ---
import ThreatScanner from './ThreatScanner';
import BreachMonitor from './BreachMonitor';
import PasswordVault from './PasswordVault';
import VPNDashboard from './VPNDashboard';
import PrivacyAudit from './PrivacyAudit';
import AIChatbot from './AIChatbot';
import AttackMap from './AttackMap';
import PhishGuard from './PhishGuard';
import ReportStorage from './ReportStorage';
import SocialSafety from './SocialSafety';
import NetworkMapper from './NetworkMapper';
import LinkShield from './LinkShield';
import NewsFeed from './NewsFeed';
import { LiveStatusBar } from './UtilityModules';

/**
 * IDENTITY PORTAL COMPONENT
 */
function UserPortal() {
  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="glass-card p-10 border-t-2 border-[#00ff88] bg-gradient-to-b from-[#00ff8805] to-transparent shadow-2xl">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-[#00ff8815] rounded-lg">
              <ShieldCheck className="text-[#00ff88] w-6 h-6" />
            </div>
            <h2 className="font-orbitron text-2xl text-white tracking-widest uppercase">
              Identity Enrollment
            </h2>
          </div>
          <p className="text-[10px] text-gray-500 font-mono tracking-[0.3em]">SECURE ACCESS PROTOCOL // LEVEL 7</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-tighter mb-4">Connect Social Credentials</h4>
            <button className="group w-full py-4 bg-[#1877F210] border border-[#1877F240] text-white flex items-center justify-between px-6 rounded-2xl hover:bg-[#1877F220] transition-all">
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-[#1877F2]" />
                <span className="text-sm font-medium">Link Facebook Account</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group w-full py-4 bg-[#E4405F10] border border-[#E4405F40] text-white flex items-center justify-between px-6 rounded-2xl hover:bg-[#E4405F20] transition-all">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-[#E4405F]" />
                <span className="text-sm font-medium">Link Instagram Profile</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group w-full py-4 bg-[#ffffff05] border border-[#ffffff20] text-white flex items-center justify-between px-6 rounded-2xl hover:bg-[#ffffff10] transition-all">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">Sync GitHub Developer ID</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-[#0a0f1a] p-8 rounded-3xl border border-white/5 space-y-6 shadow-inner">
            <div className="space-y-4">
              <label className="text-[10px] text-[#00ff88] font-mono block uppercase font-bold">Assign Unique Handle</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="e.g., sentinel_admin_2026" 
                  className="w-full bg-[#050810] border border-white/10 p-4 pl-12 rounded-xl text-[#00ff88] outline-none focus:border-[#00ff88] transition-all font-mono text-sm" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] text-gray-500 font-mono block uppercase">Email Association</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="admin@sentinelshield.io" 
                  className="w-full bg-[#050810] border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:border-[#00ff88] transition-all font-mono text-sm" 
                />
              </div>
            </div>

            <button className="w-full py-5 bg-[#00ff88] text-[#050810] font-black font-orbitron rounded-2xl shadow-[0_0_30px_rgba(0,255,136,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 tracking-widest">
              INITIALIZE IDENTITY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * SPAM GUARD COMPONENT
 */
function SpamGuard() {
  return (
    <div className="glass-card p-10 border-l-8 border-[#ffaa00] animate-in slide-in-from-right duration-1000">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-[#ffaa0015] rounded-2xl">
            <Smartphone className="text-[#ffaa00] w-10 h-10" />
          </div>
          <div>
            <h3 className="font-orbitron text-3xl text-white tracking-tighter">Spam Guardian</h3>
            <p className="text-[10px] text-[#ffaa00] font-mono uppercase mt-1 tracking-widest">Advanced Caller ID Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-black/40 border border-[#ffaa0030] rounded-full">
          <div className="w-2 h-2 bg-[#ffaa00] rounded-full animate-ping" />
          <span className="text-[9px] font-mono text-white uppercase tracking-widest">Real-time DB Active</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ffaa00] to-transparent rounded-2xl blur opacity-10 group-hover:opacity-25 transition-opacity" />
          <input 
            type="tel" 
            placeholder="Enter Global Mobile Identifier (+880...)" 
            className="relative w-full bg-[#0a0f1a] border border-white/10 p-6 rounded-2xl text-white font-mono text-xl focus:border-[#ffaa00] outline-none shadow-2xl transition-all" 
          />
          <button className="absolute right-3 top-3 bottom-3 px-8 bg-[#ffaa00] rounded-xl text-[#050810] font-black font-orbitron hover:shadow-[0_0_20px_rgba(255,170,0,0.5)] transition-all flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">ANALYZE</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white/5 rounded-3xl border border-white/5 flex flex-col justify-between h-40">
            <p className="text-[10px] text-gray-500 font-mono mb-1 uppercase tracking-widest">Likely Owner Name</p>
            <p className="text-2xl font-bold text-white font-orbitron tracking-wide opacity-50">NO DATA FOUND</p>
            <div className="h-1 w-12 bg-[#ffaa0030] rounded-full" />
          </div>

          <div className="p-8 bg-white/5 rounded-3xl border border-white/5 h-40">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] text-gray-500 font-mono uppercase">Spam Risk Level</p>
              <span className="text-[10px] text-[#ffaa00] font-bold">0%</span>
            </div>
            <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
              <div className="w-0 bg-[#ffaa00] h-full transition-all duration-1000" />
            </div>
            <p className="text-[9px] text-gray-600 mt-4 font-mono leading-relaxed">
              Our system checks against 5M+ reported spam signatures globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * THREAT ANALYST COMPONENT
 */
function ThreatAnalyst() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 animate-in zoom-in-95 duration-1000">
      <div className="glass-card p-10 border-t-4 border-[#ff3366] bg-gradient-to-b from-[#ff336605] to-transparent">
        <div className="flex items-center gap-5 mb-8">
          <div className="p-4 bg-[#ff336615] rounded-2xl">
            <FileWarning className="text-[#ff3366] w-8 h-8" />
          </div>
          <h3 className="font-orbitron text-2xl text-white uppercase tracking-tighter">Malware Shield</h3>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-mono uppercase ml-1">Universal URL Scan</label>
            <input 
              type="text" 
              placeholder="https://example-secure-link.io" 
              className="w-full bg-[#0a0f1a] border border-white/10 p-5 rounded-2xl text-sm focus:border-[#ff3366] outline-none font-mono text-[#ff3366]" 
            />
          </div>

          <div className="group relative border-2 border-dashed border-white/10 p-16 text-center rounded-3xl hover:border-[#ff336650] transition-all cursor-pointer bg-white/5">
            <div className="mb-4 flex justify-center">
              <Zap className="w-10 h-10 text-gray-700 group-hover:text-[#ff3366] transition-colors" />
            </div>
            <p className="text-gray-400 font-mono text-sm group-hover:text-white transition-colors">
              UPLOAD PAYLOAD FOR HEURISTIC ANALYSIS
            </p>
            <p className="text-[9px] text-gray-600 mt-4 uppercase tracking-[0.2em]">Supported: PDF, EXE, JPG, ZIP (MAX 64MB)</p>
          </div>

          <button className="w-full py-5 bg-[#ff336620] border border-[#ff3366] text-[#ff3366] font-black font-orbitron uppercase tracking-[0.3em] hover:bg-[#ff336630] transition-all rounded-2xl">
            INITIATE DEEP SCAN
          </button>
        </div>
      </div>

      <div className="glass-card p-10 border-t-4 border-[#00d4ff] bg-gradient-to-b from-[#00d4ff05] to-transparent">
        <div className="flex items-center gap-5 mb-8">
          <div className="p-4 bg-[#00d4ff15] rounded-2xl">
            <Activity className="text-[#00d4ff] w-8 h-8" />
          </div>
          <h3 className="font-orbitron text-2xl text-white uppercase tracking-tighter">Spyware Auditor</h3>
        </div>

        <div className="space-y-10">
          <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-xs font-mono text-gray-300 uppercase">Camera Integrity</span>
              </div>
              <span className="text-xs text-[#00ff88] font-black font-mono">SECURED</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="w-full bg-[#00ff88] h-full shadow-[0_0_10px_#00ff88]" />
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#ffaa00]" />
                <span className="text-xs font-mono text-gray-300 uppercase">Background Trackers</span>
              </div>
              <span className="text-xs text-[#ffaa00] font-black font-mono animate-pulse">PENDING AUDIT</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="w-1/3 bg-[#ffaa00] h-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 text-center">
              <p className="text-[10px] text-gray-600 font-mono uppercase mb-1">Last Audit</p>
              <p className="text-xs text-white font-mono">Never</p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 text-center">
              <p className="text-[10px] text-gray-600 font-mono uppercase mb-1">Threat Level</p>
              <p className="text-xs text-[#00ff88] font-mono font-bold">ALPHA-1</p>
            </div>
          </div>

          <button className="w-full py-5 bg-[#00d4ff15] border border-[#00d4ff] text-[#00d4ff] font-black font-orbitron uppercase tracking-widest hover:bg-[#00d4ff25] transition-all rounded-2xl shadow-lg">
            EXECUTE PERMISSION AUDIT
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * SIDEBAR NAVIGATION COMPONENT
 */
function Sidebar({ active, setActive, collapsed, setCollapsed, onLogout }) {
  const extendedModules = [
    { id: 'home', label: 'Command Center', icon: LayoutGrid, color: '#00ff88' },
    { id: 'shield', label: 'LINK SHIELD', icon: ShieldCheck, color: '#00ffcc' },
    { id: 'user', label: 'Identity Portal', icon: UserCheck, color: '#00ff88' },
    { id: 'spam', label: 'Spam Guardian', icon: Smartphone, color: '#ffaa00' },
    { id: 'threat_intel', label: 'Threat Analyst', icon: FileWarning, color: '#ff3366' },
    { id: 'threat', label: 'Threat Scanner', icon: Eye, color: '#00d4ff' },
    { id: 'breach', label: 'Breach Monitor', icon: AlertTriangle, color: '#ff3366' },
    { id: 'attack', label: 'Attack Map', icon: Map, color: '#ff4d4d' },
    { id: 'phish', label: 'Phish Guard', icon: MousePointer, color: '#ffaa00' },
    { id: 'vault', label: 'Password Vault', icon: Lock, color: '#00ff88' },
    { id: 'vpn', label: 'VPN Shield', icon: Globe, color: '#b44dff' },
    { id: 'report', label: 'Local Reports', icon: Database, color: '#00ccff' },
    { id: 'safety', label: 'Social Safety', icon: ShieldCheck, color: '#ff00ff' },
    { id: 'network', label: 'Network Mapper', icon: Zap, color: '#ffff00' },
    { id: 'privacy', label: 'Privacy Audit', icon: Activity, color: '#ffaa00' },
    { id: 'ai', label: 'AI Chatbot', icon: MessageSquare, color: '#00d4ff' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-40 flex flex-col transition-all duration-700 ease-in-out shadow-2xl ${collapsed ? 'w-24' : 'w-72'}`}
      style={{ 
        background: 'rgba(5,8,16,0.98)', 
        backdropFilter: 'blur(40px)', 
        borderRight: '1px solid rgba(0,255,136,0.1)' 
      }}
    >
      <div className="flex flex-col items-center py-10 border-b border-white/5 space-y-6">
        <div className="relative group cursor-pointer" onClick={() => setActive('home')}>
          <div className="absolute -inset-2 bg-[#00ff88] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <div className="w-16 h-16 rounded-2xl border-2 border-[#00ff8840] overflow-hidden bg-[#050810] shadow-[0_0_20px_rgba(0,255,136,0.15)] transition-transform duration-500 group-hover:scale-110">
            <img src="/logo.png" alt="SS" className="w-full h-full object-cover" />
          </div>
        </div>
        
        {!collapsed && (
          <div className="text-center animate-in fade-in slide-in-from-top-2 duration-1000">
            <span className="text-sm text-[#00ff88] font-orbitron font-black tracking-[0.4em] uppercase block">Sentinel</span>
            <span className="text-[9px] text-gray-500 block font-mono mt-2 tracking-widest">SYSTEM ENCRYPTED // UID-8801</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {extendedModules.map((mod) => (
          <button 
            key={mod.id} 
            onClick={() => setActive(mod.id)}
            className={`w-full flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden
              ${active === mod.id ? 'bg-[#00ff8810] border border-[#00ff8825]' : 'hover:bg-white/5'}`}
            style={{ color: active === mod.id ? mod.color : '#64748b' }}
          >
            {active === mod.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00ff88]" />
            )}
            <mod.icon className={`w-5 h-5 transition-transform duration-500 ${active === mod.id ? 'scale-125' : 'group-hover:scale-125'}`} />
            {!collapsed && (
              <span className="text-[13px] font-bold font-exo tracking-widest uppercase">{mod.label}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-4">
        <button className="w-full flex items-center gap-5 px-5 py-3 text-gray-500 hover:text-white transition-all group">
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-700" />
          {!collapsed && <span className="text-[10px] font-mono tracking-widest">SYSTEM CFG</span>}
        </button>
        <button 
          onClick={onLogout} 
          className="w-full flex items-center gap-5 px-5 py-3 text-red-500/60 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-[10px] font-mono tracking-widest uppercase">Terminate</span>}
        </button>
      </div>

      <button 
        onClick={() => setCollapsed(!collapsed)} 
        className="absolute top-1/2 -right-4 w-8 h-16 bg-[#00ff88] text-[#050810] flex items-center justify-center rounded-xl shadow-2xl hover:scale-105 transition-transform"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 rotate-180" />}
      </button>
    </aside>
  );
}

/**
 * DASHBOARD HOME LANDING PAGE
 * API ডাটা এখানে প্রপস হিসেবে পাঠানো হয়েছে
 */
function DashboardHome({ setActive, apiStats }) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <LiveStatusBar />
      
      <div className="relative p-12 flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/5 rounded-[3rem] bg-gradient-to-br from-[#00ff8808] via-transparent to-[#00d4ff08] backdrop-blur-xl overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00ff8810] blur-[120px] rounded-full group-hover:bg-[#00ff8815] transition-all duration-1000" />
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-44 h-44 flex-shrink-0 relative">
             <div className="absolute inset-0 bg-[#00ff8825] blur-3xl animate-pulse rounded-full" />
             <img 
               src="/logo.png" 
               alt="SentinelShield Core" 
               className="relative w-full h-full object-cover drop-shadow-[0_0_40px_rgba(0,255,136,0.5)] transition-transform duration-700 hover:scale-110" 
             />
          </div>
          
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="font-orbitron text-5xl md:text-6xl font-black text-white tracking-tight">
                SENTINEL<span className="text-[#00ff88]">SHIELD</span>
              </h1>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="h-[1px] w-12 bg-[#00ff88]" />
                <p className="text-[#00ff88] font-mono text-[10px] tracking-[0.6em] uppercase">Security Ecosystem v3.0</p>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#00ff8840] pl-6 py-2 max-w-xl bg-white/5 rounded-r-2xl">
              <p className="text-sm md:text-lg text-gray-300 font-mono italic leading-relaxed">
                "Bridging the gap between code and core. It’s an honour to be your silent guardian."
              </p>
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:w-auto">
          <button 
            onClick={() => setActive('threat_intel')} 
            className="p-6 bg-[#00ff88] text-[#050810] rounded-3xl font-black font-orbitron text-xs shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:translate-y-[-5px] transition-all uppercase tracking-widest"
          >
            Execute Scan
          </button>
          <button 
            onClick={() => setActive('user')} 
            className="p-6 bg-white/5 border border-white/10 text-white rounded-3xl font-mono text-[10px] hover:bg-white/10 transition-all uppercase tracking-[0.3em]"
          >
            Profile Sync
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {apiStats.map((s, i) => (
          <div key={i} className="glass-card p-8 border-b-4 hover:translate-y-[-10px] transition-all duration-500" style={{ borderBottomColor: s.color }}>
            <div className="flex justify-between items-start mb-6">
              <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">{s.label}</div>
              <s.icon className="w-4 h-4 opacity-30" style={{ color: s.color }} />
            </div>
            <div className="text-3xl font-black font-orbitron text-white tracking-wider">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-card p-1 shadow-2xl">
          <AttackMap />
        </div>
        <div className="glass-card p-1 shadow-2xl">
          <NewsFeed />
        </div>
      </div>

      <div className="h-40" />
    </div>
  );
}

/**
 * MAIN DASHBOARD EXPORT COMPONENT
 * এখানে API Fetching লজিক যোগ করা হয়েছে
 */
export default function Dashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [activeModule, setActiveModule] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  
  // API ডাটা স্টেট
  const [dashboardStats, setDashboardStats] = useState([
    { label: 'Uptime Integrity', value: '...', color: '#00ff88', icon: Cpu },
    { label: 'Threats Deflected', value: '...', color: '#ff3366', icon: Shield },
    { label: 'Active Protocols', value: '...', color: '#00d4ff', icon: Lock },
    { label: 'Identity Masking', value: '...', color: '#b44dff', icon: Eye }
  ]);

  // সেন্ট্রালাইজড এপিআই ফেচিং ফাংশন
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      
      // এপিআই থেকে পাওয়া ডাটা দিয়ে স্টেট আপডেট
      setDashboardStats([
        { label: 'Uptime Integrity', value: data.systemInfo.uptime, color: '#00ff88', icon: Cpu },
        { label: 'Threats Deflected', value: data.stats[0].value, color: '#ff3366', icon: Shield },
        { label: 'Active Protocols', value: data.systemInfo.encryption, color: '#00d4ff', icon: Lock },
        { label: 'Identity Masking', value: 'ENABLED', color: '#b44dff', icon: Eye }
      ]);
    } catch (error) {
      console.error("Sentinel API Error:", error);
    }
  };

  useEffect(() => {
    console.log("%c[SENTINELSHIELD V3.0 CORE INITIALIZED]", "color: #00ff88; font-weight: bold;");
    if (isAuth) {
      fetchStats();
      // প্রতি ৩০ সেকেন্ডে অটো রিফ্রেশ
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuth]);

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center p-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00ff8810] blur-[150px] rounded-full" />
        
        <div className="glass-card p-16 w-full max-w-xl text-center border-t-8 border-[#00ff88] relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="relative w-32 h-32 mx-auto mb-10 group">
            <div className="absolute inset-0 bg-[#00ff8820] blur-2xl group-hover:bg-[#00ff8840] transition-all duration-700 rounded-full" />
            <img src="/logo.png" alt="SentinelShield" className="relative w-full h-full object-cover drop-shadow-[0_0_20px_rgba(0,255,136,0.4)]" />
          </div>
          <h2 className="font-orbitron text-4xl text-white tracking-[0.4em] mb-4 uppercase font-black">Sentinel</h2>
          <p className="text-[10px] text-[#00ff88] font-mono tracking-[0.5em] mb-12 uppercase">Authorization Required to Proceed</p>
          
          <button 
            onClick={() => setIsAuth(true)} 
            className="group relative w-full py-6 bg-transparent border-2 border-[#00ff88] text-[#00ff88] font-black font-orbitron rounded-2xl overflow-hidden transition-all hover:text-[#050810]"
          >
            <div className="absolute inset-0 bg-[#00ff88] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 tracking-[0.4em]">INITIATE ACCESS</span>
          </button>
        </div>
      </div>
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'home': return <DashboardHome setActive={setActiveModule} apiStats={dashboardStats} />;
      case 'user': return <UserPortal />;
      case 'spam': return <SpamGuard />;
      case 'threat_intel': return <ThreatAnalyst />;
      case 'threat': return <ThreatScanner />;
      case 'breach': return <BreachMonitor />;
      case 'vault': return <PasswordVault />;
      case 'vpn': return <VPNDashboard />;
      case 'privacy': return <PrivacyAudit />;
      case 'ai': return <AIChatbot />;
      case 'attack': return <AttackMap />;
      case 'phish': return <PhishGuard />;
      case 'report': return <ReportStorage />;
      case 'safety': return <SocialSafety />;
      case 'network': return <NetworkMapper />;
      case 'shield': return <LinkShield />;
      default: return <DashboardHome setActive={setActiveModule} apiStats={dashboardStats} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050810] text-slate-200 selection:bg-[#00ff88] selection:text-[#050810] font-sans">
      {/* গ্লোবাল নেভিগেশন বার */}
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 border-b border-white/5 bg-[#050810]/90 backdrop-blur-2xl flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <Shield className="w-7 h-7 text-[#00ff88]" />
          <div className="h-6 w-[1px] bg-white/10" />
          <span className="font-orbitron font-black text-xs tracking-[0.5em] text-white">SCU-MAIN-GRID</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
            <Activity className="w-3 h-3 text-[#00ff88] animate-pulse" />
            <span className="text-[9px] font-mono text-[#00ff88] tracking-widest">ENCRYPTED CONNECTION : ACTIVE</span>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCcw className="w-4 h-4 text-gray-500 cursor-pointer hover:text-[#00ff88] transition-colors" onClick={fetchStats} />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00ff8830] to-transparent border border-[#00ff8840] flex items-center justify-center">
              <User className="w-5 h-5 text-[#00ff88]" />
            </div>
          </div>
        </div>
      </nav>

      <Sidebar 
        active={activeModule} 
        setActive={setActiveModule} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        onLogout={() => setIsAuth(false)}
      />

      <main 
        className="flex-1 p-10 mt-16 transition-all duration-700 ease-in-out" 
        style={{ 
          marginLeft: collapsed ? '96px' : '288px', 
          width: `calc(100% - ${collapsed ? '96px' : '288px'})` 
        }}
      >
        <div className="max-w-7xl mx-auto min-h-[calc(100vh-8rem)]">
          {renderModule()}
        </div>
      </main>
    </div>
  );
}
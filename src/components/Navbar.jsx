'use client';
import { useState, useEffect } from 'react';
import { Shield, Menu, X, Zap, Cpu, Lock, Terminal, User, LogOut, Settings, Bell, Loader2 } from 'lucide-react';

// পেজ আইডিগুলো আপডেট করা হয়েছে যাতে প্রতিটা বাটনে আলাদা পেজ লোড হয়
const navLinks = [
  { label: 'Dashboard', page: 'dashboard' },
  { label: 'Threat Scanner', page: 'threat-scanner' },
  { label: 'Breach Monitor', page: 'breach-monitor' },
  { label: 'VPN Shield', page: 'vpn-shield' },
];

export default function Navbar({ activePage, setActivePage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [sysStatus, setSysStatus] = useState({ version: 'v2.4.1', status: 'ONLINE' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const loadSessionData = async () => {
      try {
        const sessionRes = await fetch('/api/user-session');
        const sessionData = await sessionRes.json();
        if(sessionData.system) setSysStatus({ version: sessionData.system.version, status: sessionData.system.status });

        const profileRes = await fetch('/api/user-portal');
        const profileData = await profileRes.json();
        setUserData(profileData);
      } catch (error) {
        console.log("Sentinel Core: Local Mode Active");
        setUserData({
          name: "SENTINEL_ADMIN",
          role: "Level 4 Access",
          email: "admin@sentinel.shield",
          image: null
        });
      } finally {
        setProfileLoading(false);
      }
    };

    loadSessionData();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-2' : 'py-0'}`}
      style={{
        background: scrolled ? 'rgba(5,8,16,0.95)' : 'rgba(5,8,16,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none'
      }}>
      
      <div className="hidden md:block w-full bg-blue-500/5 border-b border-white/5 py-1 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[9px] font-mono tracking-[2px] text-slate-500">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Terminal size={10} className="text-blue-500" /> NODE_STATUS: {sysStatus.status}</span>
            <span className="flex items-center gap-1"><Lock size={10} className="text-purple-500" /> ENCRYPTION: AES_256</span>
          </div>
          <div className="animate-pulse text-blue-400">
             CORE_VERSION: {sysStatus.version}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - পরিবর্তন করা হয়েছে: ক্লিক করলে সরাসরি ল্যান্ডিং (Hero) পেজে ব্যাক করবে */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('hero')}>
            <div className="relative">
              <Shield className="w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg]" style={{ color: '#00d4ff' }} />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Shield className="w-8 h-8" style={{ color: '#00d4ff' }} />
              </div>
              <div className="absolute inset-0 blur-lg bg-blue-500/20 rounded-full -z-10"></div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="font-display font-bold tracking-widest leading-none"
                style={{ color: '#00d4ff', fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem' }}>
                SENTINEL
              </span>
              <span className="font-display font-bold tracking-widest lg:ml-1 leading-none"
                style={{ color: '#b44dff', fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem' }}>
                SHIELD
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.label}
                onClick={() => setActivePage(link.page)}
                className={`px-4 py-2 text-[11px] uppercase font-bold tracking-[2px] transition-all duration-300 relative group overflow-hidden ${
                  activePage === link.page ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
                style={{ fontFamily: 'Exo 2, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="relative z-10">{link.label}</span>
                <div className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ${
                  activePage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
                <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            ))}
          </div>

          {/* User Profile Area */}
          <div className="hidden md:flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-blue-400 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <div className="relative">
              {profileLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              ) : (
                <div 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 cursor-pointer group p-1 pr-3 rounded-full bg-white/5 border border-white/5 hover:border-[#00d4ff30] transition-all"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-[#00d4ff] overflow-hidden bg-[#00d4ff20] flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                    {userData?.image ? (
                      <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-[#00d4ff]" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white leading-none uppercase tracking-tighter">{userData?.name}</span>
                    <span className="text-[8px] text-[#00ff88] font-mono mt-1 opacity-80">{userData?.role}</span>
                  </div>
                </div>
              )}

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-52 bg-[#0a0f1a] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-[110]">
                  <div className="p-3 border-b border-white/5 mb-2">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Auth_Token</p>
                    <p className="text-[10px] font-bold text-blue-300 truncate font-mono">{userData?.email}</p>
                  </div>
                  <button className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-gray-400 hover:text-[#00d4ff] hover:bg-blue-500/5 rounded-xl transition-all font-mono">
                    <User size={14} /> ACCESS_PROFILE
                  </button>
                  <button className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-gray-400 hover:text-[#00d4ff] hover:bg-blue-500/5 rounded-xl transition-all font-mono">
                    <Settings size={14} /> SYSTEM_CONFIG
                  </button>
                  <button className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-2 border-t border-white/5 pt-2 font-mono">
                    <LogOut size={14} /> TERMINATE_SESSION
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <button onClick={() => setMobileOpen(!mobileOpen)}
               className="bg-transparent border-none cursor-pointer text-[#00d4ff]">
               {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
             </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-[600px] opacity-100 py-6' : 'max-h-0 opacity-0'
        }`} style={{ borderTop: mobileOpen ? '1px solid rgba(0,212,255,0.1)' : 'none' }}>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button key={link.label}
                onClick={() => { setActivePage(link.page); setMobileOpen(false); }}
                className="block w-full text-left py-4 px-4 rounded-lg hover:bg-blue-500/10 transition-all border border-transparent hover:border-blue-500/20 bg-transparent cursor-pointer"
                style={{ 
                  color: activePage === link.page ? '#00d4ff' : 'rgba(224,232,240,0.8)', 
                  fontFamily: 'Exo 2, sans-serif', 
                  letterSpacing: '1px'
                }}>
                <div className="flex justify-between items-center">
                  <span>{link.label}</span>
                  <ChevronRight size={14} className="opacity-30" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ChevronRight হেল্পার ফাংশনটি বাইরে আলাদা করে ডিফাইন করা হলো
function ChevronRight({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
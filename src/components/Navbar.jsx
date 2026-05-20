'use client';
import { useState, useEffect } from 'react';
import { Shield, Menu, X, Lock, Terminal, User, LogOut, Settings, Bell, Loader2, ChevronRight } from 'lucide-react';

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
  const [userData, setUserData] = useState({ name: "SENTINEL_ADMIN", role: "Level 4 Access", email: "admin@sentinel.shield" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [sysStatus] = useState({ version: 'v2.4.1', status: 'ONLINE' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-2' : 'py-2'}`}
      style={{
        background: 'rgba(5,8,16,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,212,255,0.1)'
      }}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('hero')}>
            <Shield className="w-8 h-8" style={{ color: '#00d4ff' }} />
            <div className="flex flex-col">
              <span className="font-bold tracking-widest text-[1.1rem]" style={{ color: '#00d4ff', fontFamily: 'Orbitron, sans-serif' }}>SENTINEL</span>
              <span className="font-bold tracking-widest text-[1.1rem]" style={{ color: '#b44dff', fontFamily: 'Orbitron, sans-serif' }}>SHIELD</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => setActivePage(link.page)}
                className={`px-4 py-2 text-[11px] uppercase font-bold tracking-[2px] transition-all ${activePage === link.page ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                {link.label}
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <div onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full bg-white/5 border border-white/5 hover:border-[#00d4ff30] transition-all">
                <div className="w-8 h-8 rounded-full border-2 border-[#00d4ff] flex items-center justify-center bg-[#00d4ff20]">
                  <User size={16} className="text-[#00d4ff]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white uppercase">{userData.name}</span>
                  <span className="text-[8px] text-[#00ff88] font-mono">{userData.role}</span>
                </div>
              </div>

              {/* Dropdown Menu - বাটন ক্লিক ঠিক করা হয়েছে */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-52 bg-[#0a0f1a] border border-white/10 rounded-2xl p-2 z-[110]">
                  <button onClick={() => {setActivePage('profile'); setShowDropdown(false)}} className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-gray-400 hover:text-[#00d4ff] hover:bg-blue-500/5 rounded-xl">
                    <User size={14} /> ACCESS_PROFILE
                  </button>
                  <button onClick={() => {setActivePage('profile'); setShowDropdown(false)}} className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-gray-400 hover:text-[#00d4ff] hover:bg-blue-500/5 rounded-xl">
                    <Settings size={14} /> SYSTEM_CONFIG
                  </button>
                  <button className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-red-400 hover:bg-red-500/10 rounded-xl mt-2 border-t border-white/5 pt-2">
                    <LogOut size={14} /> TERMINATE_SESSION
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#00d4ff]">
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-6 space-y-4 border-t border-white/10">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => {setActivePage(link.page); setMobileOpen(false)}} className="block w-full text-left py-2 text-white font-bold uppercase tracking-widest">
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
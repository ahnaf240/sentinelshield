'use client';
import { useState, useEffect } from 'react';
import {
  Shield, Menu, X, Lock, Terminal, User,
  LogOut, Settings, Bell, Loader2, ChevronRight
} from 'lucide-react';

const navLinks = [
  { label: 'Dashboard',      page: 'dashboard' },
  { label: 'Threat Scanner', page: 'threat-scanner' },
  { label: 'Breach Monitor', page: 'breach-monitor' },
  { label: 'VPN Shield',     page: 'vpn-shield' },
];

export default function Navbar({ activePage, setActivePage }) {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [showDropdown,  setShowDropdown]  = useState(false);
  const [userData]      = useState({
    name:  'SENTINEL_ADMIN',
    role:  'Level 4 Access',
    email: 'admin@sentinel.shield',
  });
  const [sysStatus] = useState({ version: 'v2.4.1', status: 'ONLINE' });

  /* scroll effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* close dropdown when clicking outside */
  useEffect(() => {
    if (!showDropdown) return;
    const close = () => setShowDropdown(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [showDropdown]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500`}
      style={{
        background:     'rgba(5,8,16,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom:   '1px solid rgba(0,212,255,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ────────────────────────────── */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActivePage('hero')}
          >
            <Shield className="w-8 h-8" style={{ color: '#00d4ff' }} />
            <div className="flex flex-col leading-none">
              <span
                className="font-bold tracking-widest"
                style={{ color: '#00d4ff', fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem' }}
              >
                SENTINEL
              </span>
              <span
                className="font-bold tracking-widest"
                style={{ color: '#b44dff', fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem' }}
              >
                SHIELD
              </span>
            </div>
          </div>

          {/* ── Desktop Nav Links ────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setActivePage(link.page)}
                className={`px-4 py-2 text-[11px] uppercase font-bold tracking-[2px] transition-all rounded
                  ${activePage === link.page
                    ? 'text-white bg-white/5 border border-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── Right: Profile dropdown ──────────── */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              {/* Avatar button */}
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full transition-all"
                style={{
                  background:   'rgba(255,255,255,0.05)',
                  border:       showDropdown
                    ? '1px solid rgba(0,212,255,0.35)'
                    : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    border:     '2px solid #00d4ff',
                    background: 'rgba(0,212,255,0.12)',
                  }}
                >
                  <User size={16} style={{ color: '#00d4ff' }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white uppercase">{userData.name}</span>
                  <span className="text-[8px] font-mono" style={{ color: '#00ff88' }}>{userData.role}</span>
                </div>
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div
                  className="absolute right-0 mt-3 w-52 rounded-2xl p-2"
                  style={{
                    background: '#0a0f1a',
                    border:     '1px solid rgba(255,255,255,0.1)',
                    boxShadow:  '0 20px 40px rgba(0,0,0,0.6)',
                    zIndex:     99999,
                    top:        '100%',
                  }}
                >
                  <button
                    onClick={() => { setActivePage('profile'); setShowDropdown(false); }}
                    className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-gray-400 hover:text-[#00d4ff] rounded-xl transition-colors"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <User size={14} /> ACCESS_PROFILE
                  </button>
                  <button
                    onClick={() => { setActivePage('profile'); setShowDropdown(false); }}
                    className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-gray-400 hover:text-[#00d4ff] rounded-xl transition-colors"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Settings size={14} /> SYSTEM_CONFIG
                  </button>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 8, paddingTop: 8 }}>
                    <button
                      className="w-full flex items-center gap-3 p-2.5 text-[10px] font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <LogOut size={14} /> TERMINATE_SESSION
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Mobile hamburger ─────────────────── */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00d4ff' }}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────────────── */}
        {mobileOpen && (
          <div
            className="md:hidden py-6 space-y-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[...navLinks, { label: 'Profile', page: 'profile' }].map((link) => (
              <button
                key={link.label}
                onClick={() => { setActivePage(link.page); setMobileOpen(false); }}
                className="block w-full text-left py-2 font-bold uppercase tracking-widest transition-colors"
                style={{
                  background: 'none',
                  border:     'none',
                  cursor:     'pointer',
                  color:      activePage === link.page ? '#00d4ff' : '#fff',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize:   '0.8rem',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
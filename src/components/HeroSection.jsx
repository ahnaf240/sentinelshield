'use client';
import { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Zap, Globe, AlertTriangle, ChevronRight, Activity } from 'lucide-react';

// Animated typing text Component
function TypingText({ texts }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    
    const current = texts[index];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 30);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIndex((index + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, index, texts]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse ml-0.5" style={{ color: '#00d4ff' }}>|</span>
    </span>
  );
}

// Stat counter Component
function StatCounter({ value, label, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(value.replace(/\D/g, ''), 10) || 0;
    if (target === 0) return;

    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev + step >= target) {
          clearInterval(timer);
          return target;
        }
        return prev + step;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-card p-6 text-center bg-slate-900/30 border border-slate-800 rounded-xl backdrop-blur-sm">
      <div className="text-3xl font-bold mb-1" style={{ color, fontFamily: 'Orbitron, sans-serif' }}>
        {count.toLocaleString()}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}
      </div>
      <div className="text-sm text-slate-400 font-sans" style={{ fontFamily: '"Exo 2", sans-serif' }}>
        {label}
      </div>
    </div>
  );
}

// Rotating shield SVG Component
function ShieldOrb() {
  return (
    <div className="relative flex items-center justify-center w-[380px] h-[380px]">
      <svg className="absolute animate-[spin_15s_linear_infinite]" width="380" height="380" viewBox="0 0 380 380">
        <circle cx="190" cy="190" r="180" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="8 6" />
        <circle cx="190" cy="190" r="160" fill="none" stroke="rgba(180,77,255,0.1)" strokeWidth="1" strokeDasharray="4 12" />
      </svg>
      <svg className="absolute animate-[spin_8s_linear_infinite_reverse]" width="300" height="300" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(0,255,136,0.12)" strokeWidth="1" strokeDasharray="6 8" />
      </svg>
      <div className="absolute rounded-full w-[200px] h-[200px] bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-transparent blur-xl pointer-events-none" />
      <div className="animate-[bounce_4s_ease-in-out_infinite]">
        <Shield className="w-[120px] h-[120px] text-cyan-400 drop-shadow-[0_0_30px_rgba(0,212,255,0.6)]" />
      </div>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div key={i} className="absolute w-2 h-2 rounded-full" style={{
          background: i % 2 === 0 ? '#00d4ff' : '#b44dff',
          boxShadow: `0 0 8px ${i % 2 === 0 ? '#00d4ff' : '#b44dff'}`,
          transform: `rotate(${deg}deg) translateX(170px)`,
          animation: `spin ${10 + i}s linear infinite`,
          transformOrigin: 'center',
        }} />
      ))}
    </div>
  );
}

const features = [
  { id: 'threat-scanner', icon: Eye, label: 'Threat Scanner', desc: 'Real-time URL & malware detection', color: '#00d4ff' },
  { id: 'breach-monitor', icon: AlertTriangle, label: 'Breach Monitor', desc: 'Dark web leak detection', color: '#ff3366' },
  { id: 'password-vault', icon: Lock, label: 'Password Vault', desc: 'Military-grade encryption', color: '#00ff88' },
  { id: 'vpn-shield', icon: Globe, label: 'VPN Shield', desc: 'Anonymous IP routing', color: '#b44dff' },
  { id: 'privacy-audit', icon: Activity, label: 'Privacy Audit', desc: 'Social media risk scoring', color: '#00d4ff' },
  { id: 'chatbot', icon: Zap, label: 'AI Chatbot', desc: 'Instant security advisor', color: '#ffaa00' },
];

export default function HeroSection({ setActivePage }) {
  const [sysData, setSysData] = useState(null);

  // নিরাপদ নেভিগেশন ফাংশন
  const handleNavigation = (page) => {
    if (typeof setActivePage === 'function') {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.error("Sentinel Core: setActivePage function not found.");
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch('/api/system-status')
      .then(res => res.json())
      .then(data => {
        if (isMounted) setSysData(data);
      })
      .catch(() => console.log("System offline - Local mode active"));
      
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="relative text-slate-200">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">

            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#00d4ff]" />
                <span style={{ fontFamily: 'Share Tech Mono, monospace' }} className="text-cyan-400 text-xs tracking-widest uppercase">
                  {sysData?.protocol || 'v2.4.1'} — ACTIVE PROTECTION
                </span>
              </div>

              <div>
                <h1 style={{ fontFamily: 'Orbitron, sans-serif' }} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none">
                  <span className="text-slate-100">YOUR DIGITAL</span><br />
                  <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(0,212,255,0.4)]">FORTRESS</span><br />
                  <span className="text-slate-400 text-3xl sm:text-4xl lg:text-5xl">IN THE CYBER STORM</span>
                </h1>
              </div>

              <div style={{ fontFamily: 'Share Tech Mono, monospace' }} className="text-emerald-400 text-base min-h-[1.5rem]">
                <TypingText texts={[
                  '> Scanning for threats...',
                  '> Monitoring dark web leaks...',
                  '> Encrypting your vault...',
                  '> Routing through VPN nodes...',
                  '> AI threat analysis active...',
                ]} />
              </div>

              <p style={{ fontFamily: '"Exo 2", sans-serif' }} className="text-base leading-relaxed text-slate-400 max-w-lg">
                SentinelShield gives everyday users a professional-grade cybersecurity command center.
                Real-time protection, breach alerts, and encrypted vaults — all in one platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  className="neon-btn flex items-center gap-2 cursor-pointer bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 px-7 py-3 rounded text-xs font-bold tracking-wider" 
                  onClick={() => handleNavigation('dashboard')}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  <Shield className="w-4 h-4" />
                  ENTER COMMAND CENTER
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleNavigation('dashboard')}
                  className="px-7 py-3 bg-purple-500/10 border border-purple-500/30 rounded text-purple-400 text-xs font-bold tracking-widest cursor-pointer hover:bg-purple-500/20 transition-all duration-300"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  VIEW LIVE DEMO
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000">
              <ShieldOrb />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 px-4 bg-white/5 backdrop-blur-sm border-t border-b border-cyan-500/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCounter value="2,400,000+" label="Threats Blocked" color="#00d4ff" />
          <StatCounter value="98%" label="Detection Rate" color="#00ff88" />
          <StatCounter value="150,000+" label="Users Protected" color="#b44dff" />
          <StatCounter value={sysData?.activeNodes ? `${sysData.activeNodes}+` : "500+"} label="Breach Databases" color="#ffaa00" />
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 style={{ fontFamily: 'Orbitron, sans-serif' }} className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              SECURITY <span className="text-cyan-400">ARSENAL</span>
            </h2>
            <p style={{ fontFamily: '"Exo 2", sans-serif' }} className="text-slate-500">
              Six powerful modules. One unified platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div 
                  key={i} 
                  className="glass-card p-6 cursor-pointer group border border-slate-800 hover:border-slate-700/80 rounded-xl bg-slate-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleNavigation(f.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg" style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                      <Icon style={{ width: 22, height: 22, color: f.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-slate-200 tracking-wider text-xs uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {f.label}
                      </h3>
                      <p className="text-sm text-slate-400" style={{ fontFamily: '"Exo 2", sans-serif' }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${f.color}40, transparent)` }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden border border-cyan-500/20 bg-slate-900/10 rounded-2xl backdrop-blur-sm">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.06)_0%,transparent_70%)]" />
            <h2 style={{ fontFamily: 'Orbitron, sans-serif' }} className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
              READY TO SECURE YOUR <span className="text-cyan-400">DIGITAL LIFE?</span>
            </h2>
            <p className="mb-8 text-slate-400" style={{ fontFamily: '"Exo 2", sans-serif' }}>
              Join 150,000+ users already protected by SentinelShield
            </p>
            <button 
              className="neon-btn cursor-pointer bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 px-10 py-3.5 rounded font-bold text-sm tracking-wider" 
              onClick={() => handleNavigation('dashboard')}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ACTIVATE SHIELD NOW
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-slate-900">
        <p style={{ fontFamily: 'Share Tech Mono, monospace' }} className="text-slate-600 text-xs tracking-wider">
          © 2026 SENTINELSHIELD // ALL SYSTEMS OPERATIONAL // {sysData?.protocol || 'v2.4.1'}
        </p>
      </footer>
    </div>
  );
}
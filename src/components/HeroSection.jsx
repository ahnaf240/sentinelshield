'use client';
import { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Zap, Globe, AlertTriangle, ChevronRight, Activity } from 'lucide-react';

// Animated typing text
function TypingText({ texts }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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
      <span className="animate-pulse" style={{ color: '#00d4ff' }}>|</span>
    </span>
  );
}

// Stat counter
function StatCounter({ value, label, color }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = parseInt(value.replace(/\D/g, ''));
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev + step >= target) { clearInterval(timer); return target; }
        return prev + step;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-card p-6 text-center">
      <div className="text-3xl font-bold mb-1" style={{ color, fontFamily: 'Orbitron, sans-serif' }}>
        {count.toLocaleString()}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}
      </div>
      <div className="text-sm" style={{ color: 'rgba(224,232,240,0.6)', fontFamily: 'Exo 2, sans-serif' }}>
        {label}
      </div>
    </div>
  );
}

// Rotating shield SVG
function ShieldOrb() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 380, height: 380 }}>
      {/* Outer ring */}
      <svg className="absolute" style={{ animation: 'rotateSlow 15s linear infinite' }} width="380" height="380" viewBox="0 0 380 380">
        <circle cx="190" cy="190" r="180" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="8 6" />
        <circle cx="190" cy="190" r="160" fill="none" stroke="rgba(180,77,255,0.1)" strokeWidth="1" strokeDasharray="4 12" />
      </svg>
      {/* Inner ring counter-rotating */}
      <svg className="absolute" style={{ animation: 'rotateSlow 8s linear infinite reverse' }} width="300" height="300" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(0,255,136,0.12)" strokeWidth="1" strokeDasharray="6 8" />
      </svg>
      {/* Glow orb */}
      <div className="absolute rounded-full" style={{
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(180,77,255,0.06) 50%, transparent 70%)',
        filter: 'blur(20px)',
      }} />
      {/* Main Shield Icon */}
      <div style={{ animation: 'float 5s ease-in-out infinite' }}>
        <Shield style={{ width: 120, height: 120, color: '#00d4ff', filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.8))' }} />
      </div>
      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div key={i} className="absolute" style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: i % 2 === 0 ? '#00d4ff' : '#b44dff',
          boxShadow: `0 0 8px ${i % 2 === 0 ? '#00d4ff' : '#b44dff'}`,
          transform: `rotate(${deg}deg) translateX(170px)`,
          animation: `rotateSlow ${10 + i}s linear infinite`,
          transformOrigin: 'center',
        }} />
      ))}
    </div>
  );
}

const features = [
  { icon: Eye, label: 'Threat Scanner', desc: 'Real-time URL & malware detection', color: '#00d4ff' },
  { icon: AlertTriangle, label: 'Breach Monitor', desc: 'Dark web leak detection', color: '#ff3366' },
  { icon: Lock, label: 'Password Vault', desc: 'Military-grade encryption', color: '#00ff88' },
  { icon: Globe, label: 'VPN Shield', desc: 'Anonymous IP routing', color: '#b44dff' },
  { icon: Activity, label: 'Privacy Audit', desc: 'Social media risk scoring', color: '#00d4ff' },
  { icon: Zap, label: 'AI Chatbot', desc: 'Instant security advisor', color: '#ffaa00' },
];

export default function HeroSection({ setActivePage }) {
  // এপিআই থেকে ডেটা আনার জন্য নতুন স্টেট (ঐচ্ছিক কিন্তু সাজেস্টেড)
  const [sysData, setSysData] = useState(null);

  useEffect(() => {
    fetch('/api/system-status')
      .then(res => res.json())
      .then(data => setSysData(data))
      .catch(err => console.log("System offline"));
  }, []);

  return (
    <div className="relative pt-16">
      {/* HERO */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">

            {/* Left Text */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ borderColor: 'rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.05)' }}>
                <div className="status-dot blue" />
                <span style={{ fontFamily: 'Share Tech Mono, monospace', color: '#00d4ff', fontSize: '0.75rem', letterSpacing: '2px' }}>
                  {sysData?.protocol || 'v2.4.1'} — ACTIVE PROTECTION
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1 }}>
                  <span style={{ color: '#e0e8f0' }}>YOUR DIGITAL</span><br />
                  <span style={{ color: '#00d4ff', textShadow: '0 0 30px rgba(0,212,255,0.6)' }}>FORTRESS</span><br />
                  <span style={{ color: 'rgba(224,232,240,0.6)', fontSize: '60%' }}>IN THE CYBER STORM</span>
                </h1>
              </div>

              {/* Typing text */}
              <div style={{ fontFamily: 'Share Tech Mono, monospace', color: '#00ff88', fontSize: '1rem', minHeight: '1.5rem' }}>
                <TypingText texts={[
                  '> Scanning for threats...',
                  '> Monitoring dark web leaks...',
                  '> Encrypting your vault...',
                  '> Routing through VPN nodes...',
                  '> AI threat analysis active...',
                ]} />
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed max-w-lg"
                style={{ color: 'rgba(224,232,240,0.65)', fontFamily: 'Exo 2, sans-serif' }}>
                SentinelShield gives everyday users a professional-grade cybersecurity command center.
                Real-time protection, breach alerts, encrypted vaults — all in one futuristic platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="neon-btn flex items-center gap-2" onClick={() => setActivePage('dashboard')}
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem' }}>
                  <Shield className="w-4 h-4" />
                  ENTER COMMAND CENTER
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button style={{
                  padding: '12px 28px',
                  background: 'rgba(180,77,255,0.1)',
                  border: '1px solid rgba(180,77,255,0.3)',
                  borderRadius: '4px',
                  color: '#b44dff',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  VIEW DEMO
                </button>
              </div>
            </div>

            {/* Right — Shield Orb */}
            <div className="flex justify-center lg:justify-end">
              <ShieldOrb />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 px-4" style={{ borderTop: '1px solid rgba(0,212,255,0.08)', borderBottom: '1px solid rgba(0,212,255,0.08)' }}>
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
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#e0e8f0', marginBottom: '1rem' }}>
              SECURITY <span style={{ color: '#00d4ff' }}>ARSENAL</span>
            </h2>
            <p style={{ color: 'rgba(224,232,240,0.5)', fontFamily: 'Exo 2, sans-serif' }}>
              Six powerful modules. One unified platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glass-card p-6 cursor-pointer group transition-all duration-300"
                  style={{ transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  onClick={() => setActivePage('dashboard')}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg" style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                      <Icon style={{ width: 22, height: 22, color: f.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', color: '#e0e8f0', letterSpacing: '1px' }}>
                        {f.label}
                      </h3>
                      <p className="text-sm" style={{ color: 'rgba(224,232,240,0.55)', fontFamily: 'Exo 2, sans-serif' }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-px" style={{ background: `linear-gradient(90deg, ${f.color}40, transparent)` }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#e0e8f0', marginBottom: '1rem' }}>
              READY TO SECURE YOUR
              <span style={{ color: '#00d4ff' }}> DIGITAL LIFE?</span>
            </h2>
            <p className="mb-8" style={{ color: 'rgba(224,232,240,0.6)', fontFamily: 'Exo 2, sans-serif' }}>
              Join 150,000+ users already protected by SentinelShield
            </p>
            <button className="neon-btn" onClick={() => setActivePage('dashboard')}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', padding: '14px 40px' }}>
              ACTIVATE SHIELD NOW
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}>
        <p style={{ fontFamily: 'Share Tech Mono, monospace', color: 'rgba(224,232,240,0.3)', fontSize: '0.75rem' }}>
          © 2026 SENTINELSHIELD // ALL SYSTEMS OPERATIONAL // {sysData?.protocol || 'v2.4.1'}
        </p>
      </footer>
    </div>
  );
}
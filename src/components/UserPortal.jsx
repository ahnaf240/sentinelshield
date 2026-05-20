"use client";

import React, { useState, useEffect } from 'react';
import {
  Facebook, Instagram, Github, User, ShieldCheck,
  Loader2, Save, Shield, Lock, Bell, Activity,
  Edit3, Key, Clock, Zap, Download, Trash2, CheckCircle
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────────
// UserPortal — Identity Enrollment + Settings Hub
// Features: social auth links, profile editor, security toggles,
//           notification prefs, activity stats, system log footer
// ──────────────────────────────────────────────────────────────────

/* ── Small Toggle Switch ── */
function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width:      44,
        height:     24,
        borderRadius: 12,
        border:     'none',
        cursor:     'pointer',
        background: on ? '#00d4ff' : 'rgba(255,255,255,0.1)',
        position:   'relative',
        transition: 'background 0.3s ease',
        flexShrink: 0,
        boxShadow:  on ? '0 0 12px rgba(0,212,255,0.5)' : 'none',
      }}
    >
      <span
        style={{
          position:     'absolute',
          top:          3,
          left:         on ? 23 : 3,
          width:        18,
          height:       18,
          borderRadius: '50%',
          background:   '#fff',
          transition:   'left 0.3s ease',
          boxShadow:    '0 1px 4px rgba(0,0,0,0.4)',
        }}
      />
    </button>
  );
}

/* ── Section divider label ── */
function SectionLabel({ text, color = '#00d4ff' }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        style={{
          fontFamily:    'Orbitron, sans-serif',
          fontSize:      '0.68rem',
          color,
          letterSpacing: 2,
        }}
      >
        {text}
      </span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
    </div>
  );
}

/* ── Tabs ── */
const tabs = [
  { id: 'identity',  label: 'IDENTITY',  icon: User     },
  { id: 'security',  label: 'SECURITY',  icon: Lock     },
  { id: 'notifs',    label: 'ALERTS',    icon: Bell     },
  { id: 'activity',  label: 'ACTIVITY',  icon: Activity },
];

export default function UserPortal() {
  const [activeTab,      setActiveTab]      = useState('identity');
  const [isInitializing, setIsInitializing] = useState(false);
  const [networkId,      setNetworkId]      = useState('');
  const [mounted,        setMounted]        = useState(false);
  const [saved,          setSaved]          = useState(false);

  const [profile, setProfile] = useState({
    username: '',
    bio:      '',
    status:   'Idle',
  });

  /* security toggles */
  const [security, setSecurity] = useState({
    two_factor:    true,
    auto_lock:     true,
    scan_on_start: true,
    auto_update:   true,
    biometric:     false,
  });

  /* notification toggles */
  const [notifs, setNotifs] = useState({
    breach_alerts:    true,
    threat_detected:  true,
    vpn_disconnect:   true,
    weekly_report:    false,
    news_feed:        false,
  });

  /* activity log */
  const activityLog = [
    { time: '2 min ago',  event: 'Threat scan — github.com (SAFE)',           type: 'success' },
    { time: '1 hr ago',   event: 'VPN connected → Frankfurt node',             type: 'info'    },
    { time: '3 hrs ago',  event: 'Breach check — no new leaks found',          type: 'success' },
    { time: 'Yesterday',  event: 'Password vault accessed — 2FA verified',      type: 'info'    },
    { time: '2 days ago', event: 'Privacy audit score updated: 74/100',         type: 'warning' },
    { time: '3 days ago', event: 'Phishing URL blocked: pay-now-fake.ru',       type: 'danger'  },
  ];
  const typeColor = { success: '#00ff88', info: '#00d4ff', warning: '#ffaa00', danger: '#ff3366' };

  /* ── mount + fetch ── */
  useEffect(() => {
    setMounted(true);
    setNetworkId(Math.random().toString(16).slice(2, 10).toUpperCase());

    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user-portal');
        if (res.ok) {
          const data = await res.json();
          setProfile({ username: data.name || '', bio: data.role || '', status: 'Authenticated' });
        }
      } catch {
        /* no API yet — that's fine */
      }
    };
    fetchUserData();
  }, []);

  const handleInitialize = async () => {
    setIsInitializing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsInitializing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!mounted) return null;

  /* Shared card style */
  const card = {
    background:    'rgba(15,23,42,0.8)',
    border:        '1px solid rgba(255,255,255,0.06)',
    borderRadius:  16,
    padding:       24,
    marginBottom:  16,
  };

  return (
    <div className="space-y-4 relative z-10">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.25rem', color: '#00d4ff', marginBottom: 4 }}>
            USER PORTAL
          </h2>
          <p style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.85rem', color: 'rgba(224,232,240,0.5)' }}>
            Identity enrollment, security settings & activity
          </p>
        </div>
        <div
          className="px-3 py-1 rounded-full flex items-center gap-2"
          style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#00ff88' }}>
            SYSTEM READY
          </span>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div
        className="flex gap-1 p-1 rounded-xl overflow-x-auto"
        style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.08)' }}
      >
        {tabs.map((t) => {
          const Icon   = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg flex-shrink-0 transition-all duration-200"
              style={{
                background: active ? 'rgba(0,212,255,0.14)' : 'transparent',
                border:     active ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent',
                color:      active ? '#00d4ff' : 'rgba(224,232,240,0.4)',
                fontFamily: 'Orbitron, sans-serif',
                fontSize:   '0.65rem',
                letterSpacing: 1,
                cursor:     'pointer',
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════
          IDENTITY TAB
      ══════════════════════════════════════════════════ */}
      {activeTab === 'identity' && (
        <div
          style={{
            background:   'rgba(15,23,42,0.7)',
            border:       '2px solid rgba(0,255,136,0.15)',
            borderTop:    '2px solid #00ff88',
            borderRadius: 16,
            padding:      32,
            boxShadow:    '0 25px 50px rgba(0,255,136,0.04)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Sub-header */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
            <h3
              className="flex items-center gap-3 text-white"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', letterSpacing: 1 }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ background: 'rgba(0,255,136,0.1)' }}
              >
                <ShieldCheck style={{ color: '#00ff88' }} size={22} />
              </div>
              IDENTITY ENROLLMENT
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Auth */}
            <div className="space-y-4">
              <p
                className="uppercase"
                style={{ fontSize: 10, color: 'rgba(107,114,128,1)', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.2em', marginBottom: 16 }}
              >
                Connect Securely Via
              </p>

              {[
                { label: 'Facebook Login',  icon: Facebook, color: '#1877F2' },
                { label: 'Instagram Link',  icon: Instagram, color: '#E4405F' },
                { label: 'GitHub Sync',     icon: Github,   color: 'rgba(255,255,255,0.9)' },
              ].map((btn) => {
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.label}
                    type="button"
                    className="w-full py-3 flex items-center justify-center gap-3 rounded-xl transition-all"
                    style={{
                      background: `${btn.color}18`,
                      border:     `1px solid ${btn.color}40`,
                      color:      'rgba(255,255,255,0.9)',
                      cursor:     'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${btn.color}28`;
                      e.currentTarget.style.borderColor = btn.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${btn.color}18`;
                      e.currentTarget.style.borderColor = `${btn.color}40`;
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: btn.color }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: 'Exo 2, sans-serif' }}>
                      {btn.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Profile editor */}
            <div
              className="space-y-5 relative overflow-hidden p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Decorative */}
              <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                <User size={100} style={{ color: '#00ff88' }} />
              </div>

              {/* Username */}
              <div className="relative">
                <label
                  className="block mb-2 uppercase"
                  style={{ fontSize: 10, color: '#00ff88', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.2em' }}
                >
                  ASSIGN USERNAME
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-3 top-3 w-4 h-4"
                    style={{ color: 'rgba(107,114,128,1)' }}
                  />
                  <input
                    type="text"
                    placeholder="sentinel_user_01"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="w-full p-3 pl-10 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background:   '#050810',
                      border:       '1px solid rgba(255,255,255,0.1)',
                      color:        '#00ff88',
                      fontFamily:   'Share Tech Mono, monospace',
                    }}
                    onFocus={(e)  => (e.target.style.borderColor = 'rgba(0,255,136,0.5)')}
                    onBlur={(e)   => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label
                  className="block mb-2 uppercase"
                  style={{ fontSize: 10, color: 'rgba(156,163,175,1)', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.2em' }}
                >
                  PUBLIC BIO
                </label>
                <textarea
                  placeholder="Cybersecurity Enthusiast..."
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 rounded-lg text-sm outline-none transition-all resize-none"
                  style={{
                    background: '#050810',
                    border:     '1px solid rgba(255,255,255,0.1)',
                    color:      'rgba(156,163,175,1)',
                    height:     96,
                    fontFamily: 'Exo 2, sans-serif',
                  }}
                  onFocus={(e)  => (e.target.style.borderColor = 'rgba(0,255,136,0.5)')}
                  onBlur={(e)   => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              {/* Save button */}
              <button
                type="button"
                onClick={handleInitialize}
                disabled={isInitializing}
                className="w-full py-3 flex items-center justify-center gap-2 font-bold rounded-xl transition-all active:scale-95"
                style={{
                  fontFamily:  'Orbitron, sans-serif',
                  fontSize:    '0.8rem',
                  background:  isInitializing ? 'rgba(55,65,81,1)' : saved ? '#00cc6e' : '#00ff88',
                  color:       isInitializing || saved ? 'rgba(156,163,175,1)' : '#050810',
                  cursor:      isInitializing ? 'not-allowed' : 'pointer',
                  boxShadow:   !isInitializing && !saved ? '0 0 20px rgba(0,255,136,0.2)' : 'none',
                }}
              >
                {isInitializing
                  ? <Loader2 className="animate-spin w-5 h-5" />
                  : saved
                    ? <CheckCircle className="w-5 h-5" />
                    : <Save size={18} />}
                {isInitializing ? 'PROCESSING...' : saved ? 'SAVED!' : 'INITIALIZE PROFILE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          SECURITY TAB
      ══════════════════════════════════════════════════ */}
      {activeTab === 'security' && (
        <div style={card}>
          <SectionLabel text="SECURITY SETTINGS" color="#00ff88" />
          {[
            { key: 'two_factor',    label: 'Two-Factor Authentication', desc: 'Require 2FA on every login' },
            { key: 'auto_lock',     label: 'Auto-Lock Vault',           desc: 'Lock password vault after 5 min idle' },
            { key: 'scan_on_start', label: 'Scan on Startup',           desc: 'Run threat scan when app launches' },
            { key: 'auto_update',   label: 'Auto-Update Signatures',    desc: 'Keep threat database up to date' },
            { key: 'biometric',     label: 'Biometric Login',           desc: 'Use fingerprint / Face ID on mobile' },
          ].map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div>
                <div style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.9rem', color: '#e0e8f0', marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.76rem', color: 'rgba(224,232,240,0.4)' }}>
                  {desc}
                </div>
              </div>
              <Toggle on={security[key]} onClick={() => setSecurity((p) => ({ ...p, [key]: !p[key] }))} />
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          ALERTS TAB
      ══════════════════════════════════════════════════ */}
      {activeTab === 'notifs' && (
        <div style={card}>
          <SectionLabel text="ALERT PREFERENCES" color="#ffaa00" />
          {[
            { key: 'breach_alerts',   label: 'Breach Alerts',          desc: 'Notify when your data appears in new leaks' },
            { key: 'threat_detected', label: 'Threat Detected',        desc: 'Alerts for blocked malware and phishing' },
            { key: 'vpn_disconnect',  label: 'VPN Disconnected',       desc: 'Alert when VPN drops unexpectedly' },
            { key: 'weekly_report',   label: 'Weekly Security Report', desc: 'Summary of scan activity every Sunday' },
            { key: 'news_feed',       label: 'Cybersecurity News',     desc: 'Daily digest of security headlines' },
          ].map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div>
                <div style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.9rem', color: '#e0e8f0', marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.76rem', color: 'rgba(224,232,240,0.4)' }}>
                  {desc}
                </div>
              </div>
              <Toggle on={notifs[key]} onClick={() => setNotifs((p) => ({ ...p, [key]: !p[key] }))} />
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          ACTIVITY TAB
      ══════════════════════════════════════════════════ */}
      {activeTab === 'activity' && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Scans Run',       value: '1,247', color: '#00d4ff', icon: Zap      },
              { label: 'Threats Blocked', value: '89',    color: '#ff3366', icon: Shield   },
              { label: 'Breach Checks',   value: '34',    color: '#ffaa00', icon: Key      },
              { label: 'Days Active',     value: '142',   color: '#00ff88', icon: Clock    },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} style={card}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg" style={{ background: `${s.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <span style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.72rem', color: 'rgba(224,232,240,0.4)' }}>
                      {s.label}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.5rem', color: s.color }}>
                    {s.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Log */}
          <div style={card}>
            <SectionLabel text="RECENT ACTIVITY" />
            {activityLog.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              >
                <div
                  style={{
                    width:        7,
                    height:       7,
                    borderRadius: '50%',
                    background:   typeColor[a.type],
                    boxShadow:    `0 0 6px ${typeColor[a.type]}`,
                    marginTop:    6,
                    flexShrink:   0,
                  }}
                />
                <div className="flex-1">
                  <div style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.85rem', color: 'rgba(224,232,240,0.75)' }}>
                    {a.event}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily:  'Share Tech Mono, monospace',
                    fontSize:    '0.68rem',
                    color:       'rgba(224,232,240,0.3)',
                    whiteSpace:  'nowrap',
                    flexShrink:  0,
                  }}
                >
                  {a.time}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── System Log Footer ── */}
      <div className="flex justify-between items-center px-2 select-none">
        <p
          style={{
            fontSize:    8,
            color:       'rgba(75,85,99,0.8)',
            fontFamily:  'Share Tech Mono, monospace',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
          }}
        >
          Network ID: {networkId}
        </p>
        <p
          style={{
            fontSize:    8,
            color:       'rgba(75,85,99,0.8)',
            fontFamily:  'Share Tech Mono, monospace',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
          }}
        >
          Encryption: AES-256-GCM
        </p>
      </div>
    </div>
  );
}
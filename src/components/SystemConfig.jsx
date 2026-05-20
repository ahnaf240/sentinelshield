'use client';
import React, { useState } from 'react';
import {
  Settings, Monitor, Globe, Bell, Shield,
  Trash2, RefreshCw, Download, Moon, Sun,
  Zap, Database, Wifi, Lock, AlertTriangle, CheckCircle
} from 'lucide-react';

function Toggle({ on, onClick, color = '#00d4ff' }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 44, height: 24, borderRadius: 12,
        border: 'none', cursor: 'pointer',
        background: on ? color : 'rgba(255,255,255,0.1)',
        position: 'relative', transition: 'background 0.3s',
        flexShrink: 0,
        boxShadow: on ? `0 0 12px ${color}80` : 'none',
      }}
    >
      <span style={{
        position: 'absolute', top: 3,
        left: on ? 23 : 3, width: 18, height: 18,
        borderRadius: '50%', background: '#fff',
        transition: 'left 0.3s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }} />
    </button>
  );
}

function SectionLabel({ text, color = '#00d4ff' }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.68rem', color, letterSpacing: 2 }}>
        {text}
      </span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
    </div>
  );
}

const tabs = [
  { id: 'display',   label: 'DISPLAY',   icon: Monitor  },
  { id: 'network',   label: 'NETWORK',   icon: Wifi     },
  { id: 'privacy',   label: 'PRIVACY',   icon: Shield   },
  { id: 'danger',    label: 'DANGER ZONE', icon: AlertTriangle },
];

export default function SystemConfig() {
  const [activeTab, setActiveTab] = useState('display');
  const [saved, setSaved] = useState(false);

  const [display, setDisplay] = useState({
    theme:         'dark',
    language:      'en',
    animations:    true,
    terminal_feed: true,
    compact_mode:  false,
    show_clock:    true,
    neon_glow:     true,
  });

  const [network, setNetwork] = useState({
    auto_vpn:        false,
    dns_protection:  true,
    kill_switch:     true,
    ipv6_leak:       true,
    packet_logging:  false,
  });

  const [privacy, setPrivacy] = useState({
    telemetry:       false,
    crash_reports:   true,
    local_only:      false,
    clear_on_exit:   false,
    incognito_mode:  false,
  });

  const handleSave = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const card = {
    background: 'rgba(15,23,42,0.8)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  };

  const renderToggleList = (items, state, setState, color = '#00d4ff') =>
    items.map(({ key, label, desc }) => (
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
        <Toggle on={state[key]} onClick={() => setState(p => ({ ...p, [key]: !p[key] }))} color={color} />
      </div>
    ));

  return (
    <div className="space-y-4 relative z-10">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.25rem', color: '#b44dff', marginBottom: 4 }}>
            SYSTEM CONFIG
          </h2>
          <p style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.85rem', color: 'rgba(224,232,240,0.5)' }}>
            Display, network, privacy & system settings
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all active:scale-95"
          style={{
            background: saved ? 'rgba(0,255,136,0.1)' : 'rgba(180,77,255,0.1)',
            border: saved ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(180,77,255,0.4)',
            color: saved ? '#00ff88' : '#b44dff',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.7rem',
            cursor: 'pointer',
            letterSpacing: 1,
          }}
        >
          {saved ? <CheckCircle size={14} /> : <Settings size={14} />}
          {saved ? 'SAVED!' : 'SAVE CONFIG'}
        </button>
      </div>

      {/* Tab Bar */}
      <div
        className="flex gap-1 p-1 rounded-xl overflow-x-auto"
        style={{ background: 'rgba(180,77,255,0.04)', border: '1px solid rgba(180,77,255,0.08)' }}
      >
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          const isD = t.id === 'danger';
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg flex-shrink-0 transition-all duration-200"
              style={{
                background: active ? (isD ? 'rgba(255,51,102,0.14)' : 'rgba(180,77,255,0.14)') : 'transparent',
                border: active ? `1px solid ${isD ? 'rgba(255,51,102,0.4)' : 'rgba(180,77,255,0.3)'}` : '1px solid transparent',
                color: active ? (isD ? '#ff3366' : '#b44dff') : 'rgba(224,232,240,0.4)',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: 1,
                cursor: 'pointer',
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── DISPLAY TAB ── */}
      {activeTab === 'display' && (
        <div style={card}>
          <SectionLabel text="DISPLAY SETTINGS" color="#b44dff" />

          {/* Theme selector */}
          <div className="mb-6">
            <p style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.9rem', color: '#e0e8f0', marginBottom: 12 }}>
              Interface Theme
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { id: 'dark',   label: 'DARK CORE',   icon: Moon,  color: '#00d4ff' },
                { id: 'ultra',  label: 'ULTRA BLACK',  icon: Shield, color: '#b44dff' },
                { id: 'matrix', label: 'MATRIX GREEN', icon: Zap,   color: '#00ff88' },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setDisplay(p => ({ ...p, theme: t.id }))}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
                    style={{
                      background: display.theme === t.id ? `${t.color}18` : 'rgba(255,255,255,0.03)',
                      border: display.theme === t.id ? `1px solid ${t.color}60` : '1px solid rgba(255,255,255,0.06)',
                      color: display.theme === t.id ? t.color : 'rgba(224,232,240,0.4)',
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '0.65rem',
                      cursor: 'pointer',
                      letterSpacing: 1,
                    }}
                  >
                    <Icon size={14} />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language */}
          <div className="mb-6">
            <p style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.9rem', color: '#e0e8f0', marginBottom: 12 }}>
              Language
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { id: 'en', label: '🇺🇸 ENGLISH' },
                { id: 'bn', label: '🇧🇩 BENGALI' },
                { id: 'ar', label: '🇸🇦 ARABIC' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setDisplay(p => ({ ...p, language: l.id }))}
                  className="px-4 py-2 rounded-xl transition-all"
                  style={{
                    background: display.language === l.id ? 'rgba(180,77,255,0.15)' : 'rgba(255,255,255,0.03)',
                    border: display.language === l.id ? '1px solid rgba(180,77,255,0.5)' : '1px solid rgba(255,255,255,0.06)',
                    color: display.language === l.id ? '#b44dff' : 'rgba(224,232,240,0.5)',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                    letterSpacing: 1,
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {renderToggleList([
            { key: 'animations',    label: 'UI Animations',       desc: 'Enable smooth transitions and effects' },
            { key: 'terminal_feed', label: 'Live Terminal Feed',  desc: 'Show kernel log at bottom of screen' },
            { key: 'compact_mode',  label: 'Compact Mode',        desc: 'Reduce spacing for more content' },
            { key: 'show_clock',    label: 'System Clock',        desc: 'Display real-time clock in status bar' },
            { key: 'neon_glow',     label: 'Neon Glow Effects',   desc: 'Enable neon border glow on elements' },
          ], display, setDisplay, '#b44dff')}
        </div>
      )}

      {/* ── NETWORK TAB ── */}
      {activeTab === 'network' && (
        <div style={card}>
          <SectionLabel text="NETWORK SETTINGS" color="#00d4ff" />
          {renderToggleList([
            { key: 'auto_vpn',       label: 'Auto-Connect VPN',     desc: 'Connect to fastest node on startup' },
            { key: 'dns_protection', label: 'DNS Leak Protection',  desc: 'Prevent DNS queries from leaking' },
            { key: 'kill_switch',    label: 'Kill Switch',          desc: 'Block internet if VPN drops' },
            { key: 'ipv6_leak',      label: 'IPv6 Leak Block',      desc: 'Disable IPv6 to prevent leaks' },
            { key: 'packet_logging', label: 'Packet Logging',       desc: 'Log outbound network packets (debug)' },
          ], network, setNetwork, '#00d4ff')}
        </div>
      )}

      {/* ── PRIVACY TAB ── */}
      {activeTab === 'privacy' && (
        <div style={card}>
          <SectionLabel text="PRIVACY SETTINGS" color="#00ff88" />
          {renderToggleList([
            { key: 'telemetry',      label: 'Usage Telemetry',      desc: 'Send anonymous usage data to improve app' },
            { key: 'crash_reports',  label: 'Crash Reports',        desc: 'Automatically send crash logs' },
            { key: 'local_only',     label: 'Local-Only Mode',      desc: 'Disable all external API calls' },
            { key: 'clear_on_exit',  label: 'Clear on Exit',        desc: 'Wipe session data when app closes' },
            { key: 'incognito_mode', label: 'Incognito Mode',       desc: 'No activity logging for this session' },
          ], privacy, setPrivacy, '#00ff88')}
        </div>
      )}

      {/* ── DANGER ZONE TAB ── */}
      {activeTab === 'danger' && (
        <div style={{ ...card, border: '1px solid rgba(255,51,102,0.2)' }}>
          <SectionLabel text="DANGER ZONE" color="#ff3366" />

          <div className="space-y-4">
            {[
              {
                icon: RefreshCw,
                label: 'Reset All Settings',
                desc: 'Restore all config to factory defaults. Cannot be undone.',
                btnLabel: 'RESET CONFIG',
                color: '#ffaa00',
              },
              {
                icon: Database,
                label: 'Clear Cached Data',
                desc: 'Delete all locally cached scan results and logs.',
                btnLabel: 'CLEAR CACHE',
                color: '#00d4ff',
              },
              {
                icon: Download,
                label: 'Export System Logs',
                desc: 'Download all activity and security logs as a .json file.',
                btnLabel: 'EXPORT LOGS',
                color: '#b44dff',
              },
              {
                icon: Lock,
                label: 'Force Lock Session',
                desc: 'Immediately lock and terminate the current session.',
                btnLabel: 'LOCK NOW',
                color: '#ffaa00',
              },
              {
                icon: Trash2,
                label: 'Delete Account Data',
                desc: 'Permanently delete all your data. This action is irreversible.',
                btnLabel: 'DELETE DATA',
                color: '#ff3366',
              },
            ].map(({ icon: Icon, label, desc, btnLabel, color }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ background: `${color}15` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.9rem', color: '#e0e8f0' }}>
                      {label}
                    </div>
                    <div style={{ fontFamily: 'Exo 2, sans-serif', fontSize: '0.75rem', color: 'rgba(224,232,240,0.35)' }}>
                      {desc}
                    </div>
                  </div>
                </div>
                <button
                  className="px-3 py-1.5 rounded-lg flex-shrink-0 transition-all active:scale-95"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}40`,
                    color,
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.6rem',
                    cursor: 'pointer',
                    letterSpacing: 1,
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${color}25`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${color}15`; }}
                >
                  {btnLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center px-2 select-none">
        <p style={{ fontSize: 8, color: 'rgba(75,85,99,0.8)', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.5em', textTransform: 'uppercase' }}>
          Config Version: v2.4.1
        </p>
        <p style={{ fontSize: 8, color: 'rgba(75,85,99,0.8)', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.5em', textTransform: 'uppercase' }}>
          Sentinel Core Engine
        </p>
      </div>
    </div>
  );
}
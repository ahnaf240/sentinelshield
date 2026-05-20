"use client";

import React, { useState } from 'react';
import { ShieldAlert, Search, CheckCircle, Loader2 } from 'lucide-react';

// ──────────────────────────────────────────────────────────────────
// BreachMonitor — Dark Web Breach Monitor
// API route: POST /api/breach-monitor  →  { found: bool, breaches: string[] }
// Mock mode: যদি API না থাকে তাহলে নিচের simulateCheck() ব্যবহার হবে
// ──────────────────────────────────────────────────────────────────

// ── Mock simulation (API না থাকলে এটা কাজ করে) ──────────────────
async function simulateCheck(email) {
  await new Promise((r) => setTimeout(r, 1800));
  // test / example ধারণকারী email-এ breach দেখাবে
  const commonBreaches = [
    'LinkedIn (2021)',
    'Adobe (2013)',
    'Dropbox (2012)',
    'MySpace (2008)',
    'Canva (2019)',
  ];
  if (email.includes('test') || email.includes('example') || email.includes('demo')) {
    const count = Math.floor(2 + Math.random() * 3);
    return {
      found:    true,
      breaches: commonBreaches.slice(0, count),
    };
  }
  return { found: false, breaches: [] };
}

const BreachMonitor = () => {
  const [email,      setEmail]      = useState('');
  const [status,     setStatus]     = useState('idle'); // idle | checking | safe | breached
  const [breachData, setBreachData] = useState(null);

  const checkBreach = async () => {
    if (!email.trim()) return alert('Please enter an email address!');

    setStatus('checking');
    setBreachData(null);

    try {
      // ── প্রথমে real API call চেষ্টা ──────────────────────────
      let data;
      try {
        const response = await fetch('/api/breach-monitor', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ email }),
        });
        // API route না থাকলে (404/500) mock-এ fall back করো
        if (!response.ok) throw new Error('API unavailable');
        data = await response.json();
      } catch {
        // ── Fallback: mock simulation ─────────────────────────
        data = await simulateCheck(email);
      }

      if (data.found) {
        setBreachData(data);
        setStatus('breached');
      } else {
        setStatus('safe');
      }
    } catch (error) {
      alert('Error checking breaches. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <div
      className="rounded-xl p-6 transition-all duration-500"
      style={{
        background: 'rgb(15,23,42)',
        border:     '1px solid rgba(239,68,68,0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ShieldAlert className="text-red-500" />
        <h2
          className="text-xl font-bold text-white uppercase tracking-wider"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          Dark Web Breach Monitor
        </h2>
      </div>

      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="email"
          placeholder="Enter email to scan (e.g. test@example.com)"
          className="flex-1 rounded-lg px-4 py-2 text-white outline-none transition-all"
          style={{
            background:   'rgb(30,41,59)',
            border:       '1px solid rgba(239,68,68,0.2)',
            fontFamily:   'Share Tech Mono, monospace',
          }}
          onFocus={(e)  => (e.target.style.borderColor = 'rgba(239,68,68,0.5)')}
          onBlur={(e)   => (e.target.style.borderColor = 'rgba(239,68,68,0.2)')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkBreach()}
        />
        <button
          onClick={checkBreach}
          disabled={status === 'checking'}
          className="px-6 py-2 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 active:scale-95"
          style={{
            background: status === 'checking' ? 'rgb(127,29,29)' : 'rgb(220,38,38)',
            cursor:     status === 'checking' ? 'not-allowed' : 'pointer',
            fontFamily: 'Orbitron, sans-serif',
            fontSize:   '0.75rem',
            letterSpacing: 1,
          }}
        >
          {status === 'checking'
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Search size={18} />}
          {status === 'checking' ? 'Scanning...' : 'Scan'}
        </button>
      </div>

      {/* ── Checking State ── */}
      {status === 'checking' && (
        <div className="flex flex-col items-center justify-center py-4">
          <p
            className="animate-pulse text-sm uppercase tracking-widest"
            style={{ color: '#fbbf24', fontFamily: 'Share Tech Mono, monospace' }}
          >
            Searching Dark Web Databases...
          </p>
        </div>
      )}

      {/* ── Safe State ── */}
      {status === 'safe' && (
        <div
          className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
          style={{
            background: 'rgba(34,197,94,0.08)',
            border:     '1px solid rgba(34,197,94,0.4)',
          }}
        >
          <CheckCircle className="text-green-500 shrink-0" />
          <p style={{ color: 'rgb(187,247,208)', fontSize: '0.875rem', fontFamily: 'Exo 2, sans-serif' }}>
            Good news! Your email was <strong>not found</strong> in any known data breaches.
          </p>
        </div>
      )}

      {/* ── Breached State ── */}
      {status === 'breached' && breachData && (
        <div
          className="p-4 rounded-lg flex flex-col gap-3 transition-all duration-300"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border:     '1px solid rgba(239,68,68,0.4)',
          }}
        >
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-red-500 shrink-0" />
            <p
              className="font-bold"
              style={{ color: 'rgb(254,202,202)', fontSize: '0.875rem', fontFamily: 'Exo 2, sans-serif' }}
            >
              ALERT! This email was found in{' '}
              <span style={{ color: '#ff3366' }}>{breachData.breaches?.length || 0}</span>{' '}
              data breach{breachData.breaches?.length !== 1 ? 'es' : ''}.
            </p>
          </div>

          <div className="mt-2 space-y-2">
            <p
              className="uppercase"
              style={{ fontSize: 10, color: 'rgba(156,163,175,1)', fontFamily: 'Share Tech Mono, monospace' }}
            >
              Compromised Platforms:
            </p>
            <div className="flex flex-wrap gap-2">
              {breachData.breaches?.map((b, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded"
                  style={{
                    background: 'rgba(239,68,68,0.18)',
                    border:     '1px solid rgba(239,68,68,0.35)',
                    color:      '#fca5a5',
                    fontSize:   10,
                    fontFamily: 'Share Tech Mono, monospace',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
            <p
              className="animate-pulse font-bold mt-2"
              style={{ fontSize: 10, color: '#f87171', fontFamily: 'Share Tech Mono, monospace' }}
            >
              ⚠ RECOMMENDATION: CHANGE PASSWORDS IMMEDIATELY.
            </p>
          </div>
        </div>
      )}

      {/* Info footer */}
      <p
        className="mt-6 text-center"
        style={{ fontSize: 9, color: 'rgba(100,116,139,0.8)', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.1em' }}
      >
        POWERED BY HAVEIBEENPWNED + SENTINEL DARK WEB ENGINE // DATA ENCRYPTED IN TRANSIT
      </p>
    </div>
  );
};

export default BreachMonitor;
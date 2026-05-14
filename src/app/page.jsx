"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Dashboard from '../components/Dashboard';
import AttackMap from '../components/AttackMap';
import IntrusionTracker from '../components/IntrusionTracker';
import LinkShield from '../components/LinkShield';
import BreachMonitor from '../components/BreachMonitor';
import NetworkMapper from '../components/NetworkMapper';
import Modules from '../components/Modules';
import AIChatbot from '../components/AIChatbot';
import { Shield, Activity, Lock, Eye, Terminal } from 'lucide-react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 font-sans">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-10">
        {/* Main Header & Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-8">
          <HeroSection />
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
            <div className="relative">
              <Activity className="text-green-500 animate-pulse" size={20} />
              <div className="absolute inset-0 bg-green-500/20 blur-sm rounded-full" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">System Status</p>
              <p className="text-sm font-mono text-green-400">ENCRYPTED & SECURE</p>
            </div>
          </div>
        </div>

        {/* Core Dashboard Metrics */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Dashboard />
        </section>

        {/* Threat Intelligence Visualization */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
             <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center gap-2">
                <Terminal size={18} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Live Global Attack Map</span>
             </div>
             <AttackMap />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-1 backdrop-blur-sm shadow-xl">
              <IntrusionTracker />
            </div>
          </div>
        </section>

        {/* Advanced Security Tools Grid */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <Lock size={20} className="text-blue-500" />
            <h2 className="text-xl font-bold tracking-tight">Active Defense Modules</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group transition-all duration-300 hover:translate-y-[-4px]">
              <LinkShield />
            </div>
            <div className="group transition-all duration-300 hover:translate-y-[-4px]">
              <BreachMonitor />
            </div>
            <div className="group transition-all duration-300 hover:translate-y-[-4px]">
              <NetworkMapper />
            </div>
          </div>
        </section>

        {/* Secondary Modules Section */}
        <section className="bg-slate-900/20 border border-slate-800/50 rounded-3xl p-2">
          <Modules />
        </section>
      </div>

      {/* Floating AI Security Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <AIChatbot />
      </div>

      {/* Footer Branding */}
      <footer className="mt-20 py-10 border-t border-slate-900 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
          <Shield size={16} />
          <span className="text-sm font-bold tracking-[0.2em] uppercase">SentinelShield v1.0</span>
        </div>
        <p className="text-xs text-slate-500">Professional Cybersecurity Portfolio Dashboard</p>
      </footer>
    </main>
  );
}
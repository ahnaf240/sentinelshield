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
import { Shield, Activity, Lock, Terminal } from 'lucide-react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  // ১. ডিফল্ট স্টেট 'hero' করা হলো যাতে শুরুতে ল্যান্ডিং পেজ দেখায়
  const [activePage, setActivePage] = useState('hero');

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

      {/* নেভবারে স্টেট পাঠানো হয়েছে */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-10 mt-16 md:mt-24">
        
        {/* ল্যান্ডিং পেজ ভিউ */}
        {activePage === 'hero' ? (
          <div className="animate-in fade-in duration-1000">
            <HeroSection setActivePage={setActivePage} />
          </div>
        ) : activePage === 'dashboard' ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Main Header & Status */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-8">
              <HeroSection setActivePage={setActivePage} />
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
            <section>
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
            
            {/* আপনার আগের সেই "System Intelligence Active" ব্যানারটি এখান থেকে মুছে দেওয়া হয়েছে */}
          </div>
        ) : (
          /* অন্য পেজগুলোর জন্য কন্টেন্ট */
          <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
             <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Shield className="text-blue-500 w-10 h-10 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-tighter">
                   {activePage.replace('-', ' ')}
                </h2>
                <p className="text-slate-400 max-w-md mx-auto">
                   This module is being initialized in the background. Secure tunnel established.
                </p>
                {activePage === 'threat-scanner' && <div className="mt-10 w-full max-w-4xl"><AttackMap /></div>}
                {activePage === 'breach-monitor' && <div className="mt-10 w-full max-w-4xl"><BreachMonitor /></div>}
             </div>
          </div>
        )}
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
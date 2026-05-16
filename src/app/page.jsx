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
import VoiceAssistant from '../components/VoiceAssistant'; 
import EmergencySOS from '../components/EmergencySOS'; // নতুন ইমার্জেন্সি এসওএস মডিউল ইম্পোর্ট করা হলো
import { Shield, Activity, Lock, Terminal } from 'lucide-react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  // শুরুতে ইউজার ল্যান্ডিং পেজে থাকবে
  const [activePage, setActivePage] = useState('hero');
  
  // ড্যাশবোর্ডের অথরাইজেশন চেক করার জন্য নতুন স্টেট
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ড্যাশবোর্ড বা অন্য পেজে সুইচ করার সময় অথরাইজেশন রিসেট হ্যান্ডলার (লোগো ক্লিকের জন্য)
  const handlePageChange = (page) => {
    setActivePage(page);
    if (page === 'hero') {
      setIsAuthorized(false); // হোম পেজে ফিরলে অথরাইজেশন আবার লক হয়ে যাবে
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 font-sans">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      {/* নেভবার - যেখানে লোগো বা মেনু ক্লিকের স্টেট পাঠানো হয়েছে */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-10 mt-16 md:mt-24">
        
        {/* ১. ল্যান্ডিং পেজ (Hero Interface) */}
        {activePage === 'hero' ? (
          <div className="animate-in fade-in duration-1000">
            {/* এখানে বাটন ক্লিক করলে সরাসরি ড্যাশবোর্ডে নিয়ে যাবে (যা পরে গেটওয়ে দেখাবে) */}
            <HeroSection setActivePage={handlePageChange} />
          </div>
        ) : activePage === 'dashboard' ? (
          
          /* ২. ড্যাশবোর্ড কন্ডিশনাল গেটওয়ে লজিক */
          !isAuthorized ? (
            /* গেটওয়ে পেজ: যদি ইউজার এখনো INITIATE ACCESS এ ক্লিক না করে থাকে */
            <div className="min-h-[70vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-slate-900/40 border border-slate-800 p-12 rounded-3xl backdrop-blur-md shadow-2xl text-center max-w-md w-full space-y-8">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full animate-pulse" />
                  <div className="w-24 h-24 border border-emerald-500/30 bg-slate-950 rounded-2xl flex items-center justify-center">
                    <Shield className="text-emerald-400 w-12 h-12" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-widest font-mono text-slate-200">SENTINEL</h2>
                  <p className="text-emerald-500 text-xs tracking-widest font-mono font-bold uppercase">Authorization Required To Proceed</p>
                </div>

                <button 
                  onClick={() => setIsAuthorized(true)}
                  className="w-full py-4 bg-transparent hover:bg-emerald-500/5 border border-emerald-500/40 hover:border-emerald-400 rounded-xl font-mono text-xs font-bold tracking-widest text-emerald-400 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                >
                  INITIATE ACCESS
                </button>
              </div>
            </div>
          ) : (
            /* মূল ড্যাশবোর্ড ইন্টারফেস: অথরাইজেশন সফল হওয়ার পর */
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Command Center Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter text-blue-400 font-mono">COMMAND_CENTER</h1>
                  <p className="text-slate-500 text-sm">Professional Security Monitoring Dashboard</p>
                </div>
                
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

              {/* Core Metrics */}
              <section>
                <Dashboard />
              </section>

              {/* Data Visualization Grid */}
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

              {/* Emergency Response & SOS Section (নতুন থার্ড প্যানেল) */}
              <section className="bg-slate-900/20 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-sm">
                <EmergencySOS />
              </section>

              {/* Active Security Modules */}
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

              {/* Additional Modules Footer Area */}
              <section className="bg-slate-900/20 border border-slate-800/50 rounded-3xl p-2">
                <Modules />
              </section>
            </div>
          )
        ) : (
          /* ৩. অন্যান্য সাব-মডিউল ভিউ */
          <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
            <div className="text-center space-y-4 w-full">
                <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-blue-500 w-10 h-10 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-tighter">
                  {activePage.replace('-', ' ')}
                </h2>
                
                <div className="w-full max-w-4xl mx-auto mt-6">
                  {activePage === 'threat-scanner' && <AttackMap />}
                  {activePage === 'breach-monitor' && <BreachMonitor />}
                </div>

                <button 
                  onClick={() => handlePageChange('dashboard')}
                  className="mt-12 px-8 py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 rounded-xl text-xs font-bold tracking-widest text-blue-400 transition-all"
                >
                  BACK TO CONTROL CENTER
                </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating UI Elements (AI Chatbot & Voice Assistant) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
        <VoiceAssistant setActivePage={handlePageChange} />
        <AIChatbot />
      </div>

      {/* Clean Production Footer */}
      <footer className="mt-20 py-10 border-t border-slate-900 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
          <Shield size={16} />
          <span className="text-sm font-bold tracking-[0.2em] uppercase">SentinelShield v1.0</span>
        </div>
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Enterprise-Grade Security Ecosystem Portfolio</p>
      </footer>
    </main>
  );
}
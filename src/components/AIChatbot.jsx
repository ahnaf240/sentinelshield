'use client';
import { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end">
      {/* চ্যাট উইন্ডো (যখন ওপেন থাকবে) */}
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-[#0a0f1a] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl">
          <div className="p-4 bg-blue-500/10 border-b border-blue-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-blue-400" />
              <span className="text-xs font-bold tracking-widest text-blue-100">SENTINEL MULTI-AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-[13px]">
            <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-xl text-blue-200">
              Welcome Agent. Which Intelligence System would you like to access?
            </div>
          </div>

          <div className="p-4 border-t border-white/5">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 pr-12 text-sm focus:border-blue-500/50 outline-none transition-all"
              />
              <button className="absolute right-2 top-1.5 p-2 text-blue-500 hover:text-blue-400 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* গোল আইকন বাটন */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
      </button>
    </div>
  );
}
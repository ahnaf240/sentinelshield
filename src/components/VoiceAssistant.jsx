"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, Radio, Volume2, Settings } from 'lucide-react';

export default function VoiceAssistant({ setActivePage }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  
  // ইউজারের ইচ্ছামতো AI-এর নাম পরিবর্তন করার স্টেট (ডিফল্ট আপনার জন্য Adri সেট করা)
  const [aiName, setAiName] = useState('adri'); 
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  
  const recognitionRef = useRef(null);
  const shouldListenRef = useRef(false); // ব্যাকগ্রাউন্ড লুপ সচল রাখার জন্য রিফ

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      const recognition = new SpeechRecognition();
      recognition.continuous = true; // অবিরত শুনতে থাকবে, থামবে না
      recognition.interimResults = false;
      recognition.lang = 'en-US'; // গ্লোবাল ল্যাঙ্গুয়েজ ট্র্যাকিং

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript.toLowerCase().trim();
        setTranscript(text);
        processWakeWordIntelligence(text);
      };

      // সবচেয়ে ইম্পর্ট্যান্ট পার্ট: কথা বলা শেষ হলে বা ব্রাউজার ব্রেক নিলে অটোমেটিক আবার অন হবে
      recognition.onend = () => {
        if (shouldListenRef.current) {
          try {
            recognition.start();
          } catch (e) {
            console.log("Restarting listening node...", e);
          }
        }
      };

      recognitionRef.current = recognition;
    }
  }, [aiName]); // নাম চেঞ্জ হলে রি-বাইন্ড হবে

  // হ্যান্ডস-ফ্রি মোড অন/অফ করার মেইন সুইচ
  const toggleContinuousListening = () => {
    if (isListening) {
      shouldListenRef.current = false;
      recognitionRef.current?.stop();
      setIsListening(false);
      setTranscript('System Offline');
    } else {
      shouldListenRef.current = true;
      setTranscript('Wake Word Engine Active...');
      setAiResponse('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        speak(`System active. Ready for wake word, ${aiName}.`, 'en-US');
      } catch (e) {
        console.error(e);
      }
    }
  };

  // --- ওয়েক ওয়ার্ড (Wake Word) এবং ল্যাঙ্গুয়েজ প্রসেসর ---
  const processWakeWordIntelligence = (text) => {
    const currentAiName = aiName.toLowerCase();
    
    // চেক করবে ইউজার তার সেট করা নাম (যেমন: Adri) ধরে ডেকেছে কিনা
    if (text.includes(currentAiName)) {
      // নাম ডাকার পরের আসল কমান্ডটুকু আলাদা করা
      const command = text.split(currentAiName)[1]?.trim() || '';
      
      let reply = "";
      let langCode = "en-US";

      // ১. যদি শুধু নাম ধরে ডাকে (যেমন: "Hey Adri")
      if (!command || command === 'hey' || command === 'hello' || command === 'হাই' || command === 'হ্যালো') {
        if (/[ক-ঞট-য়]/.test(text)) {
          reply = `জি স্যার বলুন, আমি শুনছি। আপনার দিনটি কেমন কাটছে?`;
          langCode = "bn-BD";
        } else {
          reply = `Yes Sir, I am online. System matrix is stable. How is your day going?`;
          langCode = "en-US";
        }
      } 
      // ২. স্ক্রিন অন/কন্ট্রোল কমান্ড (English)
      else if (command.includes('open dashboard') || command.includes('control center')) {
        setActivePage('dashboard');
        reply = "Access granted. Opening the Sentinel Control Center now.";
        langCode = "en-US";
      } else if (command.includes('open map') || command.includes('threat map')) {
        setActivePage('threat-scanner');
        reply = "Navigating to Live Global Attack Map.";
        langCode = "en-US";
      } else if (command.includes('close') || command.includes('go home')) {
        setActivePage('hero');
        reply = "Closing Control Center. Returning to main gate.";
        langCode = "en-US";
      }
      // ৩. স্ক্রিন অন/কন্ট্রোল কমান্ড (বাংলা)
      else if (command.includes('ড্যাশবোর্ড খোলো') || command.includes('কন্ট্রোল সেন্টার খোলো')) {
        setActivePage('dashboard');
        reply = "জি স্যার, কন্ট্রোল সেন্টার ওপেন করা হয়েছে।";
        langCode = "bn-BD";
      } else if (command.includes('ম্যাপ খোলো') || command.includes('অ্যাটাক ম্যাপ খোলো')) {
        setActivePage('threat-scanner');
        reply = "গ্লোবাল থ্রেট ম্যাপ লোড করা হচ্ছে।";
        langCode = "bn-BD";
      } else if (command.includes('বন্ধ করো') || command.includes('হোমে যাও')) {
        setActivePage('hero');
        reply = "কন্ট্রোল সেন্টার বন্ধ করে মেইন গেটে ফিরে যাচ্ছি।";
        langCode = "bn-BD";
      }
      // ৪. হিন্দি/উর্দু কমান্ড
      else if (command.includes('kaise ho') || command.includes('kya haal')) {
        reply = "मैं बिल्कुल ठीक हूँ सर। आपका दिन कैसा चल रहा है?";
        langCode = "hi-IN";
      } else if (command.includes('dashboard kholo')) {
        setActivePage('dashboard');
        reply = "जी सर, डैशबोर्ड खोल दिया गया है।";
        langCode = "hi-IN";
      }
      // ৫. কাস্টম র্যান্ডম গ্লোবাল টক
      else {
        if (/[ক-ঞট-য়]/.test(command)) {
          reply = `আপনার কমান্ড প্রসেস করা হচ্ছে স্যার। আপনি বলেছেন: "${command}"`;
          langCode = "bn-BD";
        } else {
          reply = `Command received, Sir. Executing system operation for: "${command}"`;
          langCode = "en-US";
        }
      }

      setAiResponse(reply);
      speak(reply, langCode);
    }
  };

  // --- ভয়েস আউটপুট ইঞ্জিন ---
  const speak = (sentence, lang) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // আগের কথা থামাো
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = lang;
      utterance.pitch = lang === 'en-US' ? 0.85 : 1.0; 
      utterance.rate = 1.0; 

      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.lang.includes(lang));
      if (selectedVoice) utterance.voice = selectedVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 backdrop-blur-xl max-w-sm shadow-[0_0_40px_rgba(30,58,138,0.3)] border-blue-500/20 transition-all duration-300">
      
      <div className="flex items-center gap-4">
        {/* মেইন হ্যান্ডস-ফ্রি পাওয়ার বাটন */}
        <button
          onClick={toggleContinuousListening}
          className={`p-4 rounded-xl transition-all duration-300 relative ${
            isListening 
              ? 'bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/30 animate-pulse' 
              : 'bg-red-600/10 text-red-400 hover:bg-red-600/20'
          }`}
        >
          {isListening ? <Radio size={20} className="animate-spin duration-3000" /> : <MicOff size={20} />}
        </button>
        
        <div className="flex-1 min-w-0 font-mono">
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`} />
              Sentinel_Core_AI
            </span>
            {/* নাম পরিবর্তনের গিয়ার বাটন */}
            <button onClick={() => setIsSettingOpen(!isSettingOpen)} className="text-slate-500 hover:text-slate-300">
              <Settings size={12} />
            </button>
          </p>
          <div className="mt-1">
            <p className="text-[11px] text-slate-400 truncate italic">
              {isListening ? `Listening for wake word: "${aiName}"...` : "System is Offline. Turn on."}
            </p>
          </div>
        </div>
      </div>

      {/* নাম পরিবর্তন করার প্যানেল */}
      {isSettingOpen && (
        <div className="border-t border-slate-900 pt-2 flex items-center gap-2 font-mono text-[11px]">
          <span className="text-slate-500 uppercase">Set Wake Name:</span>
          <input 
            type="text" 
            value={aiName} 
            onChange={(e) => setAiName(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-emerald-400 focus:outline-none w-24 text-center font-bold"
          />
        </div>
      )}

      {/* লাইভ ট্রান্সক্রিপ্ট এবং AI রেসপন্স এরিয়া */}
      {isListening && (transcript || aiResponse) && (
        <div className="border-t border-slate-900 pt-2 space-y-1.5 font-mono text-[11px]">
          {transcript && <p className="text-slate-500 truncate"><span className="text-blue-500 font-bold">You:</span> {transcript}</p>}
          {aiResponse && (
            <p className="text-emerald-400 leading-tight border-t border-slate-900/40 pt-1">
              <Volume2 size={10} className="inline mr-1 text-emerald-500" />
              <span className="text-emerald-500 font-bold uppercase">{aiName}:</span> {aiResponse}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
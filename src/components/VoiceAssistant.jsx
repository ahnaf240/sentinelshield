"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, Radio, Volume2, Globe } from 'lucide-react';

export default function VoiceAssistant({ setActivePage }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [detectedLang, setDetectedLang] = useState('Global Mode');
  
  const recognitionRef = useRef(null);
  const shouldListenRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = navigator.language || 'en-US';

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
        processGlobalAIIntelligence(text);
      };

      recognition.onend = () => {
        if (shouldListenRef.current) {
          try { recognition.start(); } catch (e) { console.log("Microphone restart sequence active...", e); }
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceEngine = () => {
    if (!isMounted) return;
    if (isListening) {
      shouldListenRef.current = false;
      recognitionRef.current?.stop();
      setIsListening(false);
      setTranscript('System Standing Down');
    } else {
      shouldListenRef.current = true;
      setTranscript('Listening for ANY language...');
      setAiResponse('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        speak("Global language matrix activated. Speak now, Sir.", "en-US");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // --- মেগা গ্লোবাল এআই ব্রেন (দুনিয়ার যেকোনো ভাষা হ্যান্ডেল করার কমপ্লিট লজিক) ---
  const processGlobalAIIntelligence = (rawText) => {
    const text = rawText.toLowerCase().trim();
    let reply = "";
    let langCode = "en-US";

    // 🇧🇩 ১. পিওর বাংলা স্ক্রিপ্ট বা রোমানাইজড বাংলিশ (Bengali / Banglish)
    if (/[ক-ঞট-য়]/.test(rawText) || text.includes('kemon') || text.includes('hi') || text.includes('hello') || text.includes('kholo') || text.includes('kemon acho') || text.includes('valona')) {
      
      if (text.includes('dashboard') || text.includes('ড্যাশবোর্ড') || text.includes('কন্ট্রোল')) {
        setActivePage('dashboard');
        reply = "জি স্যার, আমি কন্ট্রোল সেন্টার ও ড্যাশবোর্ড স্ক্রিনটি ওপেন করেছি। সকল সিকিউরিটি গেটওয়ে এনক্রিপ্টেড।";
      } else if (text.includes('map') || text.includes('ম্যাপ') || text.includes('অ্যাটাক ম্যাপ')) {
        setActivePage('threat-scanner');
        reply = "লাইভ গ্লোবাল থ্রেট ম্যাপ নোডটি সফলভাবে চালু করা হয়েছে। নেটওয়ার্ক ট্রাফিক মনিটর করা হচ্ছে।";
      } else if (text.includes('bondho') || text.includes('বন্ধ করো') || text.includes('হোমে যাও')) {
        setActivePage('hero');
        reply = "কন্ট্রোল সেন্টার বন্ধ করে মেইন গেটওয়েতে ফিরে যাচ্ছি, স্যার।";
      } else {
        reply = "হ্যালো স্যার! আমি আপনার গ্লোবাল এআই। আপনার মনের ভাষা আমি বুঝতে পেরেছি। আপনার দিনটি কেমন যাচ্ছে বলুন? সব ঠিকঠাক তো?";
      }
      langCode = "bn-BD";
      setDetectedLang("Bengali / বাংলা");
    } 
    
    // 🇮🇳 ②. হিন্দি ও উর্দু (Hindi / Urdu)
    else if (text.includes('kaise ho') || text.includes('kya haal') || text.includes('namaste') || text.includes('shukriya') || text.includes('dikhau') || text.includes('shubh')) {
      
      if (text.includes('dashboard') || text.includes('कंट्रोल')) {
        setActivePage('dashboard');
        reply = "जी सर, आपका डैशボード स्क्रीन लोड कर दिया गया है। सुरक्षा प्रणालियाँ सक्रिय हैं।";
      } else if (text.includes('map') || text.includes('नक्शा')) {
        setActivePage('threat-scanner');
        reply = "लाइव थ्रेट मैप सक्रिय कर दिया गया है। ग्लोबल नोड्स सुरक्षित हैं।";
      } else {
        reply = "नमस्ते सर। मैं आपकी भाषा पूरी तरह समझ सकता हूँ। आपका दिन कैसा बीत रहा है? आपकी सेवा में तत्पर।";
      }
      langCode = "hi-IN";
      setDetectedLang("Hindi-Urdu / हिंदी");
    } 
    
    // 🇪🇸 ③. স্প্যানিশ (Spanish)
    else if (text.includes('hola') || text.includes('como estas') || text.includes('buenos') || text.includes('sistema') || text.includes('gracias')) {
      
      if (text.includes('dashboard') || text.includes('control')) {
        setActivePage('dashboard');
        reply = "Acceso concedido. Abriendo el Panel de Control Central ahora mismo, Señor.";
      } else {
        reply = "Hola Señor. Entiendo tu idioma perfectamente. El sistema está seguro. ¿Cómo va tu día hoy?";
      }
      langCode = "es-ES";
      setDetectedLang("Spanish / Español");
    }

    // 🇫🇷 ④. ফ্রেঞ্চ (French)
    else if (text.includes('bonjour') || text.includes('salut') || text.includes('ca va') || text.includes('merci')) {
      
      if (text.includes('dashboard') || text.includes('système')) {
        setActivePage('dashboard');
        reply = "Accès autorisé. Lancement du centre de contrôle principal.";
      } else {
        reply = "Bonjour Monsieur. Je comprends votre langue avec précision. Comment se passe votre journée ?";
      }
      langCode = "fr-FR";
      setDetectedLang("French / Français");
    }

    // 🇯🇵 ⑤. জাপানিজ (Japanese)
    else if (text.includes('konnichiwa') || text.includes('arigatou') || text.includes('genki') || text.includes('hai')) {
      reply = "こんにちは先生。システムは正常に動作しています。今日はどんな一日ですか？";
      langCode = "ja-JP";
      setDetectedLang("Japanese / 日本語");
    }

    // 🇺🇸 ⑥. ডিফল্ট গ্লোবাল ইংলিশ (Jarvis / Friday Mode)
    else {
      if (text.includes('dashboard') || text.includes('control center') || text.includes('open')) {
        setActivePage('dashboard');
        reply = "Access granted. Synchronizing data nodes and launching the Sentinel Control Center interface.";
      } else if (text.includes('map') || text.includes('threat') || text.includes('show')) {
        setActivePage('threat-scanner');
        reply = "Redirecting system sub-nodes to Live Global Threat Map. Mainframe is secure.";
      } else if (text.includes('close') || text.includes('go home') || text.includes('exit')) {
        setActivePage('hero');
        reply = "Securing system core. Terminating dashboard interface and returning to primary gate.";
      } else {
        reply = `Hello Sir. Universal Core processed your input: "${rawText}". All grids are completely secure and operational. How is your day going?`;
      }
      langCode = "en-US";
      setDetectedLang("English / Global");
    }

    if (reply) {
      setAiResponse(reply);
      speak(reply, langCode);
    }
  };

  // --- গ্লোবাল স্পীচ সিন্থেসিস ইঞ্জিন ---
  const speak = (sentence, lang) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = lang;
      
      // সাই-ফাই গম্ভীর টোনের জন্য টিউনিং
      utterance.pitch = lang === 'en-US' ? 0.85 : 1.0; 
      utterance.rate = 1.0; 

      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.lang.includes(lang));
      if (selectedVoice) utterance.voice = selectedVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 backdrop-blur-xl max-w-sm shadow-[0_0_40px_rgba(30,58,138,0.3)] border-blue-500/20 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleVoiceEngine}
          className={`p-4 rounded-xl transition-all duration-300 relative ${
            isListening 
              ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/30 animate-pulse' 
              : 'bg-red-600/10 text-red-400 hover:bg-red-600/20'
          }`}
        >
          {isListening ? <Radio size={20} className="animate-spin duration-3000" /> : <MicOff size={20} />}
        </button>
        
        <div className="flex-1 min-w-0 font-mono">
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-blue-500 animate-ping' : 'bg-red-500'}`} />
              Universal_Jarvis_v3.0
            </span>
            <span className="text-[9px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded flex items-center gap-1">
              <Globe size={10} /> {detectedLang}
            </span>
          </p>
          <div className="mt-1">
            <p className="text-[11px] text-slate-400 truncate italic">
              {isListening ? "Direct Audio Stream: OPEN" : "System Standby. Click to initialize."}
            </p>
          </div>
        </div>
      </div>

      {isListening && (transcript || aiResponse) && (
        <div className="border-t border-slate-900 pt-2 space-y-1.5 font-mono text-[11px]">
          {transcript && <p className="text-slate-500 truncate"><span className="text-blue-500 font-bold">In:</span> {transcript}</p>}
          {aiResponse && (
            <p className="text-emerald-400 leading-tight border-t border-slate-900/40 pt-1">
              <Volume2 size={10} className="inline mr-1 text-emerald-500" />
              <span className="text-emerald-500 font-bold uppercase">Out:</span> {aiResponse}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
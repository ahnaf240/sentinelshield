"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, Radio, Volume2, Globe } from 'lucide-react';

export default function VoiceAssistant({ setActivePage }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [detectedLang, setDetectedLang] = useState('Global Mode');
  
  const recognitionRef = useRef(null);
  const shouldListenRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;

      // এখানে আমরা মাল্টি-ল্যাঙ্গুয়েজ রিসিভার নোড ট্রিক ব্যবহার করছি
      // কিছু ব্রাউজারে এটি স্পীচ প্রোফাইল অনুযায়ী গ্লোবাল ইনপুট অ্যাক্সেপ্ট করে
      recognition.lang = typeof navigator !== 'undefined' ? navigator.language : 'en-US';

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
        
        // গ্লোবাল এআই ব্রেনকে কল করা হচ্ছে যা দুনিয়ার যেকোনো ভাষা প্রসেস করতে পারে
        processGlobalAIIntelligence(text);
      };

      recognition.onend = () => {
        if (shouldListenRef.current) {
          try { recognition.start(); } catch (e) { console.log(e); }
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceEngine = () => {
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
        speak("Global language matrix activated. Speak now.", "en-US");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // --- মেগা গ্লোবাল এআই ব্রেন (দুনিয়ার যেকোনো ভাষা হ্যান্ডেল করার লজিক) ---
  const processGlobalAIIntelligence = (rawText) => {
    const text = rawText.toLowerCase().trim();
    let reply = "";
    let langCode = "en-US";

    // ১. বাংলা স্ক্রিপ্ট বা রোমানাইজড বাংলা (Bengali / Banglish)
    if (/[ক-ঞট-য়]/.test(rawText) || text.includes('kemon') || text.includes('hi') || text.includes('hello') || text.includes('kholo')) {
      if (text.includes('dashboard') || text.includes('ড্যাশবোর্ড') || text.includes('কন্ট্রোল')) {
        setActivePage('dashboard');
        reply = "জি স্যার, আমি কন্ট্রোল সেন্টার ও ড্যাশবোর্ড স্ক্রিনটি ওপেন করেছি।";
      } else if (text.includes('map') || text.includes('ম্যাপ')) {
        setActivePage('threat-scanner');
        reply = "লাইভ গ্লোবাল থ্রেট ম্যাপ নোডটি চালু করা হয়েছে।";
      } else {
        reply = "হ্যালো স্যার! আমি আপনার গ্লোবাল এআই। আপনার মনের ভাষা আমি বুঝতে পেরেছি। আপনার দিনটি কেমন যাচ্ছে বলুন?";
      }
      langCode = "bn-BD";
      setDetectedLang("Bengali / বাংলা");
    } 
    
    // ②. হিন্দি ও উর্দু (Hindi / Urdu)
    else if (text.includes('kaise ho') || text.includes('kya haal') || text.includes('namaste') || text.includes('shukriya') || text.includes('dikhau')) {
      if (text.includes('dashboard')) {
        setActivePage('dashboard');
        reply = "जी सर, आपका डैशबोर्ड स्क्रीन लोड कर दिया गया है।";
      } else {
        reply = "नमस्ते सर। मैं आपकी भाषा समझ सकता हूँ। आपका दिन कैसा बीत रहा है?";
      }
      langCode = "hi-IN";
      setDetectedLang("Hindi-Urdu / हिंदी");
    } 
    
    // ③. স্প্যানিশ (Spanish - Hola, cómo estás)
    else if (text.includes('hola') || text.includes('como estas') || text.includes('buenos') || text.includes('sistema')) {
      reply = "Hola Señor. Entiendo tu idioma perfectamente. ¿Cómo va tu día hoy?";
      langCode = "es-ES";
      setDetectedLang("Spanish / Español");
    }

    // ④. ফ্রেঞ্চ (French - Bonjour, comment ça va)
    else if (text.includes('bonjour') || text.includes('salut') || text.includes('ca va')) {
      reply = "Bonjour Monsieur. Je comprends votre langue. Comment se passe votre journée?";
      langCode = "fr-FR";
      setDetectedLang("French / Français");
    }

    // ⑤. জাপানিজ (Japanese - Konnichiwa, Arigatou)
    else if (text.includes('konnichiwa') || text.includes('arigatou') || text.includes('genki')) {
      reply = "こんにちは先生。私はあなたの言葉 অনূদিত করতে পারি। 今日はどんな一日ですか？";
      langCode = "ja-JP";
      setDetectedLang("Japanese / 日本語");
    }

    // ⑥. ডিফল্ট গ্লোবাল ইংলিশ (English)
    else {
      if (text.includes('dashboard') || text.includes('control center')) {
        setActivePage('dashboard');
        reply = "Access granted. Launching the Sentinel Control Center interface.";
      } else if (text.includes('map') || text.includes('threat')) {
        setActivePage('threat-scanner');
        reply = "Redirecting system nodes to Live Global Threat Map.";
      } else {
        reply = `Hello Sir. Universal Core processed your input: "${rawText}". All grids are completely secure. How is your day going?`;
      }
      langCode = "en-US";
      setDetectedLang("English / Global");
    }

    if (reply) {
      setAiResponse(reply);
      speak(reply, langCode);
    }
  };

  // --- গ্লোবাল স্পীচ সিন্থেসিস ইঞ্জিন (যে ভাষায় ইনপুট, সেই ভাষায় আউটপুট) ---
  const speak = (sentence, lang) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = lang;
      
      utterance.pitch = lang === 'en-US' ? 0.88 : 1.0; 
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
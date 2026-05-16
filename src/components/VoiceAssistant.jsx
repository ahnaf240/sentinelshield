"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, Radio, Volume2 } from 'lucide-react';

export default function VoiceAssistant({ setActivePage }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.log("Speech Recognition system missing in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false; // একবারে একটি বাক্য শুনবে এবং প্রসেস করবে
      recognition.interimResults = false;
      
      // 'en-US' ডিফল্ট থাকলেও এটি বহুভাষিক ইনপুট (বাংলা/হিন্দি/উর্দু) ব্যাকগ্রাউন্ডে ক্যাচ করতে পারে
      recognition.lang = 'en-US'; 

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processJarvisIntelligence(text);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('Listening...');
      setAiResponse('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // --- জ্যারভিস/ফ্রাইডে মাল্টিলিঙ্গুয়াল ব্রেন সিমুলেটর ---
  const processJarvisIntelligence = (userInput) => {
    const text = userInput.toLowerCase().trim();
    let reply = "";
    let langCode = "en-US"; // ডিফল্ট ভয়েস ল্যাঙ্গুয়েজ

    // ১. ইংলিশ কনভারসেশন (Jarvis Mode)
    if (text.includes('hey') || text.includes('hello') || text.includes('jarvis') || text.includes('friday')) {
      reply = "Welcome back, Sir. All security grids are functional. How is your day going so far?";
      langCode = "en-US";
    } else if (text.includes('open dashboard') || text.includes('control center')) {
      setActivePage('dashboard');
      reply = "Access granted. Opening the Sentinel Control Center now, Sir.";
      langCode = "en-US";
    } else if (text.includes('open map') || text.includes('threat map')) {
      setActivePage('threat-scanner');
      reply = "Navigating to Live Global Attack Map. Scanning nodes.";
      langCode = "en-US";

    // ২. বাংলা কনভারসেশন (স্মার্ট মেকানিজম)
    } else if (text.includes('কেমন আছ') || text.includes('হাই') || text.includes('হ্যালো')) {
      reply = "হ্যালো স্যার! আমি আপনার সিস্টেম অ্যাসিস্ট্যান্ট। আপনার দিনটি কেমন কাটছে বলুন? কোনো সিকিউরিটি চেক করতে হবে?";
      langCode = "bn-BD";
    } else if (text.includes('ড্যাশবোর্ড খোলো') || text.includes('ম্যাপ খোলো')) {
      setActivePage('dashboard');
      reply = "জি স্যার, আমি কন্ট্রোল সেন্টার ওপেন করছি। সিকিউরিটি মডিউলগুলো সচল আছে।";
      langCode = "bn-BD";

    // ৩. হিন্দি ও উর্দু কনভারসেশন (Hinglish/Urdu Detection)
    } else if (text.includes('kaise ho') || text.includes('kya haal') || text.includes('namaste')) {
      reply = "नमस्ते सर। मैं आपकी मदद के लिए तैयार हूँ। आपका दिन कैसा चल रहा है?";
      langCode = "hi-IN";
    } else if (text.includes('shukriya') || text.includes('alvida')) {
      reply = "आपका शुक्रिया सर। हमेशा आपकी सेवा में तत्पर।";
      langCode = "hi-IN";

    // ৪. স্প্যানিশ কনভারসーション (Spanish Mode)
    } else if (text.includes('hola') || text.includes('buenos')) {
      reply = "Hola Señor. El sistema está seguro. ¿Cómo va su día?";
      langCode = "es-ES";

    // ৫. আননোন বা জেনারেলাইজড ইনপুট (স্মার্ট ডিফল্ট রেসপন্স)
    } else {
      // ইউজার যে ল্যাঙ্গুয়েজে কথা বলছে তার ক্যাচিং
      if (/[ক-ঞট-য়]/.test(userInput)) {
        reply = `আমি আপনার কথা বুঝতে পেরেছি স্যার। আপনি বলেছেন: "${userInput}"। পোর্টফোলিও মোডে এই কমান্ডটির ওপর আমি কাজ করছি।`;
        langCode = "bn-BD";
      } else {
        reply = `Understood, Sir. Analyzing your query: "${userInput}". System intelligence is compiling data.`;
        langCode = "en-US";
      }
    }

    setAiResponse(reply);
    speak(reply, langCode);
  };

  // --- মাল্টি-ল্যাঙ্গুয়েজ ভয়েস আউটপুট ইঞ্জিন ---
  const speak = (sentence, lang) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // আগের কোনো স্পিচ চলতে থাকলে তা থামিয়ে দেবে
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = lang;
      
      // জ্যারভিসের মতো গম্ভীর টোন দেওয়ার জন্য পিচ এবং স্পিড টিউনিং
      utterance.pitch = lang === 'en-US' ? 0.85 : 1.0; 
      utterance.rate = 1.0; 

      // সিস্টেমে থাকা বেস্ট ভয়েস সিলেক্ট করা (যেমন গুগল ভয়েস বা মাইক্রোসফট ভয়েস)
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.lang.includes(lang));
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-xl max-w-sm shadow-[0_0_30px_rgba(30,58,138,0.2)] border-blue-500/20 transition-all duration-300">
      <button
        onClick={toggleListening}
        className={`p-4 rounded-xl transition-all duration-300 relative group ${
          isListening 
            ? 'bg-red-500/20 text-red-400 animate-pulse ring-2 ring-red-500/30' 
            : 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300'
        }`}
      >
        {isListening ? <Radio size={20} className="animate-spin duration-2000" /> : <Mic size={20} />}
      </button>
      
      <div className="flex-1 min-w-0 font-mono">
        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-blue-500'}`} />
          Sentinel_Friday_v2.0
        </p>
        <div className="mt-1 space-y-0.5">
          <p className="text-[11px] text-slate-400 truncate italic">
            {transcript ? `${transcript}` : "Click mic and speak any language..."}
          </p>
          {aiResponse && (
            <p className="text-[11px] text-emerald-400 leading-tight border-t border-slate-900 pt-1 mt-1 animate-in fade-in duration-300">
              <Volume2 size={10} className="inline mr-1 text-emerald-500" />
              {aiResponse}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
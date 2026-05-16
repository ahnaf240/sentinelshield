"use client";

import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

export default function VoiceAssistant({ setActivePage }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.log("Speech Recognition not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript.toLowerCase();
        setTranscript(text);
        handleVoiceCommand(text);
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => recognition.stop();
    }
  }, [isListening]);

  // ভয়েস কমান্ড প্রসেস করার লজিক
  const handleVoiceCommand = (command) => {
    if (command.includes('open dashboard') || command.includes('control center')) {
      setActivePage('dashboard');
      speak("Opening Control Center, Sir.");
    } else if (command.includes('open map') || command.includes('threat map')) {
      setActivePage('threat-scanner');
      speak("Navigating to Live Global Attack Map.");
    } else if (command.includes('go home') || command.includes('open hero')) {
      setActivePage('hero');
      speak("Returning to main gate.");
    }
  };

  // সিস্টেমের মুখে কথা বলানোর ফাংশন (Friday/Jarvis এর মতো)
  const speak = (sentence) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.pitch = 1;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-md">
      <button
        onClick={() => setIsListening(!isListening)}
        className={`p-3 rounded-xl transition-all ${
          isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-blue-500/10 text-blue-400'
        }`}
      >
        {isListening ? <Mic size={20} /> : <MicOff size={20} />}
      </button>
      <div>
        <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Sentinel Voice AI</p>
        <p className="text-xs text-slate-500 italic">
          {transcript ? `"${transcript}"` : "Say 'Open Threat Map' or 'Open Dashboard'"}
        </p>
      </div>
    </div>
  );
}
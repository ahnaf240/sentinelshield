'use client';
import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, X, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen,      setIsOpen]      = useState(false);
  const [messages,    setMessages]    = useState([
    { role: 'assistant', content: "FRIDAY online. All systems operational. How can I assist you today?" }
  ]);
  const [input,       setInput]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [listening,   setListening]   = useState(false);
  const [voiceOn,     setVoiceOn]     = useState(true);
  const [expanded,    setExpanded]    = useState(false);
  const [pulse,       setPulse]       = useState(false);

  const bottomRef    = useRef(null);
  const recognRef    = useRef(null);
  const synthRef     = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Pulse animation on new message
  useEffect(() => {
    if (messages.length > 1) {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }
  }, [messages]);

  // ── Voice Input (Speech Recognition) ──
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support voice input. Please use Chrome.');
      return;
    }

    const recog = new SpeechRecognition();
    recog.continuous      = false;
    recog.interimResults  = false;
    recog.lang            = ''; // Auto-detect language

    recog.onstart = () => setListening(true);

    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      // Auto-send after voice input
      setTimeout(() => sendMessage(transcript), 300);
    };

    recog.onerror  = () => setListening(false);
    recog.onend    = () => setListening(false);

    recognRef.current = recog;
    recog.start();
  };

  const stopListening = () => {
    recognRef.current?.stop();
    setListening(false);
  };

  // ── Voice Output (Text to Speech) ──
  const speak = (text) => {
    if (!voiceOn || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance  = new SpeechSynthesisUtterance(text);
    utterance.rate   = 0.95;
    utterance.pitch  = 0.9;
    utterance.volume = 1;

    // Pick best voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Samantha')
    );
    if (preferred) utterance.voice = preferred;

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // ── Send Message ──
  const sendMessage = async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;

    setInput('');
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = messages.slice(-10); // Last 10 messages for context
      const res  = await fetch('/api/friday', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      const reply = data.response || 'System error. Please try again.';

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      speak(reply);

    } catch {
      const errMsg = 'Connection error. Please check your network.';
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "Memory cleared. FRIDAY reinitialized." }]);
    window.speechSynthesis?.cancel();
  };

  const w = expanded ? 480 : 360;
  const h = expanded ? 620 : 500;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end select-none">

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="mb-4 flex flex-col rounded-2xl overflow-hidden"
          style={{
            width:  w,
            height: h,
            background:   'rgba(5,8,20,0.97)',
            border:       '1px solid rgba(0,212,255,0.25)',
            boxShadow:    '0 0 40px rgba(0,212,255,0.12), 0 20px 60px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(20px)',
            transition:   'width 0.3s, height 0.3s',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              background:   'rgba(0,212,255,0.06)',
              borderBottom: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            <div className="flex items-center gap-3">
              {/* Animated orb */}
              <div className="relative w-8 h-8 flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:   'radial-gradient(circle, #00d4ff, #0066ff)',
                    boxShadow:    loading || listening
                      ? '0 0 20px #00d4ff, 0 0 40px #00d4ff80'
                      : '0 0 10px #00d4ff60',
                    animation:    loading || listening ? 'pulse 1s infinite' : 'none',
                  }}
                />
                <div
                  className="absolute inset-1 rounded-full"
                  style={{ background: 'rgba(5,8,20,0.7)' }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ fontSize: 12, fontWeight: 700, color: '#00d4ff', fontFamily: 'Orbitron, sans-serif' }}
                >
                  F
                </div>
              </div>
              <div>
                <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem', color: '#00d4ff', letterSpacing: 2 }}>
                  FRIDAY
                </p>
                <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)' }}>
                  {loading ? 'PROCESSING...' : listening ? 'LISTENING...' : 'ONLINE · ALL SYSTEMS GO'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice toggle */}
              <button
                onClick={() => { setVoiceOn(p => !p); window.speechSynthesis?.cancel(); }}
                className="p-1.5 rounded-lg transition-all"
                style={{
                  background: voiceOn ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${voiceOn ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  color: voiceOn ? '#00d4ff' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                }}
                title={voiceOn ? 'Mute voice' : 'Enable voice'}
              >
                {voiceOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
              </button>

              {/* Expand */}
              <button
                onClick={() => setExpanded(p => !p)}
                className="p-1.5 rounded-lg transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
              >
                {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>

              {/* Clear */}
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                title="Clear chat"
              >
                <span style={{ fontSize: 10, fontFamily: 'Orbitron, sans-serif' }}>CLR</span>
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg transition-all"
                style={{ background: 'rgba(255,51,102,0.1)', border: '1px solid rgba(255,51,102,0.2)', color: '#ff3366', cursor: 'pointer' }}
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,212,255,0.2) transparent' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] px-3 py-2.5 rounded-xl"
                  style={{
                    background: msg.role === 'user'
                      ? 'rgba(0,212,255,0.12)'
                      : 'rgba(255,255,255,0.04)',
                    border: msg.role === 'user'
                      ? '1px solid rgba(0,212,255,0.25)'
                      : '1px solid rgba(255,255,255,0.07)',
                    fontFamily: 'Exo 2, sans-serif',
                    fontSize:   '0.82rem',
                    lineHeight: 1.55,
                    color:      msg.role === 'user' ? '#e0f8ff' : 'rgba(224,232,240,0.9)',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex gap-1.5 items-center">
                    {[0,1,2].map(n => (
                      <div
                        key={n}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background:  '#00d4ff',
                          animation:   `bounce 1.2s ${n * 0.2}s infinite`,
                          boxShadow:   '0 0 6px #00d4ff',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="p-3 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex gap-2 items-end">
              {/* Mic button */}
              <button
                onClick={listening ? stopListening : startListening}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: listening
                    ? 'rgba(255,51,102,0.2)'
                    : 'rgba(0,212,255,0.1)',
                  border: listening
                    ? '1px solid rgba(255,51,102,0.5)'
                    : '1px solid rgba(0,212,255,0.3)',
                  color:   listening ? '#ff3366' : '#00d4ff',
                  cursor:  'pointer',
                  boxShadow: listening ? '0 0 12px rgba(255,51,102,0.4)' : 'none',
                  animation: listening ? 'pulse 1s infinite' : 'none',
                }}
                title={listening ? 'Stop listening' : 'Voice input'}
              >
                {listening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>

              {/* Text input */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={listening ? 'Listening...' : 'Ask FRIDAY anything...'}
                rows={1}
                className="flex-1 resize-none rounded-xl px-3 py-2 outline-none transition-all"
                style={{
                  background:    'rgba(255,255,255,0.04)',
                  border:        '1px solid rgba(255,255,255,0.1)',
                  color:         '#e0e8f0',
                  fontFamily:    'Exo 2, sans-serif',
                  fontSize:      '0.82rem',
                  maxHeight:     80,
                  scrollbarWidth: 'none',
                  lineHeight:    1.5,
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(0,212,255,0.4)'}
                onBlur={(e)  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />

              {/* Send button */}
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: input.trim() && !loading ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
                  border:     input.trim() && !loading ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color:      input.trim() && !loading ? '#00d4ff' : 'rgba(255,255,255,0.2)',
                  cursor:     input.trim() && !loading ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={14} />
              </button>
            </div>

            <p className="text-center mt-2" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'Share Tech Mono, monospace', letterSpacing: 1 }}>
              FRIDAY · MULTILINGUAL AI · PRESS MIC TO SPEAK
            </p>
          </div>
        </div>
      )}

      {/* ── Floating Button ── */}
      <button
        onClick={() => setIsOpen(p => !p)}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background:  isOpen
            ? 'rgba(255,51,102,0.9)'
            : 'radial-gradient(circle at 40% 40%, #00d4ff, #0044ff)',
          boxShadow:   isOpen
            ? '0 0 20px rgba(255,51,102,0.5)'
            : `0 0 ${pulse ? '30px' : '20px'} rgba(0,212,255,${pulse ? '0.8' : '0.4'}), 0 8px 24px rgba(0,0,0,0.6)`,
          border:      'none',
          cursor:      'pointer',
          transition:  'all 0.3s',
        }}
      >
        {isOpen ? (
          <X size={22} color="#fff" />
        ) : (
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem', color: '#fff', fontWeight: 700, letterSpacing: 1 }}>
            F·AI
          </span>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
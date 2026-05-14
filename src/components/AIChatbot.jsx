import React, { useState } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('SentinelAI');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Welcome Agent. Which Intelligence System would you like to access?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, model: selectedModel }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error: Connection lost." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-xl flex flex-col h-[500px]">
      {/* Header with Model Selector */}
      <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center bg-cyan-500/5">
        <div className="flex items-center gap-2">
          <Bot className="text-cyan-400" />
          <h3 className="text-white font-bold font-orbitron text-sm">SENTINEL MULTI-AI</h3>
        </div>
        <select 
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="bg-slate-800 text-cyan-400 text-xs border border-cyan-500/30 rounded px-2 py-1 outline-none"
        >
          <option value="SentinelAI">Sentinel Custom AI</option>
          <option value="Gemini">Gemini Pro</option>
          <option value="ChatGPT">ChatGPT (GPT-4)</option>
        </select>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-cyan-100 border border-cyan-500/10'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-cyan-400 text-xs animate-pulse">AI is thinking...</div>}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-cyan-500/20 flex gap-2">
        <input 
          className="flex-1 bg-slate-800 border border-cyan-500/20 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-cyan-500/50"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="bg-cyan-600 hover:bg-cyan-500 p-2 rounded-lg transition-all">
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
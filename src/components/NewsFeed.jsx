import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCcw, ExternalLink } from 'lucide-react';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // API থেকে নিউজ নিয়ে আসার ফাংশন
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/newsfeed');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("News fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Newspaper className="text-blue-400" size={24} />
          <h2 className="text-xl font-bold font-orbitron tracking-tight">Security News Feed</h2>
        </div>
        <button 
          onClick={fetchNews}
          className="p-2 hover:bg-slate-800 rounded-full transition-all active:rotate-180 duration-500"
          title="Refresh Feed"
        >
          <RefreshCcw size={18} className={`${loading ? 'animate-spin' : ''} text-blue-400`} />
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          // কঙ্কাল (Skeleton) লোডিং এফেক্ট
          [1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-slate-800/50 animate-pulse rounded-lg border border-slate-700"></div>
          ))
        ) : (
          news.map((item, i) => (
            <div 
              key={i} 
              className="group p-4 bg-slate-800/40 border border-slate-700 rounded-lg hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-blue-100 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <ExternalLink size={14} className="text-slate-500 group-hover:text-blue-400" />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  item.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 
                  item.severity === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.severity}
                </span>
                <p className="text-[11px] text-slate-500 font-mono">{item.date || "Just Now"}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="text-[10px] bg-blue-600/20 text-blue-400 border border-blue-600/30 px-3 py-1 rounded-full font-mono uppercase tracking-widest">
          Auth: Sentinel_Admin
        </div>
        <p className="text-[10px] text-slate-500">Live Cyber Intelligence</p>
      </div>
    </div>
  );
};

export default NewsFeed;
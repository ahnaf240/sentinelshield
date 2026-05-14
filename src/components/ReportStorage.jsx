import React, { useState, useEffect } from 'react';
import { Database, Save, Trash2, FileText, Clock, RefreshCw } from 'lucide-react';

const ReportStorage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // API থেকে সব রিপোর্ট নিয়ে আসার ফাংশন
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/report-storage');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Report fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // নতুন রিপোর্ট সেভ করার ফাংশন (API-তে পাঠানোর জন্য)
  const saveNewReport = async () => {
    const newReport = { 
      id: Date.now(), 
      scanType: "Full System Scan", 
      status: "Clean",
      date: new Date().toLocaleDateString() 
    };

    try {
      // এখানে তোমার API-তে POST রিকোয়েস্ট পাঠাবে
      const response = await fetch('/api/report-storage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReport)
      });
      
      if (response.ok) {
        setReports([newReport, ...reports]);
      }
    } catch (error) {
      alert("Could not save to Cloud. Saving to Local Storage instead.");
      const saved = JSON.parse(localStorage.getItem('scan_reports') || '[]');
      const updated = [newReport, ...saved];
      setReports(updated);
      localStorage.setItem('scan_reports', JSON.stringify(updated));
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-cyan-500/30 shadow-2xl animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Database className="text-cyan-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-orbitron tracking-wider">Report Storage</h2>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">Encrypted Database // Level 4</p>
          </div>
        </div>
        <button 
          onClick={fetchReports}
          className="p-2 hover:bg-slate-800 rounded-full transition-all text-cyan-400"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <button 
        onClick={saveNewReport} 
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg mb-6 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      >
        <Save size={18} />
        <span className="font-orbitron text-xs tracking-widest">ENCRYPT & SAVE SCAN</span>
      </button>

      <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
        {loading ? (
          <div className="text-center py-10 text-gray-600 font-mono text-xs animate-pulse">ACCESSING SECURE STORAGE...</div>
        ) : reports.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl">
            <FileText className="mx-auto text-slate-700 mb-2" size={32} />
            <p className="text-xs text-slate-500 font-mono uppercase">No reports found in vault</p>
          </div>
        ) : (
          reports.map((r) => (
            <div key={r.id} className="group p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-cyan-500/50 hover:bg-slate-800 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg group-hover:text-cyan-400 transition-colors">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-200">{r.scanType || r.data}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={10} className="text-gray-500" />
                      <p className="text-[10px] text-gray-500 font-mono">{r.date}</p>
                    </div>
                  </div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded border ${
                  r.status === 'Clean' ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-red-500/30 text-red-400 bg-red-500/5'
                } font-bold uppercase`}>
                  {r.status || 'Verified'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">Total Archives: {reports.length}</p>
      </div>
    </div>
  );
};

export default ReportStorage;
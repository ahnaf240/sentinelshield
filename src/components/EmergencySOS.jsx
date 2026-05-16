"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, MapPin, PhoneCall, FileText, Send, CheckCircle } from 'lucide-react';

export default function EmergencySOS() {
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [sosStatus, setSosStatus] = useState('');
  
  // GD Form States
  const [formData, setFormData] = useState({ name: '', phone: '', nid: '', incident: '', details: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // GPS লোকেশন ট্র্যাকিং ফাংশন
  const triggerSOS = () => {
    setIsLocating(true);
    setSosActive(true);
    setSosStatus('Fetching your real-time GPS location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
          setLocation({ lat, lng, mapLink });
          setIsLocating(false);
          
          // ইমার্জেন্সি সিকোয়েন্স সিমুলেশন
          sendEmergencyAlerts(mapLink);
        },
        (error) => {
          console.error(error);
          setIsLocating(false);
          setSosStatus('GPS Error. Using Network IP Location...');
          // ডামি লোকেশন ব্যাকআপ
          const dummyLink = `https://www.google.com/maps?q=23.8103,90.4125`;
          setLocation({ lat: 23.8103, lng: 90.4125, mapLink: dummyLink });
          sendEmergencyAlerts(dummyLink);
        }
      );
    } else {
      setSosStatus('Geolocation not supported by this browser.');
      setIsLocating(false);
    }
  };

  // স্বয়ংক্রিয় অ্যালার্ট সিস্টেম সিমুলেশন (Twilio/Serverless Flow-র প্রোটোটাইপ)
  const sendEmergencyAlerts = (mapLink) => {
    setSosStatus('Broadcasting SOS Signal to Nearest Nodes...');
    
    setTimeout(() => {
      setSosStatus('ALERT SENT: Nearest Police Station notified via Automated Twilio Dispatch.');
    }, 2000);

    setTimeout(() => {
      setSosStatus(`CRITICAL: Medical Dispatch Team rerouted. Location Sent: ${mapLink}`);
    }, 4500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.incident) return;
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold font-mono text-red-400 flex items-center gap-2">
          <ShieldAlert className="animate-pulse" /> EMERGENCY_RESPONSE_SYSTEM
        </h2>
        <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Citizen Safety, Incident Reporting & Automated SOS Nodes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* বাম পাশ: লাইভ SOS এবং এক্সিডেন্ট রেসপন্স গেটওয়ে */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-mono text-red-500 bg-red-500/10 px-3 py-1 rounded-full uppercase font-bold tracking-widest">
              Module 01: Automated Dispatch
            </span>
            <h3 className="text-lg font-bold text-slate-200 mt-3">Instant Accident & Threat Trigger</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              এই বাটনটি ক্লিক করলে বা কোনো দুর্ঘটনা ডিটেক্ট হলে, সিস্টেম তাৎক্ষণিকভাবে আপনার লাইভ GPS কোঅর্ডিনেটস নিয়ে নিকটস্থ থানা এবং ইমার্জেন্সি মেডিকেল টিমের কাছে ডামি ডিসপ্যাচ রিকোয়েস্ট পাঠাবে।
            </p>
          </div>

          {/* বড় রেডিয়েন্ট SOS বাটন */}
          <div className="flex flex-col items-center justify-center py-6">
            <button
              onClick={triggerSOS}
              disabled={isLocating}
              className={`w-36 h-36 rounded-full border-4 font-mono font-bold tracking-widest text-sm transition-all duration-500 flex flex-col items-center justify-center gap-2 shadow-2xl ${
                sosActive 
                  ? 'bg-red-600/20 border-red-500 text-red-400 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.3)]' 
                  : 'bg-transparent border-red-600/40 hover:border-red-500 text-red-500 hover:bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
              }`}
            >
              <AlertTriangle size={28} />
              TRG_SOS
            </button>
          </div>

          {/* SOS স্ট্যাটাস মনিটর লোগো */}
          {sosActive && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 font-mono text-xs">
              <p className="text-red-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                [STATUS]: {sosStatus}
              </p>
              {location && (
                <div className="pt-2 border-t border-slate-800 text-slate-400 space-y-1">
                  <p className="flex items-center gap-1"><MapPin size={12} className="text-blue-400" /> LAT: {location.lat} | LNG: {location.lng}</p>
                  <a href={location.mapLink} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300 block mt-1">
                    Open Broadcasted Map Link &rarr;
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ডান পাশ: অনলাইন কমপ্লেইন্ট ও পুলিশ ডায়েরি ফরম */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
          <div className="mb-6">
            <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full uppercase font-bold tracking-widest">
              Module 02: Legal Framework
            </span>
            <h3 className="text-lg font-bold text-slate-200 mt-3">Digital Complaint & GD Registration</h3>
            <p className="text-xs text-slate-400 mt-1">সাইবার বুলিং, স্প্যাম বা যেকোনো ইলিগ্যাল থ্রেটের বিরুদ্ধে তাৎক্ষণিক রিপোর্ট জেনারেট করুন।</p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs text-slate-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label>FULL NAME / নাম</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label>PHONE / মোবাইল</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                    placeholder="017XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label>INCIDENT TYPE / অপরাধের ধরন</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                  value={formData.incident}
                  onChange={(e) => setFormData({...formData, incident: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Cyber Spamting / Phishing">Cyber Spamming / Financial Fraud</option>
                  <option value="Road Accident">Road Accident / Emergency Help</option>
                  <option value="Identity Theft">Identity Theft / Account Hacked</option>
                  <option value="Harassment">Online Harassment / Threat</option>
                </select>
              </div>

              <div className="space-y-1">
                <label>COMPLAINT DETAILS / বিস্তারিত বিবরণ</label>
                <textarea 
                  rows="3" required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="অপরাধ বা ঘটনার বিস্তারিত বিবরণ এবং স্থান উল্লেখ করুন..."
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold tracking-widest text-white transition-all flex items-center justify-center gap-2"
              >
                <Send size={14} /> SUBMIT FORM TO SYSTEM
              </button>
            </form>
          ) : (
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-8 rounded-2xl text-center space-y-4 animate-in zoom-in-95">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-md font-bold text-slate-200 font-mono">COMPLAINT REGISTERED SUCCESSFUL!</h4>
                <p className="text-xs text-slate-400">আপনার ডিজিটাল ডায়েরি সফলভাবে সিস্টেমে এনক্রিপ্ট ও সাবমিট করা হয়েছে।</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl text-left font-mono text-[11px] text-slate-400 space-y-1 max-w-md mx-auto border border-slate-800">
                <p><span className="text-emerald-400">ID:</span> GD-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><span className="text-emerald-400">Complainant:</span> {formData.name}</p>
                <p><span className="text-emerald-400">Type:</span> {formData.incident}</p>
                <p className="italic text-slate-500 mt-2">"This digital copy is authenticated for portfolio presentation."</p>
              </div>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="mt-2 text-xs font-mono text-blue-400 underline hover:text-blue-300"
              >
                File New Complaint
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
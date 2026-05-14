import React from 'react';

export const LiveStatusBar = () => (
  <div className="w-full bg-slate-700 h-8 flex items-center px-4 text-xs text-blue-300">
    <div className="animate-pulse mr-2">●</div> System Scanning: /usr/bin/security_core... 78%
  </div>
);

export const UserProfile = () => (
  <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-3">
    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">A</div>
    <div>
      <p className="text-sm font-bold">Admin: Sentinel_User</p>
      <p className="text-[10px] text-gray-400">Rank: Security Specialist</p>
    </div>
  </div>
);
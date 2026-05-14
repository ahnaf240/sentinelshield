// ============================================================
// ELECTRON PRELOAD — Browser ↔ Electron bridge
// এই ফাইল React app-কে Electron-এর native features দেয়
// ============================================================

const { contextBridge, ipcRenderer } = require('electron');

// React app থেকে এইভাবে call করো: window.electronAPI.minimize()
contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),

  // External link
  openExternal: (url) => ipcRenderer.send('open-external', url),

  // Listen for tray events
  onQuickScan: (callback) => ipcRenderer.on('quick-scan', callback),
  onToggleVPN: (callback) => ipcRenderer.on('toggle-vpn', callback),

  // Platform info
  platform: process.platform,   // 'win32', 'linux', 'darwin'
  isElectron: true,
});
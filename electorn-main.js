// ============================================================
// ELECTRON MAIN PROCESS — SentinelShield Desktop App
// এই ফাইল দিয়ে Windows .exe এবং Linux app তৈরি হবে
// ============================================================

const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let tray;

function createWindow() {
  // Main app window তৈরি
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,           // Custom titlebar (cyberpunk look)
    transparent: false,
    backgroundColor: '#050810',
    icon: path.join(__dirname, 'public', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,         // Security best practice
      contextIsolation: true,         // Security best practice
      preload: path.join(__dirname, 'electron-preload.js'),
    },
    show: false,   // Prevent flash on load
  });

  // Load করো Next.js build অথবা dev server
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // Production: Next.js static export লোড করো
    mainWindow.loadFile(path.join(__dirname, 'out', 'index.html'));
  }

  // সব ready হলে দেখাও
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Window বন্ধ হলে
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// System Tray Icon (background-এ চলবে)
function createTray() {
  const iconPath = path.join(__dirname, 'public', 'tray-icon.png');
  tray = new Tray(nativeImage.createFromPath(iconPath).resize({ width: 20, height: 20 }));

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open SentinelShield', click: () => mainWindow?.show() },
    { label: 'Protection: Active', enabled: false },
    { type: 'separator' },
    { label: 'Quick Scan', click: () => mainWindow?.webContents.send('quick-scan') },
    { label: 'Toggle VPN', click: () => mainWindow?.webContents.send('toggle-vpn') },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);

  tray.setToolTip('SentinelShield — Protection Active');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => mainWindow?.isVisible() ? mainWindow.hide() : mainWindow?.show());
}

// IPC: Custom window controls (minimize, maximize, close)
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-maximize', () => mainWindow?.isMaximized() ? mainWindow.unmaximize() : mainWindow?.maximize());
ipcMain.on('window-close', () => mainWindow?.close());
ipcMain.on('open-external', (_, url) => shell.openExternal(url));

// App events
app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Security: বাইরের navigation block করো
app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== 'http://localhost:3000' && !navigationUrl.startsWith('file://')) {
      event.preventDefault();
    }
  });
});
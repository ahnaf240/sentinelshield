// ============================================================
// CAPACITOR CONFIG — Android .apk এবং iOS .ipa তৈরির জন্য
// ============================================================

const { CapacitorConfig } = require('@capacitor/cli');

/** @type {CapacitorConfig} */
const config = {
  appId: 'com.sentinelshield.app',
  appName: 'SentinelShield',
  webDir: 'out',          // Next.js static export output folder
  bundledWebRuntime: false,

  server: {
    // Development-এ live reload চালু করতে uncomment করো:
    // url: 'http://YOUR_LOCAL_IP:3000',
    // cleartext: true,
    androidScheme: 'https',
  },

  android: {
    buildOptions: {
      keystorePath: 'android/release.keystore',   // তোমার keystore path
      keystoreAlias: 'sentinelshield',
      releaseType: 'APK',
    },
    // Android permissions (AndroidManifest.xml-এ যাবে)
    permissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.CAMERA',
    ],
  },

  ios: {
    contentInset: 'automatic',
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#050810',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#050810',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

module.exports = config;
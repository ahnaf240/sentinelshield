// src/components/Modules.jsx

// --- ১. কোর এবং ইউজার ইন্টারফেস মডিউল ---
export { default as AIChatbot } from './AIChatbot';
export { default as AttackMap } from './AttackMap';
export { default as BreachMonitor } from './BreachMonitor';
export { default as Dashboard } from './Dashboard';
export { default as HeroSection } from './HeroSection';
export { default as Navbar } from './Navbar';
export { default as NewsFeed } from './NewsFeed';
export { default as UserProfile } from './UtilityModules'; // Named export fix

// --- ২. সিকিউরিটি এবং থ্রেট অ্যানালাইসিস মডিউল ---
export { default as IntrusionTracker } from './IntrusionTracker';
export { default as LinkShield } from './LinkShield';
export { default as NetworkMapper } from './NetworkMapper';
export { default as PasswordVault } from './PasswordVault';
export { default as PhishGuard } from './PhishGuard';
export { default as PrivacyAudit } from './PrivacyAudit';
export { default as ThreatScanner } from './ThreatScanner';
export { default as VPNDashboard } from './VPNDashboard';

// --- ৩. রোডম্যাপের নতুন ফিচারসমূহ ---
export { default as ReportStorage } from './ReportStorage';
export { default as SafeBanking } from './SafeBanking';
export { default as SocialSafety } from './SocialSafety';

// --- ৪. ইউটিলিটি মডিউল (Named Exports) ---
export * from './UtilityModules';
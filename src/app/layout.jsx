import '../styles/globals.css';

export const metadata = {
  title: 'SentinelShield — Cybersecurity Command Center',
  description: 'Advanced real-time cybersecurity platform for threat detection, breach monitoring, and digital privacy.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
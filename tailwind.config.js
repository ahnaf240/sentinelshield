/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: "#00d4ff",
          green: "#00ff88",
          violet: "#b44dff",
          red: "#ff3366",
        },
        dark: {
          900: "#050810",
          800: "#0a0f1e",
          700: "#0d1528",
          600: "#111d35",
          500: "#1a2845",
        },
      },
      fontFamily: {
        mono: ["'Share Tech Mono'", "monospace"],
        display: ["'Orbitron'", "sans-serif"],
        body: ["'Exo 2'", "sans-serif"],
      },
      animation: {
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "matrix-rain": "matrixRain 0.1s linear infinite",
        "rotate-slow": "rotateSlow 20s linear infinite",
      },
      keyframes: {
        pulseNeon: {
          "0%, 100%": { boxShadow: "0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 20px #00d4ff" },
          "50%": { boxShadow: "0 0 10px #00d4ff, 0 0 30px #00d4ff, 0 0 60px #00d4ff" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { textShadow: "0 0 10px #00d4ff, 0 0 20px #00d4ff" },
          to: { textShadow: "0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px #00d4ff" },
        },
        rotateSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
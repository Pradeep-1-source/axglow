/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0B0B0B",
        card: "rgba(255, 255, 255, 0.04)",
        primary: "#3BD8D9",
        "secondary-glow": "#8A46BB",
        accent: "#FF5D93",
        "secondary-text": "#B8B8B8",
        borderMuted: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(59, 216, 217, 0.25)',
        'cyan-glow-lg': '0 0 60px rgba(59, 216, 217, 0.4)',
        'purple-glow': '0 0 40px rgba(138, 70, 187, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}

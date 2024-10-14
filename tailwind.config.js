module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9800', // Orange moderne
        blue: {
          900: '#1E2A38',
          800: '#273340',
        },
        graydark: '#2E2E2E', // Gris pour d'autres sections si nécessaire
      },
    },
  },
  plugins: [],
};
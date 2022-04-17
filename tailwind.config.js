module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        body: '#E3E8F8',
        btn: '#3E588F',
        header: '#C0C5CD',
        footer: '#C0C5CD',
        logo:'#203562',
        plain: '#89CFF0',
      },
    },
  },
  plugins: [],
};

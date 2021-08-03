module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  purge: [
    './components/**/*.ts',
    './components/**/*.tsx',
    './pages/**/*.tsx',
    './utilities/**/*.ts',
    './utilities/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": "'PT Sans', 'Noto Sans TC', sans-serif",
        "serif": "'Noto Serif TC', serif",
        "mono": "'JetBrains Mono', Menlo, monospace",
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}

module.exports = {
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  purge: [
    "./components/**/*.ts",
    "./components/**/*.tsx",
    "./pages/**/*.tsx",
    "./utilities/**/*.ts",
    "./utilities/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "'PT Sans', 'Noto Sans TC', sans-serif",
        serif: "'Noto Serif TC', serif",
        mono: "'JetBrains Mono', Menlo, monospace",
      },
    },
  },
  variants: {
    extend: {
      color: {
        primary: "#263238",
        secondary: "#EEEEEE",
        accent: "#0A85F6",
        positive: "#12B981",
        neutral: "#F49E0B",
        negative: "#EE4444",
      },
      fontSize: {
        h1: "36px",
        h2: "24px",
        body: "16px",
        button: "16px",
      },
      letterSpacing: {
        h1: "0.25px",
        body: "0.5px",
        button: "0.5px",
      },
      fontWeight: {
        header: 700,
        body: 400,
        button: 700,
      },
    },
  },
  plugins: [],
};

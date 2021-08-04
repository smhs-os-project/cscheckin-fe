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
      padding: {
        "card-y": "3rem",
        "card-x": "4rem",
      },
      borderColor: {
        button: "rgba(0, 0, 0, 0.25)",
      },
    },
    colors: {
      primary: "#263238",
      secondary: "#EEEEEE",
      secondaryHover: "#BBBBBB",
      accent: "#0A85F6",
      positive: "#12B981",
      neutral: "#F49E0B",
      negative: "#EE4444",
    },
    /**
     * @param {(theme: string) => Record<string,string>} theme
     * @return {Record<string, string>}
     */
    backgroundColor: (theme) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      ...theme("colors"),
      white: "#FFFFFF",
    }),
    fontSize: {
      h1: "2.0rem",
      h2: "1.125rem",
      baseline: "1rem",
      button: "1rem",
    },
    letterSpacing: {
      header: "0.025em",
      body: "0em",
      button: "0.05em",
    },
    fontWeight: {
      header: 700,
      body: 400,
      "solid-button": 700,
      "fw-button": 700,
    },
  },
  variants: {},
  plugins: [],
};

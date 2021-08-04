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
        accent: "#0A85F6",
        positive: "#12B981",
        neutral: "#F49E0B",
        negative: "#EE4444",
      },
    },
    colors: {
      primary: "#263238",
      secondary: "#EEEEEE",
      "secondary-hover": "#DDDDDD",
      accent: "#0A85F6",
      positive: "#12B981",
      neutral: "#F49E0B",
      negative: "#EE4444",
      auxiliary: "#757575",
      link: "#0761B6",
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
      details: "0.8rem",
    },
    letterSpacing: {
      header: "0.025em",
      body: "0em",
      button: "0.025em",
    },
    fontWeight: {
      header: 700,
      body: 400,
      button: 500,
    },
  },
  variants: {},
  plugins: [],
};

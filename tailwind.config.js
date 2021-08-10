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
      borderColor: {
        button: "rgba(0, 0, 0, 0.25)",
        accent: "#0A85F6",
        positive: "#12B981",
        neutral: "#F49E0B",
        negative: "#EE4444",
      },
      minWidth: {
        "2xl": "42rem",
      },
    },
    colors: {
      // common
      primary: "#263238",
      secondary: "#EEEEEE",
      "secondary-hover": "#F4F4F4",
      "on-surface": "#FFFFFF",
      accent: "#0A85F6",
      positive: "#12B981",
      neutral: "#F49E0B",
      negative: "#EE4444",
      auxiliary: "#757575",
      link: "#0761B6",

      // text
      "text-head": "#000000", // Navigation & Headlines
      "text-primary": "#424242", // Primary & Buttons
      "text-secondary": "#757575", // Secondary
      "text-override": "#FFFFFF", // On Colored Surface

      // the button of Page/Dashboard/StatusCard
      "transparent-secondary": "rgba(255,255,255,0.25)",
    },
    /**
     * @param {(theme: string) => Record<string,string>} theme
     * @return {Record<string, string>}
     */
    backgroundColor: (theme) => ({
      ...theme("colors"),
      transparent: "rgba(0,0,0,0)",
    }),
    fontSize: {
      h1: "2rem",
      "number-input": "1.75rem",
      h2: "1.25rem",
      baseline: "1rem",
      button: "1rem",
      details: "0.8rem",
      "card-emphasize": "1.7rem",
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
      badge: 500,
    },
  },
  variants: {},
  plugins: [],
};

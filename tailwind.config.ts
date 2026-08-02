import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        charcoal: "#1A1A1A",
        "light-gray": "#F2F2F2",
        gold: "#C9A24E",
        white: "#FFFFFF"
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      letterSpacing: {
        wide2: "0.15em",
        wide3: "0.25em"
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.65, 0, 0.35, 1)"
      },
      maxWidth: {
        container: "1440px"
      }
    }
  },
  plugins: []
};

export default config;

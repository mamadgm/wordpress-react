import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pelakmed: ["pelakmed", "sans-serif"],
        pelaksemi: ["pelaksemi", "sans-serif"],
        pelakbold: ["pelakbold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

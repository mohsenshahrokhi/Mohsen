import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // fontFamily: {
    //   vazirMatn: ["var(--font-VazirmatnRegular)"],
    // },
    extend: {
      // fontFamily: {
      //   deacon: ['VazirmatnRegular', 'sans-serif'],
      // },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
       boxShadow: {
        'menuShadow': '5px -5px 60px 0 0 rgba(0, 0, 0, 0.3)',
      }
  
    },
  },
  plugins: [],
};
export default config;

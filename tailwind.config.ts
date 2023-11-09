import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        ungu : "#A706C1",
        'ungu-mid' : "#FCD4FF",
        primary : "#04364A",
        secondary1 : "#176B87",
        secodndary2 : "#64CCC5",
        secondary3 : "#DAFFFB",
        'secondary-warehouse' : "#DB2777"

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        notosans: ["var(--font-family-notosans)"],
      },
    },
    plugins: [
      require("flowbite/plugin")
    ],
  },
};
export default config;

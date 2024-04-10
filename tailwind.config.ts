import type { Config } from "tailwindcss";
import reactAriaPlugin from "tailwindcss-react-aria-components";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        "screen-xs": "480px",
        screen: "1440px",
      },
    },
  },
  plugins: [reactAriaPlugin, animatePlugin],
};
export default config;

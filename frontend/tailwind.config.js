/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        card: "var(--card-test)",
        skeleton: "var(--skeleton-background)",
        'base-neutral': "var(--base-neutral)",
        "button-file": "var(--button-file)",
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#F07852",
          "primary-content": "#fff",
          secondary: "#3C51A2",
          accent: "#FF4646",
          neutral: "#3C3E47",
          "base-100": "#FAFAFC",
          "base-200": "#F2F2FA",
          "base-300": "#F0F0F0",
          "base-content": "#27282E",
        },
        dark: {
          primary: "#F07852",
          "primary-content": "#3c3e47",
          secondary: "#3C51A2",
          accent: "#FF4646",
          neutral: "#bbb",
          "base-100": "#27282E",
          "base-200": "#3c3e47",
          "base-300": "#3F414F",
          "base-content": "#FAFAFC",
        },
      },
    ],
  },
}

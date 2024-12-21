/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981", // Green
        dark: "#1e293b", // Dark color
        light: "#f8fafc", // White or very light gray
      },
    },
  },
  plugins: [daisyui],  // Using the imported daisyui plugin
  daisyui: {
    themes: [
      {
        be9ine: {
          primary: "#10b981",
          secondary: "#f3f4f6", // Light gray
          accent: "#22d3ee", // Optional accent color
          neutral: "#1e293b",
          "base-100": "#f8fafc", // White background
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};

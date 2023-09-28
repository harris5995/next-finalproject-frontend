/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
        {
          mytheme: {
          
 "primary": "#d1c1d7",
          
 "secondary": "#ffe4e6",
          
 "accent": "#b4e9d6",
          
 "neutral": "#70acc7",
          
 "base-100": "#ffffff",
          
 "info": "#3abff8",
          
 "success": "#36d399",
          
 "warning": "#fbbd23",
          
 "error": "#f87272",
          },
        },
      ],
    },
  }
    // themes: ["autumn", "coffee"],
    // darkTheme: "coffee",
    
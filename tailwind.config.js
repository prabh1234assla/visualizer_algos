/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        'one': {
          100: '#FF0465',
          200: '#FF0101'
        },
        'two': {
          100: '#344468',
          200: '#FFC700'
        },
        'three': {
          100: '#293504',
          200: '#FF4B30'
        },
        'four': {
          100: '#FF7F00',
          200: '#FF7F00'
        },
        'five': {
          100: '#DA121F',
          200: '#FF0030'
        },
        'six': {
          100: '#00614C',
          200: '#FE007A'
        },
        'seven': {
          100: '#B20160',
          200: '#FF0000'
        },
        'eight': {
          100: '#004A53',
          200: '#00E0FF'
        }
      },
      fontFamily: {
        meander: "Meander"
      }
    },
  },
  plugins: [],
}

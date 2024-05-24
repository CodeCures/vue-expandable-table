/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js",],
  theme: {
    extend: {
      colors: {
        'primary': '#6d5bd0'
      },
    },
    plugins: [require('flowbite/plugin')],
  }
}



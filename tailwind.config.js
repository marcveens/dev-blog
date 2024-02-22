const colors = {
  myorange: {
    50: '#fff8eb',
    100: '#ffecc6',
    200: '#ffd688',
    300: '#ffbb4a',
    400: '#ff9f1c',
    500: '#f97c07',
    600: '#dd5702',
    700: '#b73a06',
    800: '#942b0c',
    900: '#7a240d',
    950: '#461002'
  }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      myorange: colors.myorange,
      primary: colors.myorange[400],
      background: '#1B1B1D',
      contrast: '#FFF'
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      boxShadow: {
        'underline': '0 1px 0 0 #FFF',
      }
    }
  },
  plugins: []
};

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
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      code: ['Fira Code', 'Consolas', 'Menlo', 'Monaco', 'monospace']
    },
    extend: {
      colors: {
        myorange: colors.myorange,
        primary: colors.myorange[400],
        background: '#1B1B1D',
        'code-background': '#22272e',
        'code-color': '#adbac7',
        contrast: '#FFF',
        link: '#cfe2f4',
        'code-embed-footer': '#363f4a'
      },
      boxShadow: {
        underline: '0 1px 0 0 #FFF',
        'underline-primary': `0 1px 0 0 ${colors.myorange[400]}`
      },
      spacing: {
        80: '80px',
        120: '120px',
        400: '400px',
        640: '640px',
        750: '750px',
        1200: '1200px'
      },
      fontSize: {
        28: '28px',
        h2: ['27px', '39px'],
        h3: ['22px', '26px'],
        h4: ['19px', '26px'],
        h5: ['16px', '26px'],
        h6: ['14px', '26px']
      },
      lineHeight: {
        normal: 'normal'
      }
    }
  },
  plugins: []
};

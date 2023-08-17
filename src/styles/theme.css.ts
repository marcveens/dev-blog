import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  smd: '640px',
  md: '900px',
  lg: '1200px',
  xl: '1536px'
};

const fonts = {
  body: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif',
  code: 'Fira Code,Consolas,Menlo,Monaco,Andale Mono WT,Andale Mono,Lucida Console,Lucida Sans Typewriter,DejaVu Sans Mono,Bitstream Vera Sans Mono,Liberation Mono,Nimbus Mono L,Courier New,Courier,monospace'
};

export const vars = createThemeContract({
  color: {
    background: '',
    font: '',
    link: '',
    orange: '',
    code: {
      backgroundColor: '',
      color: ''
    },
    button: {
      color: '',
      hover: {
        backgroundColor: '',
        color: ''
      }
    },
    divider: ''
  },
  font: fonts,
  breakpoints: {
    values: breakpoints
  }
});

export const themeClass = createTheme(vars, {
  color: {
    background: '#fff',
    font: '#222',
    link: '#748ea5',
    orange: '#ff9f1c',
    code: {
      backgroundColor: '#ececec',
      color: '#222'
    },
    button: {
      color: '#516373',
      hover: {
        backgroundColor: '#fcfcfd',
        color: '#516373'
      }
    },
    divider: 'linear-gradient(180deg,#e6e6e6 0,#e6e6e6 48%,#fff)'
  },
  font: fonts,
  breakpoints: {
    values: breakpoints
  }
});

export const darkThemeClass = createTheme(vars, {
  color: {
    background: '#1E1E1E',
    font: '#fff',
    link: '#cfe2f4',
    orange: '#ff9f1c',
    code: {
      backgroundColor: '#22272e',
      color: '#adbac7'
    },
    button: {
      color: '#FFF',
      hover: {
        backgroundColor: '#3d3d3d',
        color: '#FFF'
      }
    },
    divider: 'linear-gradient(180deg,#5c5c5c 0,#5c5c5c 48%,#1E1E1E)'
  },
  font: fonts,
  breakpoints: {
    values: breakpoints
  }
});

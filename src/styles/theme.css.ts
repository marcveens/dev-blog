import { createTheme } from '@vanilla-extract/css';

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  smd: '640px',
  md: '900px',
  lg: '1200px',
  xl: '1536px'
};

export const [themeClass, vars] = createTheme({
  color: {
    font: '#222',
    link: '#748ea5',
    orange: '#ff9f1c'
  },
  font: {
    body: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif',
    code: 'Fira Code,Consolas,Menlo,Monaco,Andale Mono WT,Andale Mono,Lucida Console,Lucida Sans Typewriter,DejaVu Sans Mono,Bitstream Vera Sans Mono,Liberation Mono,Nimbus Mono L,Courier New,Courier,monospace'
  },
  breakpoints: {
    values: breakpoints
  }
});

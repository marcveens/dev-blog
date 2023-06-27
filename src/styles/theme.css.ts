import { createTheme } from '@vanilla-extract/css';

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px'
};

export const [themeClass, vars] = createTheme({
  color: {
    font: '#222',
    link: '#748ea5'
  },
  font: {
    body: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif'
  },
  breakpoints: {
    values: breakpoints
  }
});

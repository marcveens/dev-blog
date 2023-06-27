import { breakpoints } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      flexDirection: 'row'
    }
  }
});

export const main = style({
  flexGrow: 1,
  flexBasis: 0,
  marginBottom: '50px',

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      padding: '30px 20px 0'
    }
  }
});

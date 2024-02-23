import { breakpoints, vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  alignItems: 'center',
  padding: '15px 0',

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      padding: '25px 0'
    }
  }
});

export const logo = style({
  display: 'flex',
  width: '35px',
  height: '35px',
  borderRadius: '50%',

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      width: '50px',
      height: '50px'
    }
  }
});

export const logoName = style({
  display: 'flex',
  paddingLeft: '10px',
  color: vars.color.font,
  fontWeight: 'bold',

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      fontSize: '20px',
      paddingLeft: '20px'
    }
  }
});

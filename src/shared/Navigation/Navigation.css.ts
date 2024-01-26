import { breakpoints, vars } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const menuIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'none',
  width: '40px',
  height: '40px',
  padding: 0,
  marginLeft: 'auto',
  marginRight: '-10px',
  color: vars.color.font,

  ':hover': {
    cursor: 'pointer'
  },

  ':focus': {
    outline: 'none'
  },

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      display: 'none'
    }
  }
});

export const navigationModal = style({
  display: 'none',
  position: 'fixed',
  top: '70px',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: vars.color.background,

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      display: 'block',
      position: 'relative',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      backgroundColor: 'transparent',
      marginLeft: 'auto'
    }
  }
});

export const navigationModalOpen = style({
  display: 'block'
});

export const navigation = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingBottom: '70px',

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      flexDirection: 'row',
      paddingBottom: 0
    }
  }
});

globalStyle(`${navigation} ul`, {
  width: '100%',
  listStyle: 'none',
  margin: 0,
  padding: 0,

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      display: 'flex',
      width: 'auto'
    }
  }
});

globalStyle(`${navigation} li`, {
  margin: '0.625em 0',

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      margin: '0'
    }
  }
});

globalStyle(`${navigation} a`, {
  display: 'block',
  padding: '0.625em 0',
  color: vars.color.font,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '27px',

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      padding: '0 0.625em',
      fontSize: '16px',
      fontWeight: 'normal'
    }
  }
});

export const activeLink = style({});

globalStyle(`${navigation} a:hover span, ${activeLink} span`, {
  borderBottom: `1px solid ${vars.color.font}`
});

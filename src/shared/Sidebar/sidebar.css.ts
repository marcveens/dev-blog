import { breakpoints, vars } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const sidebar = style({
  position: 'relative',
  marginTop: '30px',

  '::after': {
    content: '',
    display: 'none',
    position: 'absolute',
    top: '0',
    right: '10px',
    bottom: '0',
    width: '1px',
    background: vars.color.divider
  },

  '@media': {
    [`(min-width: ${breakpoints.sm})`]: {
      flexBasis: '40%',
      flexGrow: 1,
      maxWidth: '300px',
      paddingRight: '50px',

      '::after': {
        display: 'block'
      }
    },

    '(min-width: 800px)': {
      maxWidth: '360px'
    }
  }
});

export const logo = style({
  borderRadius: '50%'
});

export const author = style({
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '13px 0'
});

export const authorLink = style({
  color: vars.color.font
});

export const subtitle = style({
  color: '#888'
});

export const menu = style({
  marginBottom: '1.625em'
});

globalStyle(`${menu} ul`, {
  listStyle: 'none',
  margin: 0,
  padding: 0
});

globalStyle(`${menu} li`, {
  margin: '0.625em 0'
});

globalStyle(`${menu} a`, {
  color: vars.color.font
});

globalStyle(`${menu} a:hover`, {
  color: vars.color.link,
  textDecoration: 'underline'
});

export const socials = style({
  marginBottom: '1.625em'
});

globalStyle(`${socials} ul`, {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex'
});

globalStyle(`${socials} li`, {
  display: 'block'
});

globalStyle(`${socials} li:not(:last-child)`, {
  marginRight: '8px'
});

globalStyle(`${socials} a`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  border: '1px solid #d6d6d6',
  borderRadius: '50%',
  color: vars.color.font
});

globalStyle(`${socials} a:hover`, {
  color: vars.color.link
});

export const copyright = style({
  fontSize: '14px',
  color: '#b6b6b6'
});

import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('html, body', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  fontFamily: vars.font.body,
  color: vars.color.font,
  lineHeight: 1.625,
  fontSize: '16px',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
});

globalStyle('*, ::before, ::after', {
  boxSizing: 'inherit'
});

globalStyle('a', {
  color: vars.color.link,
  textDecoration: 'none'
});

globalStyle('p', {
  lineHeight: 1.625,
  marginBottom: '1.625em'
});
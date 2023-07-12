import { globalStyle, style } from "@vanilla-extract/css";

export const codePre = style({
  marginBottom: 0
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '7px 16px',
  backgroundColor: '#22272e',
  color: '#adbac7',
  borderTop: '1px solid #363f4a',
  fontSize: '14px'
});

globalStyle(`${footer} a`, {
  color: '#adbac7',
  textDecoration: 'underline'
});

globalStyle(`${footer} a:hover`, {
  color: '#FFF',
});
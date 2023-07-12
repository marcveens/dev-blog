import { globalStyle, style } from "@vanilla-extract/css";

export const button = style({
  padding: '8px 16px',
  display: 'inline-flex',
  alignItems: 'center',
  border: '1px solid #d6d6d6',
  textDecoration: 'none',
  borderRadius: '50px',
  backgroundColor: '#f6f8f9',
  color: '#516373'
});

globalStyle(`${button}:hover`, {
  backgroundColor: '#fcfcfd',
  color: '#516373'
});

globalStyle(`${button} svg`, {
  marginRight: '6px',
});
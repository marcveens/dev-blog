import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

const baseButton = style({
  padding: '8px 16px',
  display: 'inline-flex',
  alignItems: 'center',
  border: '1px solid #d6d6d6',
  textDecoration: 'none',
  borderRadius: '50px',
  color: '#516373',

  ':hover': {
    backgroundColor: '#fcfcfd',
    color: '#516373'
  }
});

export const button = styleVariants({
  default: [baseButton, {}],
  gutterBottom: [
    baseButton,
    {
      marginBottom: '8px'
    }
  ]
});

globalStyle(`${button.default} svg, ${button.gutterBottom} svg`, {
  marginRight: '6px'
});

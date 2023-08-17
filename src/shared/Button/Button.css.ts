import { vars } from '@/styles/theme.css';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

const baseButton = style({
  padding: '8px 16px',
  display: 'inline-flex',
  alignItems: 'center',
  border: '1px solid #d6d6d6',
  textDecoration: 'none',
  borderRadius: '50px',
  color: vars.color.button.color,

  ':hover': {
    backgroundColor: vars.color.button.hover.backgroundColor,
    color: vars.color.button.hover.color
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

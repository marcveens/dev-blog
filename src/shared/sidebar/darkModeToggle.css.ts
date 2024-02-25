import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const toggleContainer = style({
  margin: '1.625em 0'
});

export const toggle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  border: '1px solid #d6d6d6',
  borderRadius: '50%',
  color: vars.color.font,
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      color: vars.color.link
    }
  }
});
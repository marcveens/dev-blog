import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const body = style({
  backgroundColor: vars.color.background,
  color: vars.color.font,
  transition: 'background-color 0.1s ease-in-out, color 0.1s ease-in-out'
});

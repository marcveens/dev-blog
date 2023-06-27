import { breakpoints, vars } from '@/styles/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  display: 'block',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '24px',
  paddingRight: '24px'
});

const maxWidthMap: { [key: string]: { maxWidth: string } } = {};

Object.keys(vars.breakpoints.values).forEach((breakpoint) => {
  maxWidthMap[breakpoint] = {
    maxWidth: vars.breakpoints.values[breakpoint as keyof typeof breakpoints]
  };
});

export const containerMaxWidth = styleVariants(maxWidthMap);

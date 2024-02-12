import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

export const icon = style({
  pointerEvents: 'none'
});

globalStyle(`${icon} svg`, {
  display: 'block'
});

export const tooltipContainer = style({
  position: 'relative',
  pointerEvents: 'none'
});

export const tooltipBase = style({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#262628',
  color: 'white',
  opacity: 0,
  borderRadius: 4,
  fontSize: 12,
  lineHeight: 1,
  padding: '4px 8px',
  transition: 'opacity 0.2s'
});

export const tooltip = styleVariants({
  inactive: [tooltipBase, {}],
  active: [tooltipBase, { opacity: 1 }]
});

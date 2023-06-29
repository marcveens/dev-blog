import { vars } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const postPreview = style({
  marginBottom: '32px'
});

export const time = style({
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase'
});

export const category = style({
  display: 'inline-block',
  marginLeft: '10px',
  color: '#ff9f1c',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase',

  ':hover': {
    color: vars.color.link
  }
});

export const title = style({
  marginTop: 0,
  fontSize: '27px',
  lineHeight: 1.44,
  marginBottom: '13px',
  fontWeight: 600
});

globalStyle(`${title} a`, {
  color: vars.color.font
});

globalStyle(`${title} a:hover`, {
  borderBottom: `1px solid ${vars.color.font}`
});

export const link = style({
  display: 'inline-flex',
  alignItems: 'center',

  ':hover': {
    boxShadow: `0 1px 0 0 ${vars.color.link}`
  }
});

globalStyle(`${link} svg`, {
  marginLeft: '5px'
});

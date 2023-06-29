import { vars } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const allPostsButtonBox = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '25px'
});

export const button = style({
  border: '1px solid #e6e6e6',
  borderRadius: '20px',
  color: vars.color.font,
  lineHeight: '35px',
  padding: '0 40px',
  whiteSpace: 'nowrap',
});

globalStyle(`${button}:hover`, {
  color: vars.color.link
});

export const title = style({
  fontSize: '32px',
  lineHeight: '42px',
  textAlign: 'center',
  fontWeight: 600
});

export const content = style({});

globalStyle(`${content} a`, {
  color: vars.color.link,
  textDecoration: 'underline'
});

globalStyle(`${content} a:hover`, {
  color: vars.color.orange
});

globalStyle(`${content} code`, {
  fontFamily: vars.font.code,
  backgroundColor: '#ececec',
  fontSize: '14px'
});

globalStyle(`${content} pre code`, {
  backgroundColor: 'transparent',
});

globalStyle(`${content} img`, {
  maxWidth: '100%',
  display: 'block'
});

globalStyle(`${content} h2`, {
  fontSize: '27px',
  lineHeight: '39px',
  fontWeight: 600,
  marginTop: '52px',
  marginBottom: '13px'
});

globalStyle(`${content} h3`, {
  fontSize: '22px',
  lineHeight: '26px',
  fontWeight: 600,
  marginTop: '52px',
  marginBottom: '13px'
});

globalStyle(`${content} h4`, {
  fontSize: '19px',
  lineHeight: '26px',
  fontWeight: 600,
  marginTop: '39px',
  marginBottom: '13px'
});

globalStyle(`${content} h5`, {
  fontSize: '16px',
  lineHeight: '26px',
  fontWeight: 600,
  marginTop: '39px',
  marginBottom: '13px'
});

globalStyle(`${content} h6`, {
  fontSize: '14px',
  lineHeight: '26px',
  fontWeight: 600,
  marginTop: '39px',
  marginBottom: '13px'
});

export const publishedAt = style({
  fontStyle: 'italic'
});

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '50px'
});

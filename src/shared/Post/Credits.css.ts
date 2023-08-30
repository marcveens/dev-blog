import { vars } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';
import * as sidebarStyles from '../Sidebar/sidebar.css';

export const credits = style({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '50px',
  boxShadow: '0 2px 4px 0px rgba(214, 214, 214, 1)',
  padding: '20px',
  borderRadius: '4px',
  maxWidth: '400px',

  '@media': {
    [`(min-width: 450px)`]: {
      display: 'flex',
    }
  }
});

export const details = style({
  '@media': {
    [`(min-width: 450px)`]: {
      paddingLeft: '20px',
    }
  }
});

export const logo = style({
  borderRadius: '50%'
});

export const author = style({
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '13px 0',

  '@media': {
    [`(min-width: 450px)`]: {
      marginTop: 0
    }
  }
});

export const authorLink = style({
  color: vars.color.font
});

export const subtitle = style({
  color: '#888'
});

globalStyle(`${credits} ${sidebarStyles.socials}`, {
  marginBottom: 0
});

import * as styles from './Button.css';
import { GithubLogo, LinkedinLogo } from '@/utils/Icons';

type ButtonProps = {
  to?: string;
  startIcon?: React.ReactNode;
  children: React.ReactNode;
};

export const GithubButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<GithubLogo size={22} weight="light" />} />;
};

export const Button = (props: ButtonProps) => {
  const { children, to, startIcon } = props;

  const isExternal = to?.startsWith('http');
  const target = isExternal ? '_blank' : '_self';
  const rel = isExternal ? 'noopener noreferrer' : '';

  return (
    <a href={to} target={target} rel={rel} className={styles.button}>
      {startIcon}
      {children}
    </a>
  );
};

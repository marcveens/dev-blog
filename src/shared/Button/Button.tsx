import * as styles from './Button.css';
import { GithubLogo, Code, CodesandboxLogo, Play } from '@/utils/Icons';

type ButtonProps = {
  to?: string;
  bottomGutter?: boolean;
  startIcon?: React.ReactNode;
  children: React.ReactNode;
};

export const GithubButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<GithubLogo size={22} weight="light" />} />;
};

export const CodesandboxButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<CodesandboxLogo size={22} weight="light" />} />;
};

export const GithubCodeSpaceButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<Code size={22} weight="light" />} />;
};

export const DemoButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<Play size={22} weight="light" />} />;
};

export const Button = (props: ButtonProps) => {
  const { children, to, startIcon, bottomGutter } = props;

  const isExternal = to?.startsWith('http');
  const target = isExternal ? '_blank' : '_self';
  const rel = isExternal ? 'noopener noreferrer' : '';

  return (
    <a href={to} target={target} rel={rel} className={bottomGutter ? styles.button.gutterBottom : styles.button.default}>
      {startIcon}
      {children}
    </a>
  );
};

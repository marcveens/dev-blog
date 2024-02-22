import { GithubLogo, Code, CodesandboxLogo, Play } from '@/utils/Icons';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

type ButtonProps = {
  to?: string;
  variant?: 'outlined' | 'contained';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
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

const buttonClass = cva(
  'inline-flex cursor-pointer select-none items-center rounded-full px-7 py-2.5 transition-colors duration-200 ease-in-out',
  {
    variants: {
      startIcon: { true: '[&_svg:first-of-type]:-ml-2.5 [&_svg:first-of-type]:mr-2.5' },
      endIcon: { true: '[&_svg:last-of-type]:-mr-2.5 [&_svg:last-of-type]:ml-2.5' },
      variant: {
        outlined:
          'border border-solid text-contrast hover:border-primary hover:text-primary active:border-myorange-500 active:text-myorange-500',
        contained: 'bg-contrast text-background hover:bg-primary hover:text-contrast active:bg-myorange-500 active:text-contrast'
      }
    },
    defaultVariants: { variant: 'contained' }
  }
);

export const Button = (props: ButtonProps) => {
  const { children, to, startIcon, endIcon, variant } = props;

  const isExternal = to?.startsWith('http');
  const target = isExternal ? '_blank' : '_self';
  const rel = isExternal ? 'noopener noreferrer' : '';

  return (
    <a href={to} target={target} rel={rel} className={cn(buttonClass({ startIcon: !!startIcon, endIcon: !!endIcon, variant }))}>
      {startIcon}
      {children}
      {endIcon}
    </a>
  );
};

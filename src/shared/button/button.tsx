import { GithubLogo, Code, CodesandboxLogo, Play } from '@/utils/Icons';
import { twClass } from '@/utils/twClass';
import { cx } from 'class-variance-authority';

type ButtonProps = {
  to?: string;
  variant?: 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export const GithubButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<GithubLogo />} />;
};

export const CodesandboxButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<CodesandboxLogo />} />;
};

export const GithubCodeSpaceButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<Code />} />;
};

export const DemoButton = (props: ButtonProps) => {
  return <Button {...props} startIcon={<Play />} />;
};

const buttonClass = twClass('inline-flex cursor-pointer select-none items-center rounded-full transition-colors duration-200 ease-in-out', {
  variants: {
    startIcon: { true: '[&_svg:first-of-type]:-ml-2.5 [&_svg:first-of-type]:mr-2.5' },
    endIcon: { true: '[&_svg:last-of-type]:-mr-2.5 [&_svg:last-of-type]:ml-2.5' },
    variant: {
      outlined:
        'border border-solid text-contrast hover:border-primary hover:text-primary active:border-myorange-500 active:text-myorange-500 group-hover:border-primary group-hover:text-primary group-active:border-myorange-500 group-active:text-myorange-500',
      contained:
        'bg-contrast text-background hover:bg-primary hover:text-contrast active:bg-myorange-500 active:text-contrast group-hover:bg-primary group-hover:text-contrast group-active:bg-myorange-500 group-active:text-contrast'
    },
    size: {
      small: 'px-5 py-2 text-sm',
      medium: 'px-7 py-2.5 text-base',
      large: 'px-9 py-2.5 text-lg'
    }
  },
  compoundVariants: [
    {
      startIcon: true,
      size: 'small',
      class: '[&_svg:first-of-type]:-ml-2 [&_svg:first-of-type]:mr-2 [&_svg:first-of-type]:h-5 [&_svg:first-of-type]:w-5'
    },
    {
      startIcon: true,
      size: 'large',
      class: '[&_svg:first-of-type]:-ml-3.5 [&_svg:first-of-type]:mr-3.5 [&_svg:first-of-type]:h-7 [&_svg:first-of-type]:w-7'
    },
    {
      endIcon: true,
      size: 'small',
      class: '[&_svg:last-of-type]:-mr-2 [&_svg:last-of-type]:ml-2 [&_svg:last-of-type]:h-5 [&_svg:last-of-type]:w-5'
    },
    {
      endIcon: true,
      size: 'large',
      class: '[&_svg:last-of-type]:-mr-3.5 [&_svg:last-of-type]:ml-3.5 [&_svg:last-of-type]:h-7 [&_svg:last-of-type]:w-7'
    }
  ]
});

export const Button = (props: ButtonProps) => {
  const { children, to, startIcon, endIcon, variant = 'outlined', size = 'medium', className } = props;

  const isExternal = to?.startsWith('http');
  const target = isExternal ? '_blank' : '_self';
  const rel = isExternal ? 'noopener noreferrer' : '';

  if (!to) {
    return (
      <button className={cx(buttonClass({ startIcon: !!startIcon, endIcon: !!endIcon, variant, size }), className)}>
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  }

  return (
    <a
      href={to}
      target={target}
      rel={rel}
      className={cx(buttonClass({ startIcon: !!startIcon, endIcon: !!endIcon, variant, size }), className)}
    >
      {startIcon}
      {children}
      {endIcon}
    </a>
  );
};

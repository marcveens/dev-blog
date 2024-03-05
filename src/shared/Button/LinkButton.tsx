import { twClass } from '@/utils/twClass';
import { cx } from 'class-variance-authority';

type ButtonProps = {
  to?: string;
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

const buttonClass = twClass(
  'inline-flex cursor-pointer select-none items-center text-contrast transition-colors duration-200 ease-in-out hover:shadow-underline',
  {
    variants: {
      startIcon: { true: '[&_svg:first-of-type]:mr-2.5' },
      endIcon: { true: '[&_svg:last-of-type]:ml-2.5' },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
      }
    },
    compoundVariants: [
      {
        startIcon: true,
        size: 'small',
        class: '[&_svg:first-of-type]:mr-2 [&_svg:first-of-type]:h-5 [&_svg:first-of-type]:w-5'
      },
      {
        startIcon: true,
        size: 'large',
        class: '[&_svg:first-of-type]:mr-3.5 [&_svg:first-of-type]:h-7 [&_svg:first-of-type]:w-7'
      },
      {
        endIcon: true,
        size: 'small',
        class: '[&_svg:last-of-type]:ml-2 [&_svg:last-of-type]:h-5 [&_svg:last-of-type]:w-5'
      },
      {
        endIcon: true,
        size: 'large',
        class: '[&_svg:last-of-type]:ml-3.5 [&_svg:last-of-type]:h-7 [&_svg:last-of-type]:w-7'
      }
    ],
    defaultVariants: { size: 'medium' }
  }
);

export const LinkButton = (props: ButtonProps) => {
  const { children, to, startIcon, endIcon, size, className } = props;

  const isExternal = to?.startsWith('http');
  const target = isExternal ? '_blank' : '_self';
  const rel = isExternal ? 'noopener noreferrer' : '';

  return (
    <a href={to} target={target} rel={rel} className={cx(buttonClass({ startIcon: !!startIcon, endIcon: !!endIcon, size }), className)}>
      {startIcon}
      {children}
      {endIcon}
    </a>
  );
};

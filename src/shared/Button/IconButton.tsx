import { GithubLogo, Code, CodesandboxLogo, Play } from '@/utils/Icons';
import { twClass } from '@/utils/twClass';

type ButtonProps = {
  to?: string;
  variant?: 'outlined' | 'icon';
  size?: 'small' | 'medium' | 'large';
  icon: React.ReactNode;
};

const buttonClass = twClass('inline-flex cursor-pointer select-none items-center justify-center rounded-full transition-colors duration-200 ease-in-out', {
  variants: {
    variant: {
      outlined:
        'border border-solid text-contrast hover:border-primary hover:text-primary active:border-myorange-500 active:text-myorange-500',
      icon: 'text-contrast hover:text-primary active:text-primary'
    },
    size: {
      small: '[&_svg]:h-5 [&_svg]:w-5',
      medium: '',
      large: '[&_svg]:h-6 [&_svg]:w-6'
    }
  },
  compoundVariants: [
    {
      variant: 'outlined',
      size: 'small',
      class: 'p-2'
    },
    {
      variant: 'outlined',
      size: 'medium',
      class: 'p-2.5'
    },
    {
      variant: 'outlined',
      size: 'large',
      class: 'p-3'
    },
    {
      variant: 'icon',
      size: 'small',
      class: 'p-0.5'
    },
    {
      variant: 'icon',
      size: 'medium',
      class: 'p-0.5'
    },
    {
      variant: 'icon',
      size: 'large',
      class: 'p-0.5 [&_svg]:h-7 [&_svg]:w-7'
    }
  ]
});

export const IconButton = (props: ButtonProps) => {
  const { to, icon, variant = 'outlined', size = 'medium' } = props;

  const isExternal = to?.startsWith('http');
  const target = isExternal ? '_blank' : '_self';
  const rel = isExternal ? 'noopener noreferrer' : '';

  return (
    <a href={to} target={target} rel={rel} className={buttonClass({ variant, size })}>
      {icon}
    </a>
  );
};

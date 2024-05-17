import { GithubLogo, Code, CodesandboxLogo, Play } from '@/utils/Icons';
import { twClass } from '@/utils/twClass';
import { cx } from 'class-variance-authority';

type ButtonProps = {
  to?: string;
  variant?: 'outlined' | 'contained' | 'subtle';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
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
        'bg-contrast text-background hover:bg-primary hover:text-contrast active:bg-myorange-500 active:text-contrast group-hover:bg-primary group-hover:text-contrast group-active:bg-myorange-500 group-active:text-contrast',
      subtle:
        'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 active:bg-white/15 active:text-white/80 group-hover:bg-white/10 group-hover:text-white/80 group-active:bg-white/15 group-active:text-white/80'
    },
    size: {
      small: 'px-5 py-2 text-sm',
      medium: 'px-7 py-2.5 text-base',
      large: 'px-9 py-2.5 text-lg'
    },
    disabled: { true: 'cursor-not-allowed opacity-50' }
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
    },
    {
      disabled: true,
      variant: 'outlined',
      class:
        'hover:border-contrast hover:text-contrast active:border-contrast active:text-contrast group-hover:border-contrast group-hover:text-contrast group-active:border-contrast group-active:text-contrast'
    },
    {
      disabled: true,
      variant: 'contained',
      class:
        'hover:bg-contrast hover:text-background active:bg-contrast active:text-background group-hover:bg-contrast group-hover:text-background group-active:bg-contrast group-active:text-background'
    }
  ]
});

export const Button = (props: ButtonProps) => {
  const { children, to, variant = 'outlined', size = 'medium', type, disabled, className, isLoading } = props;
  let { startIcon, endIcon } = props;

  const isExternal = to?.startsWith('http');
  const target = isExternal ? '_blank' : '_self';
  const rel = isExternal ? 'noopener noreferrer' : '';

  startIcon = isLoading && startIcon ? <Spinner /> : startIcon;
  endIcon = isLoading && endIcon ? <Spinner /> : endIcon;

  if (!to) {
    return (
      <button
        disabled={disabled}
        className={cx(buttonClass({ startIcon: !!startIcon, endIcon: !!endIcon, variant, size, disabled }), className)}
        type={type}
      >
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
      className={cx(buttonClass({ startIcon: !!startIcon, endIcon: !!endIcon, variant, size, disabled }), className)}
    >
      {startIcon}
      {children}
      {endIcon}
    </a>
  );
};

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-[22px] w-[22px] animate-spin fill-primary text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

import Link from 'next/link';
import { Socials } from '../sidebar/socials';
import { twClass } from '@/utils/twClass';

type NavigationProps = {
  isMobile?: boolean;
};

type NavLink = {
  label: string;
  href: string;
};

const navigationClass = twClass('text-contrast', {
  variants: {
    isMobile: { true: '', false: 'ml-auto hidden md:flex' }
  }
});

const navLinks: NavLink[] = [
  {
    label: 'home',
    href: '/'
  },
  {
    label: 'blog',
    href: '/blog'
  },
  {
    label: 'contact',
    href: '/contact'
  }
];

export const Navigation = (props: NavigationProps) => {
  const { isMobile = false } = props;

  return (
    <>
      <section className={navigationClass({ isMobile })}>
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col text-center md:flex-row md:gap-x-12">
            {navLinks.map((link) => (
              <li key={link.label} className="py-2 md:py-0">
                <Link href={link.href} className="block p-2 text-lg hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Socials />
      </section>
    </>
  );
};

'use client';

import { Logo } from '../logo/logo';
import { IconButton } from '../Button/IconButton';
import { List, X } from '@phosphor-icons/react';
import { Navigation } from '../navigation/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="lg sm:h-120 flex h-80 items-center p-2 sm:p-4">
        <Logo />

        <Navigation />

        <IconButton icon={<List />} variant="icon" className="ml-auto p-2 md:hidden" onClick={() => setIsMenuOpen(true)} />
      </header>

      <section className={`fixed inset-0 ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="w-full h-full overflow-scroll bg-background">
          <header className="lg sm:h-120 flex h-80 items-center p-2 sm:p-4">
            <Logo />

            <IconButton icon={<X />} variant="icon" className="ml-auto p-2" onClick={() => setIsMenuOpen(false)} />
          </header>

          <Navigation isMobile />
        </div>
      </section>
    </>
  );
};

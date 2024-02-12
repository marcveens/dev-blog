'use client';

import { useEffect, useState } from 'react';
import * as styles from './Navigation.css';
import { List, X } from '@/utils/Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Socials } from '../Sidebar/Socials';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <button className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={22} /> : <List size={22} />}
      </button>

      <section className={`${styles.navigationModal} ${isMenuOpen ? styles.navigationModalOpen : ''}`}>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href="/" className={pathname === '/' ? styles.activeLink : ''}>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/posts" className={pathname.startsWith('/posts') ? styles.activeLink : ''}>
                <span>Posts</span>
              </Link>
            </li>
          </ul>
        </nav>
        <Socials />
      </section>
    </>
  );
};

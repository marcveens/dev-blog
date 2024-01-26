import Link from 'next/link';
import * as styles from './Header.css';
import Image from 'next/image';
import { config } from '@/config/config';
import { Navigation } from '../Navigation/Navigation';

export const Header = () => {

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image className={styles.logo} src={config.logo} alt={config.title} width={125} height={125} />
      </Link>

      <Link href="/" className={styles.logoName}>
        {config.author}
      </Link>

      <Navigation />
    </header>
  );
};

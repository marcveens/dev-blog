import * as styles from './sidebar.css';
import { config } from '@/config/config';
import { Socials } from './Socials';
import Image from 'next/image';
import Link from 'next/link';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div>
        <Link href="/">
          <Image className={styles.logo} src={config.logo} alt={config.title} width={125} height={125} />
        </Link>

        <h2 className={styles.author}>
          <Link href="/" className={styles.authorLink}>
            {config.author}
          </Link>
        </h2>

        <p className={styles.subtitle}>{config.subtitle}</p>
      </div>

      <nav className={styles.menu}>
        <ul>
          <li>
            <Link href="/">Posts</Link>
          </li>
        </ul>
      </nav>

      <Socials />

      <div className={styles.copyright}>© All rights reserved.</div>
    </aside>
  );
};

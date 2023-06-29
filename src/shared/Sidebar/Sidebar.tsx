import * as styles from './sidebar.css';
import { config } from '@/config/config';
import { Socials } from './Socials';
import Image from 'next/image';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div>
        <a href="/">
          <Image className={styles.logo} src={config.logo} alt={config.title} width={125} height={125} />
        </a>

        <h2 className={styles.author}>
          <a href="/" className={styles.authorLink}>
            {config.author}
          </a>
        </h2>

        <p className={styles.subtitle}>{config.subtitle}</p>
      </div>

      <nav className={styles.menu}>
        <ul>
          <li>
            <a href="/">Posts</a>
          </li>
        </ul>
      </nav>

      <Socials />

      <div className={styles.copyright}>© All rights reserved.</div>
    </aside>
  );
};

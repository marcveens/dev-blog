import { config } from '@/config/config';
import Image from 'next/image';
import Link from 'next/link';
import * as styles from './Credits.css';
import { Socials } from '../Sidebar/Socials';

export const Credits = () => {
  return (
    <div className={styles.credits}>
      <Link href="/">
        <Image className={styles.logo} src={config.logo} alt={config.title} width={100} height={100} />
      </Link>

      <div className={styles.details}>
        <h2 className={styles.author}>
          <Link href="/" className={styles.authorLink}>
            {config.author}
          </Link>
        </h2>

        <p className={styles.subtitle}>{config.subtitle}</p>

        <Socials />
      </div>
    </div>
  );
};

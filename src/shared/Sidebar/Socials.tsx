import { config } from '@/config/config';
import * as styles from './sidebar.css';
import { GithubLogo, LinkedinLogo } from '@/utils/Icons';

export const Socials = () => {
  return (
    <div className={styles.socials}>
      <ul>
        <li>
          <a href={config.social.linkedIn} target="_blank" rel="noopener noreferrer">
            <LinkedinLogo size={22} weight="light" />
          </a>
        </li>
        <li>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer">
            <GithubLogo size={22} weight="light" />
          </a>
        </li>
      </ul>
    </div>
  );
};

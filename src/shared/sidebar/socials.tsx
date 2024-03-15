import { config } from '@/config/config';
import { GithubLogo, LinkedinLogo, Rss } from '@/utils/Icons';
import { IconButton } from '../button/icon-button';
import { cx } from 'class-variance-authority';

type SocialsProps = {
  className?: string;
  ulClassName?: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: config.social.linkedIn,
    icon: <LinkedinLogo />
  },
  {
    label: 'GitHub',
    href: config.social.github,
    icon: <GithubLogo />
  },
  {
    label: 'RSS feed',
    href: '/feed.xml',
    icon: <Rss />
  }
];

export const Socials = (props: SocialsProps) => {
  const { className, ulClassName } = props;

  return (
    <div className={className}>
      <ul className={cx('flex', ulClassName)}>
        {socialLinks.map((link) => (
          <li key={link.label}>
            <IconButton to={link.href} variant="icon" icon={link.icon} title={link.label} className="p-2" />
          </li>
        ))}
      </ul>
    </div>
  );
};

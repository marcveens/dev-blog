import { config } from '@/config/config';
import { GithubLogo, LinkedinLogo, Rss } from '@/utils/Icons';
import { IconButton } from '../Button/IconButton';

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

export const Socials = () => {
  return (
    <div className="md:flex md:items-center md:ml-20">
      <ul className="flex justify-center mt-6 md:mt-0">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <IconButton to={link.href} variant="icon" icon={link.icon} title={link.label} className="p-2" />
          </li>
        ))}
      </ul>
    </div>
  );
};

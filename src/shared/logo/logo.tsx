import { config } from '@/config/config';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="inline-flex items-center rounded-full bg-contrast/[.05] text-contrast">
      <Image className="block h-14 w-14 rounded-full p-1.5 sm:h-16 sm:w-16" src={config.logo} alt={config.title} width={125} height={125} />
      <div className="pl-2 pr-5 text-md lowercase sm:text-lg sm:pl-4 sm:pr-7">{config.author}</div>
    </Link>
  );
};

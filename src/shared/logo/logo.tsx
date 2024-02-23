import { config } from '@/config/config';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="inline-flex items-center rounded-full bg-contrast/[.05] text-contrast">
      <Image className="block h-16 w-16 rounded-full p-1.5" src={config.logo} alt={config.title} width={125} height={125} />
      <div className="pl-4 pr-7 text-lg lowercase">{config.author}</div>
    </Link>
  );
};

import { config } from '@/config/config';
import Image from 'next/image';
import Link from 'next/link';
import { Socials } from '../sidebar/socials';

export const Credits = () => {
  return (
    <div className="max-w-400 mx-auto mb-14 rounded-md bg-white/5 p-5 sm:flex">
      <Link href="/" className="block">
        <Image className="max-w-none rounded-full" src={config.logo} alt={config.title} width={100} height={100} />
      </Link>

      <div className="sm:ml-5">
        <h2 className="mt-5 mb-3 text-lg font-medium sm:mt-0">
          <Link href="/" className="">
            {config.author}
          </Link>
        </h2>

        <p className="text-white/60">{config.subtitle}</p>

        <Socials className="mt-6" />
      </div>
    </div>
  );
};

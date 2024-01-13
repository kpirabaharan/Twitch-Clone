import { TwitchIcon } from 'lucide-react';
import Link from 'next/link';

export const TwitchCloneLogo = () => {
  return (
    <Link href={'/'}>
      <div className='inline-flex flex-row items-center gap-x-2'>
        <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200'>
          <TwitchIcon className='text-tertiary h-6 w-6' />
        </div>
        <p className='text-tertiary hidden text-xl font-semibold lg:flex'>
          Twitch Clone
        </p>
      </div>
    </Link>
  );
};

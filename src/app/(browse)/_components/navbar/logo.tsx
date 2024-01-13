import { TwitchIcon } from 'lucide-react';
import Link from 'next/link';

export const TwitchCloneLogo = () => {
  return (
    <Link href={'/'}>
      <div className='inline-flex flex-row items-center gap-x-2'>
        <div className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200'>
          <TwitchIcon className='text-tertiary h-5 w-5' />
        </div>
        <p className='text-tertiary hidden text-xl font-semibold lg:flex'>
          Twitch Clone
        </p>
      </div>
    </Link>
  );
};

import { TwitchIcon } from 'lucide-react';
import Link from 'next/link';

export const TwitchCloneLogo = () => {
  return (
    <Link href={'/'}>
      <div className='inline-flex flex-row items-center gap-x-2'>
        <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-200'>
          <TwitchIcon className='h-6 w-6 text-purple-600' />
        </div>
        <p className='hidden text-xl font-semibold text-purple-600 lg:flex'>
          Twitch Clone
        </p>
      </div>
    </Link>
  );
};

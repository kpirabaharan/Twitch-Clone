import { TwitchIcon } from 'lucide-react';
import Link from 'next/link';

export const TwitchCloneLogo = () => {
  return (
    <Link href={'/'}>
      <div className='inline-flex flex-row items-center gap-x-2'>
        <div className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200'>
          <TwitchIcon className='h-5 w-5 text-tertiary' />
        </div>
        <p className='hidden text-xl font-semibold text-tertiary lg:flex'>
          Home
        </p>
      </div>
    </Link>
  );
};

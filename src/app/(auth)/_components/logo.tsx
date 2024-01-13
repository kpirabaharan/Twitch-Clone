import { TwitchIcon } from 'lucide-react';

export const TwitchCloneLogo = () => {
  return (
    <div className='mb-4 flex flex-col items-center gap-y-4'>
      <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-200'>
        <TwitchIcon className='h-8 w-8 text-indigo-600' />
      </div>
      <h1 className='text-3xl font-bold text-indigo-600'>Twitch Clone</h1>
    </div>
  );
};

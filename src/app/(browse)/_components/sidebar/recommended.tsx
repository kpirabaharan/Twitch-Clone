'use client';

import { VideoIcon } from 'lucide-react';

import { useSidebar } from '@/store/use-sidebar';

import { User } from '@/db/types';

import { Hint } from '@/components/hint';
import { SidebarChannel } from './sidebar-channel';

interface RecommendedProps {
  data: User[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { isExpanded } = useSidebar();

  if (!data.length) {
    return null;
  }

  return (
    <>
      <div className='flex w-[220px] flex-row items-center justify-between'>
        <p className='text-xs font-semibold uppercase'>Recommended Channels</p>
        {!isExpanded ? (
          <Hint
            delayDuration={500}
            label={'Recommended Channels'}
            side='right'
            asChild
          >
            <div className='inline-flex h-10 w-10 items-center justify-center'>
              <VideoIcon className='h-5 w-5' />
            </div>
          </Hint>
        ) : (
          <div className='inline-flex h-10 w-10 items-center justify-center'>
            <VideoIcon className='h-5 w-5' />
          </div>
        )}
      </div>
      <ul className='flex w-full flex-col gap-y-2 overflow-hidden'>
        {data.map((user, index) => (
          <SidebarChannel
            key={index}
            userName={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </>
  );
};

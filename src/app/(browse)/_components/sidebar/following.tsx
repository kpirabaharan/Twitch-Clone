'use client';

import { Heart } from 'lucide-react';

import { useSidebar } from '@/store/use-sidebar';

import { Follow, User } from '@/db/types';

import { Hint } from '@/components/hint';
import { SidebarChannel } from './sidebar-channel';

interface FollowingProps {
  data: (Follow & { following: User })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { isExpanded } = useSidebar();

  if (!data.length) {
    return null;
  }

  return (
    <>
      <div className='flex w-[220px] flex-row items-center justify-between'>
        <p className='text-xs font-semibold uppercase'>Followed Channels</p>
        {!isExpanded ? (
          <Hint
            delayDuration={500}
            label={'Followed Channels'}
            side='right'
            asChild
          >
            <div className='inline-flex h-10 w-10 items-center justify-center'>
              <Heart className='h-5 w-5' />
            </div>
          </Hint>
        ) : (
          <div className='inline-flex h-10 w-10 items-center justify-center'>
            <Heart className='h-5 w-5' />
          </div>
        )}
      </div>
      <ul className='flex w-full flex-col gap-y-2 overflow-hidden'>
        {data.map((item, index) => (
          <SidebarChannel
            key={index}
            userName={item.following.username}
            imageUrl={item.following.imageUrl}
            isLive={false}
          />
        ))}
      </ul>
    </>
  );
};

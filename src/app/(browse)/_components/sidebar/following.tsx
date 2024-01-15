'use client';

import { Heart } from 'lucide-react';

import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

import { Follow, User } from '@/db/types';

import { MotionDiv } from '@/components/framer/motion-div';
import { Hint } from '@/components/hint';
import { toggleDivVariants } from './animations';
import { SidebarChannel } from './sidebar-channel';

interface FollowingProps {
  data: (Follow & { following: User })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { isExpanded } = useSidebar();
  const { isLargeScreen } = useScreenSize();

  if (!data.length) {
    return null;
  }

  return (
    <>
      <MotionDiv
        className='flex w-[220px] flex-row items-center justify-between'
        initial={'closed'}
        animate={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
        exit={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
        variants={toggleDivVariants}
      >
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
      </MotionDiv>
      <ul className='flex w-full flex-col gap-y-2'>
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

'use client';

import { Heart } from 'lucide-react';

import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

import { User } from '@/db/types';

import { Hint } from '@/components/hint';
import { MotionDiv } from '@/components/motion-div';
import { toggleDivVariants } from './animations';
import { SidebarChannel } from './sidebar-channel';

interface FollowingProps {
  data: User[];
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
        <div className='inline-flex h-10 w-10 items-center justify-center'>
          {!isExpanded ? (
            <Hint
              delayDuration={500}
              label={'Followed Channels'}
              side='right'
              asChild
            >
              <Heart className='h-5 w-5' />
            </Hint>
          ) : (
            <Heart className='h-5 w-5' />
          )}
        </div>
      </MotionDiv>
      <div className='flex w-full flex-col gap-y-2'>
        {data.map((user, index) => (
          <SidebarChannel
            key={index}
            userName={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
          />
        ))}
      </div>
    </>
  );
};

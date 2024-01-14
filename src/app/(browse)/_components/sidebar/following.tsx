'use client';

import { Variants } from 'framer-motion';
import { Heart } from 'lucide-react';

import { useSidebar } from '@/store/useSidebar';

import { Hint } from '@/components/hint';
import { MotionDiv } from '@/components/motion-div';
import { AvatarItem } from './avatar-item';

interface FollowingProps {
  data: any[];
}

export const Following = ({ data }: FollowingProps) => {
  const { isExpanded } = useSidebar();

  const toggleDivVariants: Variants = {
    open: {
      x: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      x: -90,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  if (!data.length) {
    return null;
  }

  return (
    <>
      <MotionDiv
        className='flex w-[220px] flex-row items-center justify-between'
        initial={'closed'}
        animate={isExpanded ? 'open' : 'closed'}
        exit={isExpanded ? 'open' : 'closed'}
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
      {data.map((item, index) => (
        <AvatarItem key={index} item={item} />
      ))}
    </>
  );
};

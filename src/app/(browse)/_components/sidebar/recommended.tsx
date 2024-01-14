'use client';

import { Variants } from 'framer-motion';
import { VideoIcon } from 'lucide-react';

import { useSidebar } from '@/store/useSidebar';

import { Hint } from '@/components/hint';
import { MotionDiv } from '@/components/motion-div';
import { AvatarItem } from './avatar-item';

interface RecommendedProps {
  data: any[];
}

export const Recommended = ({ data }: RecommendedProps) => {
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
        <p className='text-xs font-semibold uppercase'>Recommended Channels</p>
        <div className='inline-flex h-10 w-10 items-center justify-center'>
          {!isExpanded ? (
            <Hint
              delayDuration={500}
              label={'Recommended Channels'}
              side='right'
              asChild
            >
              <VideoIcon className='h-5 w-5' />
            </Hint>
          ) : (
            <VideoIcon className='h-5 w-5' />
          )}
        </div>
      </MotionDiv>
      {data.map((item, index) => (
        <AvatarItem key={index} item={item} />
      ))}
    </>
  );
};

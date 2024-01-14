'use client';

import { Hint } from '@/components/hint';
import { MotionDiv } from '@/components/motion-div';
import { useSidebar } from '@/store/useSidebar';

import { Variants } from 'framer-motion';
import { VideoIcon } from 'lucide-react';

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
        className='flex w-full flex-row items-center justify-between pr-[9px]'
        initial={'closed'}
        animate={isExpanded ? 'open' : 'closed'}
        exit={isExpanded ? 'open' : 'closed'}
        variants={toggleDivVariants}
      >
        <p className='text-xs font-semibold uppercase'>Recommended Channels</p>
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
      </MotionDiv>
    </>
  );
};

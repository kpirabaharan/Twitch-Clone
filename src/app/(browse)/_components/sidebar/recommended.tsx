'use client';

import { VideoIcon } from 'lucide-react';

import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

import { Hint } from '@/components/hint';
import { MotionDiv } from '@/components/motion-div';
import { toggleDivVariants } from './animations';
import { AvatarItem } from './avatar-item';

interface RecommendedProps {
  data: any[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { isExpanded } = useSidebar();
  const { isLargeScreen } = useScreenSize();

  if (!data.length) {
    return null;
  }

  return (
    <>
      <MotionDiv
        className='mt-2 flex w-[220px] flex-row items-center justify-between'
        initial={'closed'}
        animate={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
        exit={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
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
      <div className='mt-2 flex w-full flex-col gap-y-2'>
        {data.map((item, index) => (
          <AvatarItem key={index} item={item} />
        ))}
      </div>
    </>
  );
};

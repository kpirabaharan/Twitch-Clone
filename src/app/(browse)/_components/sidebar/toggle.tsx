'use client';

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';

import { useSidebar } from '@/store/useSidebar';

import { MotionDiv } from '@/components/framer/motion-div';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { toggleDivVariants } from './animations';

export const Toggle = () => {
  const { isExpanded, onExpand, onCollapse } = useSidebar();

  const hintLabel = isExpanded ? 'Collapse' : 'Expand';

  return (
    <MotionDiv
      className='hidden w-[220px] flex-row items-center justify-between lg:flex'
      initial={'closed'}
      animate={isExpanded ? 'open' : 'closed'}
      exit={isExpanded ? 'open' : 'closed'}
      variants={toggleDivVariants}
    >
      <p className='text-lg font-semibold'>For You</p>
      <Hint delayDuration={500} label={hintLabel} side='right' asChild>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={isExpanded ? onCollapse : onExpand}
        >
          {isExpanded ? (
            <PanelLeftCloseIcon className='h-5 w-5' />
          ) : (
            <PanelLeftOpenIcon className='h-5 w-5' />
          )}
        </Button>
      </Hint>
    </MotionDiv>
  );
};

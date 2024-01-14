'use client';

import { useSidebar } from '@/store/useSidebar';

import { Hint } from '@/components/hint';
import { MotionDiv } from '@/components/motion-div';
import { Button } from '@/components/ui/button';
import { Variants } from 'framer-motion';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';

export const Toggle = () => {
  const { isExpanded, onExpand, onCollapse } = useSidebar();

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

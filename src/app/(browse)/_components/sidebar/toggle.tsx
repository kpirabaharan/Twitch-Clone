'use client';

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';

import { useSidebar } from '@/store/useSidebar';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';

export const Toggle = () => {
  const { isExpanded, onExpand, onCollapse } = useSidebar();

  const hintLabel = isExpanded ? 'Collapse' : 'Expand';

  return (
    <div className='hidden w-[220px] flex-row items-center justify-between lg:flex'>
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
    </div>
  );
};

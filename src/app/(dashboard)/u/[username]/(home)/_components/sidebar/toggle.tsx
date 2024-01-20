'use client';

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';

export const Toggle = () => {
  const { isExpanded, onExpand, onCollapse } = useCreatorSidebar();

  const hintLabel = isExpanded ? 'Collapse' : 'Expand';

  return (
    <div className='flex w-[220px] flex-row items-center justify-between'>
      <p className='text-base font-semibold'>Creator Dashboard</p>
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

import { PropsWithChildren, useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ExpandedAvatarHintProps extends PropsWithChildren {
  description: string;
  asChild?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
}

export const ExpandedAvatarHint = ({
  description,
  children,
  asChild,
  side,
  align,
  delayDuration = 0,
}: ExpandedAvatarHintProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger
          asChild={asChild}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {children}
        </TooltipTrigger>
        {showTooltip && (
          <TooltipContent
            className='max-w-52 bg-[#1f1f23]'
            side={side}
            align={align}
            onMouseEnter={() => setShowTooltip(false)}
          >
            <p className='line-clamp-2 text-xs text-white'>
              For the win I a bork drive doggo very jealous pupper, no doggo
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

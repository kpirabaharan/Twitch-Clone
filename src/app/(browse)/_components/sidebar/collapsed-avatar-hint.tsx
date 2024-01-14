import { PropsWithChildren, useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CollapsedAvatarHintProps extends PropsWithChildren {
  description: string;
  userName: string;
  isLive: boolean;
  asChild?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
}

export const CollapsedAvatarHint = ({
  description,
  userName,
  isLive,
  children,
  asChild,
  side,
  align,
  delayDuration = 0,
}: CollapsedAvatarHintProps) => {
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
            className='relative left-3 max-w-52 bg-[#1f1f23]'
            side={side}
            align={align}
            onMouseEnter={() => setShowTooltip(false)}
          >
            <p className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-indigo-500'>
              {userName} {isLive && '· League of Legends'}
            </p>
            {isLive ? (
              <p className='line-clamp-2 text-xs text-white'>{description}</p>
            ) : (
              <p className='line-clamp-2 text-xs text-white'>
                See all recent videos
              </p>
            )}
            {isLive ? (
              <div className='flex flex-row items-center'>
                <div className='h-2 w-2 rounded-full bg-red-600' />
                <p className='text-xs text-muted-foreground'>
                  &nbsp;Live | 420 Viewers
                </p>
              </div>
            ) : (
              <p className='text-xs text-muted-foreground'>Offline</p>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

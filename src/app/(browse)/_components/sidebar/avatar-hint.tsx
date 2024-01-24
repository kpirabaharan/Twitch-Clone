import { PropsWithChildren, useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserStatus } from '@/components/user-status';

interface AvatarHintProps extends PropsWithChildren {
  isExpanded: boolean;
  userName: string;
  description?: string;
  isLive?: boolean;
  asChild?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
}

export const AvatarHint = ({
  userName,
  description,
  isExpanded,
  isLive,
  children,
  asChild,
  side,
  align,
  delayDuration = 0,
}: AvatarHintProps) => {
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
        {showTooltip &&
          (isExpanded ? (
            isLive && (
              <TooltipContent
                className='relative left-1 max-w-52 bg-[#1f1f23]'
                side={side}
                align={align}
                onMouseEnter={() => setShowTooltip(false)}
              >
                <p className='line-clamp-2 text-xs text-white'>{description}</p>
              </TooltipContent>
            )
          ) : (
            <TooltipContent
              className='relative -left-[175px] max-w-52 bg-[#1f1f23]'
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
              <UserStatus isLive={isLive} showFull />
            </TooltipContent>
          ))}
      </Tooltip>
    </TooltipProvider>
  );
};

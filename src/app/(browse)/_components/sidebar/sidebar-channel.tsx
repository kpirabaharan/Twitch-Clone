'use client';

import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useScreenSize } from '@/store/use-screen-size';
import { useSidebar } from '@/store/use-sidebar';

import { MotionDiv } from '@/components/framer/motion-div';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/user-avatar';
import { UserStatus } from '@/components/user-status';
import { sideBarChannelVariants } from './animations';
import { AvatarHint } from './avatar-hint';

interface SidebarChannelProps {
  userName: string;
  imageUrl: string;
  isLive?: boolean;
}

export const SidebarChannel = ({
  userName,
  imageUrl,
  isLive,
}: SidebarChannelProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isExpanded } = useSidebar();
  const { isLargeScreen } = useScreenSize();

  const href = `/${userName}`;
  const isActive = pathname === href;

  const animationCondition = !isLargeScreen
    ? 'closed'
    : isExpanded
      ? 'open'
      : 'closed';

  return (
    <AvatarHint
      side='right'
      userName={userName}
      description='temp'
      isExpanded={isExpanded}
      isLive={isLive}
      delayDuration={500}
      asChild
    >
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className='rounded-none px-[14px]'
        onClick={() => router.push(href)}
        asChild
      >
        <MotionDiv
          className='overflow- flex h-[48px] w-60 cursor-pointer flex-row 
          items-center gap-x-4'
          initial={animationCondition}
          animate={animationCondition}
          exit={animationCondition}
          variants={sideBarChannelVariants}
        >
          <UserAvatar imageUrl={imageUrl} username={userName} isLive={isLive} />
          <div>
            <p
              className='text-ellipsis whitespace-nowrap text-[13px] 
              font-semibold'
            >
              {userName}
            </p>
            {isLive && (
              <p
                className='text-ellipsis whitespace-nowrap 
                text-xs text-muted-foreground'
              >
                League of Legends
              </p>
            )}
          </div>
          <div className={cn('ml-auto', isLive && 'mb-auto')}>
            <UserStatus isLive={isLive} numViewers={69} />
          </div>
        </MotionDiv>
      </Button>
    </AvatarHint>
  );
};

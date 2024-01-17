'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSidebar } from '@/store/useSidebar';

import { MotionDiv } from '@/components/framer/motion-div';
import { UserAvatar } from '@/components/user-avatar';
import { UserStatus } from '@/components/user-status';
import { sideBarChannel } from './animations';
import { AvatarHint } from './avatar-hint';

interface SidebarChannelProps {
  userName: string;
  imageUrl: string;
  isLive: boolean;
}

export const SidebarChannel = ({
  userName,
  imageUrl,
  isLive,
}: SidebarChannelProps) => {
  const pathname = usePathname();
  const { isExpanded } = useSidebar();

  const href = `/${userName}`;
  const isActive = pathname === href;

  return (
    <Link href={href} className='relative'>
      <AvatarHint
        userName={userName}
        side='right'
        isExpanded={isExpanded}
        isLive={isLive}
        description='temp'
        asChild
        delayDuration={500}
      >
        <MotionDiv
          className='flex h-[44px] flex-row items-center gap-x-4 overflow-hidden 
           px-[14px] hover:bg-[#2f2f36]'
          initial={isExpanded ? 'open' : 'closed'}
          animate={isExpanded ? 'open' : 'closed'}
          exit={isExpanded ? 'open' : 'closed'}
          variants={sideBarChannel}
        >
          <UserAvatar imageUrl={imageUrl} username={userName} isLive={isLive} />
          <div>
            <p
              className='overflow-hidden text-ellipsis whitespace-nowrap text-[13px] 
              font-semibold'
            >
              {userName}
            </p>
            {isLive && (
              <p
                className='overflow-hidden text-ellipsis whitespace-nowrap 
                text-xs text-muted-foreground'
              >
                League of Legends
              </p>
            )}
          </div>
          <div className='ml-auto'>
            <UserStatus isLive={isLive} numViewers={69} />
          </div>
        </MotionDiv>
      </AvatarHint>
    </Link>
  );
};

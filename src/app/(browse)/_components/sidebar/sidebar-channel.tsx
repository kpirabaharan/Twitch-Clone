'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSidebar } from '@/store/useSidebar';

import { UserAvatar } from '@/components/user-avatar';
import { UserStatus } from '@/components/user-status';
import { cn } from '@/lib/utils';
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
        <div
          className='flex w-full flex-row items-center gap-x-4
          overflow-hidden py-1 pl-[9px] hover:bg-[#2f2f36]'
        >
          <UserAvatar imageUrl={imageUrl} username={userName} isLive={isLive} />
          <div className='w-[140px]'>
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
          <div className={cn('relative', isLive ? '-top-2' : '')}>
            <UserStatus isLive={isLive} numViewers={69} />
          </div>
        </div>
      </AvatarHint>
    </Link>
  );
};

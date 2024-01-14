'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSidebar } from '@/store/useSidebar';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { CollapsedAvatarHint } from './collapsed-avatar-hint';
import { ExpandedAvatarHint } from './expanded-avatar-hint';

interface AvatarItemProps {
  userName: string;
  imageUrl: string;
  isLive: boolean;
}

// TODO: Make One AvatarHint do both Hints, Dont want to rerender children

export const AvatarItem = ({ userName, imageUrl, isLive }: AvatarItemProps) => {
  const pathname = usePathname();
  const { isExpanded } = useSidebar();

  const href = `/${userName}`;
  const isActive = pathname === href;

  return (
    <Link href={href} className='relative'>
      {isExpanded ? (
        <ExpandedAvatarHint
          side='right'
          isLive={isLive}
          description='temp'
          asChild
          delayDuration={500}
        >
          <div
            className='flex w-full flex-row items-center gap-x-4 
            overflow-hidden py-1 pl-[9px] hover:bg-[#2f2f36]'
          >
            <Avatar
              className={cn(
                'h-8 w-8 cursor-pointer border-2',
                isLive ? 'border-red-500' : 'border-gray-500',
              )}
            >
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
            <div className='w-[120px]'>
              <p
                className='overflow-hidden text-ellipsis whitespace-nowrap text-xs 
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
            {isLive ? (
              <div className='flex w-[48px] flex-row items-center gap-x-2'>
                <div className='h-2 w-2 rounded-full bg-red-600' />
                <p className='text-xs'>420</p>
              </div>
            ) : (
              <p className='text-xs text-muted-foreground'>Offline</p>
            )}
          </div>
        </ExpandedAvatarHint>
      ) : (
        <div className='flex w-full flex-row items-center gap-x-4 overflow-hidden'>
          <CollapsedAvatarHint
            side='right'
            description='temp'
            userName={userName}
            isLive={isLive}
            asChild
            delayDuration={500}
          >
            <div className='ml-[9px] rounded-full py-1'>
              <Avatar
                className={cn(
                  'h-8 w-8 cursor-pointer border-2',
                  isLive ? 'border-red-500' : 'border-gray-500',
                )}
              >
                <AvatarImage src={imageUrl} />
                <AvatarFallback>{userName[0]}</AvatarFallback>
              </Avatar>
            </div>
          </CollapsedAvatarHint>
          <div>
            <p
              className='overflow-hidden text-ellipsis whitespace-nowrap text-xs 
              font-semibold'
            >
              {userName}
            </p>
            <p
              className='w-[120px] overflow-hidden text-ellipsis whitespace-nowrap 
              text-xs text-muted-foreground'
            >
              League of Legends
            </p>
          </div>
          <div className='flex w-[48px] flex-row items-center gap-x-2'>
            <div className='h-2 w-2 rounded-full bg-red-600' />
            <p className='text-xs'>420</p>
          </div>
        </div>
      )}
    </Link>
  );
};

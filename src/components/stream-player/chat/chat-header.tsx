'use client';

import { ChatToggle } from '@/components/stream-player/chat/chat-toggle';
import { VariantToggle } from '@/components/stream-player/chat/variant-toggle';
import { Skeleton } from '@/components/ui/skeleton';

export const ChatHeader = () => {
  return (
    <div className='relative flex h-12 w-full shrink-0 items-center justify-center border-b'>
      <div className='absolute left-1 top-1 hidden lg:block'>
        <ChatToggle />
      </div>
      <p className='text-center font-semibold text-primary'>Stream Chat</p>
      <div className='absolute right-1 top-1'>
        <VariantToggle />
      </div>
    </div>
  );
};

export const ChatHeaderSkeleton = () => {
  return (
    <div className='relative flex h-12 w-full shrink-0 items-center justify-center border-b'>
      <Skeleton className='absolute left-3 top-3 h-6 w-6 rounded-md' />
      <Skeleton className='h-6 w-20 rounded-md' />
      <Skeleton className='absolute right-3 top-3 h-6 w-6 rounded-md' />
    </div>
  );
};

'use client';

import { ChatToggle } from '@/components/stream-player/chat/chat-toggle';

export const ChatHeader = () => {
  return (
    <div className='relative flex h-12 w-full items-center justify-center border-b'>
      <div className='absolute left-1 top-1 hidden lg:block'>
        <ChatToggle />
      </div>
      <p className='text-center font-semibold text-primary'>Stream Chat</p>
      {/* // TODO: Toggle Chat Community */}
    </div>
  );
};

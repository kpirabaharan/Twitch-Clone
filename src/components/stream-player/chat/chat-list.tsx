'use client';

import { ChatMessage } from '@/db/types';

import { ChatItem } from '@/components/stream-player/chat/chat-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatListProps {
  isOffline: boolean;
  isChatDisabled: boolean;
  messages: ChatMessage[];
}

export const ChatList = ({
  isOffline,
  isChatDisabled,
  messages,
}: ChatListProps) => {
  let message;

  switch (true) {
    case isChatDisabled:
      message = 'Chat is disabled';
      break;
    case isOffline:
      message = 'Stream is offline';
      break;
    case !messages || messages.length === 0:
      message = 'Welcome to the chat!';
      break;
    default:
      message = '';
  }

  if (message) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-muted-foreground'>{message}</p>
      </div>
    );
  }

  return (
    <ScrollArea className='flex flex-1 flex-col-reverse p-2'>
      {messages.map(msg => (
        <ChatItem key={msg.id} data={msg} />
      ))}
    </ScrollArea>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className='my-4 mx-2 flex h-full flex-1 items-center justify-center'>
      <Skeleton className='h-full w-full rounded-lg' />
    </div>
  );
};

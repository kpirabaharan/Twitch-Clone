'use client';

import { ChatMessage } from '@/db/types';

import { Message } from './chat-message';

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
    <div className='no-scrollbar flex h-full flex-1 flex-col-reverse overflow-y-auto p-2'>
      {messages.map(msg => (
        <Message key={msg.id} data={msg} />
      ))}
    </div>
  );
};

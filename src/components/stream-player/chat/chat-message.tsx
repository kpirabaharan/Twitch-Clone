'use client';

import { type ReceivedChatMessage } from '@livekit/components-react';
import { format } from 'date-fns';

import { stringToColor } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const router = useRouter();
  const color = stringToColor(data.from?.name || '');

  return (
    <div className='flex gap-2 rounded-md p-2 hover:bg-white/5'>
      <p className='line-clamp-5 text-sm'>
        <span className='py-1 text-white/40'>
          {format(data.timestamp, 'HH:MM')}{' '}
        </span>
        <span
          // TODO: Add link to user profile
          onClick={() => {}}
          className='cursor-pointer truncate hover:bg-white/10 hover:underline'
          style={{ color: color }}
        >
          {data.from?.name}
        </span>
        <span className='font-light'>: {data.message}</span>
      </p>
    </div>
  );
};

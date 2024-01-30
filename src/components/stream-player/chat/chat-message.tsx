'use client';

import { format } from 'date-fns';

import { ChatMessage } from '@/db/types';
import { stringToColor } from '@/lib/utils';

interface MessageProps {
  data: ChatMessage;
}

export const Message = ({ data }: MessageProps) => {
  const color = stringToColor(data.viewerName || '');

  return (
    <div className='flex gap-2 rounded-md p-2 hover:bg-white/5'>
      <p className='line-clamp-5 text-sm'>
        <span className='py-1 text-white/40'>
          {format(data.createdAt, 'HH:m')}{' '}
        </span>
        <span
          // TODO: Add link to user profile
          onClick={() => {}}
          className='cursor-pointer truncate hover:bg-white/10 hover:underline'
          style={{ color: color }}
        >
          {data.viewerName}
        </span>
        <span className='font-light'>: {data.message}</span>
      </p>
    </div>
  );
};

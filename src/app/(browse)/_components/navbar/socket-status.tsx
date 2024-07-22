'use client';

import { CheckIcon, XIcon } from 'lucide-react';

import { useSocket } from '@/providers/socket-provider';

export const SocketStatus = () => {
  const { isConnected } = useSocket();

  const statusIcon = isConnected ? (
    <CheckIcon className='text-green-500' />
  ) : (
    <XIcon className='text-red-500' />
  );

  return (
    <div className='flex flex-row gap-x-2'>
      <p className='hidden lg:block'>Socket</p>
      {statusIcon}
    </div>
  );
};

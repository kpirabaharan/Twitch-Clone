import { ConnectionState } from '@livekit/components-react';
import { Loader } from 'lucide-react';

export const LoadingVideo = () => {
  return (
    <div
      className='flex h-full flex-col items-center justify-center gap-y-4 
      bg-background'
    >
      <Loader className='animate-spin text-muted-foreground' size={40} />
      <ConnectionState className='text-3xl font-bold capitalize text-muted-foreground' />
    </div>
  );
};

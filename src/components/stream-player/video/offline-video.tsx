import { WifiOff } from 'lucide-react';

interface OfflineVideoProps {
  hostName: string;
}

export const OfflineVideo = ({ hostName }: OfflineVideoProps) => {
  return (
    <div
      className='flex h-full flex-col items-center justify-center gap-y-4 
      bg-background border-b'
    >
      <WifiOff className='text-muted-foreground' size={40} />
      <p className='text-3xl font-bold text-muted-foreground'>
        {hostName} is offline
      </p>
    </div>
  );
};

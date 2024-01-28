import { Loader } from 'lucide-react';

interface LoadingVideoProps {
  label: string;
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div
      className='flex h-full flex-col items-center justify-center gap-y-4 
      rounded-lg bg-card'
    >
      <Loader className='animate-spin text-muted-foreground' size={40} />
      <p className='text-3xl font-bold capitalize text-muted-foreground'>
        {label}
      </p>
    </div>
  );
};

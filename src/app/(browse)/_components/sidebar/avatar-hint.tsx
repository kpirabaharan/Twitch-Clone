import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AvatarHintProps {
  label: string;
  user: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
}

export const AvatarHint = ({
  label,
  user,
  children,
  asChild,
  side,
  align,
  delayDuration = 0,
}: AvatarHintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className='relative left-3 max-w-52 bg-[#1f1f23]'
          side={side}
          align={align}
        >
          <p className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-indigo-500'>
            {user} &middot; League of Legends
          </p>
          <p className='line-clamp-2 text-xs text-white'>
            For the win I a bork drive doggo very jealous pupper, no doggo
          </p>
          <div className='flex flex-row items-center'>
            <div className='h-2 w-2 rounded-full bg-red-600' />
            <p className='text-xs text-muted-foreground'>
              &nbsp;Live | 420 Viewers
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

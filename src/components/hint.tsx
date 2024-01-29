import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface HintProps {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
}

export const Hint = ({
  label,
  children,
  asChild,
  side,
  align,
  delayDuration = 0,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className={cn(
            'relative bg-gray-200 text-accent',
            side === 'top' && 'bottom-0',
            side === 'bottom' && 'top-3',
            side === 'left' && 'right-3',
            side === 'right' && 'left-3',
          )}
          side={side}
          align={align}
        >
          <p className='font-semibold'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

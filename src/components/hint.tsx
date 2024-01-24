import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
          className='relative left-2 bg-gray-200 text-accent'
          side={side}
          align={align}
        >
          <p className='font-semibold'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

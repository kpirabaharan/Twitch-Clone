'use client';

import { CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const onCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={!value}
            variant={'outline'}
            size={'default'}
            onClick={() => onCopy(value!)}
          >
            <CopyIcon className='h-5 w-5' />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className='relative top-2 rounded-md bg-gray-200 px-2 py-1'
          side={'bottom'}
        >
          <p className='text-sm text-black'>Copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

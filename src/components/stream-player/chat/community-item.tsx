'use client';

import { MinusCircle } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { onBlock } from '@/actions/block';
import { cn, stringToColor } from '@/lib/utils';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { start } from 'repl';

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantId: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantId,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || '');
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    startTransition(async () => {
      try {
        await onBlock(participantId);
        toast.success(`Blocked ${participantName}`);
      } catch (err: any) {
        toast.error('Could not block user. Please try again later.');
      }
    });
  };

  return (
    <div
      className={cn(
        'group flex w-full items-center justify-between rounded-md p-2 hover:bg-white/5',
        isPending && 'pointer-events-none opacity-50',
      )}
    >
      <p className='text-sm' style={{ color: color }}>
        {participantName}
      </p>
      {isHost && !isSelf && (
        <Hint label={'Block'} asChild>
          <Button
            className='h-auto w-auto p-1 opacity-0 group-hover:opacity-100'
            variant={'destructive'}
            onClick={handleBlock}
            disabled={isPending}
          >
            <MinusCircle size={16} />
          </Button>
        </Hint>
      )}
    </div>
  );
};

'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { onBlock, onUnblock } from '@/actions/block';

import { Button } from '@/components/ui/button';

interface BlockButtonProps {
  isBlocked: boolean;
  userId: string;
}

export const BlockButton = ({ isBlocked, userId }: BlockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleBlock = () => {
    startTransition(async () => {
      try {
        const blockedUser = await onBlock(userId);
        toast.success(`Blocked ${blockedUser.blocking.username}`);
      } catch (err: any) {
        toast(err.message);
      }
    });
  };

  const handleUnBlock = () => {
    startTransition(async () => {
      try {
        const unBlockedUser = await onUnblock(userId);
        toast.success(`Unblocked ${unBlockedUser.blocking.username}`);
      } catch (err: any) {
        toast(err.message);
      }
    });
  };

  const onClick = isBlocked ? handleUnBlock : handleBlock;

  return (
    <Button variant={'tertiary'} disabled={isPending} onClick={onClick}>
      {isBlocked ? 'Unblock' : 'Block'}
    </Button>
  );
};

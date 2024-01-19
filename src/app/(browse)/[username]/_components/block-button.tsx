'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { onBlock, onUnblock } from '@/actions/block';

import { Button } from '@/components/ui/button';

interface BlockButtonProps {
  isBlocking: boolean;
  userId: string;
}

export const BlockButton = ({ isBlocking, userId }: BlockButtonProps) => {
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

  const onClick = isBlocking ? handleUnBlock : handleBlock;

  return (
    <Button variant={'tertiary'} disabled={isPending} onClick={onClick}>
      {isBlocking ? 'Unblock' : 'Block'}
    </Button>
  );
};

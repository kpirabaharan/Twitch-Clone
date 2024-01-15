'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { onFollow } from '@/actions/follow';

import { Button } from '@/components/ui/button';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      try {
        const followedUser = await onFollow(userId);
        toast.success(`Following ${followedUser.following.username}`);
      } catch (err: any) {
        toast(err.message);
      }
    });
  };

  return (
    <Button disabled={isFollowing || isPending} onClick={onClick}>
      Follow
    </Button>
  );
};

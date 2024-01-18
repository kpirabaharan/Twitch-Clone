'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { onFollow, onUnfollow } from '@/actions/follow';

import { Button } from '@/components/ui/button';

interface FollowButtonProps {
  isFollowing: boolean;
  userId: string;
}

export const FollowButton = ({ isFollowing, userId }: FollowButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(async () => {
      try {
        const followedUser = await onFollow(userId);
        toast.success(`Following ${followedUser.following.username}`);
      } catch (err: any) {
        toast(err.message);
      }
    });
  };

  const handleUnFollow = () => {
    startTransition(async () => {
      try {
        const unFollowedUser = await onUnfollow(userId);
        toast.success(`Unfollowed ${unFollowedUser.following.username}`);
      } catch (err: any) {
        toast(err.message);
      }
    });
  };

  const onClick = isFollowing ? handleUnFollow : handleFollow;

  return (
    <Button variant={'tertiary'} disabled={isPending} onClick={onClick}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

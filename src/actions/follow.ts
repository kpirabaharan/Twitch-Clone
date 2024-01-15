'use server';

import { followUser, unfollowUser } from '@/lib/follow-service';
import { revalidatePath } from 'next/cache';

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    // Clear cache for home page and followed user's profile page
    revalidatePath('/');

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};

export const onUnFollow = async (id: string) => {
  try {
    const unFollowedUser = await unfollowUser(id);

    // Clear cache for home page and followed user's profile page
    revalidatePath('/');

    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`);
    }

    return unFollowedUser;
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};

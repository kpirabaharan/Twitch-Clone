'use server';

import { followUser } from '@/lib/follow-service';
import { revalidatePath } from 'next/cache';

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    // Clear cache for home page and followed user's profile page
    revalidatePath('/');

    if (followedUser) {
      revalidatePath(`/profile/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};

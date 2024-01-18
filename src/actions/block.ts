import { revalidatePath } from 'next/cache';

import { blockUser, unblockUser } from '@/lib/block-service';

export const onBlock = async (id: string) => {
  try {
    const blockedUser = await blockUser(id);
    // TODO: Kick blocked user

    // Clear cache for home page and followed user's profile page
    revalidatePath('/');

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocking.username}`);
    }

    return blockedUser;
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};

export const onUnblock = async (id: string) => {
  try {
    const unBlockedUser = await unblockUser(id);

    // Clear cache for home page and followed user's profile page
    revalidatePath('/');

    if (unBlockedUser) {
      revalidatePath(`/${unBlockedUser.blocking.username}`);
    }

    return unBlockedUser;
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};

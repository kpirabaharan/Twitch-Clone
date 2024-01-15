import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { follow, users } from '@/db/schema';
import { getSelf } from './auth-service';

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error('Unauthorized');
    }

    const otherUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const followRecord = await db.query.follow.findFirst({
      where: and(
        eq(follow.followerId, self.id),
        eq(follow.followingId, otherUser.id),
      ),
    });

    // Return true if record exists, false otherwise
    return !!followRecord;
  } catch (err: any) {
    return false;
  }
};

import { and, eq, notInArray } from 'drizzle-orm';

import { db } from '@/db';
import { block, follow, users } from '@/db/schema';
import { getSelf } from './auth-service';

export const getFollowing = async () => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error('Unauthorized');
    }

    const followedUsers = await db.query.follow.findMany({
      where: and(
        eq(follow.followerId, self.id),
        notInArray(
          follow.followingId,
          db
            .select({ id: block.blockerId })
            .from(block)
            .where(eq(block.blockingId, self.id)),
        ),
      ),
      with: { following: { with: { stream: { columns: { isLive: true } } } } },
    });

    return followedUsers;
  } catch (err) {
    return [];
  }
};

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

export const followUser = async (id: string) => {
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
    throw new Error('Cannot follow yourself');
  }

  const existingFollowRecord = await db.query.follow.findFirst({
    where: and(
      eq(follow.followerId, self.id),
      eq(follow.followingId, otherUser.id),
    ),
  });

  if (existingFollowRecord) {
    throw new Error('Already following');
  }

  const [insertFollow] = await db
    .insert(follow)
    .values({
      followerId: self.id,
      followingId: otherUser.id,
    })
    .returning();

  const followRecordWithUsers = await db.query.follow.findFirst({
    where: and(
      eq(follow.followerId, insertFollow.followerId),
      eq(follow.followingId, insertFollow.followingId),
    ),
    with: { following: true },
  });

  if (!followRecordWithUsers) {
    throw new Error('Something went wrong');
  }

  return followRecordWithUsers;
};

export const unfollowUser = async (id: string) => {
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
    throw new Error('Cannot unfollow yourself');
  }

  const existingFollow = await db.query.follow.findFirst({
    where: and(
      eq(follow.followerId, self.id),
      eq(follow.followingId, otherUser.id),
    ),
    with: { following: true },
  });

  if (!existingFollow) {
    throw new Error('Not following');
  }

  await db
    .delete(follow)
    .where(
      and(eq(follow.followerId, self.id), eq(follow.followingId, otherUser.id)),
    )
    .execute();

  return existingFollow;
};

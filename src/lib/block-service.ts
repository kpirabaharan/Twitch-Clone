import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { block, users } from '@/db/schema';
import { getSelf } from '@/lib/auth-service';

export const isBlockingUser = async (id: string) => {
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

    const blockRecord = await db.query.block.findFirst({
      where: and(
        eq(block.blockerId, self.id),
        eq(block.blockingId, otherUser.id),
      ),
    });

    // Return true if record exists, false otherwise
    return !!blockRecord;
  } catch (err: any) {
    return false;
  }
};

export const isBlockedByUser = async (id: string) => {
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
      return false;
    }

    const blockRecord = await db.query.block.findFirst({
      where: and(
        eq(block.blockerId, otherUser.id),
        eq(block.blockingId, self.id),
      ),
    });

    // Return true if record exists, false otherwise
    return !!blockRecord;
  } catch (err: any) {
    return false;
  }
};

export const blockUser = async (id: string) => {
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
    throw new Error('Cannot block yourself');
  }

  const existingBlockRecord = await db.query.block.findFirst({
    where: and(
      eq(block.blockerId, self.id),
      eq(block.blockingId, otherUser.id),
    ),
  });

  if (existingBlockRecord) {
    throw new Error('Already blocking');
  }

  const [insertBlocked] = await db
    .insert(block)
    .values({
      blockerId: self.id,
      blockingId: otherUser.id,
    })
    .returning();

  const blockRecordWithUsers = await db.query.block.findFirst({
    where: and(
      eq(block.blockerId, insertBlocked.blockerId),
      eq(block.blockingId, insertBlocked.blockingId),
    ),
    with: { blocking: true },
  });

  if (!blockRecordWithUsers) {
    throw new Error('Something went wrong');
  }

  return blockRecordWithUsers;
};

export const unblockUser = async (id: string) => {
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
    throw new Error('Cannot unblock yourself');
  }

  const existingBlock = await db.query.block.findFirst({
    where: and(
      eq(block.blockerId, self.id),
      eq(block.blockingId, otherUser.id),
    ),
    with: { blocking: true },
  });

  if (!existingBlock) {
    throw new Error('Not blocking');
  }

  await db
    .delete(block)
    .where(
      and(eq(block.blockerId, self.id), eq(block.blockingId, otherUser.id)),
    )
    .execute();

  return existingBlock;
};

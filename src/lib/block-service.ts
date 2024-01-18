import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { block, users } from '@/db/schema';
import { getSelf } from '@/lib/auth-service';

export const isBlockedUser = async (id: string) => {
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
        eq(block.blockedId, otherUser.id),
      ),
    });

    // Return true if record exists, false otherwise
    return !!blockRecord;
  } catch (err: any) {
    return false;
  }
};

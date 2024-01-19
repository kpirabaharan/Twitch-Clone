import { and, asc, eq, ne, notInArray } from 'drizzle-orm';

import { db } from '@/db';
import { block, follow, users } from '@/db/schema';
import { User } from '@/db/types';
import { getSelf } from '@/lib/auth-service';
import { union } from 'drizzle-orm/pg-core';

export const getRecommended = async () => {
  const self = await getSelf();

  let recommended: User[] = [];

  if (!self) {
    recommended = await db.query.users.findMany({
      orderBy: [asc(users.createdAt)],
    });
  } else {
    // Related Queries using notInArray
    recommended = await db.query.users.findMany({
      where: and(
        ne(users.id, self.id),
        notInArray(
          users.id,
          union(
            db
              .select({ id: follow.followingId })
              .from(follow)
              .where(eq(follow.followerId, self.id)),
            db
              .select({ id: block.blockingId })
              .from(block)
              .where(eq(block.blockerId, self.id)),
          ),
        ),
      ),
    });
  }

  return recommended;
};

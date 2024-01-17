import { and, asc, eq, ne, notInArray } from 'drizzle-orm';

import { db } from '@/db';
import { follow, users } from '@/db/schema';
import { User } from '@/db/types';
import { getSelf } from '@/lib/auth-service';

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
          db
            .select({ id: follow.followingId })
            .from(follow)
            .where(eq(follow.followerId, self.id)),
        ),
      ),
    });
  }

  return recommended;
};

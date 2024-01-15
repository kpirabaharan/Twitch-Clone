import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.externalId, self.id),
  });

  if (!user) {
    return null;
  }

  return user;
};

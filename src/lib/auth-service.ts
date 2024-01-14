'use server';

import { currentUser } from '@clerk/nextjs';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error('Unauthorized');
  }

  const user = await db.query.users.findFirst({
    where: eq(users.externalId, self.id),
  });

  if (!user) {
    throw new Error('Not found');
  }

  return user;
};

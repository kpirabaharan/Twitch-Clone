import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';

export const getUserByUsername = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) {
    return null;
  }

  return user;
};

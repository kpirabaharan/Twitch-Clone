import { asc, ne } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';
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
    recommended = await db.query.users.findMany({
      where: ne(users.id, self.id),
      orderBy: [asc(users.createdAt)],
    });
  }

  return recommended;
};
9;

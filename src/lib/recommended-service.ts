import { asc, ne } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';
import { getSelf } from '@/lib/auth-service';

export const getRecommended = async () => {
  const self = await getSelf();

  const recommended = await db.query.users.findMany({
    // where: ne(users.id, self.id),
    orderBy: [asc(users.createdAt)],
  });

  return recommended;
};
9;

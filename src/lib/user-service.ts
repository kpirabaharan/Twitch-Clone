import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { users } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';

export const getUserByUsername = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) {
    return null;
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  try {
    const self = await currentUser();

    if (!self || !self.username) {
      throw new Error('Unauthorized');
    }

    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (self.username !== user.username) {
      throw new Error('Unauthorized');
    }

    return user;
  } catch (err) {
    redirect('/');
  }
};

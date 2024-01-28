import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { stream } from '@/db/schema';
import { getSelf } from './auth-service';

export const getSelfStream = async () => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error('Unauthorized');
    }

    const userStream = await db.query.stream.findFirst({
      where: eq(stream.streamerId, self.id),
    });

    if (!userStream) {
      throw new Error('Stream not found');
    }

    return userStream;
  } catch (err: any) {
    console.log(`Stream: ${err.message}`);
    throw new Error(err.message);
  }
};

export const getStreamByUserId = async (id: string) => {
  const userStream = await db.query.stream.findFirst({
    where: eq(stream.streamerId, id),
  });

  if (!userStream) {
    throw new Error('Stream not found');
  }

  return userStream;
};

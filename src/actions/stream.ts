'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { stream } from '@/db/schema';
import type { Stream } from '@/db/types';
import { getSelf } from '@/lib/auth-service';

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error('Unauthorized');
    }

    const selfStream = await db.query.stream.findFirst({
      where: eq(stream.streamerId, self.id),
      columns: { id: true },
    });

    if (!selfStream) {
      throw new Error('Stream not found');
    }

    const validData = {
      name: values.name,
      thumbnailUrl: values.thumbnailUrl,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const updatedStream = await db
      .update(stream)
      .set({ ...validData })
      .where(eq(stream.id, selfStream.id))
      .returning();

    // revalidatePath(`/u/${self.username}`, 'layout');

    return { updatedStream, message: 'Chat settings updated' };
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};

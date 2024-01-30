'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { chat, stream } from '@/db/schema';
import { revalidatePath } from 'next/cache';

interface ChatMessageInput {
  streamId: string;
  viewerName: string;
  message: string;
}

export const sendMessage = async ({
  streamId,
  viewerName,
  message,
}: ChatMessageInput) => {
  try {
    const userStream = await db.query.stream.findFirst({
      where: eq(stream.id, streamId),
      with: { streamer: { columns: { username: true } } },
      columns: { id: true },
    });

    if (!userStream) {
      throw new Error('Stream not found');
    }

    const chatMessage = await db
      .insert(chat)
      .values({
        streamId,
        viewerName,
        message,
      })
      .returning();

    revalidatePath(`/u/${userStream.streamer.username}/stream`);
    revalidatePath(`/${userStream.streamer.username}`);

    return { chatMessage, message: 'Message sent' };
  } catch (err: any) {
    console.log(err.message);
    throw new Error('Something went wrong!');
  }
};

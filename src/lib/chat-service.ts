import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { chat, stream } from '@/db/schema';

export const getChatByStreamId = async (id: string) => {
  try {
    const userStream = await db.query.stream.findFirst({
      where: eq(stream.id, id),
    });

    if (!userStream) {
      throw new Error('Stream not found');
    }

    const chatMessages = await db.query.chat.findMany({
      where: eq(chat.streamId, id),
      orderBy: [desc(chat.createdAt)],
    });

    if (!chatMessages) {
      throw new Error('Chat messages not found');
    }

    return chatMessages;
  } catch (err: any) {
    console.log(`Chat: ${err.message}`);
    throw new Error(err.message);
  }
};

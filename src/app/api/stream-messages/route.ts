import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { chat, stream } from '@/db/schema';
import { ChatMessage } from '@/db/types';

const MESSAGES_BATCH = 10;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const cursor = searchParams.get('cursor');
  const streamId = searchParams.get('streamId');

  if (!streamId) {
    return NextResponse.json('Stream ID is required', { status: 400 });
  }

  const existingStream = await db.query.stream.findFirst({
    where: eq(stream.id, streamId as string),
  });

  if (!existingStream) {
    return NextResponse.json('Stream not found', { status: 404 });
  }

  let messages: ChatMessage[] = [];
  let nextCursor: number | null = null;

  if (cursor) {
    const offset = parseInt(cursor, 10);
    messages = await db.query.chat.findMany({
      where: eq(chat.streamId, streamId as string),
      limit: MESSAGES_BATCH,
      offset,
      orderBy: [desc(chat.createdAt)],
    });

    nextCursor =
      messages.length === MESSAGES_BATCH ? offset + MESSAGES_BATCH : null;
  } else {
    messages = await db.query.chat.findMany({
      where: eq(chat.streamId, streamId as string),
      limit: MESSAGES_BATCH,
      orderBy: [desc(chat.createdAt)],
    });

    nextCursor = MESSAGES_BATCH;
  }

  return NextResponse.json({
    items: messages,
    nextCursor,
  });
};

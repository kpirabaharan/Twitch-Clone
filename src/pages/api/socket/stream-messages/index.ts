import { eq } from 'drizzle-orm';
import { NextApiRequest } from 'next';

import { db } from '@/db';
import { chat, stream } from '@/db/schema';
import { NextApiResponseServerIO } from '@/types';

interface ReqBody {
  viewerName: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { viewerName, message }: ReqBody = req.body;
    const { streamId } = req.query;

    // VALIDATE REQUEST
    if (!streamId) {
      return res.status(400).json({ error: 'Stream Id missing' });
    }
    if (!viewerName) {
      return res.status(400).json({ error: 'Viewer Name missing' });
    }
    if (!message) {
      return res.status(400).json({ error: 'Message missing' });
    }

    // VALIDATE STREAM
    const userStream = await db.query.stream.findFirst({
      where: eq(stream.id, streamId as string),
      columns: { id: true },
    });

    if (!userStream) {
      return res.status(404).json({ error: 'Stream not found' });
    }

    // INSERT MESSAGE TO DATABASE
    const [chatMessage] = await db
      .insert(chat)
      .values({
        streamId: userStream.id,
        viewerName,
        message,
      })
      .returning();

    // EMIT MESSAGE TO ALL CLIENTS
    const streamChannelKey = `stream-${userStream.id}`;
    res.socket.server.io.emit(streamChannelKey, chatMessage);

    return res.status(200).json(chatMessage);
  } catch (err) {
    console.log('MESSAGE ERROR:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

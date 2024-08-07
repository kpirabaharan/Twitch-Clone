import { eq } from 'drizzle-orm';
import { WebhookReceiver } from 'livekit-server-sdk';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { chat, stream, users } from '@/db/schema';
import { revalidatePath } from 'next/cache';

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_SECRET_KEY,
);

export const POST = async (req: Request) => {
  const body = await req.text();

  const headerPayload = headers();
  const authorization = headerPayload.get('Authorization');

  if (!authorization) {
    return new Response('No authorization header', {
      status: 400,
    });
  }

  const event = receiver.receive(body, authorization);

  switch (event.event) {
    case 'ingress_started': {
      if (event.ingressInfo?.ingressId) {
        const [streamer] = await db
          .update(stream)
          .set({
            isLive: true,
          })
          .where(eq(stream.ingressId, event.ingressInfo.ingressId))
          .returning({ userId: stream.streamerId });

        const user = await db.query.users.findFirst({
          where: eq(users.id, streamer.userId),
        });

        if (user) {
          console.log({ livekit_webhook: `${user.username} went live` });
          revalidatePath(`/`);
          revalidatePath(`/${user.username}`);
        }
      }
      break;
    }
    case 'ingress_ended': {
      if (event.ingressInfo?.ingressId) {
        const [streamer] = await db
          .update(stream)
          .set({
            isLive: false,
          })
          .where(eq(stream.ingressId, event.ingressInfo.ingressId))
          .returning();

        const user = await db.query.users.findFirst({
          where: eq(users.id, streamer.streamerId),
        });

        if (streamer.isChatRefreshed) {
          await db.delete(chat).where(eq(chat.streamId, streamer.id));
        }

        if (user) {
          console.log({ livekit_webhook: `${user.username} ended stream` });
          revalidatePath(`/`);
          revalidatePath(`/${user.username}`);
        }
      }
      break;
    }
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
};

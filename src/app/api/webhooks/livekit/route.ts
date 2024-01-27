import { eq } from 'drizzle-orm';
import { WebhookReceiver } from 'livekit-server-sdk';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { stream } from '@/db/schema';

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
      if (event.ingressInfo?.ingressId)
        await db
          .update(stream)
          .set({
            isLive: true,
          })
          .where(eq(stream.ingressId, event.ingressInfo.ingressId));
    }
    case 'ingress_ended': {
      if (event.ingressInfo?.ingressId)
        await db
          .update(stream)
          .set({
            isLive: false,
          })
          .where(eq(stream.ingressId, event.ingressInfo.ingressId));
    }
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
};

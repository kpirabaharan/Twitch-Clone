import { db } from '@/db';
import { users } from '@/db/schema';
import { WebhookEvent } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const event = (await req.json()) as WebhookEvent;

  switch (event.type) {
    case 'user.created': {
      const externalId = event.data.id;
      const username = event.data.username!;
      const imageUrl = event.data.image_url;

      await db
        .insert(users)
        .values({
          username,
          externalId,
          imageUrl,
        })
        .execute();

      break;
    }
    case 'user.updated': {
      const externalId = event.data.id;
      const username = event.data.username!;
      const imageUrl = event.data.image_url;

      await db
        .update(users)
        .set({ externalId, username, imageUrl })
        .where(eq(users.externalId, externalId))
        .execute();

      break;
    }
    case 'user.deleted': {
      const externalId = event.data.id!;

      await db.delete(users).where(eq(users.externalId, externalId)).execute();

      break;
    }
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
};

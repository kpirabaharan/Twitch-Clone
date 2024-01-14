import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('user_name').unique().notNull(),
  imageUrl: text('image_url').notNull(),
  externalId: text('external_id').unique().notNull(),
  bio: text('bio'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

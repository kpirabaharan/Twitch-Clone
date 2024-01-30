import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('user_name').unique().notNull(),
  imageUrl: text('image_url').notNull(),
  externalId: text('external_id').unique().notNull(),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userRelations = relations(users, ({ one, many }) => ({
  following: many(follow, { relationName: 'following' }),
  followedBy: many(follow, { relationName: 'followedBy' }),
  blocking: many(block, { relationName: 'blocking' }),
  blockedBy: many(block, { relationName: 'blockedBy' }),
  stream: one(stream),
}));

export const follow = pgTable(
  'follow',
  {
    // Self
    followerId: uuid('follower_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // Other user
    followingId: uuid('following_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      pk: primaryKey({
        name: 'follow_unique',
        columns: [table.followerId, table.followingId],
      }),
      followerIndex: index('follower_index').on(table.followerId),
      followingIndex: index('following_index').on(table.followingId),
    };
  },
);

export const followRelations = relations(follow, ({ one }) => ({
  follower: one(users, {
    fields: [follow.followerId],
    references: [users.id],
    relationName: 'following',
  }),
  following: one(users, {
    fields: [follow.followingId],
    references: [users.id],
    relationName: 'followedBy',
  }),
}));

export const block = pgTable(
  'block',
  {
    // Self
    blockerId: uuid('blocker_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // Other user
    blockingId: uuid('blocked_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      pk: primaryKey({
        name: 'block_unique',
        columns: [table.blockerId, table.blockingId],
      }),
      blockerIndex: index('blocker_index').on(table.blockerId),
      blockingIndex: index('blocking_index').on(table.blockingId),
    };
  },
);

export const blockRelations = relations(block, ({ one }) => ({
  blocker: one(users, {
    fields: [block.blockerId],
    references: [users.id],
    relationName: 'blocking',
  }),
  blocking: one(users, {
    fields: [block.blockingId],
    references: [users.id],
    relationName: 'blockedBy',
  }),
}));

export const stream = pgTable(
  'stream',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    category: text('category'),
    streamerId: uuid('streamer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    thumbnailUrl: text('thumbnail_url'),

    ingressId: text('ingress_id').unique(),
    serverUrl: text('server_url').unique(),
    streamKey: text('stream_key').unique(),

    isLive: boolean('is_live').default(false).notNull(),
    isChatEnabled: boolean('is_chat_enabled').default(true).notNull(),
    isChatDelayed: boolean('is_chat_delayed').default(false).notNull(),
    isChatFollowersOnly: boolean('is_chat_followers_only')
      .default(false)
      .notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      streamerIndex: index('streamer_index').on(table.streamerId),
      ingressIndex: index('ingress_index').on(table.ingressId),
    };
  },
);

export const streamRelations = relations(stream, ({ one, many }) => ({
  streamer: one(users, { fields: [stream.streamerId], references: [users.id] }),
  chatMessages: many(chat),
}));

export const chat = pgTable('chat', {
  id: uuid('id').defaultRandom().primaryKey(),
  streamId: uuid('stream_id')
    .notNull()
    .references(() => stream.id, { onDelete: 'cascade' }),
  viewerName: text('viewer_name').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const chatRelations = relations(chat, ({ one }) => ({
  stream: one(stream, { fields: [chat.streamId], references: [stream.id] }),
}));

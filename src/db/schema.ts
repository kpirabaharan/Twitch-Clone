import { relations } from 'drizzle-orm';
import {
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

export const userRelations = relations(users, ({ many }) => ({
  following: many(follow, { relationName: 'following' }),
  followedBy: many(follow, { relationName: 'followedBy' }),
  blocking: many(block, { relationName: 'blocking' }),
  blockedBy: many(block, { relationName: 'blockedBy' }),
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
    blockedId: uuid('blocked_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      pk: primaryKey({
        name: 'block_unique',
        columns: [table.blockerId, table.blockedId],
      }),
      blockerIndex: index('blocker_index').on(table.blockerId),
      blockedIndex: index('blocked_index').on(table.blockedId),
    };
  },
);

export const blockRelations = relations(block, ({ one }) => ({
  blocker: one(users, {
    fields: [block.blockerId],
    references: [users.id],
    relationName: 'blocking',
  }),
  blocked: one(users, {
    fields: [block.blockedId],
    references: [users.id],
    relationName: 'blockedBy',
  }),
}));

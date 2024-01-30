import { InferSelectModel } from 'drizzle-orm';

import { block, chat, follow, stream, users } from '@/db/schema';

export type User = InferSelectModel<typeof users>;

export type Follow = InferSelectModel<typeof follow>;

export type Block = InferSelectModel<typeof block>;

export type Stream = InferSelectModel<typeof stream>;

export type ChatMessage = InferSelectModel<typeof chat>;

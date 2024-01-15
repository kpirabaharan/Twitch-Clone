import { InferSelectModel } from 'drizzle-orm';

import { follow, users } from '@/db/schema';

export type User = InferSelectModel<typeof users>;

export type Follow = InferSelectModel<typeof follow>;

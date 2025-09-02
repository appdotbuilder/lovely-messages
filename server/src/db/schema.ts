import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const loveMessagesTable = pgTable('love_messages', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  category: text('category').notNull().default('general'),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript type for the table schema
export type LoveMessage = typeof loveMessagesTable.$inferSelect; // For SELECT operations
export type NewLoveMessage = typeof loveMessagesTable.$inferInsert; // For INSERT operations

// Important: Export all tables for proper query building
export const tables = { loveMessages: loveMessagesTable };
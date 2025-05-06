// drizzle/schema.ts
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

// Columns table
export const columns = pgTable('columns', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tasks table
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  columnId: integer('column_id')
    .notNull()
    .references(() => columns.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

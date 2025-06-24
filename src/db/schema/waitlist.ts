import { pgTable } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", (t) => ({
  id: t.serial().primaryKey().notNull(),
  email: t.text().unique().notNull(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));

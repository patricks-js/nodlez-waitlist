import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const waitlist = pgTable("waitlist", (t) => ({
  id: t.serial().primaryKey().notNull(),
  email: t.text().unique().notNull(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));

export const waitlistInsertSchema = createInsertSchema(waitlist, {
  email: z.email(),
});

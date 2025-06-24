import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const interestReason = ["student", "project", "both"] as const;

export const interestReasonEnum = pgEnum("interest_reason", interestReason);

export const waitlist = pgTable("waitlist", (t) => ({
  id: t.serial().primaryKey().notNull(),
  name: t.text().notNull(),
  email: t.text().unique().notNull(),
  interestReason: interestReasonEnum().default("student").notNull(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));

export const waitlistInsertSchema = createInsertSchema(waitlist, {
  email: z.email(),
});

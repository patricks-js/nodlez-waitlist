import { createServerFn } from "@tanstack/react-start";
import { count, eq } from "drizzle-orm";
import { db } from "./db";
import { waitlist, waitlistInsertSchema } from "./db/schema/waitlist";

export const getWaitlistCount = createServerFn({
  method: "GET",
}).handler(async () => {
  const [result] = await db
    .select({ count: count(waitlist.email) })
    .from(waitlist);

  return result?.count || 0;
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .validator(waitlistInsertSchema)
  .handler(async ({ data }) => {
    const [emailAlreadyJoined] = await db
      .select({ id: waitlist.id })
      .from(waitlist)
      .where(eq(waitlist.email, data.email));
    if (emailAlreadyJoined) throw new Error("Email already joined");

    await db
      .insert(waitlist)
      .values({
        email: data.email,
        name: data.name,
        interestReason: data.interestReason,
      });
  });

import { createServerFn } from "@tanstack/react-start";
import { count, eq } from "drizzle-orm";
import NodlezWaitlistWelcome from "./components/emails/nodlez-waitlist-welcome";
import { db } from "./db";
import { waitlist, waitlistInsertSchema } from "./db/schema/waitlist";
import { resend } from "./lib/resend";

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

    const [joinedUser] = await db
      .insert(waitlist)
      .values({
        email: data.email,
        name: data.name,
        interestReason: data.interestReason,
      })
      .returning({
        name: waitlist.name,
        email: waitlist.email,
      });

    if (!joinedUser) {
      throw new Error("Failed to join waitlist");
    }

    const { data: _mail, error } = await resend.emails.send({
      from: "Nodlez <mail@mail.nodlez.com>",
      to: joinedUser.email,
      subject: "Bem-vindo(a) à Nodlez! Você está na lista! 🎉",
      react: NodlezWaitlistWelcome({ name: joinedUser.name }),
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      throw new Error("Failed to send welcome email");
    }
  });

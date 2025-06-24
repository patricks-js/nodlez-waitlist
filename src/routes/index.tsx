import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { waitlist, waitlistInsertSchema } from "@/db/schema/waitlist";

const getWaitlistCount = createServerFn({
  method: "GET",
}).handler(async () => {
  const [result] = await db
    .select({ count: count(waitlist.email) })
    .from(waitlist);

  return result?.count || 0;
});

const joinWaitlist = createServerFn({ method: "POST" })
  .validator(waitlistInsertSchema)
  .handler(async ({ data }) => {
    const [emailAlreadyJoined] = await db
      .select({ id: waitlist.id })
      .from(waitlist)
      .where(eq(waitlist.email, data.email));
    if (emailAlreadyJoined) throw new Error("Email already joined");

    await db.insert(waitlist).values({ email: data.email });
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getWaitlistCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <button
      type="button"
      onClick={() => {
        joinWaitlist({ data: { email: "" } }).then(() => {
          router.invalidate();
        });
      }}
    >
      Add 1 to {state}?
    </button>
  );
}

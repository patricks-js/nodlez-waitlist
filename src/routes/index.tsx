import { createFileRoute } from "@tanstack/react-router";
import { WaitlistForm } from "@/components/waitlist-form";
import { getWaitlistCount } from "@/functions";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getWaitlistCount(),
});

function Home() {
  const waitlistCount = Route.useLoaderData();
  const peopleCountText = waitlistCount > 1 ? "pessoas" : "pessoa";

  return (
    <div className="mx-auto flex h-dvh max-w-2xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-semibold text-4xl leading-tight tracking-tight">
          A forma inteligente de criar materiais de estudo.
        </h1>
        <h3 className="font-medium text-muted-foreground leading-tight">
          Gere quizzes a partir de textos e revise com flashcards. Entre para a
          lista de espera e seja um dos primeiros a testar.
        </h3>
      </div>
      <WaitlistForm />
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-secondary/10 px-4 py-2">
        <div
          aria-hidden="true"
          className="size-2.5 animate-pulse rounded-full bg-emerald-500"
        />
        <p className="text-center text-muted-foreground text-sm">
          Já estamos com {waitlistCount} {peopleCountText} na lista de espera.
        </p>
      </div>
    </div>
  );
}

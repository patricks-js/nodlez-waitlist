import { createFileRoute } from "@tanstack/react-router";
import { WaitlistForm } from "@/components/waitlist-form";
import { roadmap } from "@/constants/roadmap";
import { getWaitlistCount } from "@/functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getWaitlistCount(),
});

function Home() {
  const waitlistCount = Route.useLoaderData();
  const peopleCountText = waitlistCount > 1 ? "pessoas" : "pessoa";

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center px-4 pt-24 sm:px-6 md:pt-40 lg:px-8">
      <header className="mb-16 text-center">
        <h1 className="font-semibold text-4xl text-primary tracking-wide">
          Nodlez
        </h1>
        <p className="text-muted-foreground">A forma inteligente de estudar.</p>
      </header>

      <div className="flex w-full max-w-xl flex-col gap-12">
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-semibold text-2xl tracking-tight">
              Entre na lista de espera
            </h2>
            <p className="text-muted-foreground leading-snug">
              Tenha acesso antecipado a um ambiente de estudo focado e
              eficiente, projetado para otimizar seu aprendizado.
            </p>
          </div>
          <WaitlistForm />
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <div
              aria-hidden="true"
              className="size-2.5 animate-pulse rounded-full bg-emerald-500"
            />
            <p className="text-sm">
              {waitlistCount} {peopleCountText} na lista de espera.
            </p>
          </div>
        </section>

        <hr className="my-6 border-muted" />

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-foreground tracking-tight">
            Roadmap
          </h2>
          <ul className="space-y-4">
            {roadmap.map((item) => (
              <li key={item.title} className="rounded-md border p-4">
                <h3 className="mb-1 font-medium text-primary">{item.title}</h3>
                <p className="mb-1 text-muted-foreground text-sm">
                  {item.subtitle}
                </p>
                <span
                  className={cn(
                    "font-medium text-xs",
                    item.state === "em progresso" && "text-blue-400",
                    item.state === "em planejamento" &&
                      "text-muted-foreground/80",
                  )}
                >
                  {item.state}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="mt-14 p-8 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} nodlez -{" "}
          <a
            href="mailto:contato@nodlez.com"
            className="text-primary hover:underline"
          >
            contato@nodlez.com
          </a>
        </p>
      </footer>
    </div>
  );
}

import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { z } from "zod/v4";
import type { interestReason } from "@/db/schema/waitlist";
import { joinWaitlist } from "@/functions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <p className="mt-1 text-destructive text-xs">
      {" "}
      {/* Usando text-destructive do Shadcn */}
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.map((e) => e.message).join(", ")}</em>
      ) : null}
    </p>
  );
}

const waitlistFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido").min(1, "Email é obrigatório"),
  interestReason: z.enum(["student", "project", "both"]),
});

export function WaitlistForm() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      interestReason: "student",
    },
    validators: {
      onChange: waitlistFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await joinWaitlist({
          data: {
            name: value.name,
            email: value.email,
            interestReason:
              value.interestReason as (typeof interestReason)[number],
          },
        });

        form.reset();
        router.invalidate();
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Email already joined"
        ) {
          toast.error("Email já registrado na lista!");
          throw error;
        }
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (form.state.isSubmitSuccessful && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        await confetti({
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight,
          },
        });
      }
    })();
  }, [form.state.isSubmitSuccessful]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-full space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field
          name="name"
          children={(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="sr-only">
                Nome
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Seu nome"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="sr-only">
                Email
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="seu@email.com"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
      </div>
      <form.Field
        name="interestReason"
        children={(field) => (
          <div className="space-y-1">
            <Label htmlFor={field.name} className="sr-only">
              Razão de interesse
            </Label>
            <Select
              name={field.name}
              onValueChange={field.handleChange}
              defaultValue={field.state.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Por que você está interessado?" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectItem value="student">Sou estudante</SelectItem>
                  <SelectItem value="project">
                    interessado no projeto
                  </SelectItem>
                  <SelectItem value="both">Ambos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <>
            <Button
              ref={buttonRef}
              type="submit"
              disabled={!canSubmit}
              className="w-full"
            >
              {isSubmitting ? "Entrando..." : "Entrar na lista de espera"}
            </Button>
          </>
        )}
      />
    </form>
  );
}

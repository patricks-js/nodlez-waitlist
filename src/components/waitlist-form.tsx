import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
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
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
    </>
  );
}

export function WaitlistForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      interestReason: "student",
    },
    onSubmit: async ({ value: data }) => {
      // await joinWaitlist({ data });
      router.invalidate();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-full max-w-md space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field
          name="name"
          children={(field) => (
            <div className="space-y-3">
              <Label htmlFor={field.name}>Nome</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="John Doe"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <div className="space-y-3">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="johndoe@email.com"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
      </div>
      <form.Field
        name="interestReason"
        children={(field) => (
          <div className="space-y-3">
            <Label>Por que você está interessado?</Label>
            <Select
              name={field.name}
              onValueChange={field.handleChange}
              defaultValue={field.state.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectItem value="student">Sou estudante</SelectItem>
                  <SelectItem value="project">
                    Interessado no projeto
                  </SelectItem>
                  <SelectItem value="both">Ambos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} className="w-full">
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      />
    </form>
  );
}

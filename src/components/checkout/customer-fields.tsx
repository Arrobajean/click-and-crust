import { TextField } from "@/components/ui/field";
import type { CheckoutValues } from "@/lib/checkout";
import type { FieldErrors } from "@/lib/schemas";

interface CustomerFieldsProps {
  values: CheckoutValues;
  errors: FieldErrors;
  onChange: <K extends keyof CheckoutValues>(field: K, value: CheckoutValues[K]) => void;
}

export function CustomerFields({ values, errors, onChange }: CustomerFieldsProps) {
  return (
    <fieldset className="grid gap-5">
      <legend className="mb-1 font-display text-2xl font-semibold">Tus datos</legend>
      <TextField name="name" label="Nombre" autoComplete="name" value={values.name} error={errors.name} onChange={(event) => onChange("name", event.target.value)} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="phone"
          label="Teléfono"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          hint="Para avisarte si falta algo."
          value={values.phone}
          error={errors.phone}
          onChange={(event) => onChange("phone", event.target.value)}
        />
        <TextField
          name="email"
          label="Correo"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          onChange={(event) => onChange("email", event.target.value)}
        />
      </div>
    </fieldset>
  );
}

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  name: string;
  label: string;
  error?: string;
  hint?: string;
}

const CONTROL =
  "w-full rounded-[var(--radius-field)] border border-line bg-surface px-4 text-ink placeholder:text-muted transition-colors focus-visible:border-ink aria-[invalid=true]:border-danger";

function describedBy(id: string, hint?: string, error?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

function Messages({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </>
  );
}

type TextFieldProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id">;

/** Etiqueta encima, ayuda y error debajo; el id `field-<name>` lo usa el foco al fallar la validación. */
export function TextField({ name, label, error, hint, className = "", ...input }: TextFieldProps) {
  const id = `field-${name}`;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`h-12 ${CONTROL} ${className}`}
        {...input}
      />
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

type TextAreaFieldProps = BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id">;

export function TextAreaField({ name, label, error, hint, className = "", ...input }: TextAreaFieldProps) {
  const id = `field-${name}`;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`min-h-24 py-3 ${CONTROL} ${className}`}
        {...input}
      />
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

type CheckboxFieldProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "type">;

export function CheckboxField({ name, label, error, hint, ...input }: CheckboxFieldProps) {
  const id = `field-${name}`;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm">
        <input
          id={id}
          name={name}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className="mt-0.5 size-5 shrink-0 accent-[var(--accent)]"
          {...input}
        />
        <span>{label}</span>
      </label>
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

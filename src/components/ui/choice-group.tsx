export interface Choice {
  value: string;
  label: string;
  /** Texto secundario (precio, aforo). */
  detail?: string;
  disabled?: boolean;
}

interface ChoiceGroupProps {
  legend: string;
  name: string;
  choices: readonly Choice[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** Clases de la rejilla de opciones. */
  layout?: string;
}

/** Grupo de radios con aspecto de píldora: accesible por teclado y legible sin color. */
export function ChoiceGroup({ legend, name, choices, value, onChange, error, layout = "flex flex-wrap gap-2" }: ChoiceGroupProps) {
  const id = `field-${name}`;

  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className="grid gap-2"
    >
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className={layout}>
        {choices.map((choice) => (
          <label key={choice.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={choice.value}
              checked={choice.value === value}
              disabled={choice.disabled}
              onChange={() => onChange(choice.value)}
              className="peer sr-only"
            />
            <span className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-4 text-[15px] transition-colors hover:border-ink peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--focus)] peer-disabled:cursor-not-allowed peer-disabled:text-muted peer-disabled:line-through peer-disabled:hover:border-line">
              {choice.label}
              {choice.detail && <span className="text-[0.9em] opacity-80 no-underline">{choice.detail}</span>}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

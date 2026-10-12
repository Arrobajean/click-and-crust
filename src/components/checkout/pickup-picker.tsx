import { Button } from "@/components/ui/button";
import { ChoiceGroup } from "@/components/ui/choice-group";
import type { SlotsStatus } from "@/hooks/use-pickup-slots";
import { formatLongDate } from "@/lib/dates";
import type { FieldErrors } from "@/lib/schemas";
import { CAPACITY_PER_SLOT, LEAD_MINUTES } from "@/lib/slots";
import type { Slot } from "@/lib/types";

interface PickupPickerProps {
  dates: readonly string[];
  date: string;
  time: string;
  status: SlotsStatus;
  slots: readonly Slot[];
  slotsError: string;
  errors: FieldErrors;
  onDate: (date: string) => void;
  onTime: (time: string) => void;
  onRetry: () => void;
}

export function PickupPicker({ dates, date, time, status, slots, slotsError, errors, onDate, onTime, onRetry }: PickupPickerProps) {
  return (
    <fieldset className="grid gap-5">
      <legend className="mb-1 font-display text-2xl font-semibold">Recogida</legend>

      <div className="grid gap-2">
        <label htmlFor="field-date" className="text-sm font-medium">
          Día
        </label>
        <select
          id="field-date"
          name="date"
          value={date}
          onChange={(event) => onDate(event.target.value)}
          aria-invalid={errors.date ? true : undefined}
          aria-describedby={errors.date ? "field-date-error" : undefined}
          className="h-12 w-full rounded-[var(--radius-field)] border border-line bg-surface px-4 text-ink focus-visible:border-ink aria-[invalid=true]:border-danger sm:max-w-sm"
        >
          <option value="">Elige un día</option>
          {dates.map((value) => (
            <option key={value} value={value}>
              {formatLongDate(value)}
            </option>
          ))}
        </select>
        <p className="text-sm text-muted">Reserva con al menos {LEAD_MINUTES / 60} horas de antelación.</p>
        {errors.date && (
          <p id="field-date-error" role="alert" className="text-sm text-danger">
            {errors.date}
          </p>
        )}
      </div>

      {status === "idle" && <p className="text-sm text-muted">Elige primero un día para ver las horas libres.</p>}

      {status === "loading" && (
        <div aria-busy="true" aria-label="Cargando franjas" className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="skeleton h-11 rounded-full" />
          ))}
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="grid justify-items-start gap-3 rounded-[var(--radius-field)] border border-danger p-4">
          <p className="text-sm">{slotsError}</p>
          <Button variant="ghost" onClick={onRetry}>
            Reintentar
          </Button>
        </div>
      )}

      {status === "ready" && (
        <ChoiceGroup
          legend="Hora"
          name="time"
          value={time}
          onChange={onTime}
          error={errors.time}
          layout="grid grid-cols-3 gap-2 sm:grid-cols-4"
          choices={slots.map((slot) => ({
            value: slot.time,
            label: slot.time,
            detail: slot.status === "full" ? "completa" : undefined,
            disabled: slot.status !== "available",
          }))}
        />
      )}

      {status === "ready" && <p className="text-sm text-muted">Cada franja admite {CAPACITY_PER_SLOT} pedidos. Las tachadas no están disponibles.</p>}
    </fieldset>
  );
}

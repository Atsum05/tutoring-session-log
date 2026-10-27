"use client";

import { useActionState } from "react";
import { emptyFormState, type FormState } from "@/lib/form-state";

type SessionFormProps = {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
};

const labelClass = "font-mono text-xs uppercase tracking-widest text-faded";
const inputClass =
  "w-full border-0 border-b border-ink/40 bg-transparent px-0 py-2 focus:border-margin focus:outline-none";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1 text-sm text-margin">{messages[0]}</p>;
}

export function SessionForm({ action }: SessionFormProps) {
  const [state, formAction, pending] = useActionState(action, emptyFormState);

  return (
    <form action={formAction} noValidate className="mt-12 space-y-6">
      <h3 className="border-b-4 border-double border-ink pb-2 font-serif text-xl font-semibold">
        Anotar una sesión
      </h3>

      <div>
        <label htmlFor="date" className={labelClass}>Fecha</label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={state.values.date}
          className={inputClass}
        />
        <FieldError messages={state.errors.date} />
      </div>

      <div>
        <label htmlFor="durationMinutes" className={labelClass}>
          Duración (minutos)
        </label>
        <input
          id="durationMinutes"
          name="durationMinutes"
          type="text"
          inputMode="numeric"
          defaultValue={state.values.durationMinutes}
          className={inputClass}
        />
        <FieldError messages={state.errors.durationMinutes} />
      </div>

      <div>
        <label htmlFor="topic" className={labelClass}>Tema</label>
        <input
          id="topic"
          name="topic"
          type="text"
          defaultValue={state.values.topic}
          className={inputClass}
        />
        <FieldError messages={state.errors.topic} />
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>Notas (opcional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={state.values.notes}
          className={inputClass}
        />
        <FieldError messages={state.errors.notes} />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="border-b-2 border-ink pb-1 font-medium transition-colors hover:border-margin hover:text-margin disabled:opacity-50"
        >
          {pending ? "Guardando…" : "Guardar sesión"}
        </button>
        {state.saved && <p className="text-sm text-faded">Sesión guardada.</p>}
      </div>
    </form>
  );
}
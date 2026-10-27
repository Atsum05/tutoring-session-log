import { z } from "zod";

// A regex alone accepts "2026-02-30", so we also check that the day exists.
export function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export const sessionSchema = z.object({
  // Required. Real calendar date, YYYY-MM-DD.
  date: z
    .string()
    .trim()
    .refine(isRealDate, "Usa una fecha válida en formato AAAA-MM-DD"),

  // Arrives as text. Integer from 15 to 180, both ends included.
  durationMinutes: z
    .string()
    .trim()
    .regex(/^\d+$/, "La duración debe ser un número entero")
    .transform(Number)
    .pipe(
      z
        .number()
        .min(15, "La duración mínima es 15 minutos")
        .max(180, "La duración máxima es 180 minutos"),
    ),

  // Required. 1 to 120 characters after trimming.
  topic: z
    .string()
    .trim()
    .min(1, "El tema es obligatorio")
    .max(120, "El tema admite hasta 120 caracteres"),

  // Optional. Up to 500 characters. Missing or blank is stored as null.
  notes: z
    .string()
    .max(500, "Las notas admiten hasta 500 caracteres")
    .optional()
    .transform((value) => (value && value.trim() !== "" ? value : null)),
});

export type SessionInput = z.infer<typeof sessionSchema>;
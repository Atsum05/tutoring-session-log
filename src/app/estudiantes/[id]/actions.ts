"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { emptyFormState, type FormState } from "@/lib/form-state";
import { prisma } from "@/lib/prisma";
import { sessionSchema } from "@/lib/session-schema";

export async function createSession(
  studentId: number,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    date: String(formData.get("date") ?? ""),
    durationMinutes: String(formData.get("durationMinutes") ?? ""),
    topic: String(formData.get("topic") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  };

  const parsed = sessionSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
      saved: false,
    };
  }

  await prisma.session.create({
    data: { studentId, ...parsed.data },
  });

  revalidatePath(`/estudiantes/${studentId}`);
  revalidatePath("/estudiantes");

  return { ...emptyFormState, saved: true };
}
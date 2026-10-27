export type FormState = {
  errors: Partial<Record<string, string[]>>;
  values: {
    date: string;
    durationMinutes: string;
    topic: string;
    notes: string;
  };
  saved: boolean;
};

export const emptyFormState: FormState = {
  errors: {},
  values: { date: "", durationMinutes: "", topic: "", notes: "" },
  saved: false,
};
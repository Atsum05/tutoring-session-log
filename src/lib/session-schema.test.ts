import { sessionSchema } from "./session-schema";

const base = {
  date: "2026-10-15",
  durationMinutes: "60",
  topic: "Fracciones",
  notes: "",
};

describe("sessionSchema", () => {
  it("accepts a valid session, converting the duration and blank notes", () => {
    const result = sessionSchema.safeParse(base);

    expect(result).toMatchObject({
      success: true,
      data: { date: "2026-10-15", durationMinutes: 60, topic: "Fracciones", notes: null },
    });
  });

  it("accepts 15 and 180 minutes and rejects 14 and 181", () => {
    expect(sessionSchema.safeParse({ ...base, durationMinutes: "15" }).success).toBe(true);
    expect(sessionSchema.safeParse({ ...base, durationMinutes: "180" }).success).toBe(true);
    expect(sessionSchema.safeParse({ ...base, durationMinutes: "14" }).success).toBe(false);
    expect(sessionSchema.safeParse({ ...base, durationMinutes: "181" }).success).toBe(false);
  });

  it.each(["30.5", "abc", "", "-20"])("rejects the duration %p", (value) => {
    expect(sessionSchema.safeParse({ ...base, durationMinutes: value }).success).toBe(false);
  });

  it.each(["2026-02-30", "15/10/2026", "", "2026-13-01"])("rejects the date %p", (value) => {
    expect(sessionSchema.safeParse({ ...base, date: value }).success).toBe(false);
  });

  it("accepts 500 characters in notes and rejects 501", () => {
    expect(sessionSchema.safeParse({ ...base, notes: "a".repeat(500) }).success).toBe(true);
    expect(sessionSchema.safeParse({ ...base, notes: "a".repeat(501) }).success).toBe(false);
  });
});
import Link from "next/link";
import { notFound } from "next/navigation";
import { SessionForm } from "@/components/session-form";
import { SessionsList } from "@/components/sessions-list";
import { prisma } from "@/lib/prisma";
import { createSession } from "./actions";

type StudentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudentPage({ params }: StudentPageProps) {
  const { id } = await params;
  const studentId = Number(id);

  if (!Number.isInteger(studentId) || studentId <= 0) {
    notFound();
  }

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      sessions: { orderBy: [{ date: "desc" }, { id: "desc" }] },
    },
  });

  if (!student) {
    notFound();
  }

  const action = createSession.bind(null, student.id);

  return (
    <main>
      <Link
        href="/estudiantes"
        className="font-mono text-xs uppercase tracking-widest text-faded hover:text-margin"
      >
        ← Estudiantes
      </Link>

      <header className="mb-8 mt-4">
        <h2 className="font-serif text-3xl font-semibold">
          {student.firstName} {student.lastName}
        </h2>
        <p className="mt-1 text-faded">
          {student.course} · {student.sessions.length}{" "}
          {student.sessions.length === 1 ? "sesión" : "sesiones"}
        </p>
      </header>

      <SessionsList sessions={student.sessions} />
      <SessionForm action={action} />
    </main>
  );
}
import { StudentsTable } from "@/components/students-table";
import { prisma } from "@/lib/prisma";

export default async function EstudiantesPage() {
  const students = await prisma.student.findMany({
    orderBy: { lastName: "asc" },
    include: { _count: { select: { sessions: true } } },
  });

  const rows = students.map((student) => ({
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    course: student.course,
    sessionCount: student._count.sessions,
  }));

  return (
    <main>
      <header className="mb-6">
        <h2 className="font-serif text-2xl font-semibold">Estudiantes</h2>
        <p className="mt-1 text-sm text-faded">
          Ordenados por apellido. Selecciona un nombre para ver sus sesiones.
        </p>
      </header>
      <StudentsTable students={rows} />
    </main>
  );
}
import Link from "next/link";

export type StudentRow = {
  id: number;
  firstName: string;
  lastName: string;
  course: string;
  sessionCount: number;
};

type StudentsTableProps = {
  students: StudentRow[];
};

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b-4 border-double border-ink font-mono text-xs uppercase tracking-widest text-faded">
          <th scope="col" className="w-12 border-r border-margin/60 py-2 pr-3 text-right">N.º</th>
          <th scope="col" className="py-2 pl-4">Nombre</th>
          <th scope="col" className="py-2">Apellido</th>
          <th scope="col" className="py-2">Curso</th>
          <th scope="col" className="py-2 text-right">Sesiones</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr
            key={student.id}
            className="group animate-ink-in border-b border-rule transition-colors hover:bg-rule/30"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <td className="border-r border-margin/60 py-3 pr-3 text-right font-mono text-sm text-faded transition-colors group-hover:text-margin">
              {String(index + 1).padStart(2, "0")}
            </td>
            <td className="py-3 pl-4">
              <Link href={`/estudiantes/${student.id}`} className="ink-link font-medium">
                {student.firstName}
              </Link>
            </td>
            <td className="py-3">{student.lastName}</td>
            <td className="py-3 text-faded">{student.course}</td>
            <td className="py-3 text-right font-mono text-lg">{student.sessionCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
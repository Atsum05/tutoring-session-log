import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-2xl">
      <p className="animate-ink-in font-mono text-xs uppercase tracking-[0.25em] text-faded">
        Qué es
      </p>
      <h2
        className="mt-2 animate-ink-in font-serif text-3xl font-semibold leading-tight"
        style={{ animationDelay: "80ms" }}
      >
        Un cuaderno para llevar las sesiones de apoyo escolar.
      </h2>

      <div
        className="mt-6 animate-ink-in space-y-4 border-l border-margin/60 pl-6 text-lg leading-relaxed"
        style={{ animationDelay: "160ms" }}
      >
        <p>
          Aquí quien coordina puede ver a cada estudiante, cuántas sesiones
          lleva, y anotar una sesión nueva con su fecha, duración, tema y,
          si hace falta, una nota.
        </p>
      </div>

      <Link
        href="/estudiantes"
        className="mt-10 inline-flex animate-ink-in items-center gap-3 border-b-2 border-ink pb-1 font-medium transition-colors hover:border-margin hover:text-margin"
        style={{ animationDelay: "300ms" }}
      >
        Ver la lista de estudiantes
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
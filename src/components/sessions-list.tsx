import { formatDate, formatDuration } from "@/lib/format";

export type SessionEntry = {
  id: number;
  date: string;
  durationMinutes: number;
  topic: string;
  notes: string | null;
};

type SessionsListProps = {
  sessions: SessionEntry[];
};

export function SessionsList({ sessions }: SessionsListProps) {
  if (sessions.length === 0) {
    return (
      <p className="border-b border-rule py-6 pl-[7.5rem] text-faded italic">
        Todavía no hay sesiones anotadas.
      </p>
    );
  }

  return (
    <ol className="border-t-4 border-double border-ink">
      {sessions.map((session, index) => (
        <li
            key={session.id}
            className="group flex animate-ink-in border-b border-rule"
            style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className="w-28 shrink-0 border-r border-margin/60 py-4 pr-3 text-right font-mono text-sm">
            <time dateTime={session.date}>{formatDate(session.date)}</time>
            <p className="text-xs text-faded">{formatDuration(session.durationMinutes)}</p>
          </div>
          <div className="py-4 pl-4">
            <p className="font-medium">{session.topic}</p>
            {session.notes && (
              <p className="mt-1 text-sm text-faded">{session.notes}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
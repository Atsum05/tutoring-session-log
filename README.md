# Registro de sesiones

![CI](https://github.com/Atsum05/tutoring-session-log/actions/workflows/ci.yml/badge.svg)

> English version: see [below](#english).

Registro pequeño de sesiones de apoyo escolar. Quien coordina puede ver a los estudiantes, cuántas sesiones lleva cada uno, y anotar una sesión nueva (fecha, duración, tema y, si hace falta, una nota) con validación en el servidor.

## Stack

Next.js 16 (App Router), TypeScript (sin `any`), Prisma 7 con SQLite, Zod 4, Jest 30 y Tailwind CSS.

## Puesta en marcha

Requiere Node.js 20 o superior.

```bash
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev
npm test
```

La aplicación queda en http://localhost:3000. No hace falta crear un `.env`: la base de datos se crea en `prisma/dev.db` por defecto (se puede cambiar con la variable `DATABASE_URL`). `npm install` también genera el cliente de Prisma (script `postinstall`).

## Rutas

| Ruta | Qué muestra |
|---|---|
| `/` | Texto breve sobre el registro y un enlace a la lista de estudiantes |
| `/estudiantes` | Nombre, apellido, curso y cantidad de sesiones, ordenados por apellido |
| `/estudiantes/[id]` | Sesiones del estudiante (la más reciente primero) y formulario para anotar una nueva. Responde 404 si el id no existe |

## Pruebas

`npm test` ejecuta 5 tests (11 casos, porque algunos usan `it.each`) sobre el esquema de validación de Zod: sesión válida, límites de duración (15 y 180 se aceptan; 14 y 181 no), duraciones no enteras o vacías, fechas inexistentes o mal formadas, y límite de 500 caracteres en las notas.

## Decisiones

La fecha se guarda como texto `YYYY-MM-DD` (campo `String`): es una fecha de calendario y no un instante, así que se evitan desfases por zona horaria, SQLite no tiene un tipo de fecha nativo y el texto ISO ordena cronológicamente. Las notas vacías o en blanco se guardan como `null`. La duración llega del formulario como texto y se valida con una expresión regular de solo dígitos antes de convertirla a número, de modo que `30.5`, `abc` o un campo vacío fallen con un mensaje claro. El esquema de datos está en `prisma/schema.prisma` y la migración inicial en `prisma/migrations`. La URL de la base tiene un valor por defecto (`file:./prisma/dev.db`) para que el proyecto funcione sin `.env`, y el cliente generado de Prisma (`src/generated`) no se versiona: se crea con `postinstall`. Un id de estudiante no numérico o inexistente responde 404, y las sesiones se ordenan por fecha descendente y, en caso de empate, por id descendente. Se usó Next.js 16 y Prisma 7 en lugar de Next.js 14 porque se indicó que las versiones posteriores eran válidas. La lista muestra las fechas como `dd/mm/aaaa`; el campo del formulario usa el selector nativo del navegador, que muestra el formato según el idioma del navegador y siempre envía `YYYY-MM-DD`.

---

## English

A small registry of school tutoring sessions. The coordinator can see the students, how many sessions each one has, and log a new session (date, duration, topic and, optionally, a note) with server-side validation.

### Stack

Next.js 16 (App Router), TypeScript (no `any`), Prisma 7 with SQLite, Zod 4, Jest 30 and Tailwind CSS.

### Getting started

Requires Node.js 20 or higher.

```bash
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev
npm test
```

The app runs at http://localhost:3000. No `.env` file is needed: the database is created at `prisma/dev.db` by default (it can be changed with the `DATABASE_URL` variable). `npm install` also generates the Prisma client (`postinstall` script).

### Routes

| Route | What it shows |
|---|---|
| `/` | A short text about the registry and a link to the students list |
| `/estudiantes` | First name, last name, course and session count, ordered by last name |
| `/estudiantes/[id]` | The student's sessions (newest first) and a form to log a new one. Returns 404 if the id does not exist |

### Tests

`npm test` runs 5 tests (11 cases, since some use `it.each`) against the Zod validation schema: a valid session, duration limits (15 and 180 are accepted; 14 and 181 are not), non-integer or empty durations, nonexistent or malformed dates, and the 500-character limit on notes.

### Decisions

The date is stored as `YYYY-MM-DD` text (a `String` field): it is a calendar date, not a point in time, so timezone shifts are avoided, SQLite has no native date type, and ISO text sorts chronologically. Empty or blank notes are stored as `null`. The duration arrives from the form as text and is checked with a digits-only regular expression before being converted to a number, so `30.5`, `abc` or an empty field fail with a clear message. The data schema is in `prisma/schema.prisma` and the initial migration in `prisma/migrations`. The database URL has a default value (`file:./prisma/dev.db`) so the project works without a `.env`, and the generated Prisma client (`src/generated`) is not versioned: it is created by `postinstall`. A non-numeric or nonexistent student id returns 404, and sessions are ordered by date descending and, on ties, by id descending. Next.js 16 and Prisma 7 were used instead of Next.js 14 because later versions were said to be acceptable. The list shows dates as `dd/mm/yyyy`; the form field uses the browser's native date picker, which displays the format according to the browser's language and always submits `YYYY-MM-DD`.
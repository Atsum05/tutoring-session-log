import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif" });
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Registro de sesiones",
  description: "Registro de sesiones de apoyo escolar",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <div className="mx-auto max-w-4xl px-4 py-10">
          <header className="flex items-end justify-between pb-4">
            <Link href="/" className="animate-ink-in">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-faded">
                Apoyo escolar
              </p>
              <h1 className="font-serif text-4xl font-semibold tracking-tight">
                Registro de sesiones
              </h1>
            </Link>
            <nav>
              <Link href="/estudiantes" className="ink-link text-sm">
                Estudiantes
              </Link>
            </nav>
          </header>
          <div
            aria-hidden="true"
            className="mb-10 h-1.5 origin-left animate-draw-x border-y border-ink"
          />  
          {children}
        </div>
      </body>
    </html>
  );
}

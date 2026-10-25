import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

// que deberia hacer ahora
const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({
        url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
    }),
});

async function main() {
    await prisma.session.deleteMany();
    await prisma.student.deleteMany();

    const ana = await prisma.student.create({
        data: { firstName: "Ana", lastName: "Rojas", course: "5 basico"},
    });
    await prisma.student.create({
        data: { firstName: "Bruno", lastName: "Soto", course: "6 basico"},
    });
    await prisma.student.create({
        data: { firstName: "Carla", lastName: "Diaz", course: "1 medio"},
    });
    await prisma.student.create({
        data: { firstName: "Diego", lastName: "Munoz", course: "2 medio" },
    });
    const elena = await prisma.student.create({
        data: { firstName: "Elena", lastName: "Fuentes", course: "7 basico"},
    });

    await prisma.session.createMany({
        data: [
            { studentId: ana.id, date: "2026-10-15", durationMinutes: 60, topic: "Fracciones"},
            { studentId: elena.id, date: "2026-10-02", durationMinutes: 45, topic: "Comprension lectora"},
        ]
    })
};

main().catch( (e) => {
    console.error(e);
    process.exit(1);
}).finally(() => prisma.$disconnect());
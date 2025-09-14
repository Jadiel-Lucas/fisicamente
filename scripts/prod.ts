import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
//@ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database...");

        // Apaga tudo antes
        await Promise.all([
            db.delete(schema.userProgress),
            db.delete(schema.challenges),
            db.delete(schema.units),
            db.delete(schema.lessons),
            db.delete(schema.courses),
            db.delete(schema.challengeOptions),
            db.delete(schema.userSubscription),
        ]);

        // Cria os cursos
        const courses = await db.insert(schema.courses).values([
            { title: "Física", imageSrc: "/fisica_centrada.svg" },
        ]).returning();

        for (const course of courses) {
            // ⚠️ Aqui estava o erro: você tinha uma vírgula fora do lugar
            const units = await db.insert(schema.units).values([
                {
                    courseId: course.id,
                    title: "Unit 1",
                    description: `Aprenda o básico da ${course.title}`,
                    order: 1,
                },
                {
                    courseId: course.id,
                    title: "Unit 2",
                    description: `Aprenda o intermediário da ${course.title}`,
                    order: 2,
                },
            ]).returning();

            for (const unit of units) {
                const lessons = await db.insert(schema.lessons).values([
                    { unitId: unit.id, title: "Força", order: 1 },
                    { unitId: unit.id, title: "Segunda Lei de Newton", order: 2 },
                    { unitId: unit.id, title: "Primeira lei de Ohm", order: 3 },
                    { unitId: unit.id, title: "Princípio de Pascal", order: 4 },
                    { unitId: unit.id, title: "Velocidade média", order: 5 },
                ]).returning();

                for (const lesson of lessons) {
                    const challenges = await db.insert(schema.challenges).values([
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Qual dessas fórmulas se refere à "Segunda lei de Newton"?',
                            order: 1,
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Qual dessas fórmulas se refere à "Primeira lei de Ohm"?',
                            order: 2,
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Qual dessas fórmulas se refere à "Lei da gravitação universal"?',
                            order: 3,
                        },
                    ]).returning();

                    for (const challenge of challenges) {
                        if (challenge.order === 1) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "F = ma",
                                    imageSrc: "/segunda_lei.svg",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "V = RI",
                                    imageSrc: "/primeira_lei_de_ohm.svg",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "F = GMM / r²",
                                    imageSrc: "/lei_da_gravitacao.svg",
                                },
                            ]);
                        }

                        if (challenge.order === 2) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "F = ma",
                                    imageSrc: "/segunda_lei.svg",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "V = RI",
                                    imageSrc: "/primeira_lei_de_ohm.svg",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "F = GMM / r²",
                                    imageSrc: "/lei_da_gravitacao.svg",
                                },
                            ]);
                        }

                        if (challenge.order === 3) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "F = ma",
                                    imageSrc: "/segunda_lei.svg",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "V = RI",
                                    imageSrc: "/primeira_lei_de_ohm.svg",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "F = GMM / r²",
                                    imageSrc: "/lei_da_gravitacao.svg",
                                },
                            ]);
                        }
                    }
                }
            }
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();

import "dotenv/config";
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
                    title: "Cinemática",
                    description: `Aprenda ${course.title}`,
                    order: 1,
                },
                {
                    courseId: course.id,
                    title: "Dinâmica",
                    description: `Aprenda ${course.title}`,
                    order: 2,
                },
            ]).returning();

            for (const unit of units) {
                const lessons = await db.insert(schema.lessons).values([
                    { unitId: unit.id, title: "Ponto material e referencial", order: 1 },
                    { unitId: unit.id, title: "Vetores e operações vetoriais", order: 2 },
                    { unitId: unit.id, title: "Movimento retilíneo uniforme (MRU)", order: 3 },
                    { unitId: unit.id, title: "Movimento uniformemente variado (MUV)", order: 4 },
                    { unitId: unit.id, title: "Movimento circular e movimentos em 2D (lançamentos)", order: 5 },
                ]).returning();

                for (const lesson of lessons) {
                    const challenges = await db.insert(schema.challenges).values([
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: 'Qual opção melhor defini um ponto material?',
                            order: 1,
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: 'Qual opção melhor defini um referencial?',
                            order: 2,
                        },
                        { //SELECT
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: 'Um passageiro está sentado dentro de um ônibus que se move com velocidade constante em uma estrada reta. O que se pode afirmar sobre o estado de movimento do passageiro?',
                            order: 3,
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: 'Um carrossel gira com velocidade angular constante. Uma criança sentada em um dos cavalos está:',
                            order: 4,
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: 'Dois carros, A e B, movem-se na mesma direção e no mesmo sentido em uma estrada. O carro A está a 80 km/h e o carro B a 100 km/h. Para um observador no carro A, qual é o estado de movimento do carro B?',
                            order: 5,
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: 'Um trem de 200 metros de comprimento atravessa uma ponte de 500 metros. Em que situação o trem pode ser considerado um ponto material?',
                            order: 6,
                        },

                    ]).returning();

                    for (const challenge of challenges) {
                        if (challenge.order === 1) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Qualquer objeto que não possui massa",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "Um corpo cujas dimensões podem ser desprezadas em comparação com as distâncias envolvidas na situação.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Um objeto que é pequeno, como um grão de areia.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Um corpo que não pode sofrer rotação.",
                                },
                            ]);
                        }

                        if (challenge.order === 2) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "É a trajetória descrita por um corpo em movimento.",
                                    //imageSrc: "/segunda_lei.svg",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "É um ponto ou conjunto de pontos em relação ao qual se descreve o movimento ou repouso de um corpo.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "É a velocidade de um corpo em relação a outro.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "É o mesmo que ponto material.",
                                },
                            ]);
                        }

                        if (challenge.order === 3) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Ele está em movimento em relação a si mesmo.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Ele está em movimento em relação ao motorista do ônibus.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Ele está em repouso em relação a um poste na beira da estrada.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "Ele está em repouso em relação ao ônibus.",
                                },
                            ]);
                        }

                        if (challenge.order === 4) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Em repouso em relação ao centro do carrossel.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Em movimento retilíneo uniforme em relação ao solo.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Em movimento e em repouso ao mesmo tempo, em qualquer referencial.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "Em repouso em relação ao cavalo em que está sentada.",
                                },
                            ]);
                        }

                        if (challenge.order === 5) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "O carro B está se aproximando a 20 km/h.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "O carro B está em repouso.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "O carro B está se afastando a 20 km/h.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "O carro B está se afastando a 180 km/h.",
                                },
                            ]);
                        }

                        if (challenge.order === 6) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Em nenhuma situação, pois o trem tem 200 metros.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Ao calcular o tempo que o trem leva para atravessar a ponte.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "Ao calcular a distância total percorrida de uma cidade para outra.",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "Ao verificar se o último vagão já saiu da ponte.",
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

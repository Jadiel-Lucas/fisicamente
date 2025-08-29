import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async() => {
    try {
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Física",
                imageSrc: "/fisica_centrada.svg",
            },
        ]);

        await db.insert(schema.units).values([ // BASICAMENTE É AQUI ONDE VAMOS ADICIOAR AS UNIDADES
            {
                id: 1,
                courseId: 1, // física
                title: "Unit 1",
                description: "Learn the basics of physics",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Unidades de medida", //exemplo, tem que ver ainda
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Unidades de medida 2", //exemplo, tem que ver ainda
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Unidades de medida 3", //exemplo, tem que ver ainda
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Unidades de medida 4", //exemplo, tem que ver ainda
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Unidades de medida 5", //exemplo, tem que ver ainda
            },
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Qual desses é a "Segunda lei de Newton"',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/segunda_lei.svg",
                correct: true,
                text: "F = MA",
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/lei_da_gravitacao.svg",
                correct: false,
                text: "F = GMM/r²",
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/primeira_lei_de_ohm.svg",
                correct: false,
                text: "V = RI",
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();
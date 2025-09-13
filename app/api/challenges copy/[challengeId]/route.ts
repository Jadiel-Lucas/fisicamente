import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    { params }: { params: { challengeId: number } },
) => {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.query.challenges.findFirst({
        where: eq(challenges.id, params.challengeId),
    });

    if (!data) {
        return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    { params }: { params: { challengeId: number } },
) => {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(challenges).set({
        ...body,
    }).where(eq(challenges.id, params.challengeId)).returning();

    if (!data.length) {
        return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: { challengeId: number } },
) => {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.delete(challenges)
        .where(eq(challenges.id, params.challengeId)).returning();

    if (!data.length) {
        return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(data[0]);
};





/*import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    { params }: { params: { lessonId: number } },
) => {

    const isAdmin = await getIsAdmin();

    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(lessons).set({
        ...body,
    }).where(eq(lessons.id, params.lessonId)).returning();

    return NextResponse.json(data[0]);
};


export const DELETE = async (
    req: Request,
    { params }: { params: { lessonId: number } },
) => {
    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.delete(lessons)
        .where(eq(lessons.id, params.lessonId)).returning();

    return NextResponse.json(data[0]); //diz que precisa de data[0]
};*/
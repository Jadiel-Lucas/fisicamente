import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
        { params }: { params: { unitId: number } },
) => {

    //diz que precisa disso: const isAdmin = await getIsAdmin();

    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    //diz que precisa disso: const id = Number(params.unitId);

    const data = await db.query.courses.findFirst({
        where: eq(units.id, params.unitId),
    });

    return NextResponse.json(data);
};


export const PUT = async (
    req: Request,
        { params }: { params: { unitId: number } },
) => {
    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(units).set({
        ...body,
    }).where(eq(units.id, params.unitId)).returning();

    return NextResponse.json(data); //diz que precisa de data[0]
};


export const DELETE = async (
    req: Request,
        { params }: { params: { unitId: number } },
) => {
    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.delete(units)
        .where(eq(units.id, params.unitId)).returning();

    return NextResponse.json(data); //diz que precisa de data[0]
};
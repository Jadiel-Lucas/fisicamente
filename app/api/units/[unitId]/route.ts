import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ unitId: string }> },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { unitId } = await params;
  const id = Number(unitId);
  const data = await db.query.units.findFirst({
    where: eq(units.id, id),
  });

  if (!data) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ unitId: string }> },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { unitId } = await params;
  const id = Number(unitId);
  const body = await req.json();

  const data = await db
    .update(units)
    .set({ ...body })
    .where(eq(units.id, id))
    .returning();

  if (!data.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ unitId: string }> },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { unitId } = await params;
  const id = Number(unitId);

  const data = await db
    .delete(units)
    .where(eq(units.id, id))
    .returning();

  if (!data.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(data[0]);
};

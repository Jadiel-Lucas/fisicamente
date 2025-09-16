import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { courseId } = await params;
  const id = Number(courseId);
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, id),
  });

  if (!data) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { courseId } = await params;
  const id = Number(courseId);
  const body = await req.json();

  const data = await db
    .update(courses)
    .set({ ...body })
    .where(eq(courses.id, id))
    .returning();

  if (!data.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { courseId } = await params;
  const id = Number(courseId);

  const data = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning();

  if (!data.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(data[0]);
};

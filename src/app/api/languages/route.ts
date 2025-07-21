import { NextResponse } from "next/server";
import { db } from '@/db/db'
import { courses, userProgress } from '@/db/schema'
import { eq } from 'drizzle-orm';

//import prisma  from "@/lib/prisma";





export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { uuid, coursesId } = body;


    if (!uuid || !coursesId) {
      return NextResponse.json({ error: "Missing uuid or coursesId" }, { status: 400 });
    }
    // todo
    const course = await db
      .select()
      .from(courses)
      .where(eq(courses.courses, coursesId))
      .then(rows => rows[0]);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    //const top = await db.select().from(userProgress).where(eq(userProgress.userId, uuid));
    //console.log(top)


    await db.update(userProgress)
      .set({
        coursesTitle: course.title,
        imageSrc: course.imageSrc,
        courses: course.courses
      })
      .where(eq(userProgress.userId, uuid))



    const userProgressRow = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, uuid))
      .then(rows => rows[0]);

    if (!userProgressRow) {
      return NextResponse.json({ error: "User progress not found" }, { status: 404 });
    }

    const data = {
      coursesTitle: userProgressRow.coursesTitle,
      imageSrc: userProgressRow.imageSrc,
      courses: userProgressRow.courses
    }

    return NextResponse.json({ user_courses: data });

  } catch (error) {
    console.error("Error in POST /courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
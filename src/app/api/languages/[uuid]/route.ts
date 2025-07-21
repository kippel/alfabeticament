import { NextResponse } from "next/server";
import { db } from '@/db/db'
import { courses, userProgress } from '@/db/schema'
import { eq } from 'drizzle-orm';

//import prisma  from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: Promise<{ uuid: string }> }) {
    
    const { uuid } = await params;
    
    try {

        const languages = await db.select().from(courses)

        const userProgressRow = await db
            .select()
            .from(userProgress)
            .where(eq(userProgress.userId, uuid))
            .then(rows => rows[0]);

        if (!userProgressRow) {
            return NextResponse.json(
                { error: 'User progress not found' },
                { status: 404 }
            );
        }

        const data = {
            coursesTitle: userProgressRow.coursesTitle,
            imageSrc: userProgressRow.imageSrc,
            courses: userProgressRow.courses
        }
            
        return NextResponse.json({ languages: languages, user_courses: data });
    
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
};
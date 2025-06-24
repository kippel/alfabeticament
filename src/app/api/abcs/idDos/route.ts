import { NextRequest, NextResponse } from "next/server"

import { db } from '@/db/db'
import { abcDos } from '@/db/schema'
import { eq, and } from 'drizzle-orm';

type Props = {
    id: number;
    number: number;
    number_bar: number;
}


export const POST = async (req: NextRequest) => {
    const body = await req.json();


    const { id, number, number_bar } = body;
    console.log(id, number, number_bar)
    
    const data = await db.select().from(abcDos)
                    .where(and(
                        eq(abcDos.abcDosId, id),
                        eq(abcDos.number, number),
                        eq(abcDos.number_bar, number_bar)
                    )).all();
    console.log(data)

     return NextResponse.json({dos: data});                   

};
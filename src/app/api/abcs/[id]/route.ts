import { NextRequest, NextResponse } from "next/server"

import { db } from '@/db/db'
import { abcUn } from '@/db/schema'
import { eq, and } from 'drizzle-orm';

type Props = {
    id: number;
}


export const GET = async ({id} : Props) => {
    /*
    const abc_un = await db.select().from(abcUn)
                    .where(eq(abcUn.abcUnId, id));
    */
    

    const data = [{
                id: 1,
                abcUnId: 1,
                nom: "Example Name",
                number: 1,
                number_bar: 1
            }]
    console.log(data)

    return NextResponse.json({abc : data});
};
import { NextRequest, NextResponse } from "next/server"

import { db } from '@/db/db'
import { abcUn } from '@/db/schema'
import { eq, and } from 'drizzle-orm';

type Props = {
    params : {
    id: number;
    }
}

// _req: NextRequest, { params }: Params
export const GET = async (_req: NextRequest, { params }: Props) => {
    const { id } = await params;

    console.log(id)
    const data = await db.select().from(abcUn)
                    .where(eq(abcUn.abcUnId, id)).all();
    
    
    /*
    const data = [{
                id: 1,
                abcUnId: 1,
                nom: "Example Name",
                number: 1,
                number_bar: 1
            }]
    */
    console.log(data)
    

    return NextResponse.json({abc : data});
};
import { db } from '@/db/db'
import { abcBar, abcList } from '@/db/schema'
import { eq, and } from 'drizzle-orm';


export const getAbcBar = async () => {
    // TODO
   const abc_bar = await db.select().from(abcBar)
                 .where(eq(abcBar.coursesId, 1));
    
   return abc_bar;              
};

export const getAbcList = async ({id}: { id : number}) => {
    //console.log(id)
    const abc_list = await db.select().from(abcList)
                  .where(and(
                    eq(abcList.coursesId, 1),
                    eq(abcList.abcId, id)
                   ));

    //console.log(abc_list)

    return abc_list;
};

import { getLessonId } from '@/db/abcs/abc_sql';

type PageProps = {
    params: {
        id: number;
  };
}


export default async function LessonIdPage({ params }: PageProps){
    const { id } = await params; 

    const abc_un = await getLessonId({id})
    console.log(abc_un)

    //console.log(id)
    return (
        <div>lesson{id}</div>
    )
}


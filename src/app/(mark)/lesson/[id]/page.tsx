//import { db } from '@/db/db'
//import { abcUn } from '@/db/schema'


import { AbcLesson } from './abc-lesson';


type PageProps = {
    params: {
        id: number;
  };
}


export default async function LessonIdPage({ params }: PageProps){
    const { id } = await params; 
    

    console.log(id)

    //const abc_un = getLessonId({id})
    //console.log(abc_un)


    
    
    
    


    //console.log(id)
    return (
        <div>lesson
        
        <AbcLesson id={id} />
        </div>
    )
}


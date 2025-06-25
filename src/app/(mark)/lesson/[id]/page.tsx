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
    
    //console.log(id)
    return (
        
        
        <AbcLesson id={id} />
    
    )
}


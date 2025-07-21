"use client"

import Courses from './courses'
import { useSession } from "next-auth/react"

const LanguagesPage = () => {
//export default async function LangPage(){
    //const [courses, setCourses] = useC
    //console.log(session, status);
    

    //await getUserProgress();
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold">Languages</h1>
            <Courses />
        
        
        
        </div>
    )
}

export default LanguagesPage;
"use client";
import { Unit } from './unit';
import { DivLesson } from "@/components/div/div-lesson";
import { useAbcBar } from "@/components/update/useBar";
import { LessonButton } from "./lesson-button";

type AbcItem = {
    id: number;
    title: string;
    name: string;
}

function AbcabcPage(){
    
    const {abcBar } = useAbcBar();
    
    
    return (
        <DivLesson text="Abc">
        
            {
                abcBar.map((abc : AbcItem) => (
                    <div key={abc.id}>
                    <Unit 
                     
                     title={abc.title}
                     name={abc.name} />
                    
                    <LessonButton abc_id={abc.id} />
                    </div>
                ))
            }
        </DivLesson>
        
    )
}

export default AbcabcPage;

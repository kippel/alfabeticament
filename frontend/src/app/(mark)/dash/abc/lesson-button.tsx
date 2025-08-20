"use client";
import { ListButton } from './list-button';
import { useAbcList } from "@/components/update/useBar"



type Props = {
    abc_id: number;
}


type AbcItem = {
    id: number;
    title: string;
}

export const LessonButton = ({ abc_id } : Props) => {

    
    const {abcList} = useAbcList({abc_id});
    
    return (
        <div className="flex items-center flex-col relative">
        {
            abcList.map((abc_b : AbcItem, index: number) => (
                <ListButton 
                  key={abc_b.id}
                  abc_id={abc_b.id}
                  title={abc_b.title}
                  index={index} 

                />

            ))

        }
        
        </div>
    )
};
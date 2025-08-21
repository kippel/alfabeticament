"use client"
import { Sounds } from '@/components/lletres/sound';

type Props ={
    lletresLower: string; 
    lletresUpper: string; 
    lletres_blue: string; 
    voice_mp3: string; 
}




export const AbcLesson = ({
     
    lletresLower, 
    lletresUpper, 
    lletres_blue, 
    voice_mp3} : Props) => {
    return (
        <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            {lletresLower}
            {lletresUpper}
            {lletres_blue}
            
            <Sounds voice={voice_mp3} />
        </div>
    )
}
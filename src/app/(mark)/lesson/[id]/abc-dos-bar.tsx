import { useState, useEffect } from 'react'
import axios from "axios";
import Image from 'next/image'
import { Sounds } from '@/components/sounds/sound';

type Props = {
    id: number;
    number: number;
    number_bar: number;
    indexId: boolean;
    setIndexId: (value: boolean) => void;
}

type DosType = {
    id: number;
    abcDosId: number;
    number: number;
    number_bar: number;
    lletres: string;
    voice_mp3: string;
    vocals_images: string;
    indexId: boolean;
    
}



export const AbcDosBar = ({
    id, 
    number, 
    number_bar,
    indexId,
    setIndexId
} : Props) => {

    const [dos, setDos] = useState<DosType | null>(null);
    

    useEffect(() => {
        async function fetchPosts() {
                console.log(id)
                
                const res = await axios.post("/api/abcs/idDos", {
                    id: id,
                    number: number,
                    number_bar: number_bar
                })
                setIndexId(false)
                setDos(res.data.dos[0])
                
        }
    
        fetchPosts()
    }, [id, number, number_bar, setIndexId]);
    
    if (indexId) return "<div>fff</div>"

    const vocals_images = dos?.vocals_images || null
    
    return (
    <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">

            { dos?.vocals_images && (
                <Image
                src={vocals_images}
                width={500}
                height={500}
                alt="Picture of the author"
                className="w-48 h-48 float-left"
                />
            )}


            
            <div className="item-body ">
                <Sounds voice={dos?.voice_mp3} />
              {dos?.lletres}
            </div>
          </div>
    
    );
    
    
    

    

    
    

    
    

    
};
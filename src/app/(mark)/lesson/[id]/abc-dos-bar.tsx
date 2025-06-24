import { useState, useEffect } from 'react'
import axios from "axios";
import Image from 'next/image'

type Props = {
    id: number;
    number: number;
    number_bar: number;
}

type DosType = {
    id: number;
    abcDosId: number;
    number: number;
    number_bar: number;
    lletres: string;
    voice_mp3: string;
    vocals_images: string;
}



export const AbcDosBar = ({id, number, number_bar} : Props) => {

    const [dos, setDos] = useState<DosType | null>();

    useEffect(() => {
        async function fetchPosts() {
                console.log(id)
                
                const res = await axios.post("/api/abcs/idDos", {
                    id: id,
                    number: number,
                    number_bar: number_bar
                })
                
                setDos(res.data.dos[0])

                /*
                const res = await fetch("/api/abcs/idDos",

                )
                const data = await res.json()
                console.log(data.abc)
                setIndex(false)
                setPosts(data.abc)
                setCoute(0)
                */
        }
    
        fetchPosts()
    }, []);
    


    return <>{dos?.lletres}
    {dos?.voice_mp3}

    <Image
      src={dos?.vocals_images}
      width={500}
      height={500}
      alt="Picture of the author"
    />

    
    </>

    
};
"use client";
import { Header } from '@/components/lessons/header';
import { Footer } from '@/components/lessons/footer';
import { DivBar } from '@/components/div/div-lesson';
import { useEffect, useState } from 'react';
import { AbcLesson } from './abc-lesson';
import axios from 'axios';

import { useRouter } from "next/navigation";

type AbcLLetresType = {
    id: number;
    lletres: string;
    lletres_blue: string;
    voice_mp3: string;
    abecedariId: number;
}

type Props = {
    id: number;
}

export const AbecedariLesson = ({ id }: Props) => {

    const [posts, setPosts] = useState<AbcLLetresType[]>([]);
    const [coute, setCoute] = useState<number>(0);
    const [index, setIndex] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        async function fetchPosts() {
            const res = await axios.get(`http://localhost:4000/api/abc/abecedarilletres/${id}`)

            setIndex(false)
            setPosts(res.data.abecedari)
            setCoute(0)
        }

        fetchPosts()
    }, [id]);

    const handleCheck = () => {
        console.log('Button clicked: check performed');
        if (coute + 1 < posts.length){
            setCoute(coute + 1);
        } else{
            router.push('/dash/abecedaris');
        }
        
    };

    const currentPost = posts[coute];

    return (
        <>
        <Header />
        <DivBar>
            {currentPost && (
               <AbcLesson  
                    id={currentPost.id} 
                    lletresLower={currentPost.lletres.toUpperCase()}
                    lletresUpper={currentPost.lletres.toLowerCase() } 
                    lletres_blue={currentPost.lletres_blue} 
                    voice_mp3={currentPost.voice_mp3}
                     
                />

            )}
        </DivBar>
        <Footer onCheck={handleCheck} />
        </>
    )
}
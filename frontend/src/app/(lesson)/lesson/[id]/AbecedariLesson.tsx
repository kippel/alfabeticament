"use client";
import { Header } from '@/components/lessons/header';
import { Footer } from '@/components/lessons/footer';
import { DivBar } from '@/components/div/div-lesson';
import { useEffect, useState } from 'react';
import { AbcLesson } from './abc-lesson';
import axios from 'axios';

import { useRouter } from "next/navigation";
import { useAuth } from '@/components/auth';



type AbcLLetresType = {
    lletres: string;
    lletres_blue: string;
    voice_mp3: string;
    abecedaris_id: number;
    id : number;
}

type Props = {
    id: number;
}

export const AbecedariLesson = ({ id }: Props) => {

    const [posts, setPosts] = useState<AbcLLetresType[]>([]);
    const [coute, setCoute] = useState<number>(0);
    const [index, setIndex] = useState<boolean>(true);

    const [percentage, setPercentage] = useState(0)

    const router = useRouter();

    //const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { data: session} = useAuth();


    useEffect(() => {

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken) return;

        async function fetchPosts() {
            const res = await axios.get(`${backendUrl}/abc/abc_abcedaris/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`, 
                },
            });

            
            setIndex(false)
            setPosts(res.data.get_abc_lletres)
            setCoute(0)
        }

        fetchPosts()
    }, [session, id]);

    

    const handleCheck = () => {
        
        if (coute + 1 < posts.length){
            setCoute(coute + 1);
        } else{
            router.push('/dash/abecedaris');
        }
        
    };

    const currentPost = posts[coute];

    // Calculate percentage based on current progress
    useEffect(() => {
        if (posts.length > 0) {
            const progressPercentage = Math.round(((coute + 1) / posts.length) * 100);
            setPercentage(progressPercentage);
        }
    }, [coute, posts.length]);


    if (index) return <div>Loading...</div>


    return (
        <>
        <Header percentage={percentage} />
        <DivBar>
            {currentPost && (
               <AbcLesson   
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
"use client";
import { Header } from '@/components/lessons/header';
import { DivBar } from '@/components/div/div-lesson';
import { useEffect, useState } from 'react';
import { AbcLesson } from './abc-lesson';
import axios from 'axios';

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

    useEffect(() => {
        async function fetchPosts() {
            console.log(`/api/abc/abecedarilletres/${id}`)
            const res = await axios.get(`http://localhost:4000/api/abc/abecedarilletres/${id}`)
            console.log(res)
            setIndex(false)
            setPosts(res.data.abecedari)
            setCoute(0)
        }

        fetchPosts()
    }, [id]);

    const currentPost = posts[coute];

    return (
        <>
        <Header />
        <DivBar>
            {currentPost && (
               <AbcLesson  
            <p>{currentPost.lletres.toLowerCase()}
            {currentPost.lletres.toUpperCase()}</p>

            )}
        </DivBar>
        </>
    )
}
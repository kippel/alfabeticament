'use client';
import { useState, useEffect } from 'react'
import { AbcDosBar } from './abc-dos-bar';
import axios from "axios";

type AbcUnType = {
    id: number;
    abcUnId: number;
    nom: string;
    number: number;
    number_bar: number;
}

type Props = {
    id: number;
}


export const AbcLesson = ({id} : Props) => {
    
    const [posts, setPosts] = useState<AbcUnType[]>([]);
    const [coute, setCoute] = useState<number>(0);
    const [index, setIndex] = useState(true);

    
    useEffect(() => {
        async function fetchPosts() {
            console.log(`/api/abcs/${id}`)
            const res = await axios.get(`/api/abcs/${id}`)
            //const res = await fetch(`/api/abcs/${id}`)
            //const data = await res.json()
            //console.log(data.abc)
            setIndex(false)
            setPosts(res.data.abc)
            setCoute(0)
        }

        fetchPosts()
    }, []);

    if (index) return <div>Loading...</div>

    return <>{}
        <AbcDosBar
           id={posts[coute].abcUnId} 
           number={posts[coute].number} 
           number_bar={posts[coute].number_bar} 
        />
    
    </>
}
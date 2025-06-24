'use client';
import { useState, useEffect } from 'react'


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

    //const data = await axios.get(`/api/abcs/${id}`)
    //console.log(data)



    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`/api/abcs/${id}`)
            const data = await res.json()
            console.log(data.abc)
            setIndex(false)
            setPosts(data.abc)
            setCoute(0)
        }

        fetchPosts()
    }, []);

    if (index) return <div>Loading...</div>

    return <>{posts[coute].nom}</>
}
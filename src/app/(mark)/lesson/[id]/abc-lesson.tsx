'use client';
import { useState, useEffect } from 'react'
import { AbcDosBar } from './abc-dos-bar';
import axios from "axios";
import { Header } from '@/components/lessons/header';
import { Footer } from '@/components/lessons/footer';

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
    const [indexId, setIndexId] = useState(true);
    
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

    return <>
        
        <Header />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
<AbcDosBar
           id={posts[coute].abcUnId} 
           number={posts[coute].number} 
           number_bar={posts[coute].number_bar} 
           indexId={indexId}
           setIndexId={setIndexId}
        />
        
       



                </div>
            </div>


        </div>
        <Footer />
        
    </>
}
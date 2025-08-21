'use client';
import { useState, useEffect } from 'react'
import { AbcDosBar } from './abc-dos-bar';
import axios from "axios";
import { Header } from '@/components/lessons/header';
import { Footer } from '@/components/lessons/footer';

import { useRouter } from "next/navigation";
import { useAuth } from '@/components/auth';



type AbcUnType = {
    id: number;
    abc_un_id: number;
    nom: string;
    number: number;
    number_bar: number;
    courses: string;
}

type Props = {
    abc_un: number;
}


export const AbcList = ({ abc_un }: Props) => {

    const [posts, setPosts] = useState<AbcUnType[]>([]);
    const [coute, setCoute] = useState<number>(0);
    const [index, setIndex] = useState(true);
    const [indexId, setIndexId] = useState(true);
    const router = useRouter();

    const [percentage, setPercentage] = useState(0)

    const { data: session} = useAuth();

    useEffect(() => {

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken) return;

        async function fetchPosts() {
            console.log(`${backendUrl}/abc/abc_un/${abc_un}`)
            const res = await axios.get(`${backendUrl}/abc/abc_un/${abc_un}`,{
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`, 
                },
            });

            setIndex(false)
            setPosts(res.data.abc_un)
            setCoute(0)
        }

        fetchPosts()
    }, [ abc_un, session]);

    

    const handleCheck = () => {
        console.log('Button clicked: check performed');
        if (coute + 1 < posts.length){
            setCoute(coute + 1);
        } else{
            router.push('/abc/abc');
        }
        
    };

    const headerxCheck = () => {
        router.push('/dash/abecedaris')
    }


    const currentPost = posts[coute];

    // Calculate percentage based on current progress
    useEffect(() => {
        if (posts.length > 0) {
            const progressPercentage = Math.round(((coute + 1) / posts.length) * 100);
            setPercentage(progressPercentage);
        }
    }, [coute, posts.length]);

    if (index) return <div>Loading...</div>

    return <>

        <Header percentage={percentage} headerx={headerxCheck} />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                   {currentPost && (
                   <AbcDosBar
                        abc_dos_id={currentPost.abc_un_id}
                        number={currentPost.number}
                        number_bar={currentPost.number_bar}
                        indexId={indexId}
                        setIndexId={setIndexId}
                    />
                   )}
                </div>
            </div>
        </div>

        <Footer onCheck={handleCheck} />

    </>
}
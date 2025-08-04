"use client";
import Link from 'next/link';
import { useEffect } from "react";
import axios from "axios";
import { useSession } from 'next-auth/react';

function DashPage() {
    //console.log(localStorage.getItem("token"))

    const { data: session } = useSession();
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    useEffect(() => {
        async function fetchPosts() {
            
        
            const res = await axios.get(`${backendUrl}/workouts/red`,  {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`, // <-- Muy importante
                 },
            });
            
      
        }

        fetchPosts();
    }, [backendUrl, session]);


    return (
        <div>dash


            <Link href="/lesson">Lesson</Link>
        </div>
    )
};

export default DashPage;
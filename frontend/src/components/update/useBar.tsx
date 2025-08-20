"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth";

type AbeBarProps = {
  id: number;
  title: string;
  courses: string;
  name: string;
};


export const useAbcBar = () => {
    const [abcBar,setAbcBar] = useState<AbeBarProps[]>([]);
    const { data: session } = useAuth();
    useEffect(() => {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken || !backendUrl) return;

        async function fetchAbecedaris() {
            try {
                const res = await axios.get<{ abc_bar:AbeBarProps[]}>(
                    `${backendUrl}/abc/abc_bar`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    }
                );
                
                setAbcBar(res.data.abc_bar);
            } catch (error) {
                console.error("Error fetching abecedaris:", error);
            } 
            
        }

        fetchAbecedaris();
    }, [session]);

    return { abcBar }

}

type AbcListType = {
    id: number;
    abc_id: number;
    courses: string;
    title: string;
}

export const useAbcList = ({ abc_id}) => {
    const [abcList,setAbcList] = useState<AbcListType[]>([]);
    const { data: session } = useAuth();
    useEffect(() => {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken || !backendUrl) return;

        async function fetchAbecedaris() {
            try {
                const res = await axios.get<{ abc_list:AbcListType[]}>(
                    `${backendUrl}/abc/abc_list/${abc_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    }
                );
                setAbcList(res.data.abc_list);
                
            } catch (error) {
                console.error("Error fetching abecedaris:", error);
            } 
            
        }

        fetchAbecedaris();

    },[session, abc_id]);

    return { abcList }
}
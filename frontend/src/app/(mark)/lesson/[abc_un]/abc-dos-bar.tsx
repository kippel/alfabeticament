import { useState, useEffect } from 'react'
import axios from "axios";

import { Sounds } from '@/components/lletres/sound';
import { LletresLesson } from '@/components/lletres/lletres-lesson';
import { ImagesLesson } from '@/components/lletres/images-lesson';
import { useAuth } from '@/components/auth';

type Props = {
    abc_dos_id: number;
    number: number;
    number_bar: number;
    indexId: boolean;
    setIndexId: (value: boolean) => void;
}

type DosType = {
    id: number;
    abc_dos_id: number;
    number: number;
    number_bar: number;
    lletres: string;
    voice_mp3: string;
    vocals_images: string;
    indexId: boolean;
}

export const AbcDosBar = ({
    abc_dos_id, 
    number, 
    number_bar,
    indexId,
    setIndexId
}: Props) => {

    const [dos, setDos] = useState<DosType | null>(null);
    const { data: session} = useAuth();

    useEffect(() => {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken) return;

        async function fetchPosts() {
            try {
                const res = await axios.post(
                    `${backendUrl}/abc/abc_dos`, 
                    { abc_dos_id, number, number_bar },
                    { headers: { Authorization: `Bearer ${session.accessToken}` } }
                );
                setDos(res.data.abc_dos);
                setIndexId(false);
            } catch (err) {
                console.error("Error carregant abc_dos:", err);
            }
        }

        fetchPosts();
    }, [abc_dos_id, number, number_bar, session, setIndexId]);

    if (indexId) return <div>fff</div>;

    const vocals_images = dos?.vocals_images ?? "";

    return (
        <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <ImagesLesson vocals_images_bar={vocals_images} />
            <div className="item-body">
                <Sounds voice={dos?.voice_mp3} />
                <LletresLesson lletres={dos?.lletres} />
            </div>
        </div>
    );
};


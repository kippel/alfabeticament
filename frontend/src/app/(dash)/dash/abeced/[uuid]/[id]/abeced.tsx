"use client";

import { useEffect, useState } from "react";
import { SoundsOld } from "@/components/lletres/sound-old";
import { DivLesson } from "@/components/div/div-lesson";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

import axios from "axios";

type AbecedLLetresType = {
  voice_mp3: string;
};

type Props = {
  uuid: number;
  id: number;
};

type AbcLLetresType = {
  id: number;
  lletres: string;
  lletres_blue: string;
  voice_mp3: string;
  abecedariId: number;
};

export const AbecedLesson = ({ uuid, id }: Props) => {
  const [posts, setPosts] = useState<AbcLLetresType[]>([]);
  const [index, setIndex] = useState<boolean>(true);
  const [abeced, setAbeced] = useState<AbecedLLetresType>();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(`${backendUrl}/api/abc/abecedlletres/${id}`);

      console.log(res.data.abeced);

      setPosts(res.data.abecedari);
      setAbeced(res.data.abeced[0]);
      setIndex(false);
    }

    fetchPosts();
  }, [backendUrl, id]);

  console.log(id);
  console.log(uuid);
  if (index) return <div>Loading...</div>;

  return (
    <DivLesson text="Abecedari">
      <SoundsOld voice={abeced.voice_mp3} />
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {posts.map((word) => (
          <Card key={word.id}>
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-4">
       
                <div>
                {uuid == 1 && word.lletres}
                {uuid == 2 && word.lletres_blue}
                </div>
                
              <div className="col-span-2 col-end-7">
              <SoundsOld voice={word.voice_mp3} />
              </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DivLesson>
  );
};

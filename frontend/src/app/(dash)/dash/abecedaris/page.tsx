"use client";
import { DivLesson } from "@/components/div/div-lesson";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

type AbecedarisProps = {
  id: number;
  lletres: string;
  abecedariId: string;
};

const paths = [
  (id: string) => `/lesson/${id}`,
  (id: string) => `/dash/abeced/1/${id}`,
  (id: string) => `/dash/abeced/2/${id}`,
];

function AbecedarisPage() {
  const [abc, setAbc] = useState<AbecedarisProps[]>([]);
  const [index, setIndex] = useState<boolean>(true);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function fetchPosts() {
      //console.log(`/api/abcs/)
      const res = await axios.get(`${backendUrl}/api/abc/abecedari`);
      console.log(res.data.abecedari);
      setIndex(false);
      setAbc(res.data.abecedari);
    }

    fetchPosts();
  }, [backendUrl]);

  if (index) return <div>Loading...</div>;

  return (
    <DivLesson text="Abecedari">
      {abc.map((item) => (
        <div key={item.id}>
          {paths.map((pathFn, index) => (
            <div key={index}>
              <Link href={pathFn(item.abecedariId)}>{item.lletres}</Link>
            </div>
          ))}
        </div>
      ))}
    </DivLesson>
  );
}

export default AbecedarisPage;

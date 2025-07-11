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

  const renderList = (title: string, pathPrefix: string) => (
    <>
      <p>{title}</p>
      {abc.map((item) => (
        <div key={item.id}>
          <Link href={`${pathPrefix}/${item.abecedariId}`}>{item.lletres}</Link>
        </div>
      ))}
    </>
  );

  return (
    <DivLesson text="Abecedari">
      {renderList("Abc", "/lesson")}
      {renderList("Abc a b c", "/dash/abeced/1")}
      {renderList("Abc a be ce", "/dash/abeced/2")}
    </DivLesson>
  );
}

export default AbecedarisPage;

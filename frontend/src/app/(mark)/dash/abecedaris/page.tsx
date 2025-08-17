"use client";
import { DivLesson } from "@/components/div/div-lesson";

import Link from "next/link";

import useAbecedaris from "@/components/update/useAbecedaris"



function AbecedarisPage() {
  const { abc, loading } = useAbecedaris();

  if (loading) return <div>Loading...</div>;
  

  const renderList = (title: string, pathPrefix: string) => (
    <>
      <p>{title}</p>
      {abc.map((item) => (
        <div key={item.id}>
          <Link href={`${pathPrefix}/${item.abecedaris_id}`}>{item.lletres}</Link>
        </div>
      ))}
    </>
  );

  return (
    <DivLesson text="Abecedari">
      {renderList("Abc", "/lesson/lesson")}
      
    </DivLesson>
  );
}

export default AbecedarisPage;

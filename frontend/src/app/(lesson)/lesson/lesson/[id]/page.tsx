import { JSX } from "react";
import {AbecedariLesson} from "./AbecedariLesson";

type PageProps = {
    params: {
        id: number;
  };
}


export default async function LessonPage({ params }: PageProps): Promise<JSX.Element> {

  const { id } = await params;
  
  return (

    <AbecedariLesson id={id} />
    
  );
}


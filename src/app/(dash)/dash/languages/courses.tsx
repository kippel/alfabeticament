"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CoursesRed from "./courses-red";
import { useSession } from "next-auth/react"


type LanguagesProp = {
  id: number;
  title: string;
  imageSrc: string;
  courses: string;
};

type UserCoursesType = {
  coursesTitle: string;
  imageSrc: string; 
  courses: string;
};



const Courses = () => {
  const [languages, setLanguages] = useState<LanguagesProp[]>([]);
  const [index, setIndex] = useState<boolean>(true);
  const [userCourses, setUserCourses] = useState<UserCoursesType | null>(null);

  const { data: session } = useSession();
  const backendUrl = process.env.NEXT_PUBLIC_URL;

  //console.log(session)
  //const uuid = 1; 
  const uuid = Number(session?.user?.id);
  //console.log(uuid)

  //const { data: session, status } = useSession();
  useEffect(() => {

    if (!session?.user?.id) return;

    async function fetchPosts() {
      //console.log(`/api/abcs/)
      const uuid = Number(session.user.id);
      const res = await axios.get(`${backendUrl}/api/languages/${uuid}`);
      //console.log(res.data.languages);
      setIndex(false);
      setLanguages(res.data.languages);
      setUserCourses(res.data.user_courses);
      
    }

    fetchPosts();
  }, [backendUrl, session?.user?.id]);

  const onClick = (courses: string) => {
  
    async function red() {
        const res = await axios.post(`${backendUrl}/api/languages`, {coursesId: courses, uuid: session?.user?.id});
        setUserCourses(res.data.user_courses); 
    }
    red();
    //console.log(courses)
       
  };


  if (index) return <div>Loading...</div>;
  
  
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill, minmax(210px, 1fr))] gap-4">
      {languages.map((word) => (
        
          <CoursesRed 
            key={word.id}
            id={word.id}
            title={word.title}
            images={word.imageSrc} 
            courses={word.courses}
            onClick={onClick}
            active={word.courses == userCourses?.courses}
          />
        
      ))}
    </div>
  );
};

export default Courses;

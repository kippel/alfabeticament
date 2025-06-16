import { getCourses } from "@/db/queries";
import { List } from "./list";


const LanguagesPage = async () => {
//export default async function LangPage(){

    //const { data: session, status } = useSession();

    //console.log(session, status);
    const courses = await getCourses();
    //await getUserProgress();
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-gray-200">Languages</h1>
         
        <List
          courses={courses}
          activeCourseId={1}
        />
        
        
        </div>
    )
}

export default LanguagesPage;
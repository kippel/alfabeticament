import { Unit } from './unit'
import { LessonButton } from './lesson-button';
import { getAbcBar } from '@/db/abcs/abc_sql';

type AbcItem = {
    id: number;
    title: string;
    name: string;
}

async function AbcabcPage(){
    
    const abc_bar = await getAbcBar()
    
    
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-gray-200">Abc</h1>
            {
                abc_bar.map((abc : AbcItem) => (
                    <div key={abc.id}>
                    <Unit 
                     
                     title={abc.title}
                     name={abc.name} />
                    
                    <LessonButton id={abc.id} />
                    </div>
                ))
            }

        </div>
    )
}

export default AbcabcPage;

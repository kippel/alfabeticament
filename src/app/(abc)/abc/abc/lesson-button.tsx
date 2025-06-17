import { ListButton } from './list-button';
import { getAbcList } from '@/db/abcs/abc_sql';

type Props = {
    id: number;
}


type AbcItem = {
    id: number;
    title: string;
}

export const LessonButton = async ({ id } : Props) => {

    
    const abc_list = await getAbcList({id})
    
    return (
        <div className="flex items-center flex-col relative">
        {
            abc_list.map((abc_b : AbcItem, index: number) => (
                <ListButton 
                  key={abc_b.id}
                  id={abc_b.id}
                  title={abc_b.title}
                  index={index} 

                />

            ))

        }
        
        </div>
    )
};
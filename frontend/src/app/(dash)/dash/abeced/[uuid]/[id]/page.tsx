//import { useEffect, useState } from 'react';
import { AbecedLesson } from './abeced';

type Props = {
    params : {
        id: number;
        uuid: number;
    }
}



async function AbecedIdPage({ params } : Props){
    const { uuid, id } = await params;
    

    

    return (
        <>
        <AbecedLesson uuid={uuid} id={id} />
        
        </>
    )
}

export default AbecedIdPage;
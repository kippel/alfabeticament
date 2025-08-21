import { JSX } from "react";
import { AbcList } from './abc-list'

type PageProps = {
    params: {
        abc_un: number;
  };
}

export default async function LessonPage({ params }: PageProps): Promise<JSX.Element> {
    const { abc_un } = await params;
    
    return (
        <AbcList abc_un={abc_un} />
    )

}
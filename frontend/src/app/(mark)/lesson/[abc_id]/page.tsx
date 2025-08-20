import { JSX } from "react";
type PageProps = {
    params: {
        abc_id: number;
  };
}

export default async function LessonPage({ params }: PageProps): Promise<JSX.Element> {
    const { abc_id } = await params;
    
    return (
        <>fff{abc_id}</>
    )

}
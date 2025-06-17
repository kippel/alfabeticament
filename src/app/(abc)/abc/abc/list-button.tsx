"use client"
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import Link from "next/link";

type Props = {
    id: number;
    title: string;
    index: number;
}



export const ListButton = ({
    id,
    title,
    index
}: Props) => {

    const cycleLength = 8;
    const cycleIndex = index % cycleLength;

    let indentationLevel;

    if (cycleIndex <= 2){
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4){
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6){
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = indentationLevel * 40;

    const href = `/lesson/${id}`


    return (
        <Link href={href}>
        <div className="relative" 
            style={{
                right: `${rightPosition}px`,
                marginTop: 10,
                
        }}>
            <div className="h-[102px] w-[102px] relative">
                <CircularProgressbarWithChildren value={0}
                    styles={{
                        path: {
                            stroke: "#4ade80",
                        },
                        trail: {
                            stroke: "#e5e7eb",
                        },
                    }}>
                    <Button variant="secondary" size="rounded" className="h-[70px] w-[70px] border-b-8">

                    <Star className="h-10 w-10 "  />

                    </Button>
                </CircularProgressbarWithChildren>
            </div>



        </div>
        </Link>
    )
};
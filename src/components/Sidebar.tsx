import { cn } from "@/lib/utils"

type Props = {
    className?: string;
}

export const Sidebar = ({ className}: Props) => {
    return (
        <div className={cn("flex h-full text-blue-700 bg-amber-50 lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <div className="flex flex-col gap-y-2 flex-1">foo</div>
            
            <div className="p-4"> ssdfsfd </div>
        </div>
    )
};


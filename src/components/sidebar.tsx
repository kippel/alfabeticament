import { cn } from "@/lib/utils";
import Link from "next/link";
import { LoginUser } from "./login-user";
import { SidebarItem } from "./sidebar-item";
import { Brain } from 'lucide-react';

type Props = {
    className?: string;
}

export const Sidebar = ({ className}: Props) => {
    return (
        <div className={cn("flex h-full text-blue-700 bg-amber-50 lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <Link href="/abc">
            <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">

                <h1 className="text-2xl font-extrabold text-green-500 tracking-wide">
                    Lingo
                </h1>

            </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                 <SidebarItem label="Abc" href="/abc/abc">
                   <Brain size={32}/>

                 </SidebarItem>                
            </div>
            <div className="p-20">
                <LoginUser />
            </div>
        </div>
    )
};


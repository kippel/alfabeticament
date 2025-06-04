

import { Sidebar } from '@/components/Sidebar'

type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return <>
  <Sidebar className="hidden lg:flex" />
  <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
    <div className="bg-red-300 h-full">
{children}

    </div>
  </main>
  </>;
};

export default LessonLayout;

import { MobileHeader } from '@/components/mobile-header';
import { Sidebar } from '@/components/sidebar'

type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return <>
    <MobileHeader />
    <Sidebar className="hidden lg:flex" />

    <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
      <div className="bg-gray-800 h-full">
        {children}

      </div>
    </main>
  </>;
};

export default LessonLayout;
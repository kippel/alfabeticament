
import { Sidebar } from '@/components/Sidebar'

type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return <>
  <Sidebar className="lg:flex" />
  
  {children}</>;
};

export default LessonLayout;
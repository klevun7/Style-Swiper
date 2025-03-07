
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 md:px-12 max-w-screen-xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Add page transition effect
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('animate-fade-in');
    }
    
    return () => {
      if (main) {
        main.classList.remove('animate-fade-in');
      }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 w-full overflow-hidden">
        <Header />
        <main className="pt-[80px] md:pl-0 transition-all duration-300 min-h-screen w-full overflow-x-hidden">
          <div className="p-4 sm:p-6 max-w-full mx-auto overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

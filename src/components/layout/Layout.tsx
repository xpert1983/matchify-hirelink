
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { Sidebar, SidebarProvider } from './Sidebar';
import { toast } from 'sonner';

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

  // Show welcome toast on first render
  useEffect(() => {
    toast('Welcome to HireLink', {
      description: 'Your advanced tool for matching vacancies and candidates',
      position: 'top-center',
    });
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="pt-[80px] md:pl-64 transition-all duration-300 min-h-screen">
            <div className="p-6 max-w-screen-2xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileBottomNav from './MobileBottomNav';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground w-full overflow-x-hidden">
        {!isMobile && <Sidebar />}
        <div className="flex flex-col w-full min-h-screen">
          <Header />
          <SidebarInset className="pt-[56px] pb-[56px] md:pb-0 my-0 px-0 rounded-none mx-0 md:mx-[8px] max-w-full overflow-x-hidden">
            <div className="px-2 md:px-3 max-w-full overflow-x-hidden">
              <Outlet />
              {children}
            </div>
          </SidebarInset>
          {isMobile && <MobileBottomNav />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

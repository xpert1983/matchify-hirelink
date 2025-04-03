
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
      <div className="flex min-h-screen bg-background text-foreground">
        {!isMobile && <Sidebar />}
        <div className="flex flex-col w-full min-h-screen">
          <Header />
          <SidebarInset className="pt-[60px] pb-[60px] md:pb-0 my-0 px-0 mx-0 rounded-none">
            <div className="px-3 md:px-6 py-0">
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

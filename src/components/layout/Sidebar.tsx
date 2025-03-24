
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart, 
  Briefcase, 
  FileText, 
  Home, 
  LayoutDashboard, 
  Handshake,
  Settings,
  Users,
  User,
  Search,
  LogOut
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  // Create ref inside the component body
  const isInitialMount = React.useRef(true);
  
  // Fix the useEffect to properly handle route changes
  React.useEffect(() => {
    // Skip the effect on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Close the menu only when route changes and in mobile mode
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  }, [location.pathname, isMobile, openMobile, setOpenMobile]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handler for menu link clicks
  const handleMenuLinkClick = (e: React.MouseEvent) => {
    // Only close the menu on link click in mobile mode
    // Don't stop event propagation to allow natural link navigation
    if (isMobile) {
      // Add a small delay to allow navigation to happen first
      setTimeout(() => {
        setOpenMobile(false);
      }, 100);
    }
  };

  return (
    <UISidebar
      className="border-r z-50"
      collapsible="offcanvas"
    >
      <SidebarHeader className="flex h-[80px] items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <Handshake className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold">HireLink</span>
        </div>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                  <Link to="/dashboard" onClick={handleMenuLinkClick}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Дашборд</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/vacancies")}>
                  <Link to="/vacancies" onClick={handleMenuLinkClick}>
                    <Briefcase className="h-4 w-4" />
                    <span>Вакансии</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/candidates")}>
                  <Link to="/candidates" onClick={handleMenuLinkClick}>
                    <Users className="h-4 w-4" />
                    <span>Кандидаты</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/matches")}>
                  <Link to="/matches" onClick={handleMenuLinkClick}>
                    <Handshake className="h-4 w-4" />
                    <span>Подборки</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Аналитика</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/reports")}>
                  <Link to="/reports" onClick={handleMenuLinkClick}>
                    <BarChart className="h-4 w-4" />
                    <span>Отчеты</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/advanced-search")}>
                  <Link to="/advanced-search" onClick={handleMenuLinkClick}>
                    <Search className="h-4 w-4" />
                    <span>Расширенный поиск</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Система</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")}>
                  <Link to="/settings" onClick={handleMenuLinkClick}>
                    <Settings className="h-4 w-4" />
                    <span>Настройки</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/profile")}>
                  <Link to="/profile" onClick={handleMenuLinkClick}>
                    <User className="h-4 w-4" />
                    <span>Профиль</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Анна Иванова</span>
              <span className="text-xs text-muted-foreground">HR-менеджер</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Выйти</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
};

export default Sidebar;

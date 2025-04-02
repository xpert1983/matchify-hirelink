
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Briefcase, FileText, Home, LayoutDashboard, Handshake, Settings, Users, User, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar as UISidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const {
    openMobile,
    setOpenMobile
  } = useSidebar();
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

  // Handler for menu link clicks - don't close the sidebar immediately
  const handleMenuLinkClick = (e: React.MouseEvent) => {
    // For mobile, add a longer delay before closing the sidebar
    // to allow the navigation to register first
    if (isMobile) {
      // Don't close the menu immediately - wait for navigation
      // The sidebar will be closed by the useEffect when the route changes
    }
  };
  
  return (
    <UISidebar className="border-r z-50 shadow-sm" collapsible="offcanvas">
      <SidebarHeader className="flex h-[60px] items-center border-b px-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <Handshake className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg font-bold">HireLink</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-1 text-xs">Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")} className="py-1.5">
                  <Link to="/dashboard" onClick={handleMenuLinkClick}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="text-sm">Дашборд</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/vacancies")} className="py-1.5">
                  <Link to="/vacancies" onClick={handleMenuLinkClick}>
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm">Вакансии</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/candidates")} className="py-1.5">
                  <Link to="/candidates" onClick={handleMenuLinkClick}>
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Кандидаты</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/matches")} className="py-1.5">
                  <Link to="/matches" onClick={handleMenuLinkClick}>
                    <Handshake className="h-4 w-4" />
                    <span className="text-sm">Подборки</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-1 text-xs">Аналитика</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/reports")} className="py-1.5">
                  <Link to="/reports" onClick={handleMenuLinkClick}>
                    <BarChart className="h-4 w-4" />
                    <span className="text-sm">Отчеты</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/advanced-search")} className="py-1.5">
                  <Link to="/advanced-search" onClick={handleMenuLinkClick}>
                    <Search className="h-4 w-4" />
                    <span className="text-sm">Расширенный поиск</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-1 text-xs">Система</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} className="py-1.5">
                  <Link to="/settings" onClick={handleMenuLinkClick}>
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Настройки</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/profile")} className="py-1.5">
                  <Link to="/profile" onClick={handleMenuLinkClick}>
                    <User className="h-4 w-4" />
                    <span className="text-sm">Профиль</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">Анна Иванова</span>
              <span className="text-[10px] text-muted-foreground">HR-менеджер</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="justify-start text-xs">
            <LogOut className="h-3 w-3 mr-1.5" />
            <span>Выйти</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
};

export default Sidebar;

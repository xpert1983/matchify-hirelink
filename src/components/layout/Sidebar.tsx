
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Briefcase, Home, LayoutDashboard, Handshake, Settings, Users, User, Search, LogOut } from 'lucide-react';
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
  const isInitialMount = React.useRef(true);
  
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  }, [location.pathname, isMobile, openMobile, setOpenMobile]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleMenuLinkClick = (e: React.MouseEvent) => {
    if (isMobile) {}
  };
  
  return (
    <UISidebar className="border-r z-50 shadow-sm max-w-[230px]" collapsible="offcanvas">
      <SidebarHeader className="flex h-[56px] items-center border-b px-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
            <Handshake className="h-3.5 w-3.5 text-white" />
          </div>
          <h1 className="text-base font-bold">HireLink</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <SidebarGroup className="mx-0 px-0">
          <SidebarGroupLabel className="px-3 py-1 text-xs">Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")} className="py-1">
                  <Link to="/dashboard" onClick={handleMenuLinkClick}>
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span className="text-xs">Дашборд</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/vacancies")} className="py-1">
                  <Link to="/vacancies" onClick={handleMenuLinkClick}>
                    <Briefcase className="h-3.5 w-3.5" />
                    <span className="text-xs">Вакансии</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/candidates")} className="py-1">
                  <Link to="/candidates" onClick={handleMenuLinkClick}>
                    <Users className="h-3.5 w-3.5" />
                    <span className="text-xs">Кандидаты</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/matches")} className="py-1">
                  <Link to="/matches" onClick={handleMenuLinkClick}>
                    <Handshake className="h-3.5 w-3.5" />
                    <span className="text-xs">Подборки</span>
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
                <SidebarMenuButton asChild isActive={isActive("/reports")} className="py-1">
                  <Link to="/reports" onClick={handleMenuLinkClick}>
                    <BarChart className="h-3.5 w-3.5" />
                    <span className="text-xs">Отчеты</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/advanced-search")} className="py-1">
                  <Link to="/advanced-search" onClick={handleMenuLinkClick}>
                    <Search className="h-3.5 w-3.5" />
                    <span className="text-xs">Расширенный поиск</span>
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
                <SidebarMenuButton asChild isActive={isActive("/settings")} className="py-1">
                  <Link to="/settings" onClick={handleMenuLinkClick}>
                    <Settings className="h-3.5 w-3.5" />
                    <span className="text-xs">Настройки</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/profile")} className="py-1">
                  <Link to="/profile" onClick={handleMenuLinkClick}>
                    <User className="h-3.5 w-3.5" />
                    <span className="text-xs">Профиль</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-2 px-[10px] my-0 mx-[15px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">Анна Иванова</span>
              <span className="text-[9px] text-muted-foreground">HR-менеджер</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="justify-start text-xs h-7 px-2">
            <LogOut className="h-3 w-3 mr-1" />
            <span>Выйти</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail className="mx-[18px]" />
    </UISidebar>
  );
};

export default Sidebar;

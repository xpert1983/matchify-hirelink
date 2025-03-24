
import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Bell, Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/components/ui/sidebar';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { openMobile, setOpenMobile } = useSidebar();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleSidebar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMobile(!openMobile);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[80px] flex items-center justify-between px-4 sm:px-6 bg-background/80 backdrop-blur-md z-40 border-b">
      <div className="flex items-center">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => handleNavigate('/advanced-search')}>
          <Search className="h-4 w-4" />
        </Button>
        <DarkModeToggle />
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;

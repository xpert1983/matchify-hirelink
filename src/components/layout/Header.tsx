
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Settings, User, HelpCircle, LogOut, Menu, Bell } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import NotificationCenter from '../notifications/NotificationCenter';
import NotificationSettings from '../notifications/NotificationSettings';
import { useNotifications } from '@/hooks/use-notifications';

export const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead,
    unreadCount
  } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReadNotification = (id: string) => {
    markAsRead(id);
  };

  const handleReadAllNotifications = () => {
    markAllAsRead();
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 md:left-64 h-[80px] transition-all duration-300 z-10 px-6 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-background'
      }`}
    >
      <div className="flex items-center justify-between h-full">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Открыть меню"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative w-full max-w-md hidden md:flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="Поиск..."
            className="pl-10 pr-4 py-2 h-10 rounded-full bg-secondary/50 hover:bg-secondary/80 focus:bg-secondary w-full text-sm border border-transparent focus:outline-none focus:ring-1 focus:ring-ring focus:border-input transition-colors duration-200"
          />
        </div>

        <div className="flex items-center gap-2">
          <NotificationCenter 
            notifications={notifications}
            onReadNotification={handleReadNotification}
            onReadAll={handleReadAllNotifications}
            onOpenSettings={handleOpenSettings}
            unreadCount={unreadCount}
          />
          
          <DarkModeToggle />
          
          <Button variant="ghost" size="icon" aria-label="Помощь">
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Профиль пользователя"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                Профиль
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Настройки
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <NotificationSettings 
        open={isSettingsOpen} 
        onOpenChange={setIsSettingsOpen} 
      />
    </header>
  );
};

export default Header;

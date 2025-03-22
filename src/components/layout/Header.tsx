
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
import { Notification } from '../notifications/NotificationCenter';

export const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Новый кандидат',
      message: 'Петр Иванов откликнулся на вакансию "Frontend Developer"',
      time: '10 минут назад',
      read: false,
      type: 'candidate'
    },
    {
      id: '2',
      title: 'Собеседование запланировано',
      message: 'Собеседование с Анной Смирновой в 15:00',
      time: '1 час назад',
      read: false,
      type: 'interview'
    },
    {
      id: '3',
      title: 'Вакансия закрыта',
      message: 'Вакансия "Product Manager" была закрыта',
      time: '2 часа назад',
      read: true,
      type: 'vacancy'
    },
    {
      id: '4',
      title: 'Обновление системы',
      message: 'Система успешно обновлена до версии 2.1.0',
      time: 'вчера',
      read: true,
      type: 'system'
    }
  ]);

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
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const handleReadAllNotifications = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
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
    </header>
  );
};

export default Header;

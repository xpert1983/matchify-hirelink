
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Menu, 
  Search,
  Settings as SettingsIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from './Sidebar';
import { DarkModeToggle } from './DarkModeToggle';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  // No props needed for now
}

const Header: React.FC<HeaderProps> = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-40 transition-all duration-300 h-[80px] border-b bg-background">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative max-w-[500px] hidden md:flex">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Поиск..." 
              className="pl-10 w-full md:w-[300px] lg:w-[400px] h-9" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative h-9 w-9">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800 mt-0.5">Новое</Badge>
                    <div>
                      <p className="font-medium">Новый кандидат</p>
                      <p className="text-sm text-muted-foreground">Анна Смирнова откликнулась на вакансию "Frontend Developer"</p>
                      <p className="text-xs text-muted-foreground mt-1">5 минут назад</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 mt-0.5">Инфо</Badge>
                    <div>
                      <p className="font-medium">Собеседование</p>
                      <p className="text-sm text-muted-foreground">Запланировано собеседование с Иваном Петровым</p>
                      <p className="text-xs text-muted-foreground mt-1">2 часа назад</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 mt-0.5">Система</Badge>
                    <div>
                      <p className="font-medium">Обновление</p>
                      <p className="text-sm text-muted-foreground">Система обновлена до версии 2.1.0</p>
                      <p className="text-xs text-muted-foreground mt-1">1 день назад</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center font-medium text-primary">
                Показать все уведомления
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 gap-2 pl-2 pr-3" asChild>
                <div className="flex items-center cursor-pointer">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/avatar.jpg" alt="User" />
                    <AvatarFallback>АИ</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm hidden sm:inline-block">Анна Иванова</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  <span>Настройки</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="h-4 w-4 mr-2" />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
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

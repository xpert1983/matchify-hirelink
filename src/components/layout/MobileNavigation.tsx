
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart, 
  Briefcase, 
  Home, 
  LayoutDashboard, 
  Handshake,
  Settings,
  Users,
  User,
  Search,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationGroups = [
    {
      title: 'Навигация',
      items: [
        { icon: LayoutDashboard, label: 'Дашборд', path: '/dashboard' },
        { icon: Briefcase, label: 'Вакансии', path: '/vacancies' },
        { icon: Users, label: 'Кандидаты', path: '/candidates' },
        { icon: Handshake, label: 'Подборки', path: '/matches' },
      ]
    },
    {
      title: 'Аналитика',
      items: [
        { icon: BarChart, label: 'Отчеты', path: '/reports' },
        { icon: Search, label: 'Расширенный поиск', path: '/advanced-search' },
      ]
    },
    {
      title: 'Система',
      items: [
        { icon: Settings, label: 'Настройки', path: '/settings' },
        { icon: User, label: 'Профиль', path: '/profile' },
        { icon: HelpCircle, label: 'Справка', path: '/help' }
      ]
    }
  ];

  return (
    <div className="p-4 h-full flex flex-col overflow-auto">
      <div className="flex items-center mb-6 mt-2">
        <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
          <Handshake className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold ml-2">HireLink</span>
      </div>

      <div className="flex-1 overflow-auto">
        {navigationGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isActive(item.path) 
                      ? 'bg-accent text-accent-foreground font-medium' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t pt-4">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Анна Иванова</p>
            <p className="text-xs text-muted-foreground">HR-менеджер</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileNavigation;

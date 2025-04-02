
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Handshake,
  BarChart
} from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Дашборд', path: '/dashboard' },
    { icon: Briefcase, label: 'Вакансии', path: '/vacancies' },
    { icon: Users, label: 'Кандидаты', path: '/candidates' },
    { icon: Handshake, label: 'Подборки', path: '/matches' },
    { icon: BarChart, label: 'Отчеты', path: '/reports' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-20 md:hidden">
      <div className="flex justify-between items-center px-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center py-2 px-1 flex-1 ${
              isActive(item.path) 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;


import React from 'react';
import { Card } from '@/components/ui/card';
import { Briefcase, Users, CheckSquare, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
  onClick: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, positive = true, onClick }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card 
      className="p-3 md:p-6 hover-lift transition-all duration-300 hover:shadow-elevated cursor-pointer" 
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-xl md:text-2xl font-semibold mt-1">{value}</h3>
          <p className={`flex items-center text-xs font-medium mt-1 md:mt-2 ${
            positive ? 'text-green-600' : 'text-red-500'
          }`}>
            <span className="inline-block mr-1">{isMobile ? change.replace(' к прошлому месяцу', '') : change}</span>
            <TrendingUp className={`h-3 w-3 ${positive ? '' : 'rotate-180'}`} />
          </p>
        </div>
        <div className="bg-primary/10 p-2 md:p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const DashboardStats = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 animate-slide-in">
      <StatCard 
        title="Открытые вакансии"
        value="24"
        change="+12% к прошлому месяцу"
        icon={<Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
        onClick={() => navigate('/vacancies')}
      />
      <StatCard 
        title="Активные кандидаты"
        value="128"
        change="+18% к прошлому месяцу"
        icon={<Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
        onClick={() => navigate('/candidates')}
      />
      <StatCard 
        title="Успешные подборки"
        value="56"
        change="+8% к прошлому месяцу"
        icon={<CheckSquare className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
        onClick={() => navigate('/matches')}
      />
      <StatCard 
        title="Ср. время найма"
        value="12 дней"
        change="-2 дня к прошлому месяцу"
        icon={<TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
        positive={true}
        onClick={() => navigate('/reports')}
      />
    </div>
  );
};

export default DashboardStats;

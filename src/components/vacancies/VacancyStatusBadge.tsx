
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, PauseCircle } from 'lucide-react';

export type VacancyStatus = 'active' | 'paused' | 'closed' | 'draft';

interface VacancyStatusBadgeProps {
  status: VacancyStatus;
  size?: 'sm' | 'md' | 'lg';
}

const VacancyStatusBadge: React.FC<VacancyStatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Активна',
          icon: <Clock className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          variant: 'bg-green-100 text-green-800 hover:bg-green-200'
        };
      case 'paused':
        return {
          label: 'На паузе',
          icon: <PauseCircle className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          variant: 'bg-amber-100 text-amber-800 hover:bg-amber-200'
        };
      case 'closed':
        return {
          label: 'Закрыта',
          icon: <CheckCircle className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          variant: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        };
      case 'draft':
        return {
          label: 'Черновик',
          icon: <AlertCircle className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          variant: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        };
      default:
        return {
          label: 'Активна',
          icon: <Clock className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          variant: 'bg-green-100 text-green-800 hover:bg-green-200'
        };
    }
  };

  const { label, icon, variant } = getStatusConfig();

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 font-medium whitespace-nowrap overflow-hidden ${variant} ${
        size === 'sm' ? 'text-xs py-0 px-2' : 
        size === 'md' ? 'text-sm' : 'text-base py-1.5 px-3'
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Badge>
  );
};

export default VacancyStatusBadge;

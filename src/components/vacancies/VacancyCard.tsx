import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MapPin, Clock, Users, Briefcase, MoreHorizontal, Edit, Trash, Copy, Share } from 'lucide-react';
import VacancyStatusBadge from './VacancyStatusBadge';

export interface VacancyProps {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  applicants: number;
  posted: string;
  description: string;
  skills: string[];
  status?: 'active' | 'paused' | 'closed' | 'draft';
  selected?: boolean;
  onFindCandidates?: (id: string) => void;
}

interface VacancyCardProps {
  vacancy: VacancyProps;
  onView: (id: string) => void;
  onSelect?: (id: string, selected: boolean) => void;
  selectable?: boolean;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({ 
  vacancy, 
  onView, 
  onSelect,
  selectable = false
}) => {
  // Перевод типов вакансий
  const translateVacancyType = (type: string) => {
    switch (type) {
      case 'Full-time': return 'Полная занятость';
      case 'Part-time': return 'Частичная занятость';
      case 'Contract': return 'Контракт';
      case 'Remote': return 'Удаленно';
      default: return type;
    }
  };

  const handleSelect = (checked: boolean) => {
    if (onSelect) {
      onSelect(vacancy.id, checked);
    }
  };

  const handleFindCandidates = () => {
    if (vacancy.onFindCandidates) {
      vacancy.onFindCandidates(vacancy.id);
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-elevated hover-scale w-full ${
      vacancy.selected ? 'ring-2 ring-primary' : ''
    }`}>
      <CardContent className="p-0">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2">
            {selectable && (
              <div className="mr-2 mt-1 flex-shrink-0">
                <Checkbox 
                  checked={vacancy.selected}
                  onCheckedChange={handleSelect}
                />
              </div>
            )}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-white border border-border flex-shrink-0">
                <AvatarImage src={vacancy.logo} alt={vacancy.company} className="object-contain p-2" />
                <AvatarFallback className="rounded-md">{vacancy.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-base sm:text-lg truncate">{vacancy.title}</h3>
                <p className="text-muted-foreground truncate">{vacancy.company}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(vacancy.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Дублировать
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  Поделиться
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {vacancy.status && (
              <VacancyStatusBadge status={vacancy.status} size="sm" />
            )}
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <MapPin className="h-3 w-3" />
              {vacancy.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Briefcase className="h-3 w-3" />
              {translateVacancyType(vacancy.type)}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              {vacancy.posted}
            </Badge>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground line-clamp-2 break-words">{vacancy.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {vacancy.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="bg-secondary/70 text-xs">
                {skill}
              </Badge>
            ))}
            {vacancy.skills.length > 3 && (
              <Badge variant="outline" className="bg-secondary/70 text-xs">
                +{vacancy.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between p-3 sm:p-4 border-t bg-secondary/30 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{vacancy.applicants} кандидатов</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={() => onView(vacancy.id)}
          >
            Подробнее
          </Button>
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white h-8 px-2 text-xs"
            onClick={handleFindCandidates}
          >
            Найти кандидатов
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VacancyCard;

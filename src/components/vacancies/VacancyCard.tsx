
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

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-elevated hover-scale ${
      vacancy.selected ? 'ring-2 ring-primary' : ''
    }`}>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between">
            {selectable && (
              <div className="mr-2 mt-1">
                <Checkbox 
                  checked={vacancy.selected}
                  onCheckedChange={handleSelect}
                />
              </div>
            )}
            <div className="flex items-center gap-4 flex-1">
              <Avatar className="h-12 w-12 rounded-md bg-white border border-border">
                <AvatarImage src={vacancy.logo} alt={vacancy.company} className="object-contain p-2" />
                <AvatarFallback className="rounded-md">{vacancy.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{vacancy.title}</h3>
                <p className="text-muted-foreground">{vacancy.company}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
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
          
          <div className="flex flex-wrap gap-2 mt-5">
            {vacancy.status && (
              <VacancyStatusBadge status={vacancy.status} size="sm" />
            )}
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {vacancy.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {translateVacancyType(vacancy.type)}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {vacancy.posted}
            </Badge>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{vacancy.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {vacancy.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="bg-secondary/70">
                {skill}
              </Badge>
            ))}
            {vacancy.skills.length > 3 && (
              <Badge variant="outline" className="bg-secondary/70">
                +{vacancy.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between p-4 border-t bg-secondary/30">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{vacancy.applicants} кандидатов</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onView(vacancy.id)}
          >
            Подробнее
          </Button>
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Найти кандидатов
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VacancyCard;

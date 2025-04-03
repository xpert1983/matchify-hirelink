
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, GraduationCap, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CandidateProps {
  id: string;
  name: string;
  avatar: string;
  position: string;
  location: string;
  experience: string;
  education: string;
  email: string;
  phone: string;
  skills: string[];
  status: 'Available' | 'Interviewing' | 'Hired' | 'Not Available';
  onFindVacancies?: (id: string) => void;
}

interface CandidateCardProps {
  candidate: CandidateProps;
  onView: (id: string) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onView }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Interviewing': return 'bg-blue-100 text-blue-800';
      case 'Hired': return 'bg-purple-100 text-purple-800';
      case 'Not Available': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Перевод статусов
  const translateStatus = (status: string) => {
    switch (status) {
      case 'Available': return 'Доступен';
      case 'Interviewing': return 'На собеседовании';
      case 'Hired': return 'Нанят';
      case 'Not Available': return 'Недоступен';
      default: return status;
    }
  };

  const handleFindVacancies = () => {
    if (candidate.onFindVacancies) {
      candidate.onFindVacancies(candidate.id);
    } else {
      // Если обработчик не передан, перенаправляем на страницу сопоставления
      navigate('/candidate-match', { state: { candidateId: candidate.id } });
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevated hover-scale w-full">
      <CardContent className="p-0">
        <div className="p-2.5 sm:p-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-background">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h3 className="font-medium text-sm">{candidate.name}</h3>
                  <Badge variant="outline" className={`${getStatusColor(candidate.status)} mt-0.5 sm:mt-0 text-[8px] px-1 py-0`}>
                    {translateStatus(candidate.status)}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs">{candidate.position}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 absolute top-2 right-2 sm:static">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="mt-2 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="h-2.5 w-2.5" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Briefcase className="h-2.5 w-2.5" />
              <span>{candidate.experience}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <GraduationCap className="h-2.5 w-2.5" />
              <span>{candidate.education}</span>
            </div>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {candidate.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="bg-secondary/70 text-[8px] px-1 py-0 h-4">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="outline" className="bg-secondary/70 text-[8px] px-1 py-0 h-4">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 border-t bg-secondary/30 gap-1">
        <div className="flex items-center gap-1 w-full sm:w-auto justify-start">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" title={candidate.email}>
            <Mail className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" title={candidate.phone}>
            <Phone className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className="text-[9px] h-6 px-1.5"
            onClick={() => onView(candidate.id)}
          >
            Просмотр
          </Button>
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white text-[9px] h-6 px-1.5"
            onClick={handleFindVacancies}
          >
            Найти вакансии
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;

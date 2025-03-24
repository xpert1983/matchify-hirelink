
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
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-background">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-medium text-base sm:text-lg">{candidate.name}</h3>
                  <Badge variant="outline" className={`${getStatusColor(candidate.status)} mt-1 sm:mt-0`}>
                    {translateStatus(candidate.status)}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{candidate.position}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 absolute top-4 right-4 sm:static">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{candidate.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{candidate.education}</span>
            </div>
          </div>
          
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
            {candidate.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="bg-secondary/70 text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="outline" className="bg-secondary/70 text-xs">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-t bg-secondary/30 gap-2">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-start">
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground" title={candidate.email}>
            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground" title={candidate.phone}>
            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs h-8 px-2 sm:px-3"
            onClick={() => onView(candidate.id)}
          >
            Просмотр профиля
          </Button>
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white text-xs h-8 px-2 sm:px-3"
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

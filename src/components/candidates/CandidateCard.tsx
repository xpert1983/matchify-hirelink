
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, GraduationCap, MoreHorizontal, Mail, Phone } from 'lucide-react';

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
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevated hover-scale">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-background">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-lg">{candidate.name}</h3>
                  <Badge variant="outline" className={getStatusColor(candidate.status)}>
                    {translateStatus(candidate.status)}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{candidate.position}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{candidate.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>{candidate.education}</span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {candidate.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="bg-secondary/70">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="outline" className="bg-secondary/70">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between p-4 border-t bg-secondary/30">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title={candidate.email}>
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title={candidate.phone}>
            <Phone className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onView(candidate.id)}
          >
            Просмотр профиля
          </Button>
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white"
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

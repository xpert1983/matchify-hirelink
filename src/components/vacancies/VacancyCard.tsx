
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Briefcase, MoreHorizontal } from 'lucide-react';

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
}

interface VacancyCardProps {
  vacancy: VacancyProps;
  onView: (id: string) => void;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onView }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevated hover-scale">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 rounded-md bg-white border border-border">
                <AvatarImage src={vacancy.logo} alt={vacancy.company} className="object-contain p-2" />
                <AvatarFallback className="rounded-md">{vacancy.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{vacancy.title}</h3>
                <p className="text-muted-foreground">{vacancy.company}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-5">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {vacancy.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {vacancy.type}
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
          <span className="text-sm text-muted-foreground">{vacancy.applicants} applicants</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onView(vacancy.id)}
          >
            View Details
          </Button>
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Find Matches
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VacancyCard;

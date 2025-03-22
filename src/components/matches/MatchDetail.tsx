
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  CircleCheck, 
  Clock, 
  FileText, 
  User, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  X 
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { matchesData, candidatesData, vacanciesData } from "@/lib/data";

export interface MatchDetailProps {
  matchId: string;
  onClose?: () => void;
}

const MatchDetail: React.FC<MatchDetailProps> = ({ matchId, onClose }) => {
  const [matchData, setMatchData] = useState<any>(null);
  const [candidate, setCandidate] = useState<any>(null);
  const [vacancy, setVacancy] = useState<any>(null);

  useEffect(() => {
    const match = matchesData.find(m => m.id === matchId);
    if (match) {
      setMatchData(match);
      
      const candidateData = candidatesData.find(c => c.id === match.candidateId);
      if (candidateData) {
        setCandidate(candidateData);
      }
      
      const vacancyData = vacanciesData.find(v => v.id === match.vacancyId);
      if (vacancyData) {
        setVacancy(vacancyData);
      }
    }
  }, [matchId]);

  if (!matchData || !candidate || !vacancy) {
    return <div>Loading...</div>;
  }
  
  // Determine match score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Contacted":
        return "bg-blue-100 text-blue-800";
      case "Screening":
        return "bg-purple-100 text-purple-800";
      case "Interview":
        return "bg-yellow-100 text-yellow-800";
      case "Offered":
        return "bg-green-100 text-green-800";
      case "Hired":
        return "bg-emerald-100 text-emerald-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Детали подборки</CardTitle>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-4">Кандидат</h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl font-bold">{candidate.name}</h4>
                <p className="text-muted-foreground">{candidate.position}</p>
                <Badge variant="outline" className="mt-1">
                  {candidate.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.location}</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Навыки</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Вакансия</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                <img src={vacancy.logo} alt={vacancy.company} className="h-12 w-12 object-contain" />
              </div>
              <div>
                <h4 className="text-xl font-bold">{vacancy.title}</h4>
                <p className="text-muted-foreground">{vacancy.company}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{vacancy.type}</Badge>
                  <Badge variant="outline">{vacancy.location}</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Опубликовано {vacancy.posted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{vacancy.applicants} соискателей</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="line-clamp-2">{vacancy.description}</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Требуемые навыки</h4>
              <div className="flex flex-wrap gap-2">
                {vacancy.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-4">Результат подборки</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Соответствие</span>
                  <span className="font-bold">{matchData.matchScore}%</span>
                </div>
                <Progress value={matchData.matchScore} className={getScoreColor(matchData.matchScore)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Дата подборки: {matchData.date}</span>
                </div>
                <Badge className={getStatusColor(matchData.status)} variant="outline">
                  {matchData.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline">Отклонить</Button>
          <Button>Назначить собеседование</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchDetail;

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin, Mail, Phone, Building, GraduationCap, Briefcase, Clock, CheckCircle, XCircle } from "lucide-react";

interface MatchDetailProps {
  matchId: string;
}

interface Match {
  id: string;
  candidate: {
    name: string;
    title: string;
    avatar: string;
    location: string;
    email: string;
    phone: string;
    company: string;
    education: string;
    experience: string;
  };
  vacancy: {
    title: string;
    company: string;
    location: string;
    department: string;
    type: string;
  };
  score: number;
  status: string;
  date: string;
  notes: string;
}

const MatchDetail: React.FC<MatchDetailProps> = ({ matchId }) => {
  // Mock data for demonstration
  const match: Match = {
    id: matchId,
    candidate: {
      name: "Анна Смирнова",
      title: "Frontend Developer",
      avatar: "/avatar.jpg",
      location: "Москва",
      email: "anna.smirnova@example.com",
      phone: "+7 (916) 123-45-67",
      company: "ООО Рога и копыта",
      education: "МГУ",
      experience: "5 лет",
    },
    vacancy: {
      title: "Frontend Developer",
      company: "ООО Инновации",
      location: "Москва",
      department: "Разработка",
      type: "Full-time",
    },
    score: 92,
    status: "Подходит",
    date: "2024-01-20",
    notes: "Отличный кандидат, соответствует всем требованиям",
  };
  
  // When using Badge, let's ensure we're not passing a size prop:
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {match.candidate.name} - {match.vacancy.title}
        </CardTitle>
        <CardDescription>
          Совпадение: {match.score}%
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={match.candidate.avatar} alt={match.candidate.name} />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{match.candidate.name}</p>
            <p className="text-sm text-muted-foreground">{match.candidate.title}</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="vacancy">Вакансия</TabsTrigger>
            <TabsTrigger value="match">Совпадение</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-2">
            <div className="text-sm font-medium">Информация о кандидате:</div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{match.candidate.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{match.candidate.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{match.candidate.phone}</span>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>{match.candidate.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>{match.candidate.education}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{match.candidate.experience}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="vacancy" className="space-y-2">
            <div className="text-sm font-medium">Информация о вакансии:</div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>{match.vacancy.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{match.vacancy.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{match.vacancy.title}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{match.vacancy.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{match.vacancy.type}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="match" className="space-y-2">
            <div className="text-sm font-medium">Информация о совпадении:</div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{match.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {match.status === "Подходит" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                {/* Fixed Badge usage (removed invalid size prop): */}
                <Badge variant="outline" className="bg-blue-100 text-blue-800" style={{ fontSize: '0.75rem' }}>
                  {match.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {match.notes}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Отклонить</Button>
        <Button>
          Принять
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatchDetail;

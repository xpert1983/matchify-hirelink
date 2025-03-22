
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { matchesData, candidatesData, vacanciesData } from '@/lib/data';

const Matches = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Combine match data with candidate and vacancy details
  const combinedMatches = matchesData.map(match => {
    const candidate = candidatesData.find(c => c.id === match.candidateId);
    const vacancy = vacanciesData.find(v => v.id === match.vacancyId);
    
    return {
      ...match,
      candidate,
      vacancy
    };
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Contacted': return 'bg-blue-100 text-blue-800';
      case 'Screening': return 'bg-purple-100 text-purple-800';
      case 'Interview': return 'bg-amber-100 text-amber-800';
      case 'Offered': return 'bg-green-100 text-green-800';
      case 'Hired': return 'bg-green-800 text-white';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Переводим статусы
  const translateStatus = (status: string) => {
    switch (status) {
      case 'Contacted': return 'Связались';
      case 'Screening': return 'Скрининг';
      case 'Interview': return 'Интервью';
      case 'Offered': return 'Оффер';
      case 'Hired': return 'Принят';
      case 'Rejected': return 'Отклонен';
      default: return status;
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Подборки</h1>
          <p className="text-muted-foreground mt-1">Просмотр и управление подбором вакансий для кандидатов.</p>
        </div>
        
        <Tabs defaultValue="all" className="w-full animate-fade-in">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>Все подборки</TabsTrigger>
              <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>Недавние</TabsTrigger>
              <TabsTrigger value="high" onClick={() => setActiveTab("high")}>Высокий рейтинг</TabsTrigger>
            </TabsList>
            
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Создать новые подборки
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {combinedMatches.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  statusColor={getStatusColor(match.status)}
                  translatedStatus={translateStatus(match.status)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="space-y-4">
              {combinedMatches.slice(0, 3).map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  statusColor={getStatusColor(match.status)}
                  translatedStatus={translateStatus(match.status)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="high" className="mt-6">
            <div className="space-y-4">
              {combinedMatches
                .sort((a, b) => b.matchScore - a.matchScore)
                .slice(0, 3)
                .map((match) => (
                  <MatchCard 
                    key={match.id} 
                    match={match} 
                    statusColor={getStatusColor(match.status)}
                    translatedStatus={translateStatus(match.status)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface MatchCardProps {
  match: any;
  statusColor: string;
  translatedStatus: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, statusColor, translatedStatus }) => {
  return (
    <Card className="hover:shadow-elevated transition-all duration-300 animate-scale-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-border">
                <AvatarImage src={match.candidate?.avatar} alt={match.candidate?.name} />
                <AvatarFallback>{match.candidate?.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{match.candidate?.name}</h3>
                <p className="text-sm text-muted-foreground">{match.candidate?.position}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 rounded-md bg-white border border-border">
                <AvatarImage src={match.vacancy?.logo} alt={match.vacancy?.company} className="object-contain p-2" />
                <AvatarFallback className="rounded-md">{match.vacancy?.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{match.vacancy?.title}</h3>
                <p className="text-sm text-muted-foreground">{match.vacancy?.company}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Рейтинг совпадения:</span>
              <Badge className="bg-primary/10 text-primary">
                {match.matchScore}%
              </Badge>
            </div>
            <Progress value={match.matchScore} className="h-2 mb-3" />
            <div className="flex justify-between">
              <Badge variant="outline" className={statusColor}>
                {translatedStatus}
              </Badge>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Обновить статус
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Matches;

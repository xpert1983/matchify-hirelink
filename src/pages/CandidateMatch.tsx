import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star, Check, X, Info, MessageSquare, Mail, ArrowRight, Zap, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { vacanciesData, candidatesData } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { VacancyCard, VacancyProps } from '@/components/vacancies/VacancyCard';
import { CandidateCard, CandidateProps } from '@/components/candidates/CandidateCard';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MatchScoreProps {
  score: number;
  skillsMatch: number;
  expMatch: number;
  locationMatch: number;
  salaryMatch?: number;
}

const MatchScore: React.FC<MatchScoreProps> = ({ score, skillsMatch, expMatch, locationMatch, salaryMatch }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
          <p className="text-muted-foreground text-sm mt-1">Общее соответствие</p>
          
          <div className="w-full mt-6 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Навыки</span>
                <span className="text-muted-foreground">{skillsMatch}%</span>
              </div>
              <Progress value={skillsMatch} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Опыт</span>
                <span className="text-muted-foreground">{expMatch}%</span>
              </div>
              <Progress value={expMatch} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Локация</span>
                <span className="text-muted-foreground">{locationMatch}%</span>
              </div>
              <Progress value={locationMatch} className="h-2" />
            </div>
            
            {salaryMatch !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Зарплата</span>
                  <span className="text-muted-foreground">{salaryMatch}%</span>
                </div>
                <Progress value={salaryMatch} className="h-2" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CandidateMatch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);
  const [matchType, setMatchType] = useState<'candidate-to-vacancies' | 'vacancy-to-candidates'>('candidate-to-vacancies');
  const [sortMethod, setSortMethod] = useState<'match' | 'date' | 'name'>('match');
  
  const params = new URLSearchParams(location.search);
  const candidateId = params.get('candidateId');
  const vacancyId = params.get('vacancyId');

  useEffect(() => {
    const typedCandidates = candidatesData.map(candidate => ({
      ...candidate,
      status: candidate.status as "Available" | "Interviewing" | "Hired" | "Not Available"
    }));
    setCandidates(typedCandidates);

    const typedVacancies = vacanciesData.map(vacancy => ({
      ...vacancy,
      type: vacancy.type as "Full-time" | "Part-time" | "Contract" | "Remote"
    }));
    setVacancies(typedVacancies);

    if (candidateId) {
      setSelectedCandidateId(candidateId);
      setMatchType('candidate-to-vacancies');
    } else if (vacancyId) {
      setSelectedVacancyId(vacancyId);
      setMatchType('vacancy-to-candidates');
    }
  }, [candidateId, vacancyId]);

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
  const selectedVacancy = vacancies.find(v => v.id === selectedVacancyId);
  
  const calculateMatch = (candidate: any, vacancy: any) => {
    const uniqueSkills = new Set([...candidate.skills, ...vacancy.skills]);
    const commonSkills = candidate.skills.filter((skill: string) => vacancy.skills.includes(skill));
    const skillsMatch = Math.round((commonSkills.length / uniqueSkills.size) * 100);
    
    const candidateExp = parseInt(candidate.experience.replace(/\D/g, '')) || 0;
    const requiredExp = Math.floor(Math.random() * 5) + 1;
    const expDiff = Math.abs(candidateExp - requiredExp);
    const expMatch = Math.max(0, 100 - expDiff * 20);
    
    const locationMatch = candidate.location.includes('Москва') || candidate.location.includes('Санкт-Петербург') ? 90 : 50;
    
    const vacancySalary = parseInt(vacancy.salary.replace(/\D/g, '')) || 0;
    const candidateSalary = Math.floor(Math.random() * 150000) + 50000;
    const salaryDiff = Math.abs(candidateSalary - vacancySalary) / vacancySalary;
    const salaryMatch = Math.max(0, 100 - salaryDiff * 100);
    
    const score = Math.round(skillsMatch * 0.5 + expMatch * 0.3 + locationMatch * 0.1 + salaryMatch * 0.1);
    
    return {
      score,
      skillsMatch,
      expMatch,
      locationMatch,
      salaryMatch: Math.round(salaryMatch)
    };
  };

  const getMatches = () => {
    if (matchType === 'candidate-to-vacancies' && selectedCandidate) {
      const matches = vacancies.map(vacancy => ({
        ...vacancy,
        matchDetails: calculateMatch(selectedCandidate, vacancy)
      }));
      
      return sortMatches(matches);
    } else if (matchType === 'vacancy-to-candidates' && selectedVacancy) {
      const matches = candidates.map(candidate => ({
        ...candidate,
        matchDetails: calculateMatch(candidate, selectedVacancy)
      }));
      
      return sortMatches(matches);
    }
    
    return [];
  };

  const sortMatches = (matches: any[]) => {
    switch (sortMethod) {
      case 'match':
        return [...matches].sort((a, b) => b.matchDetails.score - a.matchDetails.score);
      case 'date':
        return [...matches].sort((a, b) => new Date(b.posted || b.date).getTime() - new Date(a.posted || a.date).getTime());
      case 'name':
        return [...matches].sort((a, b) => (a.name || a.title).localeCompare(b.name || b.title));
      default:
        return matches;
    }
  };

  const matches = getMatches();

  const handleBack = () => {
    if (matchType === 'candidate-to-vacancies') {
      navigate('/candidates');
    } else {
      navigate('/vacancies');
    }
  };

  const handleContactCandidate = (candidateId: string) => {
    toast.success('Приглашение отправлено кандидату');
  };

  const handleApplyToVacancy = (vacancyId: string) => {
    toast.success('Кандидат добавлен в процесс подбора по вакансии');
  };

  const handleViewInPipeline = (candidateId: string, vacancyId: string) => {
    navigate(`/vacancies/${vacancyId}/pipeline`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-green-500 hover:bg-green-600">Доступен</Badge>;
      case 'Interviewing':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">На собеседовании</Badge>;
      case 'Hired':
        return <Badge>Нанят</Badge>;
      case 'Not Available':
        return <Badge variant="outline">Недоступен</Badge>;
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Активна</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Приостановлена</Badge>;
      case 'closed':
        return <Badge variant="outline">Закрыта</Badge>;
      case 'draft':
        return <Badge variant="secondary">Черновик</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-4" 
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {matchType === 'candidate-to-vacancies' 
                ? 'Подбор вакансий для кандидата' 
                : 'Подбор кандидатов для вакансии'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSortMethod('match')}>
              По совпадению
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSortMethod('date')}>
              По дате
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSortMethod('name')}>
              По названию
            </Button>
          </div>
        </div>
        
        {matchType === 'candidate-to-vacancies' && selectedCandidate ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Профиль кандидата</CardTitle>
                  <CardDescription>Сопоставление вакансий для кандидата</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                      {selectedCandidate.avatar ? (
                        <img 
                          src={selectedCandidate.avatar} 
                          alt={selectedCandidate.name} 
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="text-2xl font-semibold">
                          {selectedCandidate.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mt-3">{selectedCandidate.name}</h3>
                    <p className="text-muted-foreground">{selectedCandidate.position}</p>
                    <div className="mt-2">
                      {getStatusBadge(selectedCandidate.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Опыт:</span>
                      <span className="text-sm font-medium">{selectedCandidate.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Локация:</span>
                      <span className="text-sm font-medium">{selectedCandidate.location}</span>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Ключевые навыки:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedCandidate.skills.map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="mr-1 mb-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Связаться с кандидатом
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Настройки поиска</CardTitle>
                  <CardDescription>Параметры сопоставления</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <TooltipProvider>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Приоритет навыков</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline">Высокий</Badge>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Навыки имеют высокий приоритет при сопоставлении (50%)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Приоритет опыта</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline">Средний</Badge>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Опыт имеет средний приоритет при сопоставлении (30%)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Приоритет локации</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline">Низкий</Badge>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Локация имеет низкий приоритет при сопоставлении (10%)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Приоритет зарплаты</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline">Низкий</Badge>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Зарплата имеет низкий приоритет при сопоставлении (10%)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Рекомендованные вакансии</CardTitle>
                  <CardDescription>
                    Найдено {matches.length} подходящих вакансий
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {matches.map((vacancy) => (
                      <div key={vacancy.id} className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                          <div className="md:col-span-3 p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold">{vacancy.title}</h3>
                                <p className="text-muted-foreground">{vacancy.company}</p>
                              </div>
                              <Badge variant="outline">{vacancy.type}</Badge>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Опубликовано: {vacancy.posted}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Zap className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Откликов: {vacancy.applicants}</span>
                              </div>
                              <div className="flex items-center space-x-2 col-span-2">
                                <Check className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Зарплата: {vacancy.salary}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-1">Требуемые навыки:</h4>
                              <div className="flex flex-wrap gap-1">
                                {vacancy.skills.map((skill: string) => (
                                  <Badge key={skill} 
                                    variant={selectedCandidate.skills.includes(skill) ? "default" : "secondary"} 
                                    className="mr-1 mb-1"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm">
                                    <Check className="h-4 w-4 mr-2" />
                                    Предложить
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Отправить предложение</DialogTitle>
                                    <DialogDescription>
                                      Предложить кандидату {selectedCandidate.name} вакансию {vacancy.title}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p>Кандидат получит уведомление о подходящей вакансии и запрос на присоединение к процессу подбора.</p>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Отмена</Button>
                                    <Button onClick={() => handleApplyToVacancy(vacancy.id)}>Отправить предложение</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <Button variant="outline" size="sm" onClick={() => navigate(`/vacancies?id=${vacancy.id}`)}>
                                <Info className="h-4 w-4 mr-2" />
                                Подробнее
                              </Button>
                            </div>
                          </div>
                          
                          <div className="md:col-span-1 bg-muted p-6 border-t md:border-t-0 md:border-l">
                            <MatchScore 
                              score={vacancy.matchDetails.score} 
                              skillsMatch={vacancy.matchDetails.skillsMatch}
                              expMatch={vacancy.matchDetails.expMatch}
                              locationMatch={vacancy.matchDetails.locationMatch}
                              salaryMatch={vacancy.matchDetails.salaryMatch}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : matchType === 'vacancy-to-candidates' && selectedVacancy ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Вакансия</CardTitle>
                  <CardDescription>Сопоставление кандидатов для вакансии</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedVacancy.title}</h3>
                    <p className="text-muted-foreground">{selectedVacancy.company}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <Badge variant="outline">{selectedVacancy.type}</Badge>
                      {getStatusBadge('active')}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Зарплата:</span>
                      <span className="text-sm font-medium">{selectedVacancy.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Опубликовано:</span>
                      <span className="text-sm font-medium">{selectedVacancy.posted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Откликов:</span>
                      <span className="text-sm font-medium">{selectedVacancy.applicants}</span>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Требуемые навыки:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedVacancy.skills.map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="mr-1 mb-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(`/vacancies/${selectedVacancy.id}/pipeline`)}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Перейти к воронке найма
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Настройки поиска</CardTitle>
                  <CardDescription>Параметры сопоставления</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <TooltipProvider>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Приоритет навыков</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline">Высокий</Badge>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Навыки имеют высокий приоритет при сопоставлении (50%)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Приоритет опыта</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline">Средний</Badge>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Опыт имеет средний приоритет при сопоставлении (30%)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Приоритет локации</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline">Низкий</Badge>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Локация имеет низкий приоритет при сопоставлении (10%)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Приоритет зарплаты</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline">Низкий</Badge>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Зарплата имеет низкий приоритет при сопоставлении (10%)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Подходящие кандидаты</CardTitle>
                  <CardDescription>
                    Найдено {matches.length} подходящих кандидатов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {matches.map((candidate) => (
                      <div key={candidate.id} className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                          <div className="md:col-span-3 p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                                  {candidate.avatar ? (
                                    <img 
                                      src={candidate.avatar} 
                                      alt={candidate.name} 
                                      className="h-full w-full object-cover rounded-full"
                                    />
                                  ) : (
                                    <div className="text-sm font-semibold">
                                      {candidate.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                                  <p className="text-muted-foreground">{candidate.position}</p>
                                </div>
                              </div>
                              {getStatusBadge(candidate.status)}
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Опыт: {candidate.experience}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Zap className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Локация: {candidate.location}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-1">Ключевые навыки:</h4>
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.map((skill: string) => (
                                  <Badge key={skill} 
                                    variant={selectedVacancy.skills.includes(skill) ? "default" : "secondary"} 
                                    className="mr-1 mb-1"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Связаться
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Связаться с кандидатом</DialogTitle>
                                    <DialogDescription>
                                      Отправить приглашение кандидату {candidate.name} на вакансию {selectedVacancy.title}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p>Кандидат получит уведомление о подходящей вакансии и приглашение на собеседование.</p>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Отмена</Button>
                                    <Button onClick={() => handleContactCandidate(candidate.id)}>Отправить приглашение</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewInPipeline(candidate.id, selectedVacancy.id)}
                              >
                                <Info className="h-4 w-4 mr-2" />
                                Добавить в воронку
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => navigate(`/candidates?id=${candidate.id}`)}
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="md:col-span-1 bg-muted p-6 border-t md:border-t-0 md:border-l">
                            <MatchScore 
                              score={candidate.matchDetails.score} 
                              skillsMatch={candidate.matchDetails.skillsMatch}
                              expMatch={candidate.matchDetails.expMatch}
                              locationMatch={candidate.matchDetails.locationMatch}
                              salaryMatch={candidate.matchDetails.salaryMatch}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="flex items-center justify-center p-10">
            <div className="text-center">
              <Info className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-medium mt-4">Нет выбранного элемента</h3>
              <p className="text-muted-foreground mt-2">
                Выберите кандидата или вакансию для сопоставления
              </p>
              <Button className="mt-4" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться к списку
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CandidateMatch;

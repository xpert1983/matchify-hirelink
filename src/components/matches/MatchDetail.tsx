
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarDays, 
  MessageSquare, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  GraduationCap,
  BuildingIcon,
  Clock,
  UserCircle2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  History,
  Users
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface MatchDetailProps {
  match: any;
}

const MatchDetail: React.FC<MatchDetailProps> = ({ match }) => {
  const [currentStatus, setCurrentStatus] = useState(match.status);
  
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
  
  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    toast.success('Статус подбора обновлен', {
      description: `Новый статус: ${translateStatus(newStatus)}`
    });
  };
  
  // Match history (fake data)
  const matchHistory = [
    { 
      date: '15 мая 2023', 
      action: 'Изменен статус', 
      from: 'Screening', 
      to: 'Interview',
      user: 'Анна Смирнова' 
    },
    { 
      date: '10 мая 2023', 
      action: 'Добавлен комментарий', 
      comment: 'Кандидат хорошо подходит на должность, назначено техническое интервью.',
      user: 'Иван Петров' 
    },
    { 
      date: '5 мая 2023', 
      action: 'Изменен статус', 
      from: 'Contacted', 
      to: 'Screening',
      user: 'Мария Иванова' 
    },
    { 
      date: '1 мая 2023', 
      action: 'Создано совпадение', 
      score: '92%',
      user: 'Система' 
    }
  ];
  
  // Skill comparison data
  const skillComparison = match.candidate?.skills.map((skill: string) => {
    const isMatched = match.vacancy?.skills.includes(skill);
    return { skill, isMatched };
  });
  
  const matchedSkillsCount = skillComparison?.filter((item: any) => item.isMatched).length || 0;
  const matchedSkillsPercentage = Math.round((matchedSkillsCount / match.vacancy?.skills.length) * 100);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-8/12 space-y-6">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Информация о подборе</h2>
                  <p className="text-sm text-muted-foreground">ID: {match.id}</p>
                </div>
                <Badge variant="outline" className={getStatusColor(currentStatus)}>
                  {translateStatus(currentStatus)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-background">
                      <AvatarImage src={match.candidate?.avatar} alt={match.candidate?.name} />
                      <AvatarFallback>{match.candidate?.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{match.candidate?.name}</h3>
                      <p className="text-muted-foreground">{match.candidate?.position}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-md bg-white border border-border">
                      <AvatarImage src={match.vacancy?.logo} alt={match.vacancy?.company} className="object-contain p-2" />
                      <AvatarFallback className="rounded-md">{match.vacancy?.company.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{match.vacancy?.title}</h3>
                      <p className="text-muted-foreground">{match.vacancy?.company}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-2 flex justify-between items-center">
                    <h3 className="font-semibold">Оценка совпадения</h3>
                    <Badge 
                      variant="outline" 
                      className={
                        match.matchScore >= 80 ? "bg-green-100 text-green-800" : 
                        match.matchScore >= 60 ? "bg-amber-100 text-amber-800" :
                        "bg-red-100 text-red-800"
                      }
                    >
                      {match.matchScore}%
                    </Badge>
                  </div>
                  <Progress value={match.matchScore} className="h-2.5" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm text-muted-foreground">Совпадение навыков</p>
                      <p className="text-xl font-semibold">{matchedSkillsPercentage}%</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm text-muted-foreground">Совпадение опыта</p>
                      <p className="text-xl font-semibold">85%</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm text-muted-foreground">Профильное соответствие</p>
                      <p className="text-xl font-semibold">90%</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Сравнение навыков</h3>
                  <div className="space-y-3">
                    {skillComparison?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        {item.isMatched ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span className={item.isMatched ? "" : "text-muted-foreground"}>{item.skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="details">Детали</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
              <TabsTrigger value="notes">Заметки</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <UserCircle2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Информация о кандидате</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-y-3">
                      <div className="text-sm text-muted-foreground">Местоположение:</div>
                      <div className="text-sm">{match.candidate?.location}</div>
                      
                      <div className="text-sm text-muted-foreground">Опыт работы:</div>
                      <div className="text-sm">{match.candidate?.experience}</div>
                      
                      <div className="text-sm text-muted-foreground">Образование:</div>
                      <div className="text-sm">{match.candidate?.education}</div>
                      
                      <div className="text-sm text-muted-foreground">Email:</div>
                      <div className="text-sm">{match.candidate?.email}</div>
                      
                      <div className="text-sm text-muted-foreground">Телефон:</div>
                      <div className="text-sm">{match.candidate?.phone}</div>
                      
                      <div className="text-sm text-muted-foreground">Статус:</div>
                      <Badge variant="outline" className={getStatusColor(match.candidate?.status)}>
                        {translateStatus(match.candidate?.status)}
                      </Badge>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={`/candidates?id=${match.candidate?.id}`} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Открыть профиль
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Информация о вакансии</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-y-3">
                      <div className="text-sm text-muted-foreground">Компания:</div>
                      <div className="text-sm">{match.vacancy?.company}</div>
                      
                      <div className="text-sm text-muted-foreground">Местоположение:</div>
                      <div className="text-sm">{match.vacancy?.location}</div>
                      
                      <div className="text-sm text-muted-foreground">Тип:</div>
                      <div className="text-sm">{translateVacancyType(match.vacancy?.type)}</div>
                      
                      <div className="text-sm text-muted-foreground">Зарплата:</div>
                      <div className="text-sm">{match.vacancy?.salary}</div>
                      
                      <div className="text-sm text-muted-foreground">Опубликовано:</div>
                      <div className="text-sm">{match.vacancy?.posted}</div>
                      
                      <div className="text-sm text-muted-foreground">Кандидатов:</div>
                      <div className="text-sm">{match.vacancy?.applicants}</div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={`/vacancies?id=${match.vacancy?.id}`} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Открыть вакансию
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">История активности</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matchHistory.map((item, index) => (
                      <div key={index} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div className="w-16 flex-shrink-0 text-sm text-muted-foreground">
                          {item.date}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{item.action}</p>
                            <span className="text-xs text-muted-foreground">({item.user})</span>
                          </div>
                          {item.from && item.to && (
                            <p className="text-sm mt-1">
                              <Badge variant="outline" size="sm" className={getStatusColor(item.from)} style={{fontSize: '10px'}}>
                                {translateStatus(item.from)}
                              </Badge>
                              <span className="mx-2">→</span>
                              <Badge variant="outline" size="sm" className={getStatusColor(item.to)} style={{fontSize: '10px'}}>
                                {translateStatus(item.to)}
                              </Badge>
                            </p>
                          )}
                          {item.comment && (
                            <p className="text-sm mt-1 text-muted-foreground">{item.comment}</p>
                          )}
                          {item.score && (
                            <p className="text-sm mt-1">Рейтинг совпадения: <span className="font-medium">{item.score}</span></p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Заметки</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Результаты технического интервью</h4>
                        <span className="text-sm text-muted-foreground">15 мая 2023</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Иван Петров</p>
                      <p className="text-sm">
                        Кандидат успешно прошел техническое интервью. Продемонстрировал хорошее знание технологий и способность решать сложные задачи. Рекомендую перейти к следующему этапу.
                      </p>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Первичный скрининг</h4>
                        <span className="text-sm text-muted-foreground">5 мая 2023</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Мария Иванова</p>
                      <p className="text-sm">
                        Кандидат соответствует основным требованиям вакансии. Имеет необходимый опыт и навыки. Готов к техническому интервью.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Добавить заметку
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:w-4/12 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Обновить статус</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select 
                value={currentStatus} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Contacted">Связались</SelectItem>
                  <SelectItem value="Screening">Скрининг</SelectItem>
                  <SelectItem value="Interview">Интервью</SelectItem>
                  <SelectItem value="Offered">Оффер</SelectItem>
                  <SelectItem value="Hired">Принят</SelectItem>
                  <SelectItem value="Rejected">Отклонен</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Текущий этап</h4>
                <div className="space-y-1">
                  {['Contacted', 'Screening', 'Interview', 'Offered', 'Hired'].map((status, index) => (
                    <div key={status} className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center 
                        ${currentStatus === status || 
                          (['Contacted', 'Screening', 'Interview', 'Offered', 'Hired'].indexOf(currentStatus) > index) 
                            ? 'bg-primary text-white' 
                            : 'bg-secondary text-muted-foreground'}`}>
                        {index + 1}
                      </div>
                      <div className="text-sm">{translateStatus(status)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Запланированные действия</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 p-2 rounded-md">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Техническое интервью</p>
                    <p className="text-xs text-muted-foreground">20 мая, 14:00</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <CalendarDays className="h-4 w-4 mr-2" />
                Запланировать действие
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Команда подбора</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>ИП</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Иван Петров</p>
                    <p className="text-xs text-muted-foreground">Технический интервьюер</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>МИ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Мария Иванова</p>
                    <p className="text-xs text-muted-foreground">HR-менеджер</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>АС</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Анна Смирнова</p>
                    <p className="text-xs text-muted-foreground">Рекрутер</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Добавить участника
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Building, MapPin, Users, Calendar, DollarSign, Briefcase, GraduationCap, Clock, Mail, Phone, Globe, MessageSquare, FileText } from "lucide-react";
import { VacancyProps } from './VacancyCard';
import { VacancyStatus } from './VacancyStatusBadge';
import PDFExporter from '../common/PDFExporter';
import CommentSystem from '../comments/CommentSystem';
import { useNotifications } from '@/hooks/use-notifications';
import { toast } from 'sonner';

// Define an extended interface that includes all the properties needed by VacancyDetail
interface ExtendedVacancyProps extends VacancyProps {
  requirements?: string[];
  responsibilities?: string[];
  status?: VacancyStatus;
  department?: string;
  experienceRequired?: string;
  postedDate?: string;
}

interface VacancyDetailProps {
  vacancy: ExtendedVacancyProps;
}

const VacancyDetail: React.FC<VacancyDetailProps> = ({ vacancy }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { addNotification } = useNotifications();
  
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

  // Fake data for details section
  const contactPerson = {
    name: "Михаил Петров",
    position: "HR-менеджер",
    email: "m.petrov@" + vacancy.company.toLowerCase().replace(/\s/g, '') + ".ru",
    phone: "+7 (999) 123-45-67"
  };

  // Use postedDate if available, otherwise fall back to posted
  const displayDate = vacancy.postedDate || vacancy.posted;
  
  // Make sure experienceRequired is treated as a string when used
  const experienceYears = vacancy.experienceRequired ? vacancy.experienceRequired.toString() : "0";
  
  // Комментарии для тестирования
  const dummyComments = [
    {
      id: '1',
      text: 'Отличная вакансия! Мы уже нашли несколько подходящих кандидатов.',
      author: {
        name: 'Анна Смирнова',
        avatar: '/placeholder.svg'
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      likes: 2,
      isLiked: true
    },
    {
      id: '2',
      text: 'Нужно ускорить процесс найма. Заказчик ждет.',
      author: {
        name: 'Иван Петров',
        avatar: '/placeholder.svg'
      },
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      likes: 0
    }
  ];
  
  const handleCloseVacancy = () => {
    toast.success(`Вакансия "${vacancy.title}" закрыта`, {
      description: "Вакансия перемещена в архив"
    });
    
    // Добавляем уведомление
    addNotification({
      title: 'Вакансия закрыта',
      message: `Вакансия "${vacancy.title}" была закрыта`,
      type: 'vacancy'
    });
  };
  
  const handleShare = () => {
    // Копируем ссылку в буфер обмена
    navigator.clipboard.writeText(window.location.href);
    
    toast.success('Ссылка скопирована в буфер обмена');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="candidates">Кандидаты</TabsTrigger>
          <TabsTrigger value="comments">Комментарии</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Avatar className="h-20 w-20 rounded-md bg-white border border-border">
                      <AvatarImage src={vacancy.logo} alt={vacancy.company} className="object-contain p-2" />
                      <AvatarFallback className="rounded-md">{vacancy.company.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{vacancy.title}</h2>
                      <p className="text-lg text-muted-foreground">{vacancy.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
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
                      Опубликовано {displayDate}
                    </Badge>
                    {vacancy.applicants !== undefined && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {vacancy.applicants} кандидатов
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {vacancy.salary}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Описание вакансии</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{vacancy.description}</p>
                    <p className="text-muted-foreground mt-4">
                      Мы ищем талантливого специалиста, который присоединится к нашей команде и будет участвовать в развитии ключевых проектов компании. Успешный кандидат будет работать в динамичной среде, где поощряются инновации и профессиональный рост.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Требования</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Высшее образование в соответствующей области</li>
                      <li>Опыт работы от {experienceYears} лет</li>
                      <li>Отличные коммуникативные навыки</li>
                      <li>Умение работать в команде</li>
                      <li>Аналитическое мышление и внимание к деталям</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Что мы предлагаем</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Конкурентную заработную плату: {vacancy.salary}</li>
                      <li>Гибкий график работы</li>
                      <li>Возможности для профессионального роста</li>
                      <li>Дружную команду профессионалов</li>
                      <li>Современный офис в центре города</li>
                    </ul>
                  </div>
                  
                  {vacancy.skills && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Необходимые навыки</h3>
                      <div className="flex flex-wrap gap-2">
                        {vacancy.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="md:w-1/3">
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <h3 className="font-medium">Контактная информация</h3>
                      
                      <div className="flex items-center gap-3 border-b pb-3">
                        <Avatar>
                          <AvatarFallback>{contactPerson.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contactPerson.name}</p>
                          <p className="text-sm text-muted-foreground">{contactPerson.position}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{contactPerson.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{contactPerson.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{vacancy.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>www.{vacancy.company.toLowerCase().replace(/\s/g, '')}.ru</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Дата публикации:</span>
                          <span>{displayDate}</span>
                        </div>
                        {vacancy.applicants !== undefined && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Заявок получено:</span>
                            <span>{vacancy.applicants}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">ID вакансии:</span>
                          <span>{vacancy.id}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        Подобрать кандидатов
                      </Button>
                      <PDFExporter 
                        data={vacancy}
                        entityName={vacancy.title}
                        entityType="vacancy"
                        className="w-auto"
                      />
                    </CardFooter>
                  </Card>

                  <div className="mt-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Похожие вакансии</h3>
                        <div className="space-y-3">
                          {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                              <Avatar className="h-8 w-8 rounded-md">
                                <AvatarFallback className="text-xs rounded-md">
                                  {String.fromCharCode(65 + i)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{vacancy.title.split(' ').slice(0, 2).join(' ') + (i + 1)}</p>
                                <p className="text-xs text-muted-foreground">Компания {String.fromCharCode(65 + i)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 bg-secondary/30 flex justify-end gap-2">
              <Button variant="outline">
                Сохранить
              </Button>
              <Button variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900" onClick={handleShare}>
                Поделиться
              </Button>
              <Button variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900" onClick={handleCloseVacancy}>
                Закрыть вакансию
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Редактировать
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="candidates">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Подходящие кандидаты</CardTitle>
              <CardDescription>
                Кандидаты, которые соответствуют требованиям этой вакансии
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-center p-6">
                  <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">
                    Пока нет подходящих кандидатов для этой вакансии
                  </p>
                  <Button className="mt-4">
                    Найти кандидатов
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Обсуждение вакансии</CardTitle>
              <CardDescription>
                Комментарии и заметки к вакансии "{vacancy.title}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommentSystem 
                entityId={vacancy.id}
                entityType="vacancy"
                comments={dummyComments}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VacancyDetail;

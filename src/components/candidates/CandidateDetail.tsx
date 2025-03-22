
import React from 'react';
import { CandidateProps } from './CandidateCard';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  Calendar,
  FileText,
  Link,
  Clock,
  Star,
  MessageSquare,
  CalendarDays
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface CandidateDetailProps {
  candidate: CandidateProps;
}

const CandidateDetail: React.FC<CandidateDetailProps> = ({ candidate }) => {
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

  // Generate fake skill levels for visualization
  const skillLevels = candidate.skills.map(skill => ({
    name: skill,
    level: Math.floor(Math.random() * 40) + 60 // Random value between 60-100
  }));

  // Generate fake interview history
  const interviewHistory = [
    {
      date: "15 мая 2023",
      company: "ТехноСофт",
      position: "Senior Developer",
      feedback: "Хорошие технические навыки, но требуется улучшение коммуникативных навыков",
      rating: 4
    },
    {
      date: "3 апреля 2023",
      company: "ИнноваПлюс",
      position: "Middle Developer",
      feedback: "Отличное знание архитектуры, показал сильные аналитические навыки",
      rating: 5
    },
    {
      date: "21 февраля 2023",
      company: "ДиджиталХаб",
      position: "Team Lead",
      feedback: "Хорошее понимание процессов разработки, недостаточный опыт управления",
      rating: 3
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3 space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-2 border-background">
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center flex-wrap gap-2">
                    <h2 className="text-2xl font-bold">{candidate.name}</h2>
                    <Badge variant="outline" className={getStatusColor(candidate.status)}>
                      {translateStatus(candidate.status)}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">{candidate.position}</p>
                  <div className="flex flex-wrap mt-2 gap-2">
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
                </div>
              </div>
              
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="profile">Профиль</TabsTrigger>
                  <TabsTrigger value="skills">Навыки</TabsTrigger>
                  <TabsTrigger value="history">История собеседований</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">О кандидате</h3>
                    <p className="text-muted-foreground">
                      {candidate.name} - опытный специалист с {candidate.experience} опыта работы в сфере разработки программного обеспечения. Обладает глубокими знаниями в {candidate.skills.slice(0, 3).join(', ')} и других технологиях. 
                      Выпускник {candidate.education}, постоянно совершенствует свои навыки и следит за новыми тенденциями в индустрии.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      В предыдущих проектах демонстрировал высокую производительность, умение работать в команде и находить инновационные решения сложных задач. Стремится к профессиональному росту и новым вызовам.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Опыт работы</h3>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">Ведущий разработчик</h4>
                          <span className="text-sm text-muted-foreground">2021 - настоящее время</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">ТехноСофт</p>
                        <p className="text-sm">
                          Руководство командой разработчиков, проектирование архитектуры, код-ревью, оптимизация производительности приложений.
                        </p>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">Разработчик</h4>
                          <span className="text-sm text-muted-foreground">2018 - 2021</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">ИнноваПлюс</p>
                        <p className="text-sm">
                          Разработка и поддержка веб-приложений, интеграция с API, оптимизация баз данных, тестирование.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Технические навыки</h3>
                    <div className="space-y-3">
                      {skillLevels.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Языки</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Русский</span>
                          <span className="text-muted-foreground">Родной</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Английский</span>
                          <span className="text-muted-foreground">B2</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50">Teamwork</Badge>
                    <Badge variant="outline" className="bg-blue-50">Problem Solving</Badge>
                    <Badge variant="outline" className="bg-blue-50">Communication</Badge>
                    <Badge variant="outline" className="bg-blue-50">Leadership</Badge>
                    <Badge variant="outline" className="bg-blue-50">Agile</Badge>
                    <Badge variant="outline" className="bg-blue-50">Project Management</Badge>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">История собеседований</h3>
                    <div className="space-y-4">
                      {interviewHistory.map((interview, index) => (
                        <div key={index} className="rounded-md border p-4">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-medium">{interview.company}</h4>
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < interview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3" />
                            <span>{interview.date}</span>
                            <span>•</span>
                            <span>{interview.position}</span>
                          </div>
                          <p className="text-sm">
                            {interview.feedback}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:w-1/3">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-medium">Контактная информация</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Link className="h-4 w-4 text-muted-foreground" />
                      <span>linkedin.com/in/{candidate.name.toLowerCase().replace(' ', '-')}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Желаемая зарплата:</span>
                      <span>150 000 - 200 000 ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Готовность к переезду:</span>
                      <span>Возможна</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Формат работы:</span>
                      <span>Удаленно/Офис</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Подобрать вакансии
                  </Button>
                  <Button variant="outline" className="w-full">
                    Скачать резюме
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Запланированные действия</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-blue-100 text-blue-800 p-2 rounded-md">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Связаться по телефону</p>
                          <p className="text-xs text-muted-foreground">Завтра, 15:00</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-purple-100 text-purple-800 p-2 rounded-md">
                          <CalendarDays className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Техническое собеседование</p>
                          <p className="text-xs text-muted-foreground">15 июня, 11:00</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Добавить действие
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Прикрепленные файлы</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-red-100 text-red-800 p-2 rounded-md">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Резюме_Иванов.pdf</p>
                          <p className="text-xs text-muted-foreground">PDF, 2.3 MB</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Link className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-green-100 text-green-800 p-2 rounded-md">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Сертификаты.zip</p>
                          <p className="text-xs text-muted-foreground">ZIP, 4.1 MB</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Link className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-secondary/30 flex justify-end gap-2">
          <Button variant="outline">
            Добавить заметку
          </Button>
          <Button variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900">
            Отправить сообщение
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Запланировать собеседование
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CandidateDetail;

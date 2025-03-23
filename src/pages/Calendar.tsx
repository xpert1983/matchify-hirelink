
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Filter, 
  Plus, 
  User, 
  Users, 
  Video,
  MapPin,
  Briefcase
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, getDay, isToday, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { toast } from 'sonner';
import { useNotifications } from '@/hooks/use-notifications';

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'interview' | 'meeting' | 'task' | 'reminder';
  location: string;
  description?: string;
  participants: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  relatedVacancy?: {
    id: string;
    title: string;
  };
  relatedCandidate?: {
    id: string;
    name: string;
  };
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    type: 'interview' as Event['type'],
    location: 'Google Meet',
    description: '',
    candidateName: '',
    vacancyTitle: ''
  });
  const { addNotification } = useNotifications();
  
  // Генерируем тестовые события
  const generateEvents = (): Event[] => {
    const now = new Date();
    const events: Event[] = [];
    
    // Сегодняшние события
    events.push({
      id: '1',
      title: 'Собеседование с Иваном Петровым',
      date: now,
      startTime: '10:00',
      endTime: '11:00',
      type: 'interview',
      location: 'Google Meet',
      description: 'Первичное собеседование на позицию Frontend Developer',
      participants: [
        { id: 'u1', name: 'Анна Смирнова', role: 'HR Manager', avatar: '/placeholder.svg' },
        { id: 'u2', name: 'Михаил Козлов', role: 'Tech Lead', avatar: '/placeholder.svg' }
      ],
      relatedVacancy: { id: 'v1', title: 'Frontend Developer' },
      relatedCandidate: { id: 'c1', name: 'Иван Петров' }
    });
    
    // События на завтра
    const tomorrow = addDays(now, 1);
    events.push({
      id: '2',
      title: 'Техническое собеседование с Еленой Соколовой',
      date: tomorrow,
      startTime: '14:00',
      endTime: '15:30',
      type: 'interview',
      location: 'Zoom',
      description: 'Техническое собеседование на позицию UX Designer',
      participants: [
        { id: 'u1', name: 'Анна Смирнова', role: 'HR Manager', avatar: '/placeholder.svg' },
        { id: 'u3', name: 'Дмитрий Волков', role: 'Design Lead', avatar: '/placeholder.svg' }
      ],
      relatedVacancy: { id: 'v2', title: 'UX Designer' },
      relatedCandidate: { id: 'c2', name: 'Елена Соколова' }
    });
    
    // События на следующую неделю
    const nextWeek = addDays(now, 5);
    events.push({
      id: '3',
      title: 'Встреча команды рекрутинга',
      date: nextWeek,
      startTime: '11:00',
      endTime: '12:00',
      type: 'meeting',
      location: 'Переговорная #2',
      description: 'Еженедельная встреча команды HR и рекрутинга',
      participants: [
        { id: 'u1', name: 'Анна Смирнова', role: 'HR Manager', avatar: '/placeholder.svg' },
        { id: 'u4', name: 'Ольга Петрова', role: 'Recruiter', avatar: '/placeholder.svg' },
        { id: 'u5', name: 'Сергей Иванов', role: 'HR Director', avatar: '/placeholder.svg' }
      ]
    });
    
    return events;
  };
  
  const [events, setEvents] = useState<Event[]>(generateEvents());
  
  const navigateWeek = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setWeekStart(subWeeks(weekStart, 1));
    } else {
      setWeekStart(addWeeks(weekStart, 1));
    }
  };
  
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const filteredEvents = events.filter(event => {
    if (view === 'day') {
      return isSameDay(event.date, selectedDate);
    } else if (view === 'week') {
      return weekDays.some(day => isSameDay(day, event.date));
    }
    return true;
  });
  
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'task': return 'bg-green-100 text-green-800';
      case 'reminder': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventDetails.title,
      date: eventDetails.date,
      startTime: eventDetails.startTime,
      endTime: eventDetails.endTime,
      type: eventDetails.type,
      location: eventDetails.location,
      description: eventDetails.description,
      participants: [
        { id: 'u1', name: 'Анна Смирнова', role: 'HR Manager', avatar: '/placeholder.svg' },
      ],
      ...(eventDetails.candidateName ? {
        relatedCandidate: { id: 'c-new', name: eventDetails.candidateName }
      } : {}),
      ...(eventDetails.vacancyTitle ? {
        relatedVacancy: { id: 'v-new', title: eventDetails.vacancyTitle }
      } : {})
    };
    
    setEvents([...events, newEvent]);
    setShowAddEvent(false);
    
    // Сбросить форму
    setEventDetails({
      title: '',
      date: new Date(),
      startTime: '10:00',
      endTime: '11:00',
      type: 'interview',
      location: 'Google Meet',
      description: '',
      candidateName: '',
      vacancyTitle: ''
    });
    
    toast.success('Событие добавлено в календарь');
    
    // Добавляем уведомление
    addNotification({
      title: 'Новое событие в календаре',
      message: `${newEvent.title} запланировано на ${format(newEvent.date, 'dd.MM.yyyy')} в ${newEvent.startTime}`,
      type: 'interview'
    });
  };
  
  const getEventsByDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Календарь</h1>
            <p className="text-muted-foreground">
              Планирование и управление собеседованиями и встречами
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
              Сегодня
            </Button>
            
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Select value={view} onValueChange={(value) => setView(value as any)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">День</SelectItem>
                <SelectItem value="week">Неделя</SelectItem>
                <SelectItem value="month">Месяц</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => setShowAddEvent(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить событие
            </Button>
          </div>
        </div>
        
        <div className="flex gap-6">
          <div className="hidden md:block w-64">
            <Card className="sticky top-[100px]">
              <CardContent className="p-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
                
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-sm">Типы событий</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Собеседования</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Встречи</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Задачи</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Напоминания</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full" size="sm">
                    <Filter className="h-3 w-3 mr-2" />
                    Фильтры
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>
                  {view === 'day' && format(selectedDate, 'd MMMM yyyy', { locale: ru })}
                  {view === 'week' && (
                    <>
                      {format(weekStart, 'd MMMM', { locale: ru })} - {format(addDays(weekStart, 6), 'd MMMM yyyy', { locale: ru })}
                    </>
                  )}
                  {view === 'month' && format(selectedDate, 'LLLL yyyy', { locale: ru })}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {view === 'week' && (
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDays.map((day, index) => (
                      <div 
                        key={index}
                        className={`text-center p-2 rounded-md cursor-pointer transition-colors ${
                          isToday(day) ? 'bg-primary text-white' : 'hover:bg-secondary'
                        }`}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className="text-xs uppercase">{format(day, 'EEEEEE', { locale: ru })}</div>
                        <div className="text-lg font-semibold">{format(day, 'd')}</div>
                        {getEventsByDay(day).length > 0 && (
                          <div className="mt-1">
                            <Badge variant="outline" className="text-xs">
                              {getEventsByDay(day).length}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="timeline">Таймлайн</TabsTrigger>
                    <TabsTrigger value="list">Список</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="timeline" className="space-y-4">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <Card key={event.id} className="hover-lift">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="min-w-[60px] text-center">
                                <div className="font-medium">{event.startTime}</div>
                                <div className="text-sm text-muted-foreground">{event.endTime}</div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-medium">{event.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                                        {event.type === 'interview' ? 'Собеседование' : 
                                          event.type === 'meeting' ? 'Встреча' : 
                                          event.type === 'task' ? 'Задача' : 'Напоминание'}
                                      </Badge>
                                      
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {format(event.date, 'dd.MM.yyyy', { locale: ru })}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex -space-x-2">
                                    {event.participants.slice(0, 3).map((participant) => (
                                      <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                                        <AvatarImage src={participant.avatar} />
                                        <AvatarFallback className="text-[10px]">
                                          {participant.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                    ))}
                                    {event.participants.length > 3 && (
                                      <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px]">
                                        +{event.participants.length - 3}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="mt-2 space-y-1 text-sm">
                                  <div className="flex items-center text-muted-foreground">
                                    {event.location.includes('Zoom') || event.location.includes('Meet') ? (
                                      <Video className="h-3 w-3 mr-1" />
                                    ) : (
                                      <MapPin className="h-3 w-3 mr-1" />
                                    )}
                                    {event.location}
                                  </div>
                                  
                                  {event.relatedVacancy && (
                                    <div className="flex items-center text-muted-foreground">
                                      <Briefcase className="h-3 w-3 mr-1" />
                                      Вакансия: {event.relatedVacancy.title}
                                    </div>
                                  )}
                                  
                                  {event.relatedCandidate && (
                                    <div className="flex items-center text-muted-foreground">
                                      <User className="h-3 w-3 mr-1" />
                                      Кандидат: {event.relatedCandidate.name}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center p-10 border rounded-lg">
                        <CalendarIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-muted-foreground">
                          Нет запланированных событий на выбранную дату
                        </p>
                        <Button className="mt-4" onClick={() => setShowAddEvent(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Добавить событие
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="list">
                    <Card>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[600px]">
                          <table className="w-full">
                            <thead className="bg-secondary/50">
                              <tr>
                                <th className="text-left p-4 text-sm font-medium">Название</th>
                                <th className="text-left p-4 text-sm font-medium">Дата и время</th>
                                <th className="text-left p-4 text-sm font-medium">Тип</th>
                                <th className="text-left p-4 text-sm font-medium">Место</th>
                                <th className="text-left p-4 text-sm font-medium">Участники</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {filteredEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-secondary/30 transition-colors">
                                  <td className="p-4 text-sm">
                                    <div className="font-medium">{event.title}</div>
                                    {event.relatedVacancy && (
                                      <div className="text-xs text-muted-foreground">
                                        {event.relatedVacancy.title}
                                      </div>
                                    )}
                                  </td>
                                  <td className="p-4 text-sm">
                                    <div>{format(event.date, 'dd.MM.yyyy', { locale: ru })}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {event.startTime} - {event.endTime}
                                    </div>
                                  </td>
                                  <td className="p-4 text-sm">
                                    <Badge variant="outline" className={getEventTypeColor(event.type)}>
                                      {event.type === 'interview' ? 'Собеседование' : 
                                        event.type === 'meeting' ? 'Встреча' : 
                                        event.type === 'task' ? 'Задача' : 'Напоминание'}
                                    </Badge>
                                  </td>
                                  <td className="p-4 text-sm">{event.location}</td>
                                  <td className="p-4 text-sm">
                                    <div className="flex items-center gap-1">
                                      <Users className="h-3 w-3" />
                                      <span>{event.participants.length}</span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Добавить событие</DialogTitle>
            <DialogDescription>
              Создайте новое событие в календаре
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Название события</Label>
              <Input 
                id="title" 
                value={eventDetails.title} 
                onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Тип события</Label>
              <Select 
                value={eventDetails.type} 
                onValueChange={(value) => setEventDetails({...eventDetails, type: value as Event['type']})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview">Собеседование</SelectItem>
                  <SelectItem value="meeting">Встреча</SelectItem>
                  <SelectItem value="task">Задача</SelectItem>
                  <SelectItem value="reminder">Напоминание</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Дата</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(eventDetails.date, 'dd.MM.yyyy', { locale: ru })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={eventDetails.date}
                      onSelect={(date) => date && setEventDetails({...eventDetails, date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Место проведения</Label>
                <Input 
                  id="location" 
                  value={eventDetails.location} 
                  onChange={(e) => setEventDetails({...eventDetails, location: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Время начала</Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  value={eventDetails.startTime}
                  onChange={(e) => setEventDetails({...eventDetails, startTime: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endTime">Время окончания</Label>
                <Input 
                  id="endTime" 
                  type="time"
                  value={eventDetails.endTime}
                  onChange={(e) => setEventDetails({...eventDetails, endTime: e.target.value})}
                />
              </div>
            </div>
            
            {eventDetails.type === 'interview' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="candidateName">Имя кандидата</Label>
                  <Input 
                    id="candidateName" 
                    value={eventDetails.candidateName}
                    onChange={(e) => setEventDetails({...eventDetails, candidateName: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="vacancyTitle">Название вакансии</Label>
                  <Input 
                    id="vacancyTitle" 
                    value={eventDetails.vacancyTitle}
                    onChange={(e) => setEventDetails({...eventDetails, vacancyTitle: e.target.value})}
                  />
                </div>
              </>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea 
                id="description" 
                value={eventDetails.description}
                onChange={(e) => setEventDetails({...eventDetails, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEvent(false)}>Отмена</Button>
            <Button onClick={handleAddEvent} disabled={!eventDetails.title}>Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Calendar;

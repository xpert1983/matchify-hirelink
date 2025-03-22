
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { format, isToday, isTomorrow, addDays } from 'date-fns';
import { CalendarIcon, Clock, MapPin, Users, Plus } from 'lucide-react';
import { ru } from 'date-fns/locale';

interface Interview {
  id: string;
  candidateName: string;
  candidateAvatar?: string;
  vacancyTitle: string;
  date: Date;
  time: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface InterviewCalendarProps {
  interviews: Interview[];
  onAddInterview?: () => void;
}

const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ interviews, onAddInterview }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  
  const interviewsByDate = interviews.reduce((acc, interview) => {
    const dateStr = format(interview.date, 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(interview);
    return acc;
  }, {} as Record<string, Interview[]>);

  const currentDateInterviews = selectedDate 
    ? interviewsByDate[format(selectedDate, 'yyyy-MM-dd')] || []
    : [];

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Сегодня';
    if (isTomorrow(date)) return 'Завтра';
    return format(date, 'EEEE, d MMMM', { locale: ru });
  };

  const getStatusBadge = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Запланировано</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Завершено</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Отменено</Badge>;
      default:
        return null;
    }
  };

  // Function to highlight dates with interviews
  const isDayWithInterview = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return !!interviewsByDate[dateStr];
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="md:w-1/2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Календарь собеседований</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={onAddInterview}
            >
              <Plus className="h-4 w-4" />
              Новое
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar 
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="p-3 pointer-events-auto rounded-md border mx-auto"
            modifiers={{
              withInterview: (date) => isDayWithInterview(date)
            }}
            modifiersStyles={{
              withInterview: { 
                fontWeight: "bold",
                backgroundColor: "rgb(219 234 254)",
                color: "rgb(30 64 175)"
              }
            }}
          />
        </CardContent>
      </Card>
      
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>
            {selectedDate ? getDateLabel(selectedDate) : 'Выберите дату'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentDateInterviews.length > 0 ? (
            <div className="space-y-4">
              {currentDateInterviews.map((interview) => (
                <Dialog key={interview.id}>
                  <DialogTrigger asChild>
                    <div 
                      className="flex items-start gap-4 p-3 rounded-lg border hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedInterview(interview)}
                    >
                      <Avatar>
                        <AvatarImage src={interview.candidateAvatar} />
                        <AvatarFallback>{interview.candidateName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{interview.candidateName}</h3>
                          <span className="text-sm text-muted-foreground">{interview.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{interview.vacancyTitle}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{interview.location}</span>
                        </div>
                        <div className="mt-2">
                          {getStatusBadge(interview.status)}
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Детали собеседования</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={interview.candidateAvatar} />
                          <AvatarFallback>{interview.candidateName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{interview.candidateName}</h3>
                          <p className="text-sm text-muted-foreground">{interview.vacancyTitle}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Дата</p>
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{format(interview.date, 'd MMMM yyyy', { locale: ru })}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Время</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{interview.time}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Место</p>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{interview.location}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Статус</p>
                          <div>{getStatusBadge(interview.status)}</div>
                        </div>
                      </div>
                      
                      {interview.notes && (
                        <div className="space-y-1 col-span-2">
                          <p className="text-sm font-medium">Заметки</p>
                          <p className="text-sm text-muted-foreground">{interview.notes}</p>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Редактировать</Button>
                      <Button variant={interview.status === 'completed' ? 'outline' : 'default'}>
                        {interview.status === 'completed' ? 'Повторить собеседование' : 'Отметить завершенным'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          ) : (
            <div className="h-[200px] flex flex-col items-center justify-center text-center p-6">
              <Users className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                {selectedDate ? 'Нет запланированных собеседований на этот день' : 'Выберите дату в календаре'}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={onAddInterview}
              >
                <Plus className="h-4 w-4 mr-2" />
                Назначить собеседование
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewCalendar;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentMatches from '@/components/dashboard/RecentMatches';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { vacanciesData, candidatesData } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Calculate top skills based on vacancies
  const getTopSkills = () => {
    const skillsCount: Record<string, number> = {};
    
    vacanciesData.forEach(vacancy => {
      vacancy.skills.forEach(skill => {
        skillsCount[skill] = (skillsCount[skill] || 0) + 1;
      });
    });
    
    return Object.entries(skillsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill, count]) => ({
        skill,
        count,
        percentage: Math.round((count / vacanciesData.length) * 100)
      }));
  };
  
  const topSkills = getTopSkills();

  // Handler for "New Vacancy" button
  const handleNewVacancy = () => {
    toast.success('Переход к созданию вакансии', {
      description: 'Функционал находится в разработке'
    });
    navigate('/vacancies');
  };

  // Handler for "New Candidate" button
  const handleNewCandidate = () => {
    toast.success('Переход к созданию кандидата', {
      description: 'Функционал находится в разработке'
    });
    navigate('/candidates');
  };

  // Quick actions handlers
  const handleViewCandidates = () => {
    toast('Просмотр профилей кандидатов');
    navigate('/candidates');
  };

  const handleUpdateVacancies = () => {
    toast('Обновление данных вакансий');
    navigate('/vacancies');
  };

  const handleScheduleInterviews = () => {
    toast('Планирование собеседований', {
      description: 'Открытие календаря собеседований'
    });
    // In a real app, this would navigate to an interview calendar page
    // For now, we'll just show a dialog
  };

  const handleCreateReport = () => {
    toast('Создание отчета', {
      description: 'Начат процесс генерации отчета'
    });
    // In a real app, this would start a report generation process
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Добро пожаловать!</h1>
            <p className="text-muted-foreground mt-1">Вот что происходит с вашим рекрутингом сегодня.</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleNewVacancy}>
              <Plus className="h-4 w-4 mr-2" />
              Новая вакансия
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" onClick={handleNewCandidate}>
              <Plus className="h-4 w-4 mr-2" />
              Новый кандидат
            </Button>
          </div>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentMatches />
          </div>
          
          <div className="space-y-6">
            <Card className="animate-slide-in" style={{ animationDelay: '200ms' }}>
              <CardHeader className="pb-3">
                <CardTitle>Востребованные навыки</CardTitle>
                <CardDescription>Наиболее запрашиваемые навыки в открытых вакансиях</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSkills.map(({ skill, percentage }) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{skill}</span>
                        <span className="text-muted-foreground">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-slide-in" style={{ animationDelay: '300ms' }}>
              <CardHeader className="pb-3">
                <CardTitle>Быстрые действия</CardTitle>
                <CardDescription>Начните с этих задач</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left" onClick={handleViewCandidates}>
                    Просмотреть новые профили кандидатов
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left" onClick={handleUpdateVacancies}>
                    Обновить данные вакансий
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        Запланировать собеседования
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Планирование собеседований</DialogTitle>
                        <DialogDescription>
                          Здесь вы можете запланировать собеседования с кандидатами.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p>Функционал календаря собеседований находится в разработке.</p>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button>Закрыть</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        Создать отчет о подборе
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Создание отчета</DialogTitle>
                        <DialogDescription>
                          Генерация отчета о текущем процессе подбора.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p>Выберите параметры для отчета:</p>
                        <div className="mt-4 space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Период:</p>
                            <Button variant="outline" size="sm" className="mr-2">Текущий месяц</Button>
                            <Button variant="outline" size="sm" className="mr-2">Прошлый месяц</Button>
                            <Button variant="outline" size="sm">Весь год</Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <Button onClick={handleCreateReport}>Создать отчет</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

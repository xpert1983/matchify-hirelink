
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import VacancyList from '@/components/vacancies/VacancyList';
import VacancyDetail from '@/components/vacancies/VacancyDetail';
import VacancyFilters from '@/components/vacancies/VacancyFilters';
import VacancyBulkActions from '@/components/vacancies/VacancyBulkActions';
import VacancyAnalytics from '@/components/analytics/VacancyAnalytics';
import InterviewCalendar from '@/components/calendar/InterviewCalendar';
import ImportExportData from '@/components/common/ImportExportData';
import { vacanciesData } from '@/lib/data';
import { VacancyProps } from '@/components/vacancies/VacancyCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { VacancyStatus } from '@/components/vacancies/VacancyStatusBadge';

interface ExtendedVacancyProps extends VacancyProps {
  requirements?: string[];
  responsibilities?: string[];
  status?: VacancyStatus;
  department?: string;
  experienceRequired?: string;
  postedDate?: string;
}

const Vacancies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([30000, 250000]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const params = new URLSearchParams(location.search);
  const vacancyId = params.get('id');

  const interviewsData = [
    {
      id: '1',
      candidateName: 'Анна Смирнова',
      vacancyTitle: 'Frontend Developer',
      date: new Date(),
      time: '15:00',
      location: 'Google Meet',
      status: 'scheduled' as const
    },
    {
      id: '2',
      candidateName: 'Иван Петров',
      vacancyTitle: 'UX Designer',
      date: new Date(Date.now() + 86400000),
      time: '11:30',
      location: 'Офис, переговорная #2',
      status: 'scheduled' as const
    },
    {
      id: '3',
      candidateName: 'Мария Иванова',
      vacancyTitle: 'Product Manager',
      date: new Date(Date.now() + 172800000),
      time: '14:00',
      location: 'Zoom',
      status: 'scheduled' as const
    }
  ];

  const analyticsData = {
    applicantsByVacancy: [
      { name: 'Frontend Developer', value: 42, color: '#4F46E5' },
      { name: 'UX Designer', value: 28, color: '#06B6D4' },
      { name: 'Product Manager', value: 35, color: '#8B5CF6' },
      { name: 'Backend Developer', value: 31, color: '#10B981' },
      { name: 'DevOps Engineer', value: 18, color: '#F59E0B' }
    ],
    applicationsByDay: [
      { date: '01/06', applications: 5 },
      { date: '02/06', applications: 7 },
      { date: '03/06', applications: 3 },
      { date: '04/06', applications: 8 },
      { date: '05/06', applications: 12 },
      { date: '06/06', applications: 10 },
      { date: '07/06', applications: 6 }
    ],
    conversionRates: [
      { stage: 'Просмотр', rate: 100, color: '#4F46E5' },
      { stage: 'Отклик', rate: 38, color: '#06B6D4' },
      { stage: 'Интервью', rate: 24, color: '#8B5CF6' },
      { stage: 'Оффер', rate: 12, color: '#10B981' },
      { stage: 'Найм', rate: 8, color: '#F59E0B' }
    ],
    vacanciesByDepartment: [
      { department: 'Разработка', count: 12, color: '#4F46E5' },
      { department: 'Дизайн', count: 5, color: '#06B6D4' },
      { department: 'Маркетинг', count: 8, color: '#8B5CF6' },
      { department: 'Продажи', count: 7, color: '#10B981' },
      { department: 'HR', count: 3, color: '#F59E0B' }
    ]
  };

  const typedVacancies: ExtendedVacancyProps[] = vacanciesData.map(vacancy => ({
    ...vacancy,
    type: vacancy.type as "Full-time" | "Part-time" | "Contract" | "Remote",
    postedDate: vacancy.posted,
    status: (Math.random() > 0.7 ? 'paused' : Math.random() > 0.4 ? 'active' : Math.random() > 0.2 ? 'closed' : 'draft') as VacancyStatus,
    department: ['Разработка', 'Дизайн', 'Маркетинг', 'Продажи', 'HR'][Math.floor(Math.random() * 5)],
    experienceRequired: ['Нет опыта', 'От 1 года', 'От 3 лет', 'От 5 лет'][Math.floor(Math.random() * 4)],
    selected: selectedIds.includes(vacancy.id)
  }));

  const selectedVacancy = vacancyId 
    ? typedVacancies.find(v => v.id === vacancyId) 
    : null;

  const allSkills = Array.from(
    new Set(typedVacancies.flatMap(v => v.skills))
  );

  const filterVacancies = (vacancies: ExtendedVacancyProps[]) => {
    return vacancies.filter(vacancy => {
      const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vacancy.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vacancy.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' ? true : vacancy.type === filterType;
      
      const salaryString = vacancy.salary.replace(/[^\d]/g, '');
      const salary = parseInt(salaryString, 10);
      const matchesSalary = isNaN(salary) ? true : (salary >= salaryRange[0] && salary <= salaryRange[1]);
      
      const matchesExperience = experienceLevel.length === 0 ? true : 
        experienceLevel.includes(vacancy.experienceRequired || '');
      
      const matchesSkills = selectedSkills.length === 0 ? true :
        selectedSkills.every(skill => vacancy.skills.includes(skill));
      
      return matchesSearch && matchesType && matchesSalary && matchesExperience && matchesSkills;
    });
  };

  const sortVacancies = (vacancies: ExtendedVacancyProps[]) => {
    return [...vacancies].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.posted).getTime() - new Date(b.posted).getTime();
      } else if (sortBy === 'applicants-high') {
        return b.applicants - a.applicants;
      } else if (sortBy === 'applicants-low') {
        return a.applicants - b.applicants;
      } else if (sortBy === 'salary-high' || sortBy === 'salary-low') {
        const salaryA = parseInt(a.salary.replace(/[^\d]/g, ''), 10) || 0;
        const salaryB = parseInt(b.salary.replace(/[^\d]/g, ''), 10) || 0;
        return sortBy === 'salary-high' ? salaryB - salaryA : salaryA - salaryB;
      }
      return 0;
    });
  };

  const filteredVacancies = filterVacancies(typedVacancies);
  const sortedVacancies = sortVacancies(filteredVacancies);

  const handleViewVacancy = (id: string) => {
    navigate(`/vacancies?id=${id}`);
  };

  const handleBackToList = () => {
    navigate('/vacancies');
  };

  const handleVacancySelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleSelectAll = () => {
    setSelectedIds(sortedVacancies.map(v => v.id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleAddInterview = () => {
    toast.info('Функция добавления собеседования находится в разработке');
  };
  
  const handleCreateVacancy = () => {
    navigate('/vacancies/new');
  };

  const handleFindCandidates = (vacancyId: string) => {
    navigate(`/candidate-match?vacancyId=${vacancyId}`);
  };

  const handleExportData = () => {
    return sortedVacancies;
  };

  const handleImportData = (data: any) => {
    console.log('Импортированные данные:', data);
    toast.success(`Импортировано ${data.length} вакансий`);
  };

  const applyFilters = () => {
    toast.success('Фильтры применены');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setSortBy('newest');
    setSalaryRange([30000, 250000]);
    setExperienceLevel([]);
    setSelectedSkills([]);
    toast.info('Фильтры сброшены');
  };

  const isDetailView = !!selectedVacancy;

  return (
    <Layout>
      <div className="space-y-6 w-full mx-auto">
        {isDetailView ? (
          <div className="space-y-6">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-4" 
                onClick={handleBackToList}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к списку
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Детали вакансии</h1>
            </div>
            {selectedVacancy && (
              <>
                <VacancyDetail vacancy={selectedVacancy} />
                <div className="flex justify-center mt-6">
                  <Button className="w-full max-w-md" onClick={() => handleFindCandidates(selectedVacancy.id)}>
                    Найти подходящих кандидатов
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Вакансии</h1>
                <p className="text-muted-foreground mt-1">Управление и отслеживание ваших открытых позиций.</p>
              </div>
              <div className="flex items-center gap-2">
                <ImportExportData 
                  entityType="vacancies"
                  onExport={handleExportData}
                  onImport={handleImportData}
                />
                <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleCreateVacancy}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить вакансию
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="list">Список вакансий</TabsTrigger>
                <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                <TabsTrigger value="calendar">Календарь собеседований</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="space-y-6 animate-fade-in">
                <VacancyFilters 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  salaryRange={salaryRange}
                  setSalaryRange={setSalaryRange}
                  experienceLevel={experienceLevel}
                  setExperienceLevel={setExperienceLevel}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  applyFilters={applyFilters}
                  resetFilters={resetFilters}
                  availableSkills={allSkills}
                />
                
                <Separator />
                
                <VacancyBulkActions 
                  selectedIds={selectedIds}
                  onSelectAll={handleSelectAll}
                  onClearSelection={handleClearSelection}
                  totalCount={sortedVacancies.length}
                  selectionCount={selectedIds.length}
                />
                
                <VacancyList 
                  vacancies={sortedVacancies.map(v => ({
                    ...v,
                    selected: selectedIds.includes(v.id),
                    onFindCandidates: () => handleFindCandidates(v.id)
                  }))}
                  onViewVacancy={handleViewVacancy}
                  onSelectVacancy={handleVacancySelect}
                  selectable={true}
                />
              </TabsContent>
              
              <TabsContent value="analytics" className="animate-fade-in">
                <VacancyAnalytics data={analyticsData} />
              </TabsContent>
              
              <TabsContent value="calendar" className="animate-fade-in">
                <InterviewCalendar 
                  interviews={interviewsData}
                  onAddInterview={handleAddInterview}
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Vacancies;

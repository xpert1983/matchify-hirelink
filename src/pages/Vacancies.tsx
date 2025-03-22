
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import VacancyList from '@/components/vacancies/VacancyList';
import { vacanciesData } from '@/lib/data';
import { VacancyProps } from '@/components/vacancies/VacancyCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import VacancyDetail from '@/components/vacancies/VacancyDetail';

const Vacancies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Get the vacancy ID from the URL if present
  const params = new URLSearchParams(location.search);
  const vacancyId = params.get('id');

  // Convert vacanciesData to match VacancyProps type
  const typedVacancies: VacancyProps[] = vacanciesData.map(vacancy => ({
    ...vacancy,
    type: vacancy.type as "Full-time" | "Part-time" | "Contract" | "Remote"
  }));

  // Find the selected vacancy if there's an ID in the URL
  const selectedVacancy = vacancyId 
    ? typedVacancies.find(v => v.id === vacancyId) 
    : null;

  // Filter vacancies based on search term and type filter
  const filteredVacancies = typedVacancies.filter(vacancy => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vacancy.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vacancy.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' ? true : vacancy.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Sort vacancies
  const sortedVacancies = [...filteredVacancies].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.posted).getTime() - new Date(a.posted).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.posted).getTime() - new Date(b.posted).getTime();
    } else if (sortBy === 'applicants-high') {
      return b.applicants - a.applicants;
    } else if (sortBy === 'applicants-low') {
      return a.applicants - b.applicants;
    }
    return 0;
  });

  // Function to handle viewing a vacancy
  const handleViewVacancy = (id: string) => {
    navigate(`/vacancies?id=${id}`);
  };

  // Function to clear the selected vacancy
  const handleBackToList = () => {
    navigate('/vacancies');
  };

  // Determine if we're in detail view or list view
  const isDetailView = !!selectedVacancy;

  return (
    <Layout>
      <div className="space-y-6">
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
            {selectedVacancy && <VacancyDetail vacancy={selectedVacancy} />}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Вакансии</h1>
                <p className="text-muted-foreground mt-1">Управление и отслеживание ваших открытых позиций.</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white self-start sm:self-auto">
                <Plus className="h-4 w-4 mr-2" />
                Добавить вакансию
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск вакансий..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Select 
                  value={filterType} 
                  onValueChange={setFilterType}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Все вакансии" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="Full-time">Полная занятость</SelectItem>
                    <SelectItem value="Part-time">Частичная занятость</SelectItem>
                    <SelectItem value="Contract">Контракт</SelectItem>
                    <SelectItem value="Remote">Удаленно</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={sortBy} 
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Сначала новые</SelectItem>
                    <SelectItem value="oldest">Сначала старые</SelectItem>
                    <SelectItem value="applicants-high">Больше откликов</SelectItem>
                    <SelectItem value="applicants-low">Меньше откликов</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <VacancyList 
              vacancies={sortedVacancies} 
              onViewVacancy={handleViewVacancy}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Vacancies;

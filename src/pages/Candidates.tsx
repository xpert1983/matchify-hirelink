
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import CandidateList from '@/components/candidates/CandidateList';
import { candidatesData } from '@/lib/data';
import { CandidateProps } from '@/components/candidates/CandidateCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import CandidateDetail from '@/components/candidates/CandidateDetail';

const Candidates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  // Get the candidate ID from the URL if present
  const params = new URLSearchParams(location.search);
  const candidateId = params.get('id');

  // Convert candidatesData to match CandidateProps type
  const typedCandidates: CandidateProps[] = candidatesData.map(candidate => ({
    ...candidate,
    status: candidate.status as "Available" | "Interviewing" | "Hired" | "Not Available"
  }));

  // Find the selected candidate if there's an ID in the URL
  const selectedCandidate = candidateId 
    ? typedCandidates.find(c => c.id === candidateId) 
    : null;

  // Filter candidates based on search term and status filter
  const filteredCandidates = typedCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' ? true : candidate.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortBy === 'position-asc') {
      return a.position.localeCompare(b.position);
    } else if (sortBy === 'position-desc') {
      return b.position.localeCompare(a.position);
    }
    return 0;
  });

  // Function to handle viewing a candidate
  const handleViewCandidate = (id: string) => {
    navigate(`/candidates?id=${id}`);
  };

  // Function to clear the selected candidate
  const handleBackToList = () => {
    navigate('/candidates');
  };
  
  // Function to create a new candidate
  const handleCreateCandidate = () => {
    navigate('/candidates/new');
  };
  
  // Function to find vacancies for a candidate
  const handleFindVacancies = (id: string) => {
    navigate(`/candidate-match?candidateId=${id}`);
  };

  // Determine if we're in detail view or list view
  const isDetailView = !!selectedCandidate;

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
              <h1 className="text-3xl font-bold tracking-tight">Профиль кандидата</h1>
            </div>
            {selectedCandidate && (
              <>
                <CandidateDetail candidate={selectedCandidate} />
                <div className="flex justify-center mt-6">
                  <Button 
                    className="w-full max-w-md" 
                    onClick={() => handleFindVacancies(selectedCandidate.id)}
                  >
                    Найти подходящие вакансии
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Кандидаты</h1>
                <p className="text-muted-foreground mt-1">Управление и отслеживание потенциальных сотрудников.</p>
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white self-start sm:self-auto"
                onClick={handleCreateCandidate}
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить кандидата
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск кандидатов..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Select 
                  value={filterStatus} 
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Все кандидаты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="Available">Доступен</SelectItem>
                    <SelectItem value="Interviewing">На собеседовании</SelectItem>
                    <SelectItem value="Hired">Нанят</SelectItem>
                    <SelectItem value="Not Available">Недоступен</SelectItem>
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
                    <SelectItem value="name-asc">Имя (А-Я)</SelectItem>
                    <SelectItem value="name-desc">Имя (Я-А)</SelectItem>
                    <SelectItem value="position-asc">Должность (А-Я)</SelectItem>
                    <SelectItem value="position-desc">Должность (Я-А)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CandidateList 
              candidates={sortedCandidates.map(candidate => ({
                ...candidate,
                onFindVacancies: () => handleFindVacancies(candidate.id)
              }))}
              onViewCandidate={handleViewCandidate}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Candidates;

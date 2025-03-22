
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { matchesData, candidatesData, vacanciesData } from '@/lib/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Filter, 
  Search, 
  Plus, 
  SlidersHorizontal,
  Calendar,
  CheckCircle2,
  XCircle,
  User,
  Briefcase,
  Mail,
  Phone,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MatchDetail from '@/components/matches/MatchDetail';

const Matches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('score-high');
  
  // Get the match ID from the URL if present
  const params = new URLSearchParams(location.search);
  const matchId = params.get('id');
  
  // Combine match data with candidate and vacancy details
  const combinedMatches = matchesData.map(match => {
    const candidate = candidatesData.find(c => c.id === match.candidateId);
    const vacancy = vacanciesData.find(v => v.id === match.vacancyId);
    
    return {
      ...match,
      candidate,
      vacancy
    };
  });
  
  // Find the selected match if there's an ID in the URL
  const selectedMatch = matchId 
    ? combinedMatches.find(m => m.id === matchId) 
    : null;
  
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
  
  // Filter matches based on search term and status filter
  const filteredMatches = combinedMatches.filter(match => {
    const matchesSearch = 
      match.candidate?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      match.vacancy?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.vacancy?.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' ? true : match.status === filterStatus;
    const matchesTab = activeTab === 'all' ? true : 
                       activeTab === 'recent' ? new Date(match.lastUpdated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) :
                       activeTab === 'high' ? match.matchScore >= 85 : true;
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  // Sort matches
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === 'score-high') {
      return b.matchScore - a.matchScore;
    } else if (sortBy === 'score-low') {
      return a.matchScore - b.matchScore;
    } else if (sortBy === 'recent') {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
    }
    return 0;
  });
  
  // Function to handle viewing a match
  const handleViewMatch = (id: string) => {
    navigate(`/matches?id=${id}`);
  };

  // Function to clear the selected match
  const handleBackToList = () => {
    navigate('/matches');
  };

  // Determine if we're in detail view or list view
  const isDetailView = !!selectedMatch;
  
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
              <h1 className="text-3xl font-bold tracking-tight">Детали подбора</h1>
            </div>
            {selectedMatch && <MatchDetail match={selectedMatch} />}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Подборки</h1>
                <p className="text-muted-foreground mt-1">Просмотр и управление подбором вакансий для кандидатов.</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white self-start sm:self-auto">
                <Plus className="h-4 w-4 mr-2" />
                Создать новые подборки
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск подборок..." 
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
                    <SelectValue placeholder="Все статусы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="Contacted">Связались</SelectItem>
                    <SelectItem value="Screening">Скрининг</SelectItem>
                    <SelectItem value="Interview">Интервью</SelectItem>
                    <SelectItem value="Offered">Оффер</SelectItem>
                    <SelectItem value="Hired">Принят</SelectItem>
                    <SelectItem value="Rejected">Отклонен</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={sortBy} 
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score-high">Лучшие совпадения</SelectItem>
                    <SelectItem value="score-low">Худшие совпадения</SelectItem>
                    <SelectItem value="recent">Сначала новые</SelectItem>
                    <SelectItem value="oldest">Сначала старые</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} className="w-full animate-fade-in">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>Все подборки</TabsTrigger>
                <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>Недавние</TabsTrigger>
                <TabsTrigger value="high" onClick={() => setActiveTab("high")}>Высокий рейтинг</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {sortedMatches.length > 0 ? (
                    sortedMatches.map((match) => (
                      <MatchCard 
                        key={match.id} 
                        match={match} 
                        statusColor={getStatusColor(match.status)}
                        translatedStatus={translateStatus(match.status)}
                        onView={() => handleViewMatch(match.id)}
                      />
                    ))
                  ) : (
                    <div className="text-center p-10 border rounded-lg bg-secondary/30">
                      <p className="text-muted-foreground">Нет подборок, соответствующих критериям поиска</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-6">
                <div className="space-y-4">
                  {sortedMatches.length > 0 ? (
                    sortedMatches.map((match) => (
                      <MatchCard 
                        key={match.id} 
                        match={match} 
                        statusColor={getStatusColor(match.status)}
                        translatedStatus={translateStatus(match.status)}
                        onView={() => handleViewMatch(match.id)}
                      />
                    ))
                  ) : (
                    <div className="text-center p-10 border rounded-lg bg-secondary/30">
                      <p className="text-muted-foreground">Нет недавних подборок, соответствующих критериям поиска</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="high" className="mt-6">
                <div className="space-y-4">
                  {sortedMatches.length > 0 ? (
                    sortedMatches.map((match) => (
                      <MatchCard 
                        key={match.id} 
                        match={match} 
                        statusColor={getStatusColor(match.status)}
                        translatedStatus={translateStatus(match.status)}
                        onView={() => handleViewMatch(match.id)}
                      />
                    ))
                  ) : (
                    <div className="text-center p-10 border rounded-lg bg-secondary/30">
                      <p className="text-muted-foreground">Нет подборок с высоким рейтингом, соответствующих критериям поиска</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

interface MatchCardProps {
  match: any;
  statusColor: string;
  translatedStatus: string;
  onView: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, statusColor, translatedStatus, onView }) => {
  return (
    <Card className="hover:shadow-elevated transition-all duration-300 animate-scale-in hover:cursor-pointer" onClick={onView}>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-border">
                <AvatarImage src={match.candidate?.avatar} alt={match.candidate?.name} />
                <AvatarFallback>{match.candidate?.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{match.candidate?.name}</h3>
                <p className="text-sm text-muted-foreground">{match.candidate?.position}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 rounded-md bg-white border border-border">
                <AvatarImage src={match.vacancy?.logo} alt={match.vacancy?.company} className="object-contain p-2" />
                <AvatarFallback className="rounded-md">{match.vacancy?.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{match.vacancy?.title}</h3>
                <p className="text-sm text-muted-foreground">{match.vacancy?.company}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Рейтинг совпадения:</span>
              <Badge className="bg-primary/10 text-primary">
                {match.matchScore}%
              </Badge>
            </div>
            <Progress value={match.matchScore} className="h-2 mb-3" />
            <div className="flex justify-between">
              <Badge variant="outline" className={statusColor}>
                {translatedStatus}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{match.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Matches;

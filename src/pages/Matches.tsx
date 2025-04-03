
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ArrowUpDown, X, Activity, Clock, CheckCircle, XCircle, FileSearch, FileCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { matchesData, candidatesData, vacanciesData } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import MatchDetail from "@/components/matches/MatchDetail";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

// Тип для расширенных данных подборки
interface EnhancedMatch {
  id: string;
  candidateId: string;
  vacancyId: string;
  matchScore: number;
  status: string;
  date: string;
  candidateName: string;
  candidateAvatar: string;
  vacancyTitle: string;
  company: string;
}

const Matches: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [enhancedMatches, setEnhancedMatches] = useState<EnhancedMatch[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Получение данных из Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Здесь можно использовать данные из Supabase
        // Пока используем моковые данные
        const enhanced = matchesData.map(match => {
          const candidate = candidatesData.find(c => c.id === match.candidateId);
          const vacancy = vacanciesData.find(v => v.id === match.vacancyId);
          
          return {
            ...match,
            candidateName: candidate?.name || 'Неизвестный кандидат',
            candidateAvatar: candidate?.avatar || '',
            vacancyTitle: vacancy?.title || 'Неизвестная позиция',
            company: vacancy?.company || 'Неизвестная компания'
          };
        });
        
        setEnhancedMatches(enhanced);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    
    fetchData();
  }, []);

  // Фильтрация подборок по поисковому запросу и выбранному статусу
  const filteredMatches = enhancedMatches.filter(match => {
    const searchMatch = match.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       match.vacancyTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatch = selectedStatus === "all" || match.status === selectedStatus;

    return searchMatch && statusMatch;
  });

  const handleMatchClick = (matchId: string) => {
    setSelectedMatchId(matchId);
  };

  const handleCloseMatchDetail = () => {
    setSelectedMatchId(null);
  };
  
  const sortByDateAsc = () => {
    setSortOrder("dateAsc");
    const sorted = [...filteredMatches].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setEnhancedMatches(prev => 
      prev.map(item => sorted.find(s => s.id === item.id) || item)
    );
  };
  
  const sortByDateDesc = () => {
    setSortOrder("dateDesc");
    const sorted = [...filteredMatches].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEnhancedMatches(prev => 
      prev.map(item => sorted.find(s => s.id === item.id) || item)
    );
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Объект для иконок и переводов статусов для мобильной версии
  const statusIcons = {
    "all": { icon: Activity, label: "Все" },
    "Contacted": { icon: Clock, label: "Контакт" },
    "Screening": { icon: FileSearch, label: "Скрининг" },
    "Interview": { icon: Activity, label: "Интервью" },
    "Offered": { icon: FileCheck, label: "Оффер" },
    "Hired": { icon: CheckCircle, label: "Принят" },
    "Rejected": { icon: XCircle, label: "Отклонен" }
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Подборки</h1>
          <div className="flex items-center gap-2">
            {!isMobile && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Поиск..."
                  className="pl-10 h-9 w-[180px] lg:w-[220px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9" 
              onClick={toggleFilter}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {isMobile && (
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Поиск..."
                className="pl-10 h-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {isFilterOpen && (
          <div className="p-4 border rounded-md mb-4 bg-background">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Фильтры</h3>
              <Button variant="ghost" size="icon" onClick={toggleFilter}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col space-y-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="Contacted">Контакт установлен</SelectItem>
                  <SelectItem value="Screening">Скрининг</SelectItem>
                  <SelectItem value="Interview">Собеседование</SelectItem>
                  <SelectItem value="Offered">Предложение</SelectItem>
                  <SelectItem value="Hired">Принят</SelectItem>
                  <SelectItem value="Rejected">Отклонен</SelectItem>
                </SelectContent>
              </Select>
              <div>
                <Button variant="outline" size="sm" onClick={sortOrder === "dateAsc" ? sortByDateDesc : sortByDateAsc} className="w-full">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <span>Сортировать по дате</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="all" className="space-y-4">
          <div className="overflow-x-auto scrollbar-none">
            {isMobile ? (
              <TabsList className="mb-4 w-full justify-between">
                {Object.entries(statusIcons).map(([status, { icon: Icon, label }]) => (
                  <TabsTrigger key={status} value={status} className="px-1.5 py-1.5 flex-1 min-w-0">
                    <Icon className="h-3 w-3 md:mr-1" />
                    <span className="hidden md:inline text-[9px]">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            ) : (
              <TabsList className="mb-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="Contacted">Контакт</TabsTrigger>
                <TabsTrigger value="Screening">Скрининг</TabsTrigger>
                <TabsTrigger value="Interview">Интервью</TabsTrigger>
                <TabsTrigger value="Offered">Оффер</TabsTrigger>
                <TabsTrigger value="Hired">Принят</TabsTrigger>
                <TabsTrigger value="Rejected">Отклонен</TabsTrigger>
              </TabsList>
            )}
          </div>
          <Separator />
          
          <div className="pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Активные подборки</h2>
              {!isMobile && !isFilterOpen && (
                <Button variant="ghost" size="sm" onClick={sortOrder === "dateAsc" ? sortByDateDesc : sortByDateAsc}>
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <span>Дата</span>
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMatches.map(match => (
                <Card key={match.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleMatchClick(match.id)}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base truncate">{match.candidateName} - {match.vacancyTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={match.candidateAvatar} alt={match.candidateName} />
                      <AvatarFallback>АИ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-muted-foreground truncate max-w-[150px]">{match.company}</p>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" variant="outline">
                        {match.status}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground p-4 pt-0">
                    Обновлено {match.date}
                  </CardFooter>
                </Card>
              ))}
              
              {filteredMatches.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">Нет подборок, соответствующих заданным критериям</p>
                </div>
              )}
            </div>
          </TabsContent>

          {["Contacted", "Screening", "Interview", "Offered", "Hired", "Rejected"].map(status => (
            <TabsContent key={status} value={status}>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMatches
                  .filter(match => match.status === status)
                  .map(match => (
                    <Card key={match.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleMatchClick(match.id)}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base truncate">{match.candidateName} - {match.vacancyTitle}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={match.candidateAvatar} alt={match.candidateName} />
                          <AvatarFallback>АИ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-muted-foreground truncate max-w-[150px]">{match.company}</p>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" variant="outline">
                            {match.status}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground p-4 pt-0">
                        Обновлено {match.date}
                      </CardFooter>
                    </Card>
                ))}
                
                {filteredMatches.filter(match => match.status === status).length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">Нет подборок со статусом "{status}"</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {selectedMatchId && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-background rounded-lg shadow-lg relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 z-10"
              onClick={handleCloseMatchDetail}
            >
              <X className="h-4 w-4" />
            </Button>
            <MatchDetail matchId={selectedMatchId} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Matches;

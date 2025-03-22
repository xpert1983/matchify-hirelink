
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { matchesData, candidatesData, vacanciesData } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import MatchDetail from "@/components/matches/MatchDetail";

// Type for the enhanced match data
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
  const navigate = useNavigate();

  // Combine match data with candidate and vacancy data
  useEffect(() => {
    const enhanced = matchesData.map(match => {
      const candidate = candidatesData.find(c => c.id === match.candidateId);
      const vacancy = vacanciesData.find(v => v.id === match.vacancyId);
      
      return {
        ...match,
        candidateName: candidate?.name || 'Unknown Candidate',
        candidateAvatar: candidate?.avatar || '',
        vacancyTitle: vacancy?.title || 'Unknown Position',
        company: vacancy?.company || 'Unknown Company'
      };
    });
    
    setEnhancedMatches(enhanced);
  }, []);

  // Filter the matches based on search query and selected status
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

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Подборки</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Поиск..."
              className="pl-10 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="h-9 w-[180px]">
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
          <Button variant="outline" size="icon" className="h-9 w-9">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="Contacted">Контакт установлен</TabsTrigger>
          <TabsTrigger value="Screening">Скрининг</TabsTrigger>
          <TabsTrigger value="Interview">Собеседование</TabsTrigger>
          <TabsTrigger value="Offered">Предложение</TabsTrigger>
          <TabsTrigger value="Hired">Принят</TabsTrigger>
          <TabsTrigger value="Rejected">Отклонен</TabsTrigger>
        </TabsList>
        <Separator />
        
        <div className="pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Активные подборки</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={sortOrder === "dateAsc" ? sortByDateDesc : sortByDateAsc}>
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <span>Дата</span>
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.map(match => (
              <Card key={match.id} className="cursor-pointer" onClick={() => handleMatchClick(match.id)}>
                <CardHeader>
                  <CardTitle>{match.candidateName} - {match.vacancyTitle}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={match.candidateAvatar} alt={match.candidateName} />
                    <AvatarFallback>АИ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">{match.company}</p>
                    <Badge className="bg-blue-100 text-blue-800" variant="outline">
                      {match.status}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Обновлено {match.date}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["Contacted", "Screening", "Interview", "Offered", "Hired", "Rejected"].map(status => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMatches
                .filter(match => match.status === status)
                .map(match => (
                  <Card key={match.id} className="cursor-pointer" onClick={() => handleMatchClick(match.id)}>
                    <CardHeader>
                      <CardTitle>{match.candidateName} - {match.vacancyTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={match.candidateAvatar} alt={match.candidateName} />
                        <AvatarFallback>АИ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground">{match.company}</p>
                        <Badge className="bg-blue-100 text-blue-800" variant="outline">
                          {match.status}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Обновлено {match.date}
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {selectedMatchId && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
            <MatchDetail matchId={selectedMatchId} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Matches;

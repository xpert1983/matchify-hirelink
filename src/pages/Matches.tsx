import React, { useState } from 'react';
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
import { matchesData } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import MatchDetail from "@/components/matches/MatchDetail";

const Matches: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredMatches = matchesData.filter(match => {
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
    setFilteredMatches([...filteredMatches].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));
  };
  
  const sortByDateDesc = () => {
    setSortOrder("dateDesc");
    setFilteredMatches([...filteredMatches].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
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
              <SelectItem value="pending">Ожидает рассмотрения</SelectItem>
              <SelectItem value="interviewing">На собеседовании</SelectItem>
              <SelectItem value="offered">Сделано предложение</SelectItem>
              <SelectItem value="hired">Принят</SelectItem>
              <SelectItem value="rejected">Отклонен</SelectItem>
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
          <TabsTrigger value="pending">Ожидает рассмотрения</TabsTrigger>
          <TabsTrigger value="interviewing">На собеседовании</TabsTrigger>
          <TabsTrigger value="offered">Сделано предложение</TabsTrigger>
          <TabsTrigger value="hired">Принят</TabsTrigger>
          <TabsTrigger value="rejected">Отклонен</TabsTrigger>
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
                    <Badge variant="outline" className="bg-blue-100 text-blue-800" style={{ fontSize: '0.75rem' }}>
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

        <TabsContent value="pending">
          <p>Здесь будут отображаться подборки со статусом "Ожидает рассмотрения".</p>
        </TabsContent>

        <TabsContent value="interviewing">
          <p>Здесь будут отображаться подборки со статусом "На собеседовании".</p>
        </TabsContent>

        <TabsContent value="offered">
          <p>Здесь будут отображаться подборки со статусом "Сделано предложение".</p>
        </TabsContent>

        <TabsContent value="hired">
          <p>Здесь будут отображаться подборки со статусом "Принят".</p>
        </TabsContent>

        <TabsContent value="rejected">
          <p>Здесь будут отображаться подборки со статусом "Отклонен".</p>
        </TabsContent>
      </Tabs>
      
      {selectedMatchId && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
            <MatchDetail matchId={selectedMatchId} onClose={handleCloseMatchDetail} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Matches;

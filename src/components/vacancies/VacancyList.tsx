
import React, { useState } from 'react';
import VacancyCard, { VacancyProps } from './VacancyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Filter, Briefcase, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface VacancyListProps {
  vacancies: VacancyProps[];
}

export const VacancyList: React.FC<VacancyListProps> = ({ vacancies }) => {
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewVacancy = (id: string) => {
    const vacancy = vacancies.find(v => v.id === id);
    if (vacancy) {
      setSelectedVacancy(vacancy);
      setIsDialogOpen(true);
    }
  };

  // Перевод типов вакансий
  const translateVacancyType = (type: string) => {
    switch (type) {
      case 'Full-time': return 'Полная занятость';
      case 'Part-time': return 'Частичная занятость';
      case 'Contract': return 'Контракт';
      case 'Remote': return 'Удаленно';
      default: return type;
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Поиск вакансий..." 
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Все вакансии" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все вакансии</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="draft">Черновики</SelectItem>
                <SelectItem value="closed">Закрытые</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="ml-auto md:ml-2 bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Добавить вакансию
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vacancies.map((vacancy, index) => (
          <VacancyCard 
            key={vacancy.id} 
            vacancy={{
              ...vacancy,
              type: vacancy.type // Тип остается на английском, так как он приходит из данных
            }} 
            onView={handleViewVacancy}
          />
        ))}
      </div>
      
      {selectedVacancy && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-md bg-white border border-border">
                  <AvatarImage src={selectedVacancy.logo} alt={selectedVacancy.company} className="object-contain p-2" />
                  <AvatarFallback className="rounded-md">{selectedVacancy.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-xl">{selectedVacancy.title}</DialogTitle>
                  <DialogDescription>{selectedVacancy.company} · {selectedVacancy.location}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {translateVacancyType(selectedVacancy.type)}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Опубликовано {selectedVacancy.posted}
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {selectedVacancy.salary}
                </Badge>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Описание</h3>
                <p className="text-sm text-muted-foreground">{selectedVacancy.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Необходимые навыки</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVacancy.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-secondary/70">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Закрыть</Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">Найти кандидатов</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VacancyList;


import React, { useState } from 'react';
import VacancyCard, { VacancyProps } from './VacancyCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Clock, Filter, MapPin, Plus, Search } from 'lucide-react';

interface VacancyListProps {
  vacancies: VacancyProps[];
  onViewVacancy?: (id: string) => void;
}

export const VacancyList: React.FC<VacancyListProps> = ({ vacancies, onViewVacancy }) => {
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewVacancy = (id: string) => {
    if (onViewVacancy) {
      onViewVacancy(id);
    } else {
      const vacancy = vacancies.find(v => v.id === id);
      if (vacancy) {
        setSelectedVacancy(vacancy);
        setIsDialogOpen(true);
      }
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
      {vacancies.length === 0 ? (
        <div className="text-center p-10 border rounded-lg bg-secondary/30">
          <p className="text-muted-foreground">Нет вакансий, соответствующих критериям поиска</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {vacancies.map((vacancy) => (
            <VacancyCard 
              key={vacancy.id} 
              vacancy={vacancy} 
              onView={handleViewVacancy}
            />
          ))}
        </div>
      )}
      
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
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VacancyList;

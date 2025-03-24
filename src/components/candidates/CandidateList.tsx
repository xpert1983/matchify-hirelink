
import React, { useState } from 'react';
import CandidateCard, { CandidateProps } from './CandidateCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Filter, GraduationCap, Mail, MapPin, Phone, Plus, Search } from 'lucide-react';

interface CandidateListProps {
  candidates: CandidateProps[];
  onViewCandidate?: (id: string) => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({ candidates, onViewCandidate }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewCandidate = (id: string) => {
    if (onViewCandidate) {
      onViewCandidate(id);
    } else {
      const candidate = candidates.find(c => c.id === id);
      if (candidate) {
        setSelectedCandidate(candidate);
        setIsDialogOpen(true);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'badge-success';
      case 'Interviewing': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'Hired': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'Not Available': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Перевод статусов
  const translateStatus = (status: string) => {
    switch (status) {
      case 'Available': return 'Доступен';
      case 'Interviewing': return 'На собеседовании';
      case 'Hired': return 'Нанят';
      case 'Not Available': return 'Недоступен';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {candidates.length === 0 ? (
        <div className="text-center p-10 border rounded-lg bg-secondary/30">
          <p className="text-muted-foreground">Нет кандидатов, соответствующих критериям поиска</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {candidates.map((candidate) => (
            <CandidateCard 
              key={candidate.id} 
              candidate={candidate}
              onView={handleViewCandidate}
            />
          ))}
        </div>
      )}
      
      {selectedCandidate && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-background">
                  <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                  <AvatarFallback>{selectedCandidate.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl">{selectedCandidate.name}</DialogTitle>
                    <Badge className={getStatusColor(selectedCandidate.status)}>
                      {translateStatus(selectedCandidate.status)}
                    </Badge>
                  </div>
                  <DialogDescription>{selectedCandidate.position}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCandidate.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCandidate.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCandidate.education}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCandidate.phone}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Навыки</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
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

export default CandidateList;

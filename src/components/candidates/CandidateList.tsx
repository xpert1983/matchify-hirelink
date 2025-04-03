
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
    <div className="space-y-4 animate-slide-in">
      {candidates.length === 0 ? (
        <div className="text-center p-4 border rounded-lg bg-secondary/30">
          <p className="text-muted-foreground text-sm">Нет кандидатов, соответствующих критериям поиска</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
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
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-3 sm:p-4">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                  <AvatarFallback>{selectedCandidate.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <DialogTitle className="text-base">{selectedCandidate.name}</DialogTitle>
                    <Badge className={getStatusColor(selectedCandidate.status)}>
                      {translateStatus(selectedCandidate.status)}
                    </Badge>
                  </div>
                  <DialogDescription className="text-sm">{selectedCandidate.position}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-3 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{selectedCandidate.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Briefcase className="h-3 w-3 text-muted-foreground" />
                    <span>{selectedCandidate.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <GraduationCap className="h-3 w-3 text-muted-foreground" />
                    <span>{selectedCandidate.education}</span>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span>{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span>{selectedCandidate.phone}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-xs mb-1.5">Навыки</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-secondary/70 text-xs">
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

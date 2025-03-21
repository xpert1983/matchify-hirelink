
import React, { useState } from 'react';
import CandidateCard, { CandidateProps } from './CandidateCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CandidateListProps {
  candidates: CandidateProps[];
}

export const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewCandidate = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      setSelectedCandidate(candidate);
      setIsDialogOpen(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Interviewing': return 'bg-blue-100 text-blue-800';
      case 'Hired': return 'bg-purple-100 text-purple-800';
      case 'Not Available': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search candidates..." 
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Candidates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Candidates</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="ml-auto md:ml-2 bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate}
            onView={handleViewCandidate}
          />
        ))}
      </div>
      
      {selectedCandidate && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-background">
                  <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                  <AvatarFallback>{selectedCandidate.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl">{selectedCandidate.name}</DialogTitle>
                    <Badge variant="outline" className={getStatusColor(selectedCandidate.status)}>
                      {selectedCandidate.status}
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
                <h3 className="font-medium text-sm mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-secondary/70">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Close</Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">Find Matches</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Import necessary components
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default CandidateList;

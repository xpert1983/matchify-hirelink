
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface MatchItemProps {
  candidate: {
    id: string;
    name: string;
    avatar: string;
    position: string;
    matchScore: number;
  };
  vacancy: {
    id: string;
    title: string;
    company: string;
    logo: string;
  };
  date: string;
}

const MatchItem: React.FC<MatchItemProps> = ({ candidate, vacancy, date }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-0 transition-all hover:bg-secondary/50">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={candidate.avatar} alt={candidate.name} />
          <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium text-sm">{candidate.name}</h4>
          <p className="text-xs text-muted-foreground">{candidate.position}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-primary" />
      </div>
      
      <div className="hidden md:flex items-center gap-3">
        <Avatar className="h-9 w-9 rounded-md bg-white">
          <AvatarImage src={vacancy.logo} alt={vacancy.company} className="object-contain p-1" />
          <AvatarFallback className="rounded-md text-xs">{vacancy.company.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium text-sm">{vacancy.title}</h4>
          <p className="text-xs text-muted-foreground">{vacancy.company}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <Badge variant="outline" className={`${getScoreColor(candidate.matchScore)}`}>
          {candidate.matchScore}% Match
        </Badge>
        <span className="text-xs text-muted-foreground mt-1">{date}</span>
      </div>
    </div>
  );
};

export const RecentMatches = () => {
  const matchesData: MatchItemProps[] = [
    {
      candidate: {
        id: "c1",
        name: "Emily Johnson",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        position: "UI/UX Designer",
        matchScore: 94,
      },
      vacancy: {
        id: "v1",
        title: "Senior UI Designer",
        company: "Dropbox",
        logo: "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/77-dropbox-512.png",
      },
      date: "Today"
    },
    {
      candidate: {
        id: "c2",
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        position: "Frontend Developer",
        matchScore: 88,
      },
      vacancy: {
        id: "v2",
        title: "React Developer",
        company: "Airbnb",
        logo: "https://cdn4.iconfinder.com/data/icons/socialcones/508/Airbnb-512.png",
      },
      date: "Yesterday"
    },
    {
      candidate: {
        id: "c3",
        name: "Sarah Williams",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        position: "Product Manager",
        matchScore: 76,
      },
      vacancy: {
        id: "v3",
        title: "Product Manager",
        company: "Slack",
        logo: "https://cdn0.iconfinder.com/data/icons/social-media-2091/100/social-06-512.png",
      },
      date: "2 days ago"
    },
    {
      candidate: {
        id: "c4",
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        position: "Backend Engineer",
        matchScore: 92,
      },
      vacancy: {
        id: "v4",
        title: "Node.js Engineer",
        company: "Spotify",
        logo: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/315_Spotify_logo-512.png",
      },
      date: "3 days ago"
    },
  ];

  return (
    <Card className="w-full animate-slide-in" style={{ animationDelay: '100ms' }}>
      <CardHeader className="pb-3">
        <CardTitle>Recent Matches</CardTitle>
        <CardDescription>Your latest candidate-vacancy matches</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {matchesData.map((match, idx) => (
          <MatchItem key={`${match.candidate.id}-${match.vacancy.id}`} {...match} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentMatches;

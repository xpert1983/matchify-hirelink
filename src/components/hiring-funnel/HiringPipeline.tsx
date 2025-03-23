
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Settings, 
  MoreVertical, 
  Clock, 
  Calendar,
  Mail, 
  Phone,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Типы для кандидатов и этапов
export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  avatar?: string;
  stage: string;
  lastUpdated: string;
  daysInStage: number;
  nextAction?: {
    type: 'interview' | 'email' | 'call' | 'task' | 'decision';
    date?: string;
    status?: 'scheduled' | 'pending' | 'completed' | 'overdue';
  };
  score?: number;
  salary?: string;
  location: string;
  source?: string;
  tags?: string[];
}

export interface Stage {
  id: string;
  name: string;
  candidates: Candidate[];
  limit?: number;
  automationEnabled?: boolean;
}

interface HiringPipelineProps {
  vacancyId?: string;
  vacancyTitle?: string;
}

const HiringPipeline: React.FC<HiringPipelineProps> = ({ 
  vacancyId,
  vacancyTitle = "Frontend Developer" 
}) => {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'new',
      name: 'Новые заявки',
      candidates: [
        {
          id: 'c1',
          name: 'Иван Петров',
          email: 'ivan@example.com',
          position: 'Frontend Developer',
          stage: 'new',
          lastUpdated: '2023-07-01',
          daysInStage: 2,
          location: 'Москва',
          tags: ['React', 'JavaScript'],
          nextAction: {
            type: 'email',
            status: 'pending'
          }
        },
        {
          id: 'c2',
          name: 'Анна Смирнова',
          email: 'anna@example.com',
          position: 'UX Designer',
          stage: 'new',
          lastUpdated: '2023-06-30',
          daysInStage: 3,
          location: 'Санкт-Петербург',
          tags: ['Figma', 'UX Research'],
          nextAction: {
            type: 'email',
            status: 'completed'
          }
        }
      ],
      automationEnabled: true
    },
    {
      id: 'screening',
      name: 'Скрининг',
      candidates: [
        {
          id: 'c3',
          name: 'Михаил Козлов',
          email: 'mikhail@example.com',
          position: 'Frontend Developer',
          stage: 'screening',
          lastUpdated: '2023-06-28',
          daysInStage: 5,
          location: 'Новосибирск',
          tags: ['React', 'TypeScript'],
          nextAction: {
            type: 'call',
            date: '2023-07-05',
            status: 'scheduled'
          }
        }
      ]
    },
    {
      id: 'interview',
      name: 'Собеседование',
      candidates: [
        {
          id: 'c4',
          name: 'Елена Соколова',
          email: 'elena@example.com',
          position: 'Frontend Developer',
          stage: 'interview',
          lastUpdated: '2023-06-25',
          daysInStage: 8,
          location: 'Москва',
          score: 8.5,
          tags: ['React', 'CSS', 'JavaScript'],
          nextAction: {
            type: 'interview',
            date: '2023-07-03',
            status: 'scheduled'
          }
        }
      ]
    },
    {
      id: 'test',
      name: 'Тестовое задание',
      candidates: []
    },
    {
      id: 'offer',
      name: 'Предложение',
      candidates: []
    },
    {
      id: 'hired',
      name: 'Нанят',
      candidates: []
    }
  ]);
  
  // Сенсоры для перетаскивания
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  
  // Обработчик перетаскивания кандидата
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const candidateId = active.id as string;
    const destinationStageId = over.id as string;
    
    // Находим текущий этап кандидата
    let sourceStageIndex = -1;
    let candidateIndex = -1;
    
    stages.forEach((stage, stageIdx) => {
      const index = stage.candidates.findIndex(c => c.id === candidateId);
      if (index !== -1) {
        sourceStageIndex = stageIdx;
        candidateIndex = index;
      }
    });
    
    if (sourceStageIndex === -1 || candidateIndex === -1) return;
    
    // Находим индекс целевого этапа
    const destinationStageIndex = stages.findIndex(s => s.id === destinationStageId);
    if (destinationStageIndex === -1) return;
    
    // Создаем копию списка этапов
    const newStages = [...stages];
    
    // Извлекаем кандидата из исходного этапа
    const [candidate] = newStages[sourceStageIndex].candidates.splice(candidateIndex, 1);
    
    // Обновляем информацию о кандидате
    const updatedCandidate = {
      ...candidate,
      stage: destinationStageId,
      lastUpdated: new Date().toISOString().split('T')[0],
      daysInStage: 0
    };
    
    // Добавляем кандидата в целевой этап
    newStages[destinationStageIndex].candidates.push(updatedCandidate);
    
    // Обновляем состояние
    setStages(newStages);
    
    // Показываем уведомление
    toast.success(`${candidate.name} перемещен в этап "${newStages[destinationStageIndex].name}"`);
  };
  
  const getActionIcon = (type: Candidate['nextAction']['type']) => {
    switch (type) {
      case 'interview': return <Calendar className="h-3 w-3" />;
      case 'email': return <Mail className="h-3 w-3" />;
      case 'call': return <Phone className="h-3 w-3" />;
      case 'task': return <CheckSquare className="h-3 w-3" />;
      case 'decision': return <AlertTriangle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };
  
  const getActionStatusColor = (status?: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending':
      default: return 'bg-amber-100 text-amber-800';
    }
  };
  
  const getNextActionText = (action?: Candidate['nextAction']) => {
    if (!action) return null;
    
    const actionTypes = {
      'interview': 'Собеседование',
      'email': 'Отправить email',
      'call': 'Телефонный звонок',
      'task': 'Тестовое задание',
      'decision': 'Принять решение'
    };
    
    return (
      <Badge variant="outline" className={getActionStatusColor(action.status)}>
        {getActionIcon(action.type)}
        <span className="ml-1">
          {actionTypes[action.type]} {action.date ? `(${action.date})` : ''}
        </span>
      </Badge>
    );
  };
  
  return (
    <DndContext 
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{vacancyTitle}</h2>
            <p className="text-muted-foreground">
              Воронка найма и этапы отбора кандидатов
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Добавить этап
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stages.map((stage) => (
            <Card key={stage.id} className="border-t-4" style={{ borderTopColor: 'var(--primary)' }}>
              <CardHeader className="p-3 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center">
                    {stage.name}
                    <Badge variant="outline" className="ml-2 text-xs">
                      {stage.candidates.length}
                    </Badge>
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          Редактировать этап
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Настроить автоматизацию
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Удалить этап
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <div className="h-[400px] overflow-y-auto pr-1">
                  <SortableContext 
                    items={stage.candidates.map(c => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {stage.candidates.length > 0 ? (
                      <div className="space-y-2">
                        {stage.candidates.map((candidate) => (
                          <SortableItem key={candidate.id} id={candidate.id}>
                            <Card className="cursor-move hover:shadow-md transition-shadow">
                              <CardContent className="p-3">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback>
                                      {candidate.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-1">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <p className="font-medium text-sm">{candidate.name}</p>
                                        <p className="text-xs text-muted-foreground">{candidate.position}</p>
                                      </div>
                                      <div className="flex items-center">
                                        <Badge variant="outline" className="text-xs bg-secondary/50">
                                          {candidate.daysInStage} дн.
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-1">
                                      {candidate.tags?.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-[10px] px-1 py-0 h-4">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                    
                                    <div className="pt-1">
                                      {getNextActionText(candidate.nextAction)}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </SortableItem>
                        ))}
                      </div>
                    ) : (
                      <div className="py-10 px-2 text-center border border-dashed rounded-lg bg-secondary/20">
                        <p className="text-xs text-muted-foreground">
                          Перетащите кандидата в этот этап
                        </p>
                      </div>
                    )}
                  </SortableContext>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2 text-xs h-7">
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Добавить кандидата
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default HiringPipeline;


import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';

interface VacancyFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: string;
  setFilterType: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  salaryRange: [number, number];
  setSalaryRange: (value: [number, number]) => void;
  experienceLevel: string[];
  setExperienceLevel: (value: string[]) => void;
  selectedSkills: string[];
  setSelectedSkills: (value: string[]) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  availableSkills: string[];
}

const VacancyFilters: React.FC<VacancyFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  sortBy,
  setSortBy,
  salaryRange,
  setSalaryRange,
  experienceLevel,
  setExperienceLevel,
  selectedSkills,
  setSelectedSkills,
  applyFilters,
  resetFilters,
  availableSkills,
}) => {
  const isMobile = useIsMobile();
  
  const handleExperienceLevelChange = (level: string) => {
    if (experienceLevel.includes(level)) {
      setExperienceLevel(experienceLevel.filter(exp => exp !== level));
    } else {
      setExperienceLevel([...experienceLevel, level]);
    }
  };

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const translateVacancyType = (type: string) => {
    switch (type) {
      case 'Full-time': return 'Полная занятость';
      case 'Part-time': return 'Частичная занятость';
      case 'Contract': return 'Контракт';
      case 'Remote': return 'Удаленно';
      default: return type;
    }
  };

  const filterContent = (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Заработная плата</h3>
        <div className="space-y-2">
          <Slider
            defaultValue={salaryRange}
            min={30000}
            max={300000}
            step={10000}
            onValueChange={(value) => setSalaryRange(value as [number, number])}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{salaryRange[0].toLocaleString()} ₽</span>
            <span>{salaryRange[1].toLocaleString()} ₽</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Опыт работы</h3>
        <div className="space-y-2">
          {['Нет опыта', 'От 1 года', 'От 3 лет', 'От 5 лет'].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox 
                id={level}
                checked={experienceLevel.includes(level)}
                onCheckedChange={() => handleExperienceLevelChange(level)}
              />
              <Label htmlFor={level}>{level}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Навыки</h3>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => (
            <Badge 
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={resetFilters}>
          Сбросить
        </Button>
        <Button onClick={applyFilters}>
          Применить
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Поиск вакансий..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Select 
          value={filterType} 
          onValueChange={setFilterType}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Все вакансии" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="Full-time">Полная занятость</SelectItem>
            <SelectItem value="Part-time">Частичная занятость</SelectItem>
            <SelectItem value="Contract">Контракт</SelectItem>
            <SelectItem value="Remote">Удаленно</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={sortBy} 
          onValueChange={setSortBy}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Сначала новые</SelectItem>
            <SelectItem value="oldest">Сначала старые</SelectItem>
            <SelectItem value="applicants-high">Больше откликов</SelectItem>
            <SelectItem value="applicants-low">Меньше откликов</SelectItem>
            <SelectItem value="salary-high">По зарплате (выс-низ)</SelectItem>
            <SelectItem value="salary-low">По зарплате (низ-выс)</SelectItem>
          </SelectContent>
        </Select>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Фильтры</SheetTitle>
              </SheetHeader>
              {filterContent}
            </SheetContent>
          </Sheet>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Расширенные фильтры</h3>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <X className="h-3 w-3" />
                </Button>
              </div>
              {filterContent}
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 w-full mt-2">
          {selectedSkills.map(skill => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
              {skill}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}
              />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs"
            onClick={() => setSelectedSkills([])}
          >
            Очистить
          </Button>
        </div>
      )}
    </div>
  );
};

export default VacancyFilters;

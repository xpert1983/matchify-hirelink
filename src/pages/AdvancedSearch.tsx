import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Save, FileDown, RefreshCcw, Briefcase, Users } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { vacanciesData, candidatesData } from '@/lib/data';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { VacancyProps } from '@/components/vacancies/VacancyCard';
import { CandidateProps } from '@/components/candidates/CandidateCard';

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('candidates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<number[]>([0, 10]);
  const [salaryRange, setSalaryRange] = useState<number[]>([30000, 250000]);
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [isRemote, setIsRemote] = useState(false);
  const [location, setLocation] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | { from: Date; to: Date }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date()
  });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [savedSearches, setSavedSearches] = useState<{name: string, type: string, terms: string}[]>([
    { name: "Senior Developers", type: "candidates", terms: "JavaScript, 5+ years" },
    { name: "Remote Marketing", type: "vacancies", terms: "Remote, Marketing" },
    { name: "Recent Tech Positions", type: "vacancies", terms: "Last 30 days, Tech" }
  ]);

  // Собираем все уникальные навыки из данных
  const allSkills = Array.from(
    new Set([
      ...vacanciesData.flatMap(v => v.skills),
      ...candidatesData.flatMap(c => c.skills)
    ])
  ).sort();

  // Собираем все уникальные отделы
  const departments = ['Разработка', 'Дизайн', 'Маркетинг', 'Продажи', 'HR', 'Финансы', 'Административный'];

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];

  const handleDateRangeChange = (range: DateRange | { from: Date; to: Date }) => {
    setDateRange(range);
  };

  const handleSearch = () => {
    let results: any[] = [];
    
    if (searchType === 'candidates') {
      results = candidatesData.filter(candidate => {
        // Базовый поиск по имени или описанию
        const matchesSearch = searchTerm === '' || 
                             candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             candidate.education.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Фильтрация по навыкам
        const matchesSkills = selectedSkills.length === 0 || 
                            selectedSkills.every(skill => candidate.skills.includes(skill));
        
        // Фильтрация по опыту работы (упрощенно)
        const candidateExp = parseInt(candidate.experience.replace(/\D/g, '')) || 0;
        const matchesExperience = candidateExp >= experience[0] && candidateExp <= experience[1];
        
        // Фильтрация по локации
        const matchesLocation = location === '' || 
                               candidate.location.toLowerCase().includes(location.toLowerCase());
        
        return matchesSearch && matchesSkills && matchesExperience && matchesLocation;
      });
    } else {
      results = vacanciesData.filter(vacancy => {
        // Базовый поиск по названию или описанию
        const matchesSearch = searchTerm === '' || 
                             vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             vacancy.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             vacancy.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Фильтрация по навыкам
        const matchesSkills = selectedSkills.length === 0 || 
                            selectedSkills.every(skill => vacancy.skills.includes(skill));
        
        // Фильтрация по диапазону зарплат (упрощенно)
        const vacSalary = parseInt(vacancy.salary.replace(/\D/g, '')) || 0;
        const matchesSalary = vacSalary >= salaryRange[0] && vacSalary <= salaryRange[1];
        
        // Фильтрация по типу занятости
        const matchesEmploymentType = employmentType.length === 0 || 
                                    employmentType.includes(vacancy.type);
        
        // Фильтрация по удаленной работе
        const matchesRemote = !isRemote || vacancy.type === 'Remote';
        
        // Фильтрация по отделам
        const vacancyDepartment = departments[Math.floor(Math.random() * departments.length)]; // Для демо
        const matchesDepartment = selectedDepartments.length === 0 || 
                                selectedDepartments.includes(vacancyDepartment);
        
        return matchesSearch && matchesSkills && matchesSalary && 
               matchesEmploymentType && matchesRemote && matchesDepartment;
      });
    }
    
    setSearchResults(results);
    setHasSearched(true);
    toast.success(`Найдено ${results.length} ${searchType === 'candidates' ? 'кандидатов' : 'вакансий'}`);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setExperience([0, 10]);
    setSalaryRange([30000, 250000]);
    setEmploymentType([]);
    setIsRemote(false);
    setLocation('');
    setSelectedDepartments([]);
    setDateRange({
      from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
      to: new Date()
    });
    setSearchResults([]);
    setHasSearched(false);
    toast.info('Параметры поиска сброшены');
  };

  const handleSaveSearch = () => {
    const newSavedSearch = {
      name: `Поиск ${new Date().toLocaleString('ru')}`,
      type: searchType,
      terms: searchTerm || 'Расширенные параметры'
    };
    setSavedSearches([...savedSearches, newSavedSearch]);
    toast.success('Параметры поиска сохранены');
  };

  const handleExportResults = () => {
    toast.success('Результаты экспортированы');
  };

  const handleViewItem = (id: string) => {
    if (searchType === 'candidates') {
      navigate(`/candidates?id=${id}`);
    } else {
      navigate(`/vacancies?id=${id}`);
    }
  };

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleToggleDepartment = (dept: string) => {
    if (selectedDepartments.includes(dept)) {
      setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
    } else {
      setSelectedDepartments([...selectedDepartments, dept]);
    }
  };

  const handleToggleEmploymentType = (type: string) => {
    if (employmentType.includes(type)) {
      setEmploymentType(employmentType.filter(t => t !== type));
    } else {
      setEmploymentType([...employmentType, type]);
    }
  };

  const formatSalary = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-green-500 hover:bg-green-600">Доступен</Badge>;
      case 'Interviewing':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">На собеседовании</Badge>;
      case 'Hired':
        return <Badge>Нанят</Badge>;
      case 'Not Available':
        return <Badge variant="outline">Недоступен</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Расширенный поиск</h1>
            <p className="text-muted-foreground mt-1">Поиск кандидатов или вакансий по детальным параметрам</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Сбросить
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSaveSearch}
            >
              <Save className="h-4 w-4 mr-2" />
              Сохранить поиск
            </Button>
            {hasSearched && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportResults}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Параметры поиска</CardTitle>
                <CardDescription>Настройте условия поиска</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="candidates" value={searchType} onValueChange={setSearchType}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="candidates">
                      <Users className="h-4 w-4 mr-2" />
                      Кандидаты
                    </TabsTrigger>
                    <TabsTrigger value="vacancies">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Вакансии
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Поисковый запрос</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        type="search"
                        placeholder="Введите поисковый запрос..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Период</Label>
                    <DateRangePicker
                      value={dateRange}
                      onChange={handleDateRangeChange}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Ключевые навыки</Label>
                    <ScrollArea className="h-[120px] rounded-md border p-2">
                      <div className="space-y-2">
                        {allSkills.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox 
                              id={skill}
                              checked={selectedSkills.includes(skill)}
                              onCheckedChange={() => handleToggleSkill(skill)}
                            />
                            <label htmlFor={skill} className="text-sm cursor-pointer">
                              {skill}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {searchType === 'candidates' ? (
                    <>
                      <div className="space-y-2">
                        <Label>Опыт работы (лет)</Label>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 10]}
                            max={15}
                            step={1}
                            value={experience}
                            onValueChange={setExperience}
                          />
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>{experience[0]} лет</span>
                            <span>{experience[1]} лет</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Локация</Label>
                        <Input
                          id="location"
                          placeholder="Введите город или страну"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>Зар��лата</Label>
                        <div className="px-2">
                          <Slider
                            defaultValue={[30000, 250000]}
                            max={500000}
                            step={10000}
                            value={salaryRange}
                            onValueChange={setSalaryRange}
                          />
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>{formatSalary(salaryRange[0])}</span>
                            <span>{formatSalary(salaryRange[1])}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Тип занятости</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {employmentTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`type-${type}`}
                                checked={employmentType.includes(type)}
                                onCheckedChange={() => handleToggleEmploymentType(type)}
                              />
                              <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="remote"
                          checked={isRemote}
                          onCheckedChange={(checked) => setIsRemote(checked === true)}
                        />
                        <label htmlFor="remote" className="text-sm cursor-pointer">
                          Только удаленная работа
                        </label>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Отдел</Label>
                        <ScrollArea className="h-[120px] rounded-md border p-2">
                          <div className="space-y-2">
                            {departments.map((dept) => (
                              <div key={dept} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`dept-${dept}`}
                                  checked={selectedDepartments.includes(dept)}
                                  onCheckedChange={() => handleToggleDepartment(dept)}
                                />
                                <label htmlFor={`dept-${dept}`} className="text-sm cursor-pointer">
                                  {dept}
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSearch} className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Найти
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Сохраненные поиски</CardTitle>
                <CardDescription>Ранее сохраненные запросы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedSearches.map((search, index) => (
                    <div 
                      key={index} 
                      className="rounded-md border p-3 cursor-pointer hover:bg-accent"
                      onClick={() => toast.info(`Загрузка сохраненного поиска: ${search.name}`)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{search.name}</h4>
                        <Badge variant="outline">
                          {search.type === 'candidates' ? 'Кандидаты' : 'Вакансии'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{search.terms}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            {!hasSearched ? (
              <Card className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-medium mt-4">Начните поиск</h3>
                  <p className="text-muted-foreground mt-2">
                    Выберите параметры поиска и нажмите "Найти" для получения результатов
                  </p>
                </div>
              </Card>
            ) : searchResults.length === 0 ? (
              <Card className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <Filter className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-medium mt-4">Нет результатов</h3>
                  <p className="text-muted-foreground mt-2">
                    Попробуйте изменить параметры поиска для получения результатов
                  </p>
                  <Button variant="outline" className="mt-4" onClick={handleReset}>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Сбросить параметры
                  </Button>
                </div>
              </Card>
            ) : searchType === 'candidates' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Найденные кандидаты</CardTitle>
                  <CardDescription>Найдено {searchResults.length} кандидатов</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Должность</TableHead>
                        <TableHead>Опыт</TableHead>
                        <TableHead>Локация</TableHead>
                        <TableHead>Навыки</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((candidate: any) => (
                        <TableRow key={candidate.id}>
                          <TableCell className="font-medium">{candidate.name}</TableCell>
                          <TableCell>{candidate.position}</TableCell>
                          <TableCell>{candidate.experience}</TableCell>
                          <TableCell>{candidate.location}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.slice(0, 2).map((skill: string) => (
                                <Badge key={skill} variant="secondary" className="mr-1">
                                  {skill}
                                </Badge>
                              ))}
                              {candidate.skills.length > 2 && (
                                <Badge variant="outline">+{candidate.skills.length - 2}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(candidate.status)}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleViewItem(candidate.id)}>
                              Просмотр
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Найденные вакансии</CardTitle>
                  <CardDescription>Найдено {searchResults.length} вакансий</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Должность</TableHead>
                        <TableHead>Компания</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Зарплата</TableHead>
                        <TableHead>Навыки</TableHead>
                        <TableHead>Отклики</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((vacancy: any) => (
                        <TableRow key={vacancy.id}>
                          <TableCell className="font-medium">{vacancy.title}</TableCell>
                          <TableCell>{vacancy.company}</TableCell>
                          <TableCell>{vacancy.type}</TableCell>
                          <TableCell>{vacancy.salary}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {vacancy.skills.slice(0, 2).map((skill: string) => (
                                <Badge key={skill} variant="secondary" className="mr-1">
                                  {skill}
                                </Badge>
                              ))}
                              {vacancy.skills.length > 2 && (
                                <Badge variant="outline">+{vacancy.skills.length - 2}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{vacancy.applicants}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleViewItem(vacancy.id)}>
                              Просмотр
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdvancedSearch;

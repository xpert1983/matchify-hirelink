import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { BarChart, FileDown, FileText, Filter, Table as TableIcon, Mail, Printer, RefreshCcw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';

const Reports = () => {
  const [dateRange, setDateRange] = useState<DateRange | { from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  });
  const [reportType, setReportType] = useState('hiring');

  const reports = [
    {
      id: 'hiring-efficiency',
      name: 'Эффективность найма',
      description: 'Анализ времени и стоимости найма, конверсия по этапам',
      category: 'hiring',
      lastGenerated: '01.07.2023',
      format: 'pdf',
    },
    {
      id: 'candidate-sources',
      name: 'Источники кандидатов',
      description: 'Статистика по каналам привлечения кандидатов',
      category: 'hiring',
      lastGenerated: '30.06.2023',
      format: 'excel',
    },
    {
      id: 'vacancy-performance',
      name: 'Эффективность вакансий',
      description: 'Статистика по открытым и закрытым вакансиям',
      category: 'vacancy',
      lastGenerated: '28.06.2023',
      format: 'pdf',
    },
    {
      id: 'candidate-quality',
      name: 'Качество кандидатов',
      description: 'Анализ квалификации и соответствия кандидатов',
      category: 'candidate',
      lastGenerated: '25.06.2023',
      format: 'excel',
    },
    {
      id: 'interview-analytics',
      name: 'Аналитика собеседований',
      description: 'Статистика проведенных собеседований и результатов',
      category: 'interview',
      lastGenerated: '20.06.2023',
      format: 'pdf',
    },
    {
      id: 'department-hiring',
      name: 'Найм по отделам',
      description: 'Анализ процессов найма в разрезе отделов',
      category: 'hiring',
      lastGenerated: '15.06.2023',
      format: 'excel',
    },
  ];

  const hiringData = [
    { department: 'Разработка', vacancies: 12, candidates: 86, interviews: 35, hires: 8 },
    { department: 'Маркетинг', vacancies: 5, candidates: 42, interviews: 18, hires: 3 },
    { department: 'Продажи', vacancies: 8, candidates: 63, interviews: 24, hires: 6 },
    { department: 'Дизайн', vacancies: 4, candidates: 29, interviews: 12, hires: 2 },
    { department: 'HR', vacancies: 2, candidates: 18, interviews: 8, hires: 1 },
  ];

  const generateReport = (reportId: string) => {
    toast.success(`Отчет "${reports.find(r => r.id === reportId)?.name}" сгенерирован`, {
      description: 'Файл доступен для скачивания',
    });
  };

  const scheduleReport = () => {
    toast.success('Отчет запланирован', {
      description: 'Отчет будет автоматически сгенерирован и отправлен на email',
    });
  };

  const filteredReports = reports.filter(r => reportType === 'all' || r.category === reportType);

  const handleDateRangeChange = (range: DateRange | { from: Date; to: Date }) => {
    setDateRange(range);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Отчеты</h1>
            <p className="text-muted-foreground">
              Генерация и анализ отчетов по процессам найма
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Обновить данные
            </Button>
          </div>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="reports">Список отчетов</TabsTrigger>
            <TabsTrigger value="custom">Конструктор отчетов</TabsTrigger>
            <TabsTrigger value="scheduled">Запланированные отчеты</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex items-center gap-2">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Тип отчета" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все отчеты</SelectItem>
                    <SelectItem value="hiring">Найм</SelectItem>
                    <SelectItem value="vacancy">Вакансии</SelectItem>
                    <SelectItem value="candidate">Кандидаты</SelectItem>
                    <SelectItem value="interview">Собеседования</SelectItem>
                  </SelectContent>
                </Select>
                
                <DateRangePicker 
                  value={dateRange} 
                  onChange={handleDateRangeChange} 
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="hover-lift transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Последняя генерация:</span>
                      <span>{report.lastGenerated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Формат:</span>
                      <span className="uppercase">{report.format}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => scheduleReport()}>
                      <Mail className="h-4 w-4 mr-2" />
                      По почте
                    </Button>
                    <Button size="sm" onClick={() => generateReport(report.id)}>
                      <FileDown className="h-4 w-4 mr-2" />
                      Скачать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Конструктор отчетов</CardTitle>
                    <CardDescription>
                      Создайте собственный отчет на основе доступных данных
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Название отчета</label>
                      <input 
                        type="text" 
                        placeholder="Введите название отчета" 
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Тип отчета</label>
                      <Select defaultValue="hiring">
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hiring">Найм</SelectItem>
                          <SelectItem value="vacancy">Вакансии</SelectItem>
                          <SelectItem value="candidate">Кандидаты</SelectItem>
                          <SelectItem value="interview">Собеседования</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Период</label>
                      <DateRangePicker 
                        value={dateRange} 
                        onChange={handleDateRangeChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Формат вывода</label>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <TableIcon className="h-4 w-4 mr-2" />
                          Таблица
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <BarChart className="h-4 w-4 mr-2" />
                          График
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Выберите поля</label>
                      <ScrollArea className="h-[200px] pr-4">
                        <div className="space-y-2">
                          {['Отдел', 'Вакансии', 'Кандидаты', 'Собеседования', 'Наймы', 'Дата открытия', 'Дата закрытия', 'Источник кандидата', 'Стоимость найма', 'Время найма', 'Рейтинг кандидата', 'Позиция', 'Навыки', 'Зарплата'].map((field) => (
                            <div key={field} className="flex items-center gap-2">
                              <input type="checkbox" id={`field-${field}`} className="rounded" />
                              <label htmlFor={`field-${field}`} className="text-sm">{field}</label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Сохранить шаблон</Button>
                    <Button>Сгенерировать</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Предпросмотр отчета</CardTitle>
                    <CardDescription>
                      Данные за {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Отдел</TableHead>
                            <TableHead>Вакансии</TableHead>
                            <TableHead>Кандидаты</TableHead>
                            <TableHead>Собеседования</TableHead>
                            <TableHead>Наймы</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {hiringData.map((row) => (
                            <TableRow key={row.department}>
                              <TableCell className="font-medium">{row.department}</TableCell>
                              <TableCell>{row.vacancies}</TableCell>
                              <TableCell>{row.candidates}</TableCell>
                              <TableCell>{row.interviews}</TableCell>
                              <TableCell>{row.hires}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">
                      <Printer className="h-4 w-4 mr-2" />
                      Печать
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Excel
                    </Button>
                    <Button>
                      <FileDown className="h-4 w-4 mr-2" />
                      Скачать PDF
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Запланированные отчеты</CardTitle>
                <CardDescription>
                  Настройте регулярную генерацию и рассылку отчетов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название отчета</TableHead>
                      <TableHead>Периодичность</TableHead>
                      <TableHead>Следующая отправка</TableHead>
                      <TableHead>Получатели</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Еженедельный отчет по найму</TableCell>
                      <TableCell>Еженедельно (Пн)</TableCell>
                      <TableCell>10.07.2023</TableCell>
                      <TableCell>hr@company.com, ceo@company.com</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Изменить</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ежемесячный отчет по вакансиям</TableCell>
                      <TableCell>Ежемесячно (1-е число)</TableCell>
                      <TableCell>01.08.2023</TableCell>
                      <TableCell>department-heads@company.com</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Изменить</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Квартальная аналитика найма</TableCell>
                      <TableCell>Ежеквартально</TableCell>
                      <TableCell>01.10.2023</TableCell>
                      <TableCell>board@company.com</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Изменить</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Добавить запланированный отчет
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { DateRange } from 'react-day-picker';

const Analytics = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  });
  const [period, setPeriod] = useState('month');

  // Данные для графиков
  const recruitmentPerformance = [
    { month: 'Янв', applicants: 65, interviews: 45, hires: 12 },
    { month: 'Фев', applicants: 80, interviews: 52, hires: 15 },
    { month: 'Мар', applicants: 70, interviews: 48, hires: 11 },
    { month: 'Апр', applicants: 90, interviews: 60, hires: 18 },
    { month: 'Май', applicants: 100, interviews: 70, hires: 22 },
    { month: 'Июн', applicants: 110, interviews: 75, hires: 25 },
  ];

  const timeToHire = [
    { stage: 'Рассмотрение', days: 3 },
    { stage: 'Первичный отбор', days: 5 },
    { stage: 'Первое собеседование', days: 3 },
    { stage: 'Тестовое задание', days: 7 },
    { stage: 'Финальное собеседование', days: 2 },
    { stage: 'Предложение', days: 2 },
    { stage: 'Принятие оффера', days: 3 },
  ];

  const sourcesChart = [
    { name: 'HeadHunter', value: 45, color: '#8884d8' },
    { name: 'Рекомендации', value: 25, color: '#83a6ed' },
    { name: 'LinkedIn', value: 15, color: '#8dd1e1' },
    { name: 'Сайт компании', value: 10, color: '#82ca9d' },
    { name: 'Другое', value: 5, color: '#ffc658' },
  ];

  const qualityOfHire = [
    { month: 'Янв', score: 7.5 },
    { month: 'Фев', score: 8.0 },
    { month: 'Мар', score: 7.8 },
    { month: 'Апр', score: 8.2 },
    { month: 'Май', score: 8.5 },
    { month: 'Июн', score: 8.7 },
  ];

  const costPerHire = [
    { department: 'Разработка', cost: 120000 },
    { department: 'Маркетинг', cost: 85000 },
    { department: 'Продажи', cost: 70000 },
    { department: 'Дизайн', cost: 90000 },
    { department: 'HR', cost: 60000 },
  ];

  const turnover = [
    { month: 'Янв', rate: 2.1 },
    { month: 'Фев', rate: 1.8 },
    { month: 'Мар', rate: 2.3 },
    { month: 'Апр', rate: 2.0 },
    { month: 'Май', rate: 1.5 },
    { month: 'Июн', rate: 1.3 },
  ];

  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from) {
      setDateRange(range);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Аналитика</h1>
            <p className="text-muted-foreground">
              Детальная статистика и аналитические данные по процессу найма
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Неделя</SelectItem>
                <SelectItem value="month">Месяц</SelectItem>
                <SelectItem value="quarter">Квартал</SelectItem>
                <SelectItem value="year">Год</SelectItem>
              </SelectContent>
            </Select>
            
            <DateRangePicker 
              value={dateRange} 
              onChange={handleDateRangeChange} 
            />
          </div>
        </div>
        
        <DashboardStats />
        
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Эффективность найма</TabsTrigger>
            <TabsTrigger value="candidates">Аналитика кандидатов</TabsTrigger>
            <TabsTrigger value="costs">Стоимость и ROI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Эффективность найма</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={recruitmentPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applicants" name="Кандидаты" fill="#8884d8" />
                      <Bar dataKey="interviews" name="Собеседования" fill="#82ca9d" />
                      <Bar dataKey="hires" name="Наймы" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Среднее время найма</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={timeToHire}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" unit=" дн." />
                      <YAxis dataKey="stage" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="days" name="Дней" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Источники кандидатов</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sourcesChart}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourcesChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Качество найма</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={qualityOfHire}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        name="Рейтинг (0-10)"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="candidates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Конверсия кандидатов по этапам</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={[
                        { stage: 'Просмотр', count: 100 },
                        { stage: 'Заявка', count: 38 },
                        { stage: 'Скрининг', count: 25 },
                        { stage: 'Интервью', count: 18 },
                        { stage: 'Тестовое', count: 12 },
                        { stage: 'Оффер', count: 8 },
                        { stage: 'Найм', count: 5 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="count" name="Количество кандидатов" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Распределение по навыкам</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { skill: 'JavaScript', count: 45 },
                        { skill: 'React', count: 38 },
                        { skill: 'TypeScript', count: 30 },
                        { skill: 'Node.js', count: 25 },
                        { skill: 'HTML/CSS', count: 42 },
                        { skill: 'Python', count: 18 },
                        { skill: 'Java', count: 15 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Количество кандидатов" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Стоимость найма по отделам</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={costPerHire}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} ₽`, 'Стоимость']} />
                      <Legend />
                      <Bar dataKey="cost" name="Стоимость найма (₽)" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Текучесть кадров</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={turnover}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Текучесть']} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        name="Процент текучести (%)"
                        stroke="#ff7300"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;

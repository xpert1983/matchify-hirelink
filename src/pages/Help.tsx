
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart, 
  Search, 
  Settings,
  LayoutDashboard,
  Handshake
} from 'lucide-react';

const Help = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Справка и руководство пользователя</h1>
        
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="getting-started">Начало работы</TabsTrigger>
            <TabsTrigger value="modules">Модули</TabsTrigger>
            <TabsTrigger value="faq">Частые вопросы</TabsTrigger>
            <TabsTrigger value="glossary">Глоссарий</TabsTrigger>
          </TabsList>
          
          <TabsContent value="getting-started">
            <Card>
              <CardHeader>
                <CardTitle>Начало работы с HireLink</CardTitle>
                <CardDescription>
                  Основная информация о работе с системой подбора персонала
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Добро пожаловать в HireLink!</h3>
                  <p>
                    HireLink - это современная система управления процессами рекрутинга, которая помогает оптимизировать весь цикл найма 
                    от создания вакансии до найма кандидата. Ниже приведены основные шаги для начала работы с платформой.
                  </p>
                  
                  <div className="space-y-2 mt-4">
                    <h4 className="font-medium">1. Регистрация и вход в систему</h4>
                    <p>
                      Для начала работы необходимо авторизоваться в системе. Используйте ваши учетные данные (электронную почту и пароль), 
                      предоставленные администратором системы.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">2. Навигация по системе</h4>
                    <p>
                      Основное меню находится в левой части экрана и обеспечивает доступ ко всем функциональным модулям:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Дашборд</strong> - обзор ключевых показателей и статистики</li>
                      <li><strong>Вакансии</strong> - создание и управление вакансиями</li>
                      <li><strong>Кандидаты</strong> - база кандидатов и управление резюме</li>
                      <li><strong>Подборки</strong> - сопоставление кандидатов с вакансиями</li>
                      <li><strong>Отчеты</strong> - аналитика и отчетность по процессам найма</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">3. Первые шаги</h4>
                    <p>Рекомендуемые первые действия в системе:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Ознакомьтесь с дашбордом для понимания текущего состояния процессов</li>
                      <li>Создайте вакансию через раздел "Вакансии"</li>
                      <li>Добавьте кандидатов в систему через раздел "Кандидаты"</li>
                      <li>Настройте профиль в разделе "Настройки"</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="modules">
            <Card>
              <CardHeader>
                <CardTitle>Модули системы</CardTitle>
                <CardDescription>
                  Подробное описание функциональных модулей HireLink
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="dashboard">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <LayoutDashboard className="h-5 w-5 mr-2" />
                        <span>Дашборд</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>
                          Дашборд представляет собой главную страницу системы, которая отображает ключевые 
                          показатели эффективности процессов найма. Здесь вы можете увидеть:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Количество активных вакансий и статистику их заполнения</li>
                          <li>Статистику по кандидатам (новые, на рассмотрении, отклоненные, принятые)</li>
                          <li>Календарь предстоящих собеседований</li>
                          <li>Эффективность по различным каналам привлечения кандидатов</li>
                          <li>Средний срок закрытия вакансий</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="vacancies">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2" />
                        <span>Вакансии</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>Модуль "Вакансии" позволяет управлять всеми открытыми и закрытыми вакансиями компании:</p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Создание новых вакансий с детальным описанием требований</li>
                          <li>Редактирование существующих вакансий</li>
                          <li>Отслеживание статуса вакансий (новая, в работе, закрыта, на паузе)</li>
                          <li>Назначение ответственных рекрутеров за вакансии</li>
                          <li>Просмотр воронки кандидатов по каждой вакансии</li>
                          <li>Настройка этапов отбора для разных вакансий</li>
                        </ul>
                        <p className="mt-2">
                          <strong>Совет:</strong> Используйте фильтры для быстрого доступа к нужным вакансиям по статусу, 
                          отделу или дате создания.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="candidates">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        <span>Кандидаты</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>
                          Модуль "Кандидаты" представляет собой базу данных всех соискателей, когда-либо взаимодействовавших 
                          с компанией. Функциональность включает:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Добавление новых кандидатов и их резюме</li>
                          <li>Структурирование информации о навыках, опыте и образовании</li>
                          <li>Отслеживание истории взаимодействия с кандидатом</li>
                          <li>Добавление заметок и оценок после интервью</li>
                          <li>Поиск кандидатов по различным параметрам</li>
                        </ul>
                        <p className="mt-2">
                          <strong>Совет:</strong> Всегда добавляйте теги к профилю кандидата для облегчения 
                          дальнейшего поиска по специализации или навыкам.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="matches">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Handshake className="h-5 w-5 mr-2" />
                        <span>Подборки</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>
                          Модуль "Подборки" позволяет сопоставлять кандидатов с открытыми вакансиями и 
                          отслеживать процесс подбора:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Автоматическое сопоставление кандидатов с вакансиями на основе навыков</li>
                          <li>Управление воронкой найма для каждой вакансии</li>
                          <li>Перемещение кандидатов между этапами отбора</li>
                          <li>Назначение интервью и отправка приглашений</li>
                          <li>Отслеживание статусов кандидатов на каждом этапе</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="reports">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2" />
                        <span>Отчеты</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>
                          Модуль "Отчеты" предоставляет аналитическую информацию о процессах найма и эффективности 
                          рекрутинга. Доступные отчеты:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Эффективность каналов привлечения кандидатов</li>
                          <li>Время закрытия вакансий по отделам и позициям</li>
                          <li>Конверсия кандидатов на каждом этапе воронки найма</li>
                          <li>Активность рекрутеров и их производительность</li>
                          <li>Статистика отказов и причин отклонения кандидатов</li>
                        </ul>
                        <p className="mt-2">
                          <strong>Совет:</strong> Используйте фильтры по датам для сравнения показателей 
                          за разные периоды времени.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Часто задаваемые вопросы</CardTitle>
                <CardDescription>
                  Ответы на распространенные вопросы пользователей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>
                      Как создать новую вакансию?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pl-4">
                        Для создания новой вакансии перейдите в раздел "Вакансии" и нажмите кнопку "Создать вакансию". 
                        Заполните все необходимые поля формы: название должности, описание, требования, условия работы, 
                        зарплатную вилку и т.д. После заполнения всех полей нажмите "Сохранить". Новая вакансия появится 
                        в списке активных вакансий и будет доступна для подбора кандидатов.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>
                      Как добавить нового кандидата в систему?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pl-4">
                        Для добавления нового кандидата перейдите в раздел "Кандидаты" и нажмите кнопку "Добавить кандидата". 
                        Заполните персональные данные кандидата, загрузите резюме, укажите навыки, опыт работы и другую 
                        релевантную информацию. После заполнения всех необходимых полей нажмите "Сохранить". Кандидат будет 
                        добавлен в базу данных и станет доступен для рассмотрения на вакансии.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>
                      Как назначить собеседование с кандидатом?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pl-4">
                        Для назначения собеседования найдите кандидата в разделе "Кандидаты" или в воронке вакансии, 
                        перейдите в его профиль и нажмите кнопку "Назначить собеседование". Выберите дату, время, 
                        формат встречи (онлайн или офлайн) и участников со стороны компании. При необходимости 
                        добавьте комментарии или инструкции. После создания собеседования система отправит уведомления 
                        всем участникам и добавит событие в календарь.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-4">
                    <AccordionTrigger>
                      Как сформировать отчет по эффективности рекрутинга?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pl-4">
                        Для формирования отчета перейдите в раздел "Отчеты". Выберите тип отчета из доступных 
                        (например, "Эффективность рекрутинга"). Укажите период, за который нужно сформировать отчет, 
                        и другие параметры фильтрации при необходимости (отдел, рекрутер и т.д.). Нажмите "Сформировать отчет". 
                        Система отобразит данные в виде таблиц и графиков. Вы можете экспортировать отчет в PDF или Excel 
                        для дальнейшего использования или отправки коллегам.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-5">
                    <AccordionTrigger>
                      Как настроить уведомления в системе?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pl-4">
                        Для настройки уведомлений перейдите в раздел "Настройки" и выберите вкладку "Уведомления". 
                        Здесь вы можете указать, о каких событиях вы хотите получать уведомления (новые кандидаты, 
                        изменения статусов вакансий, назначенные собеседования и т.д.) и через какие каналы 
                        (электронная почта, в системе, push-уведомления). Включите или отключите нужные типы 
                        уведомлений и нажмите "Сохранить настройки".
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="glossary">
            <Card>
              <CardHeader>
                <CardTitle>Глоссарий терминов</CardTitle>
                <CardDescription>
                  Основные термины и понятия, используемые в системе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">ATS (Applicant Tracking System)</h3>
                    <p className="text-sm text-muted-foreground">
                      Система отслеживания кандидатов - программное обеспечение, позволяющее автоматизировать 
                      процессы рекрутинга и управление кандидатами.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Воронка найма (Hiring Funnel)</h3>
                    <p className="text-sm text-muted-foreground">
                      Последовательность этапов, через которые проходит кандидат от момента отклика на вакансию 
                      до принятия решения о найме (скрининг, первичное интервью, техническое интервью, оффер).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Скрининг (Screening)</h3>
                    <p className="text-sm text-muted-foreground">
                      Первичная оценка резюме кандидатов для определения их соответствия базовым требованиям вакансии.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Оффер (Offer)</h3>
                    <p className="text-sm text-muted-foreground">
                      Официальное предложение о работе, которое компания делает кандидату после успешного 
                      прохождения всех этапов собеседования.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Теги (Tags)</h3>
                    <p className="text-sm text-muted-foreground">
                      Метки, которые можно присваивать кандидатам или вакансиям для быстрого поиска и фильтрации 
                      (например, "Java", "Английский B2", "Удаленная работа").
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Конверсия в воронке найма (Funnel Conversion Rate)</h3>
                    <p className="text-sm text-muted-foreground">
                      Процент кандидатов, которые успешно переходят с одного этапа воронки на следующий, 
                      используется для оценки эффективности процесса отбора.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Время закрытия вакансии (Time-to-Fill)</h3>
                    <p className="text-sm text-muted-foreground">
                      Период времени от момента открытия вакансии до момента её закрытия (принятия кандидата на работу).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Рекомендательный рекрутинг (Referral Recruiting)</h3>
                    <p className="text-sm text-muted-foreground">
                      Процесс поиска кандидатов через рекомендации существующих сотрудников компании.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Help;

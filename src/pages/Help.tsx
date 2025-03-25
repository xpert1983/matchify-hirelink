
import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { FileQuestion, BookOpen, Bookmark, Info, Mail, Phone } from 'lucide-react';

const Help = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Справка</h1>
          <p className="text-muted-foreground">
            Руководство пользователя и ответы на часто задаваемые вопросы
          </p>
        </div>

        <Tabs defaultValue="guide">
          <TabsList className="mb-4">
            <TabsTrigger value="guide">Руководство</TabsTrigger>
            <TabsTrigger value="faq">Часто задаваемые вопросы</TabsTrigger>
            <TabsTrigger value="contact">Связаться с поддержкой</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guide" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover-lift transition-all">
                <CardHeader className="flex flex-row items-center gap-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Начало работы</CardTitle>
                    <CardDescription>Основы работы с порталом</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Узнайте, как начать работу с порталом, создавать вакансии и управлять кандидатами.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift transition-all">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Bookmark className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Управление вакансиями</CardTitle>
                    <CardDescription>Создание и редактирование</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Научитесь эффективно управлять вакансиями, настраивать требования и отслеживать кандидатов.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift transition-all">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Info className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Работа с кандидатами</CardTitle>
                    <CardDescription>Поиск и оценка</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Узнайте, как найти и оценить подходящих кандидатов для ваших вакансий.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold mb-4">Пошаговые инструкции</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Как создать новую вакансию</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 1: Перейдите в раздел "Вакансии"</h3>
                    <p className="text-sm text-muted-foreground">
                      Нажмите на вкладку "Вакансии" в левом боковом меню.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 2: Нажмите кнопку "Добавить вакансию"</h3>
                    <p className="text-sm text-muted-foreground">
                      В правом верхнем углу экрана найдите кнопку с иконкой "+" и нажмите на неё.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 3: Заполните форму</h3>
                    <p className="text-sm text-muted-foreground">
                      Введите название вакансии, описание, требования, зарплату и другие детали.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 4: Сохраните вакансию</h3>
                    <p className="text-sm text-muted-foreground">
                      Нажмите кнопку "Сохранить" для создания вакансии.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Как добавить нового кандидата</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 1: Перейдите в раздел "Кандидаты"</h3>
                    <p className="text-sm text-muted-foreground">
                      Нажмите на вкладку "Кандидаты" в левом боковом меню.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 2: Нажмите кнопку "Новый кандидат"</h3>
                    <p className="text-sm text-muted-foreground">
                      В правом верхнем углу экрана найдите кнопку с иконкой "+" и нажмите на неё.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 3: Заполните профиль кандидата</h3>
                    <p className="text-sm text-muted-foreground">
                      Введите имя, контактные данные, опыт работы и навыки кандидата.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 4: Загрузите резюме (опционально)</h3>
                    <p className="text-sm text-muted-foreground">
                      При необходимости прикрепите файл резюме кандидата.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 5: Сохраните профиль</h3>
                    <p className="text-sm text-muted-foreground">
                      Нажмите кнопку "Сохранить" для создания профиля кандидата.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Как назначить собеседование</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 1: Выберите кандидата</h3>
                    <p className="text-sm text-muted-foreground">
                      Перейдите в раздел "Кандидаты" и выберите нужного кандидата.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 2: Нажмите "Запланировать собеседование"</h3>
                    <p className="text-sm text-muted-foreground">
                      На странице профиля кандидата найдите соответствующую кнопку.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 3: Выберите вакансию</h3>
                    <p className="text-sm text-muted-foreground">
                      Укажите вакансию, на которую претендует кандидат.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 4: Укажите дату и время</h3>
                    <p className="text-sm text-muted-foreground">
                      Выберите удобную дату и время для проведения собеседования.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 5: Добавьте дополнительную информацию</h3>
                    <p className="text-sm text-muted-foreground">
                      Укажите место проведения, интервьюера и любые дополнительные заметки.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Шаг 6: Подтвердите</h3>
                    <p className="text-sm text-muted-foreground">
                      Нажмите "Сохранить" для создания собеседования.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Часто задаваемые вопросы</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Как добавить несколько вакансий одновременно?
                </AccordionTrigger>
                <AccordionContent>
                  Вы можете импортировать список вакансий из Excel или CSV файла. Для этого перейдите в раздел "Вакансии", 
                  нажмите на кнопку "Импорт/Экспорт" и выберите соответствующий файл. Система поддерживает стандартные 
                  форматы данных и автоматически обработает информацию.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Как найти кандидатов с определенными навыками?
                </AccordionTrigger>
                <AccordionContent>
                  Используйте "Расширенный поиск" в разделе "Кандидаты". Вы можете фильтровать кандидатов 
                  по навыкам, опыту работы, образованию и другим параметрам. Также можно использовать функцию 
                  "Найти подходящих кандидатов" на странице вакансии для автоматического подбора.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Можно ли назначить несколько интервьюеров на собеседование?
                </AccordionTrigger>
                <AccordionContent>
                  Да, при создании или редактировании собеседования вы можете добавить несколько интервьюеров, 
                  разделив их имена запятыми или выбрав из списка сотрудников компании. Каждый интервьюер получит 
                  уведомление о назначенном собеседовании.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Как изменить статус вакансии?
                </AccordionTrigger>
                <AccordionContent>
                  Перейдите на страницу вакансии, нажмите на текущий статус вакансии и выберите новый статус 
                  из выпадающего меню. Вы можете изменить статус на "Активна", "Приостановлена", "Закрыта" или "Черновик".
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Как создать пользовательский отчет?
                </AccordionTrigger>
                <AccordionContent>
                  Перейдите в раздел "Отчеты" и выберите вкладку "Конструктор отчетов". Здесь вы можете указать 
                  параметры отчета, выбрать необходимые поля данных и период, за который нужно собрать информацию. 
                  После настройки нажмите "Сгенерировать" для создания отчета.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  Можно ли настроить этапы найма для вакансии?
                </AccordionTrigger>
                <AccordionContent>
                  Да, для каждой вакансии можно настроить собственный процесс найма. Перейдите на страницу вакансии, 
                  выберите вкладку "Процесс найма" и нажмите "Настроить этапы". Вы можете добавлять, удалять и изменять 
                  порядок этапов в соответствии с вашими требованиями.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Связаться с технической поддержкой</CardTitle>
                <CardDescription>
                  Если у вас возникли вопросы или проблемы, которые не освещены в справке, свяжитесь с нами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>support@hirelink.com</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+7 (800) 123-45-67</span>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Форма обратной связи</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Имя</label>
                        <input 
                          id="name" 
                          type="text" 
                          className="w-full p-2 rounded-md border border-input bg-background" 
                          placeholder="Ваше имя"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input 
                          id="email" 
                          type="email" 
                          className="w-full p-2 rounded-md border border-input bg-background" 
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Тема</label>
                      <input 
                        id="subject" 
                        type="text" 
                        className="w-full p-2 rounded-md border border-input bg-background" 
                        placeholder="Тема обращения"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Сообщение</label>
                      <textarea 
                        id="message" 
                        className="w-full p-2 rounded-md border border-input bg-background min-h-[120px]" 
                        placeholder="Опишите вашу проблему или вопрос"
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                      Отправить
                    </button>
                  </form>
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


import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sun, Moon, Bell, Globe, UserCircle2, Lock, Mail, Shield, Key } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/use-theme';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  
  const handleSaveSettings = () => {
    toast.success('Настройки сохранены');
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
          <p className="text-muted-foreground mt-1">Управление настройками приложения и профиля пользователя.</p>
        </div>
        
        <Tabs defaultValue="appearance" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="md:w-64 flex-shrink-0">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto items-stretch gap-1">
                  <TabsTrigger value="appearance" className="justify-start py-2 px-3 text-left">
                    <Sun className="h-4 w-4 mr-2" />
                    Внешний вид
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start py-2 px-3 text-left">
                    <Bell className="h-4 w-4 mr-2" />
                    Уведомления
                  </TabsTrigger>
                  <TabsTrigger value="language" className="justify-start py-2 px-3 text-left">
                    <Globe className="h-4 w-4 mr-2" />
                    Язык и регион
                  </TabsTrigger>
                  <TabsTrigger value="account" className="justify-start py-2 px-3 text-left">
                    <UserCircle2 className="h-4 w-4 mr-2" />
                    Аккаунт
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start py-2 px-3 text-left">
                    <Lock className="h-4 w-4 mr-2" />
                    Безопасность
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
            
            <div className="flex-1">
              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Внешний вид</CardTitle>
                    <CardDescription>
                      Настройте внешний вид приложения по своему вкусу.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Тема</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div 
                          className={`border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary ${theme === 'light' ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="h-5 w-5" />
                          <span className="text-sm">Светлая</span>
                        </div>
                        <div 
                          className={`border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary ${theme === 'dark' ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="h-5 w-5" />
                          <span className="text-sm">Темная</span>
                        </div>
                        <div 
                          className={`border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary ${theme === 'system' ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => setTheme('system')}
                        >
                          <div className="flex gap-1">
                            <Sun className="h-5 w-5" />
                            <Moon className="h-5 w-5" />
                          </div>
                          <span className="text-sm">Системная</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label>Цветовая схема</Label>
                      <RadioGroup defaultValue="blue" className="grid grid-cols-3 gap-4 pt-2">
                        <div>
                          <RadioGroupItem value="blue" id="blue" className="peer sr-only" />
                          <Label
                            htmlFor="blue"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-2 h-5 w-5 rounded-full bg-blue-600" />
                            <span>Синий</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="purple" id="purple" className="peer sr-only" />
                          <Label
                            htmlFor="purple"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-2 h-5 w-5 rounded-full bg-purple-600" />
                            <span>Фиолетовый</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="green" id="green" className="peer sr-only" />
                          <Label
                            htmlFor="green"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-2 h-5 w-5 rounded-full bg-green-600" />
                            <span>Зеленый</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Анимации</Label>
                          <p className="text-sm text-muted-foreground">
                            Включить анимации интерфейса
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Компактный режим</Label>
                          <p className="text-sm text-muted-foreground">
                            Уменьшить отступы в интерфейсе
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleSaveSettings}>
                      Сохранить настройки
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Уведомления</CardTitle>
                    <CardDescription>
                      Настройте уведомления, которые вы хотите получать.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email уведомления</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Новые кандидаты</Label>
                          <p className="text-sm text-muted-foreground">
                            Уведомления о новых подходящих кандидатах
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Новые совпадения</Label>
                          <p className="text-sm text-muted-foreground">
                            Уведомления о новых совпадениях кандидатов с вакансиями
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Изменения статуса</Label>
                          <p className="text-sm text-muted-foreground">
                            Уведомления об изменениях статуса кандидатов
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Уведомления в приложении</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Обновления системы</Label>
                          <p className="text-sm text-muted-foreground">
                            Уведомления о новых функциях и обновлениях системы
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Напоминания</Label>
                          <p className="text-sm text-muted-foreground">
                            Напоминания о запланированных собеседованиях и задачах
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Командные активности</Label>
                          <p className="text-sm text-muted-foreground">
                            Уведомления о действиях других членов команды
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleSaveSettings}>
                      Сохранить настройки
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="language" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Язык и регион</CardTitle>
                    <CardDescription>
                      Настройте язык и региональные параметры приложения.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Язык приложения</Label>
                      <Select defaultValue="ru">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Выберите язык" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ru">Русский</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">Регион</Label>
                      <Select defaultValue="ru">
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Выберите регион" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ru">Россия</SelectItem>
                          <SelectItem value="us">США</SelectItem>
                          <SelectItem value="eu">Европа</SelectItem>
                          <SelectItem value="asia">Азия</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeZone">Часовой пояс</Label>
                      <Select defaultValue="msk">
                        <SelectTrigger id="timeZone">
                          <SelectValue placeholder="Выберите часовой пояс" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="msk">Москва (GMT+3)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Восточное время (GMT-5)</SelectItem>
                          <SelectItem value="pst">Тихоокеанское время (GMT-8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Формат даты</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger id="dateFormat">
                          <SelectValue placeholder="Выберите формат даты" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">ДД-ММ-ГГГГ</SelectItem>
                          <SelectItem value="mm-dd-yyyy">ММ-ДД-ГГГГ</SelectItem>
                          <SelectItem value="yyyy-mm-dd">ГГГГ-ММ-ДД</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleSaveSettings}>
                      Сохранить настройки
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Аккаунт</CardTitle>
                    <CardDescription>
                      Управление настройками вашего аккаунта.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Личная информация</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Имя</Label>
                          <Input id="firstName" placeholder="Имя" defaultValue="Анна" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Фамилия</Label>
                          <Input id="lastName" placeholder="Фамилия" defaultValue="Иванова" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Email" defaultValue="anna@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" placeholder="Телефон" defaultValue="+7 (999) 123-45-67" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Профессиональная информация</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Компания</Label>
                        <Input id="company" placeholder="Компания" defaultValue="ТехноСофт" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Должность</Label>
                        <Input id="position" placeholder="Должность" defaultValue="HR-менеджер" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Отдел</Label>
                        <Input id="department" placeholder="Отдел" defaultValue="Управление персоналом" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleSaveSettings}>
                      Сохранить настройки
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Безопасность</CardTitle>
                    <CardDescription>
                      Управление настройками безопасности вашего аккаунта.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Смена пароля</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Текущий пароль</Label>
                        <Input id="currentPassword" type="password" placeholder="Текущий пароль" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Новый пароль</Label>
                        <Input id="newPassword" type="password" placeholder="Новый пароль" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                        <Input id="confirmPassword" type="password" placeholder="Подтвердите пароль" />
                      </div>
                      
                      <Button className="mt-2">Сменить пароль</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Двухфакторная аутентификация</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>2FA</Label>
                          <p className="text-sm text-muted-foreground">
                            Добавьте дополнительный уровень защиты для своего аккаунта
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Сессии</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">Москва, Россия</p>
                            <p className="text-sm text-muted-foreground">Chrome на Windows • IP: 192.168.1.1 • Активно сейчас</p>
                          </div>
                          <Badge>Текущая</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">Санкт-Петербург, Россия</p>
                            <p className="text-sm text-muted-foreground">Safari на Mac • IP: 192.168.2.2 • 3 дня назад</p>
                          </div>
                          <Button size="sm" variant="outline">Завершить</Button>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Завершить все сессии
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleSaveSettings}>
                      Сохранить настройки
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;

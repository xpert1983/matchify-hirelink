import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Shield, User, Mail, Lock, Globe, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/components/ui/use-toast';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const { toast } = useToast();

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  const handleSaveChanges = () => {
    toast({
      title: "Настройки сохранены",
      description: "Изменения применены успешно",
    });
  };

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Настройки профиля</CardTitle>
          <CardDescription>Управляйте настройками своего профиля и аккаунта</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="space-y-4">
            <TabsList>
              <TabsTrigger value="account">Аккаунт</TabsTrigger>
              <TabsTrigger value="security">Безопасность</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
              <TabsTrigger value="privacy">Конфиденциальность</TabsTrigger>
              <TabsTrigger value="preferences">Предпочтения</TabsTrigger>
              <TabsTrigger value="billing">Оплата</TabsTrigger>
              <TabsTrigger value="help">Помощь</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-2">
              <div className="grid gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatar.jpg" alt="Аватар" />
                    <AvatarFallback>АИ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium leading-none">Анна Иванова</h4>
                    <p className="text-sm text-muted-foreground">HR-менеджер</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-1">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" defaultValue="Анна Иванова" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="anna.ivanova@example.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" defaultValue="+7 (999) 123-45-67" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security" className="space-y-2">
              <div className="grid gap-4">
                <div className="space-y-1">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" defaultValue="********" />
                </div>
                <Button variant="outline">Изменить пароль</Button>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium leading-none">Двухфакторная аутентификация</h4>
                    <p className="text-sm text-muted-foreground">Дополнительный уровень безопасности для вашего аккаунта</p>
                  </div>
                  <Switch id="2fa" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-2">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium leading-none">Email уведомления</h4>
                    <p className="text-sm text-muted-foreground">Получайте уведомления о новых кандидатах и вакансиях</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium leading-none">Push уведомления</h4>
                    <p className="text-sm text-muted-foreground">Получайте уведомления на телефон</p>
                  </div>
                  <Switch id="push-notifications" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="privacy" className="space-y-2">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium leading-none">Показывать мой профиль в поиске</h4>
                  </div>
                  <Switch id="show-profile" defaultChecked />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">Страна</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Россия" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="russia">Россия</SelectItem>
                      <SelectItem value="usa">США</SelectItem>
                      <SelectItem value="germany">Германия</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preferences" className="space-y-2">
              <div className="grid gap-4">
                <div className="space-y-1">
                  <Label htmlFor="language">Яз��к</Label>
                  <Select>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Русский" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="russian">Русский</SelectItem>
                      <SelectItem value="english">Английский</SelectItem>
                      <SelectItem value="german">Немецкий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium leading-none">Темная тема</h4>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={isDarkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="billing" className="space-y-2">
              <div className="grid gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Тарифный план</h4>
                  <Badge variant="secondary">Pro</Badge>
                  <p className="text-sm text-muted-foreground">Ваш текущий тарифный план: Pro</p>
                </div>
                <Button variant="outline">Изменить тарифный план</Button>
                <Separator />
                <div className="space-y-1">
                  <Label htmlFor="card-number">Номер карты</Label>
                  <Input id="card-number" type="text" defaultValue="**** **** **** 1234" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="card-expiry">Срок действия</Label>
                  <Input id="card-expiry" type="text" defaultValue="12/24" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="card-cvc">CVC</Label>
                  <Input id="card-cvc" type="text" defaultValue="123" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="help" className="space-y-2">
              <div className="grid gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Справочный центр</h4>
                  <p className="text-sm text-muted-foreground">Найдите ответы на часто задаваемые вопросы</p>
                </div>
                <Button variant="outline">Перейти в справочный центр</Button>
                <Separator />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Связаться с поддержкой</h4>
                  <p className="text-sm text-muted-foreground">Если у вас есть вопросы, свяжитесь с нашей службой поддержки</p>
                </div>
                <Button variant="outline">Связаться с поддержкой</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handleSaveChanges}>Сохранить изменения</Button>
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default Settings;

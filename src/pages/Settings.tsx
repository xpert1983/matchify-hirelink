
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import ThemeCustomizer from '@/components/settings/ThemeCustomizer';
import { toast } from 'sonner';
import NativeCamera from '@/components/camera/NativeCamera';

const Settings = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  
  const handleSaveProfile = () => {
    toast.success('Профиль успешно сохранен');
  };
  
  const handleSaveNotifications = () => {
    toast.success('Настройки уведомлений сохранены');
  };
  
  const handleSaveAccount = () => {
    toast.success('Настройки аккаунта сохранены');
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Настройки</h2>
          <p className="text-muted-foreground">
            Управляйте настройками вашего аккаунта и системы
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
            <TabsTrigger value="account">Аккаунт</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Профиль</CardTitle>
                <CardDescription>
                  Здесь вы можете редактировать информацию о вашем профиле
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <NativeCamera
                    onImageCapture={setProfileImage}
                    defaultImage={profileImage}
                    className="md:w-1/3"
                  />
                  
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" placeholder="Ваше имя" defaultValue="Александр" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="surname">Фамилия</Label>
                        <Input id="surname" placeholder="Ваша фамилия" defaultValue="Иванов" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Ваш email" defaultValue="alex@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="position">Должность</Label>
                      <Input id="position" placeholder="Ваша должность" defaultValue="HR менеджер" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе</Label>
                      <Textarea id="bio" placeholder="Расскажите немного о себе" defaultValue="Опытный HR специалист, занимаюсь подбором IT специалистов более 5 лет." />
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 py-4 flex justify-end">
                <Button onClick={handleSaveProfile}>Сохранить изменения</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
                <CardDescription>
                  Настройте, какие уведомления вы хотите получать
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Общие уведомления</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email уведомления</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления на email
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browser-notifications">Уведомления в браузере</Label>
                      <p className="text-sm text-muted-foreground">
                        Показывать уведомления в браузере
                      </p>
                    </div>
                    <Switch id="browser-notifications" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Уведомления о кандидатах</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-candidates">Новые кандидаты</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомления о новых кандидатах в системе
                      </p>
                    </div>
                    <Switch id="new-candidates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="candidate-status">Изменение статуса</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомления об изменении статуса кандидатов
                      </p>
                    </div>
                    <Switch id="candidate-status" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Уведомления о вакансиях</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="vacancy-application">Новые заявки</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомления о новых заявках на вакансии
                      </p>
                    </div>
                    <Switch id="vacancy-application" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="vacancy-match">Совпадения</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомления о новых совпадениях кандидатов с вакансиями
                      </p>
                    </div>
                    <Switch id="vacancy-match" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <div className="px-6 py-4 flex justify-end">
                <Button onClick={handleSaveNotifications}>Сохранить настройки</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <ThemeCustomizer />
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки аккаунта</CardTitle>
                <CardDescription>
                  Управляйте настройками вашего аккаунта
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Безопасность</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Текущий пароль</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Новый пароль</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Подтверждение пароля</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Дополнительно</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Двухфакторная аутентификация</Label>
                      <p className="text-sm text-muted-foreground">
                        Включить двухфакторную аутентификацию для дополнительной безопасности
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="session-timeout">Автоматический выход</Label>
                      <p className="text-sm text-muted-foreground">
                        Автоматически выходить из системы после 30 минут неактивности
                      </p>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <div className="px-6 py-4 flex justify-end">
                <Button onClick={handleSaveAccount}>Сохранить настройки</Button>
              </div>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Зона опасности</CardTitle>
                <CardDescription>
                  Необратимые действия с вашим аккаунтом
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Удаление аккаунта</h3>
                  <p className="text-sm text-muted-foreground">
                    Это действие необратимо. После подтверждения ваш аккаунт будет безвозвратно удален.
                  </p>
                </div>
              </CardContent>
              <div className="px-6 py-4 flex justify-end">
                <Button variant="destructive">Удалить аккаунт</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;

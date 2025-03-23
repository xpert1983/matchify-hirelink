
import React, { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2, Clock, Settings, User, Briefcase } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'candidate' | 'vacancy' | 'interview' | 'system';
  relatedId?: string;
  avatar?: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
  unreadCount: number;
  onReadNotification: (id: string) => void;
  onReadAll: () => void;
  onOpenSettings?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  unreadCount,
  onReadNotification,
  onReadAll,
  onOpenSettings
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredNotifications = activeTab === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeTab);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'candidate':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'vacancy':
        return <Briefcase className="h-4 w-4 text-green-500" />;
      case 'interview':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'system':
        return <CheckCircle2 className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Уведомления"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] min-h-[1.25rem] flex items-center justify-center bg-primary text-white" 
              variant="default"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 p-0" align="end">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium">Уведомления</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onReadAll}
              disabled={unreadCount === 0}
              className="text-xs h-7"
            >
              Прочитать все
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onOpenSettings}
              className="h-7 w-7"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full p-1 bg-transparent border-b rounded-none h-auto grid grid-cols-4">
            <TabsTrigger value="all" className="text-xs py-2">
              Все
              {unreadCount > 0 && (
                <Badge 
                  className="ml-1 px-1 py-0 text-[10px] h-4 min-w-4"
                  variant="default"
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="candidate" className="text-xs py-2">
              <User className="h-3 w-3 mr-1" />
              Кандидаты
            </TabsTrigger>
            <TabsTrigger value="vacancy" className="text-xs py-2">
              <Briefcase className="h-3 w-3 mr-1" />
              Вакансии
            </TabsTrigger>
            <TabsTrigger value="interview" className="text-xs py-2">
              <Clock className="h-3 w-3 mr-1" />
              События
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="m-0">
            <ScrollArea className="h-[350px]">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 hover:bg-secondary/50 transition-colors cursor-pointer ${
                        notification.read ? '' : 'bg-secondary/30'
                      }`}
                      onClick={() => onReadNotification(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getNotificationIcon(notification.type)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <p className={`text-sm font-medium leading-none ${
                              notification.read ? '' : 'text-primary'
                            }`}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6">
                  <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-center">
                    У вас пока нет уведомлений
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="p-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            Показать все уведомления
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;

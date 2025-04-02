
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Handshake, Search, X } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import NotificationCenter from '../notifications/NotificationCenter';
import { useNotifications } from '@/hooks/use-notifications';
import NotificationSettings from '../notifications/NotificationSettings';

const Header = () => {
  const isMobile = useIsMobile();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between h-[60px] bg-background/90 backdrop-blur-md border-b z-20 px-3 md:px-4 lg:px-6">
      {showSearch ? (
        <div className="flex items-center w-full gap-2">
          <Input 
            type="search" 
            placeholder="Поиск..." 
            className="w-full"
            autoFocus 
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSearch(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <Handshake className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-bold">HireLink</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSearch(true)}
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <NotificationCenter 
              notifications={notifications}
              unreadCount={unreadCount}
              onReadNotification={markAsRead}
              onReadAll={markAllAsRead}
              onOpenSettings={() => setShowNotificationSettings(true)}
            />
            
            <NotificationSettings 
              open={showNotificationSettings}
              onOpenChange={setShowNotificationSettings}
            />
            
            <DarkModeToggle />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

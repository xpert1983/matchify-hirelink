
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    browserNotifications: true,
    candidateUpdates: true,
    vacancyUpdates: true,
    interviewReminders: true,
    systemUpdates: false,
  });

  const handleSaveSettings = () => {
    // In a real app, you'd save these to the backend
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки уведомлений обновлены"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Настройки уведомлений</DialogTitle>
          <DialogDescription>
            Настройте какие типы уведомлений вы хотите получать
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h4 className="font-medium">Способы доставки</h4>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex-1">Email уведомления</Label>
              <Switch 
                id="email-notifications" 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="browser-notifications" className="flex-1">Браузерные уведомления</Label>
              <Switch 
                id="browser-notifications" 
                checked={settings.browserNotifications}
                onCheckedChange={(checked) => setSettings({...settings, browserNotifications: checked})}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">Типы уведомлений</h4>
            <div className="flex items-center justify-between">
              <Label htmlFor="candidate-updates" className="flex-1">Обновления по кандидатам</Label>
              <Switch 
                id="candidate-updates" 
                checked={settings.candidateUpdates}
                onCheckedChange={(checked) => setSettings({...settings, candidateUpdates: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="vacancy-updates" className="flex-1">Обновления по вакансиям</Label>
              <Switch 
                id="vacancy-updates" 
                checked={settings.vacancyUpdates}
                onCheckedChange={(checked) => setSettings({...settings, vacancyUpdates: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="interview-reminders" className="flex-1">Напоминания о собеседованиях</Label>
              <Switch 
                id="interview-reminders" 
                checked={settings.interviewReminders}
                onCheckedChange={(checked) => setSettings({...settings, interviewReminders: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="system-updates" className="flex-1">Системные обновления</Label>
              <Switch 
                id="system-updates" 
                checked={settings.systemUpdates}
                onCheckedChange={(checked) => setSettings({...settings, systemUpdates: checked})}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Отмена</Button>
          <Button onClick={handleSaveSettings}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettings;

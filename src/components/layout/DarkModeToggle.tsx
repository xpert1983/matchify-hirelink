
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor, Laptop } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [autoSwitch, setAutoSwitch] = React.useState(false);

  // Auto switch theme based on time of day
  useEffect(() => {
    if (!autoSwitch) return;
    
    const checkTime = () => {
      const hour = new Date().getHours();
      // Dark mode between 8PM and 6AM
      if (hour >= 20 || hour < 6) {
        if (theme !== 'dark') setTheme('dark');
      } else {
        if (theme !== 'light') setTheme('light');
      }
    };
    
    checkTime(); // Check immediately
    const interval = setInterval(checkTime, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [autoSwitch, theme, setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          {theme === 'light' && <Sun className="h-4 w-4" />}
          {theme === 'dark' && <Moon className="h-4 w-4" />}
          {theme === 'system' && <Monitor className="h-4 w-4" />}
          <span className="sr-only">Переключить тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Внешний вид</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="h-4 w-4 mr-2" />
          <span>Светлая тема</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="h-4 w-4 mr-2" />
          <span>Темная тема</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="h-4 w-4 mr-2" />
          <span>Системная тема</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="auto-switch" 
              checked={autoSwitch} 
              onCheckedChange={setAutoSwitch} 
            />
            <Label htmlFor="auto-switch" className="cursor-pointer">
              <div className="flex items-center">
                <Laptop className="h-4 w-4 mr-2" />
                <span>Автопереключение</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Темная тема с 20:00 до 6:00
              </p>
            </Label>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

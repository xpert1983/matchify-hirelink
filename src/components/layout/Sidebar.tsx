
import React, { createContext, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Briefcase, Users, CheckSquare, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

export const SidebarTrigger = () => {
  const { toggle, isOpen } = useSidebar();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-9 w-9" 
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
};

export const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/vacancies', label: 'Vacancies', icon: Briefcase },
    { path: '/candidates', label: 'Candidates', icon: Users },
    { path: '/matches', label: 'Matches', icon: CheckSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden transition-all animate-fade-in" 
          onClick={close}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "flex flex-col shadow-subtle"
        )}
      >
        <div className="flex items-center justify-between p-4 h-[62px] border-b border-border">
          <Link to="/" className="flex items-center gap-2" onClick={close}>
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white font-semibold">
              HL
            </div>
            <span className="text-lg font-semibold">HireLink</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-8 w-8" 
            onClick={close}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  onClick={close}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                    isActive(item.path) 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0", 
                    isActive(item.path) ? "text-primary" : "text-muted-foreground"
                  )} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-3 border-t border-border">
          <ul className="space-y-1">
            <li>
              <Link 
                to="/settings" 
                onClick={close}
                className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Settings className="h-5 w-5 shrink-0 text-muted-foreground" />
                Settings
              </Link>
            </li>
            <li>
              <button 
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-5 w-5 shrink-0 text-muted-foreground" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

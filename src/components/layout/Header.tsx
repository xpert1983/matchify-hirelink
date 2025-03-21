
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/layout/Sidebar';

export const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setPageTitle('Dashboard');
    else if (path === '/vacancies') setPageTitle('Vacancies');
    else if (path === '/candidates') setPageTitle('Candidates');
    else if (path === '/matches') setPageTitle('Matches');
    else setPageTitle('HireLink');
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-subtle' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold tracking-tight animate-fade-in">{pageTitle}</h1>
        </div>

        <div className="hidden md:flex items-center relative max-w-md w-full mx-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search vacancies, candidates..." 
            className="pl-10 bg-secondary border-none h-9 focus-visible:ring-1 transition-all"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">Jane Doe</span>
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

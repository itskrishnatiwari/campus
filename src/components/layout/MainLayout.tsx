
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/layout/Sidebar';
import { Menu, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  userRole: 'student' | 'teacher';
}

const MainLayout: React.FC<MainLayoutProps> = ({ userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} userRole={userRole} />

      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarOpen ? "md:ml-64" : "md:ml-20",
          isMobile ? "ml-0" : ""
        )}
      >
        <header className="h-16 border-b bg-background flex items-center justify-between px-4">
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2">
                <Menu size={20} />
              </Button>
            )}
            <h1 className="font-semibold">CampusBuzz</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Bell size={18} />
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

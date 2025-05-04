
import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/layout/Sidebar';
import { Menu, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface MainLayoutProps {
  userRole: 'student' | 'teacher';
}

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // Default to student if user role is somehow missing
  const userRole = (user?.role as 'student' | 'teacher') || 'student';

  useEffect(() => {
    // Check for unread notifications from localStorage
    const storedNotifications = localStorage.getItem(`campusBuzz_notifications_${user?.id}`);
    if (storedNotifications) {
      const notifications = JSON.parse(storedNotifications);
      const unread = notifications.filter((n: any) => !n.read).length;
      setUnreadNotifications(unread);
    }

    // If no notifications exist yet, create some demo ones
    else if (user?.id) {
      const demoNotifications = generateDemoNotifications();
      localStorage.setItem(`campusBuzz_notifications_${user.id}`, JSON.stringify(demoNotifications));
      const unread = demoNotifications.filter((n: any) => !n.read).length;
      setUnreadNotifications(unread);
    }
  }, [user?.id]);

  const generateDemoNotifications = () => {
    return [
      {
        id: '1',
        title: 'New Message',
        message: 'Prof. Johnson sent a message in Data Structures chat',
        time: '10 minutes ago',
        read: false,
        type: 'message'
      },
      {
        id: '2',
        title: 'New Study Material',
        message: 'Algorithm Analysis Notes have been uploaded',
        time: '1 hour ago',
        read: false,
        type: 'note'
      }
    ];
  };

  const getRecentNotifications = () => {
    const storedNotifications = localStorage.getItem(`campusBuzz_notifications_${user?.id}`);
    if (storedNotifications) {
      const allNotifications = JSON.parse(storedNotifications);
      return allNotifications.slice(0, 3); // Return only 3 most recent
    }
    return [];
  };

  const markNotificationAsRead = (id: string) => {
    const storedNotifications = localStorage.getItem(`campusBuzz_notifications_${user?.id}`);
    if (storedNotifications) {
      const notifications = JSON.parse(storedNotifications);
      const updatedNotifications = notifications.map((n: any) => 
        n.id === id ? { ...n, read: true } : n
      );
      
      localStorage.setItem(`campusBuzz_notifications_${user.id}`, JSON.stringify(updatedNotifications));
      
      const unread = updatedNotifications.filter((n: any) => !n.read).length;
      setUnreadNotifications(unread);
    }
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell size={18} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-campus-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-2 border-b">
                  <p className="font-medium">Notifications</p>
                  <Link to="/notifications" className="text-xs text-campus-purple">
                    View All
                  </Link>
                </div>
                
                {getRecentNotifications().length > 0 ? (
                  getRecentNotifications().map((notification: any) => (
                    <DropdownMenuItem key={notification.id} className="p-2 cursor-pointer" onClick={() => markNotificationAsRead(notification.id)}>
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm flex items-center">
                            {!notification.read && <span className="w-2 h-2 bg-campus-purple rounded-full mr-2"></span>}
                            {notification.title}
                          </p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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

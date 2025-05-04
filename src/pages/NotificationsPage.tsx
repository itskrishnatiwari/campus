import React, { useState, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'message' | 'note' | 'event' | 'system';
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = localStorage.getItem(`campusBuzz_notifications_${user?.id}`);
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Generate demo notifications if none exist
      const demoNotifications = generateDemoNotifications();
      setNotifications(demoNotifications);
      localStorage.setItem(`campusBuzz_notifications_${user?.id}`, JSON.stringify(demoNotifications));
    }
  }, [user?.id]);

  const generateDemoNotifications = (): Notification[] => {
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
      },
      {
        id: '3',
        title: 'Upcoming Test',
        message: 'Data Structures test tomorrow at 10:00 AM',
        time: '3 hours ago',
        read: true,
        type: 'event'
      },
      {
        id: '4',
        title: 'BuzzBoard Activity',
        message: 'Your post received 5 new replies',
        time: '1 day ago',
        read: true,
        type: 'system'
      }
    ];
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    localStorage.setItem(`campusBuzz_notifications_${user?.id}`, JSON.stringify(updatedNotifications));
    toast.success('Notification marked as read');
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem(`campusBuzz_notifications_${user?.id}`, JSON.stringify(updatedNotifications));
    toast.success('Notification deleted');
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem(`campusBuzz_notifications_${user?.id}`, JSON.stringify(updatedNotifications));
    toast.success('All notifications marked as read');
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'message':
        return <div className="bg-campus-blue/10 p-3 rounded-full"><Bell className="h-5 w-5 text-campus-blue" /></div>;
      case 'note':
        return <div className="bg-campus-purple/10 p-3 rounded-full"><Bell className="h-5 w-5 text-campus-purple" /></div>;
      case 'event':
        return <div className="bg-campus-orange/10 p-3 rounded-full"><Bell className="h-5 w-5 text-campus-orange" /></div>;
      default:
        return <div className="bg-campus-green/10 p-3 rounded-full"><Bell className="h-5 w-5 text-campus-green" /></div>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <Bell className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No Notifications</h3>
          <p className="text-muted-foreground">You're all caught up!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map(notification => (
            <Card 
              key={notification.id} 
              className={cn(
                "campus-card transition-all duration-200", 
                !notification.read && "border-l-4 border-l-campus-purple"
              )}
            >
              <CardContent className="flex items-start p-4 gap-3">
                {getNotificationIcon(notification.type)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{notification.title}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
                
                <div className="flex items-center space-x-1">
                  {!notification.read && (
                    <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

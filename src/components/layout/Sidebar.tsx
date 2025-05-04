
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Bell, 
  Book, 
  Calendar, 
  FileText,
  MessageSquare, 
  PanelRight, 
  Settings, 
  User, 
  Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userRole: 'student' | 'teacher';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, userRole }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  const studentNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <PanelRight size={20} /> },
    { label: 'Class Chat', href: '/chat', icon: <MessageSquare size={20} /> },
    { label: 'BuzzBoard', href: '/buzzboard', icon: <Users size={20} /> },
    { label: 'Study Notes', href: '/notes', icon: <FileText size={20} /> },
    { label: 'Events', href: '/events', icon: <Calendar size={20} /> },
    { label: 'Mentor Chat', href: '/mentorship', icon: <MessageSquare size={20} /> },
    { label: 'Notifications', href: '/notifications', icon: <Bell size={20} /> },
    { label: 'Profile', href: '/profile', icon: <User size={20} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
  ];

  const teacherNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <PanelRight size={20} /> },
    { label: 'Subject Chats', href: '/chat', icon: <MessageSquare size={20} /> },
    { label: 'Upload Notes', href: '/notes/upload', icon: <FileText size={20} /> },
    { label: 'Study Materials', href: '/notes', icon: <Book size={20} /> },
    { label: 'BuzzBoard', href: '/buzzboard', icon: <Users size={20} /> },
    { label: 'Events', href: '/events', icon: <Calendar size={20} /> },
    { label: 'Mentees', href: '/mentorship', icon: <Users size={20} /> },
    { label: 'Notifications', href: '/notifications', icon: <Bell size={20} /> },
    { label: 'Profile', href: '/profile', icon: <User size={20} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
  ];

  const navItems = userRole === 'student' ? studentNavItems : teacherNavItems;

  if (isMobile && !isOpen) return null;

  return (
    <aside 
      className={cn(
        "h-screen fixed top-0 left-0 z-40 bg-white dark:bg-campus-dark border-r border-border flex flex-col transition-all duration-300 shadow-lg",
        isOpen ? "w-64" : "w-20",
        isMobile && isOpen ? "w-64 translate-x-0" : isMobile && !isOpen ? "w-64 -translate-x-full" : ""
      )}
    >
      <div className="flex items-center px-4 h-16 border-b border-border">
        {isOpen ? (
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="font-bold text-xl text-campus-purple">CampusBuzz</Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="md:flex hidden"
            >
              <PanelRight size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <PanelRight size={18} />
            </Button>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-campus-purple text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        {isOpen ? (
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-campus-purple text-white flex items-center justify-center">
              {user?.name ? user.name.charAt(0).toUpperCase() : (userRole === 'student' ? 'S' : 'T')}
            </div>
            <div className="flex-1 truncate">
              <p className="font-medium text-sm">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-10 w-10 rounded-full bg-campus-purple text-white flex items-center justify-center">
              {user?.name ? user.name.charAt(0).toUpperCase() : (userRole === 'student' ? 'S' : 'T')}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

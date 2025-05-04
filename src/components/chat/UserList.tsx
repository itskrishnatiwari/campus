
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  semester?: string;
  branch?: string;
}

interface UserListProps {
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch users from localStorage
    const fetchUsers = () => {
      setIsLoading(true);
      try {
        const usersData = localStorage.getItem('campusBuzzUsers');
        if (usersData) {
          const allUsers = JSON.parse(usersData);
          
          // Filter out current user and remove password field
          const filteredUsers = allUsers
            .filter((user: any) => user.id !== currentUser?.id)
            .map(({ password, ...user }: any) => user);
            
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser?.id]);

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]?.toUpperCase() || '').join('');
  };

  const getAvatarBgColor = (role: string) => {
    return role === 'teacher' ? 'bg-campus-purple' : 'bg-campus-blue';
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-2">Class Members</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-4">
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">
          No other users found in this class.
        </Card>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {users.map((user) => (
            <Card 
              key={user.id}
              className="p-3 flex items-center justify-between hover:bg-muted/40 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <div className="flex items-center space-x-3">
                <Avatar className={`h-9 w-9 ${getAvatarBgColor(user.role)} text-white`}>
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Message</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;

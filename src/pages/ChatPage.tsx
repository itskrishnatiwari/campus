
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatRoom from '@/components/chat/ChatRoom';
import DirectChat from '@/components/chat/DirectChat';
import UserList from '@/components/chat/UserList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface UserForChat {
  id: string;
  name: string;
  role: string;
}

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('type') || 'class';
  const [activeChat, setActiveChat] = useState(initialTab);
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<UserForChat | null>(null);

  useEffect(() => {
    // Update active tab when URL params change
    const tabFromParams = searchParams.get('type');
    if (tabFromParams) {
      setActiveChat(tabFromParams);
    }
  }, [searchParams]);

  const chatRooms = {
    student: [
      { value: 'class', name: 'Class Chat', roomName: `Computer Science - ${user?.semester || '3rd'} Semester`, roomType: 'class' },
      { value: 'subject', name: 'Subject Chat', roomName: 'Data Structures (CS-301)', roomType: 'subject' },
      { value: 'mentor', name: 'Mentor Chat', roomName: 'Prof. Johnson (Mentor)', roomType: 'mentor' },
      { value: 'direct', name: 'Direct Messages', roomName: 'Direct Messages', roomType: 'direct' }
    ],
    teacher: [
      { value: 'class', name: 'Class Announcements', roomName: 'Computer Science - 3rd Semester', roomType: 'class' },
      { value: 'subject', name: 'Subject Chat', roomName: `${user?.subjects?.split(',')[0] || 'Data Structures'} (CS-301)`, roomType: 'subject' },
      { value: 'mentor', name: 'Mentees', roomName: 'Mentee Chat', roomType: 'mentor' },
      { value: 'direct', name: 'Direct Messages', roomName: 'Direct Messages', roomType: 'direct' }
    ]
  };

  const userChatRooms = user?.role === 'teacher' ? chatRooms.teacher : chatRooms.student;
  
  // Find the active chat room
  const activeChatRoom = userChatRooms.find(room => room.value === activeChat) || userChatRooms[0];

  const handleSelectUser = (user: UserForChat) => {
    setSelectedUser(user);
  };

  const handleBackFromDirectChat = () => {
    setSelectedUser(null);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold">Chat Rooms</h2>

      <Tabs value={activeChat} onValueChange={setActiveChat}>
        <TabsList>
          {userChatRooms.map(room => (
            <TabsTrigger key={room.value} value={room.value}>
              {room.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <Card className="mt-4 p-4">
          {activeChat === 'direct' ? (
            selectedUser ? (
              <DirectChat recipient={selectedUser} onBack={handleBackFromDirectChat} />
            ) : (
              <UserList onSelectUser={handleSelectUser} />
            )
          ) : (
            <ChatRoom 
              roomName={activeChatRoom.roomName} 
              roomType={activeChatRoom.roomType as 'class' | 'subject' | 'mentor'} 
            />
          )}
        </Card>
      </Tabs>
    </div>
  );
};

export default ChatPage;


import { useState } from 'react';
import ChatRoom from '@/components/chat/ChatRoom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState('class');

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold">Chat Rooms</h2>

      <Tabs defaultValue="class" value={activeChat} onValueChange={setActiveChat}>
        <TabsList>
          <TabsTrigger value="class">Class Chat</TabsTrigger>
          <TabsTrigger value="subject">Subject Chat</TabsTrigger>
          <TabsTrigger value="mentor">Mentor Chat</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-4">
          <TabsContent value="class">
            <ChatRoom roomName="Computer Science - Semester 3" roomType="class" />
          </TabsContent>
          
          <TabsContent value="subject">
            <ChatRoom roomName="Data Structures (CS-301)" roomType="subject" />
          </TabsContent>
          
          <TabsContent value="mentor">
            <ChatRoom roomName="Prof. Johnson (Mentor)" roomType="mentor" />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ChatPage;

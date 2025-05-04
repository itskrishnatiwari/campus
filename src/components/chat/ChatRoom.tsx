
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
    initials: string;
    role: 'student' | 'teacher';
  };
  timestamp: string;
  isMine: boolean;
}

interface ChatRoomProps {
  roomName: string;
  roomType: 'class' | 'subject' | 'mentor';
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomName, roomType }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey everyone! Don't forget about the assignment due tomorrow.",
      sender: {
        name: "Prof. Johnson",
        avatar: "",
        initials: "PJ",
        role: "teacher"
      },
      timestamp: "10:30 AM",
      isMine: false
    },
    {
      id: '2',
      content: "Thanks for the reminder! I'm almost done with it.",
      sender: {
        name: "Alex Smith",
        avatar: "",
        initials: "AS",
        role: "student"
      },
      timestamp: "10:32 AM",
      isMine: false
    },
    {
      id: '3',
      content: "Could you clarify the requirements for question #3?",
      sender: {
        name: "Me",
        avatar: "",
        initials: "ME",
        role: "student"
      },
      timestamp: "10:34 AM",
      isMine: true
    },
    {
      id: '4',
      content: "For question #3, you need to implement the algorithm we discussed in class last week. Make sure to include time complexity analysis.",
      sender: {
        name: "Prof. Johnson",
        avatar: "",
        initials: "PJ",
        role: "teacher"
      },
      timestamp: "10:35 AM",
      isMine: false
    }
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      content: messageText,
      sender: {
        name: "Me",
        avatar: "",
        initials: "ME",
        role: "student"
      },
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isMine: true
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] animate-fade-in">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">{roomName}</h2>
        <p className="text-sm text-muted-foreground capitalize">{roomType} Chat • 25 members</p>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
              {!message.isMine && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback className={message.sender.role === 'teacher' ? 'bg-campus-purple text-white' : 'bg-campus-blue text-white'}>
                    {message.sender.initials}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div>
                <div className={`flex items-center ${message.isMine ? 'justify-end' : 'justify-start'} mb-1`}>
                  <span className="text-xs font-medium">
                    {message.isMine ? 'You' : message.sender.name}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {message.timestamp}
                  </span>
                </div>
                
                <div 
                  className={`rounded-xl p-3 ${
                    message.isMine 
                      ? 'bg-campus-purple text-white rounded-tr-none' 
                      : 'bg-muted rounded-tl-none'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }} 
          className="flex items-center space-x-2"
        >
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 campus-input"
          />
          <Button 
            type="submit" 
            size="icon"
            className="bg-campus-purple hover:bg-campus-purple/90 text-white"
            disabled={!messageText.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;

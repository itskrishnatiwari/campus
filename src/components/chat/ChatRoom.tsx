
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
    initials: string;
    role: 'student' | 'teacher';
    id: string;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Generate chat room ID from room name and type
  const chatRoomId = `${roomType}_${roomName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
  
  // Load messages from localStorage when component mounts or chat room changes
  useEffect(() => {
    const storedMessages = localStorage.getItem(`campusBuzz_chat_${chatRoomId}`);
    
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // If no stored messages, load demo messages
      const demoMessages = generateDemoMessages();
      setMessages(demoMessages);
      localStorage.setItem(`campusBuzz_chat_${chatRoomId}`, JSON.stringify(demoMessages));
    }
  }, [chatRoomId]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateDemoMessages = (): Message[] => {
    // Base demo messages
    const baseMessages = [
      {
        id: '1',
        content: `Hey everyone! Don't forget about the ${roomType === 'subject' ? 'assignment' : 'class meeting'} due tomorrow.`,
        sender: {
          name: "Prof. Johnson",
          avatar: "",
          initials: "PJ",
          role: "teacher" as 'student' | 'teacher',
          id: "teacher_123"
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
          role: "student" as 'student' | 'teacher',
          id: "student_456"
        },
        timestamp: "10:32 AM",
        isMine: false
      }
    ];
    
    // Add custom messages based on room type
    if (roomType === 'mentor') {
      return [
        {
          id: '1',
          content: `Hi there! How are your classes going this semester?`,
          sender: {
            name: user?.role === 'student' ? "Prof. Johnson" : "Alex Smith",
            avatar: "",
            initials: user?.role === 'student' ? "PJ" : "AS",
            role: user?.role === 'student' ? "teacher" : "student" as 'student' | 'teacher',
            id: user?.role === 'student' ? "teacher_123" : "student_456"
          },
          timestamp: "Yesterday, 2:30 PM",
          isMine: false
        }
      ];
    }
    
    return baseMessages;
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !user) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: {
        name: user.name,
        avatar: "",
        initials: user.name.split(' ').map(n => n[0].toUpperCase()).join(''),
        role: user.role as 'student' | 'teacher',
        id: user.id
      },
      timestamp: timeString,
      isMine: true
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem(`campusBuzz_chat_${chatRoomId}`, JSON.stringify(updatedMessages));
    setMessageText('');
    
    // Simulate response in mentor chat after a delay
    if (roomType === 'mentor') {
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: getAutoResponse(messageText),
          sender: {
            name: user.role === 'student' ? "Prof. Johnson" : "Alex Smith",
            avatar: "",
            initials: user.role === 'student' ? "PJ" : "AS",
            role: user.role === 'student' ? "teacher" : "student" as 'student' | 'teacher',
            id: user.role === 'student' ? "teacher_123" : "student_456"
          },
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          isMine: false
        };
        
        const withResponse = [...updatedMessages, responseMessage];
        setMessages(withResponse);
        localStorage.setItem(`campusBuzz_chat_${chatRoomId}`, JSON.stringify(withResponse));
      }, 1500);
    }
    
    // Update notifications for other users
    if (roomType !== 'mentor') {
      // This would normally be done via a backend service
      toast.success('Message sent successfully');
    }
  };

  // Simple auto-response generator for the mentor chat demo
  const getAutoResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I help you today?";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('question')) {
      return "I'd be happy to help. What specific questions do you have?";
    } else if (lowerMessage.includes('assignment') || lowerMessage.includes('homework')) {
      return "Regarding your assignment, make sure to review the requirements carefully and start early. Do you have any specific concerns?";
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return "For the upcoming exam, focus on the key concepts we covered in class. Would you like to schedule a review session?";
    } else {
      return "Thanks for your message. Is there anything specific you'd like me to address?";
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] animate-fade-in">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">{roomName}</h2>
        <p className="text-sm text-muted-foreground capitalize">{roomType} Chat • {roomType === 'mentor' ? '1-on-1 conversation' : '25 members'}</p>
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
        <div ref={messagesEndRef} />
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

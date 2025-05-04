
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  timestamp: string;
}

interface ChatUser {
  id: string;
  name: string;
  role: string;
}

interface DirectChatProps {
  recipient: ChatUser;
  onBack?: () => void;
}

const DirectChat: React.FC<DirectChatProps> = ({ recipient, onBack }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const chatId = [user?.id, recipient.id].sort().join('_');

  useEffect(() => {
    // Load messages for this specific chat
    const storedMessages = localStorage.getItem(`direct_chat_${chatId}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !user) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    
    const newMessage: Message = {
      id: `${Date.now()}`,
      content: messageText,
      senderId: user.id,
      receiverId: recipient.id,
      senderName: user.name,
      timestamp: timeString
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Save to localStorage
    localStorage.setItem(`direct_chat_${chatId}`, JSON.stringify(updatedMessages));
    
    // Clear input
    setMessageText('');
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]?.toUpperCase() || '').join('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="border-b pb-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-muted-foreground"
            >
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className={`h-8 w-8 ${recipient.role === 'teacher' ? 'bg-campus-purple' : 'bg-campus-blue'} text-white`}>
                <AvatarImage src="" alt={recipient.name} />
                <AvatarFallback>{getUserInitials(recipient.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-medium">{recipient.name}</h2>
                <p className="text-xs text-muted-foreground capitalize">{recipient.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation by sending a message!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isMine = message.senderId === user?.id;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isMine && (
                    <Avatar className="h-8 w-8 mr-2 bg-campus-blue text-white">
                      <AvatarImage src="" alt={message.senderName} />
                      <AvatarFallback>{getUserInitials(message.senderName)}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div>
                    <div className={`flex items-center ${isMine ? 'justify-end' : 'justify-start'} mb-1`}>
                      <span className="text-xs font-medium">
                        {isMine ? 'You' : message.senderName}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {message.timestamp}
                      </span>
                    </div>
                    
                    <div 
                      className={`rounded-xl p-3 ${
                        isMine 
                          ? 'bg-campus-purple text-white rounded-tr-none' 
                          : 'bg-muted rounded-tl-none'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
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

export default DirectChat;

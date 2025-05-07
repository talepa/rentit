
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Search } from 'lucide-react';

// Demo conversation data
const DEMO_CONVERSATIONS = [
  {
    id: 1,
    user: "John Doe",
    lastMessage: "Hey, is the camera still available?",
    avatar: "/placeholder.svg",
    unread: true,
    time: "10:30 AM"
  },
  {
    id: 2,
    user: "Jane Smith",
    lastMessage: "Perfect! I'll pick it up tomorrow.",
    avatar: "/placeholder.svg",
    unread: false,
    time: "Yesterday"
  },
  {
    id: 3,
    user: "Mike Johnson",
    lastMessage: "Can you send more photos of the bike?",
    avatar: "/placeholder.svg",
    unread: false,
    time: "Yesterday"
  },
  {
    id: 4,
    user: "Sarah Williams",
    lastMessage: "I'm interested in renting your drone.",
    avatar: "/placeholder.svg",
    unread: true,
    time: "2 days ago"
  }
];

// Demo messages for a selected conversation
const DEMO_MESSAGES = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hey, is the camera still available?",
    time: "10:30 AM",
    isMe: false
  },
  {
    id: 2,
    sender: "Me",
    content: "Yes, it's still available. When would you like to rent it?",
    time: "10:32 AM",
    isMe: true
  },
  {
    id: 3,
    sender: "John Doe",
    content: "I'd like to rent it this weekend, from Friday to Sunday. What's the total cost?",
    time: "10:35 AM",
    isMe: false
  },
  {
    id: 4,
    sender: "Me",
    content: "That would be $150 for the weekend. Does that work for you?",
    time: "10:38 AM",
    isMe: true
  },
  {
    id: 5,
    sender: "John Doe",
    content: "Sounds good. Can I pick it up Friday morning around 9 AM?",
    time: "10:40 AM",
    isMe: false
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1); // Default to first conversation
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [conversations, setConversations] = useState(DEMO_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "Me",
        content: newMessage,
        time: "Just now",
        isMe: true
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // Update the last message in conversations list
      setConversations(conversations.map(conv => 
        conv.id === selectedConversation 
          ? {...conv, lastMessage: newMessage, time: "Just now"} 
          : conv
      ));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const markAsRead = (id: number) => {
    setConversations(conversations.map(conv => 
      conv.id === id ? {...conv, unread: false} : conv
    ));
  };

  const selectConversation = (id: number) => {
    setSelectedConversation(id);
    markAsRead(id);
  };

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-textdark mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations sidebar */}
          <div className="md:col-span-1 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search conversations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-15rem)]">
              {filteredConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-gray-100' : ''
                  } ${conversation.unread ? 'font-medium' : ''}`}
                  onClick={() => selectConversation(conversation.id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={conversation.avatar} 
                        alt={conversation.user}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{conversation.user}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate max-w-[180px]">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread && (
                          <span className="h-2 w-2 bg-primary rounded-full"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredConversations.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              )}
            </div>
          </div>
          
          {/* Message content */}
          <div className="md:col-span-2 bg-white rounded-lg shadow flex flex-col">
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src="/placeholder.svg" 
                        alt="User avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">
                        {conversations.find(c => c.id === selectedConversation)?.user}
                      </h3>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-25rem)]">
                  {messages.map(message => (
                    <div 
                      key={message.id}
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.isMe 
                            ? 'bg-primary text-white rounded-br-none' 
                            : 'bg-gray-100 rounded-bl-none'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isMe ? 'text-primary-foreground/80' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button 
                      className="ml-2" 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
                <p className="text-gray-500">Select a conversation to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

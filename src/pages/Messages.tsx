
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Search, MoreVertical, Phone, Video, ArrowLeft, Image, Paperclip, Smile, Heart, Star, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Demo conversation data
const DEMO_CONVERSATIONS = [
  {
    id: 1,
    user: "John Doe",
    lastMessage: "Hey, is the camera still available?",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100",
    unread: true,
    time: "10:30 AM",
    online: true,
    product: "DSLR Camera",
    productImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 2,
    user: "Jane Smith",
    lastMessage: "Perfect! I'll pick it up tomorrow.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100",
    unread: false,
    time: "Yesterday",
    online: true,
    product: "Mountain Bike",
    productImage: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 3,
    user: "Mike Johnson",
    lastMessage: "Can you send more photos of the bike?",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100",
    unread: false,
    time: "Yesterday",
    online: false,
    product: "Electric Scooter",
    productImage: "https://images.unsplash.com/photo-1520716963369-9b24de292cd2?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 4,
    user: "Sarah Williams",
    lastMessage: "I'm interested in renting your drone.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100",
    unread: true,
    time: "2 days ago",
    online: false,
    product: "Drone",
    productImage: "https://images.unsplash.com/photo-1524143986875-3b5c3339173b?auto=format&fit=crop&q=80&w=300"
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

const MessagePage = () => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1); // Default to first conversation
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [conversations, setConversations] = useState(DEMO_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [quickReplies] = useState([
    "Yes, it's available", 
    "When would you like to pick it up?", 
    "The price is firm", 
    "Thanks for your interest!"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      
      // Simulate typing response after 1-3 seconds
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          const responseMsg = {
            id: messages.length + 2,
            sender: conversations.find(c => c.id === selectedConversation)?.user || "User",
            content: "Thanks for your message. I'll get back to you soon!",
            time: "Just now",
            isMe: false
          };
          setMessages(prev => [...prev, responseMsg]);
        }, Math.random() * 2000 + 1000);
      }, 1000);
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
    setShowMobileChat(true);
  };

  const formatMessageTime = (timestamp: string) => {
    if (timestamp === "Just now") return timestamp;
    return timestamp;
  };

  const handleBackToConversations = () => {
    setShowMobileChat(false);
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const chatVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const sendQuickReply = (reply: string) => {
    setNewMessage(reply);
    handleSendMessage();
  };

  const goToProductPage = (productId: string) => {
    navigate(`/item/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9bd5e9]/10 to-white flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6 relative"
        >
          Messages
          <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-[#053e5d] to-[#9bd5e9] rounded-full"></span>
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-grow">
          {/* Conversations sidebar - show on desktop or when not in chat view on mobile */}
          <motion.div 
            className={`md:col-span-1 bg-white rounded-lg shadow-lg overflow-hidden border border-[#9bd5e9]/30 ${showMobileChat ? 'hidden md:block' : 'block'}`}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="p-3 md:p-4 border-b bg-gradient-to-r from-[#053e5d] to-[#0a2247] text-white">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#053e5d]" />
                <Input 
                  placeholder="Search conversations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#9bd5e9] focus:border-[#053e5d] hover:border-[#4f8391] transition-colors bg-white text-[#01030d]"
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-13rem)] md:max-h-[calc(100vh-15rem)]">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(conversation => (
                  <motion.div 
                    key={conversation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: conversation.id * 0.1 }}
                    className={`p-3 md:p-4 border-b cursor-pointer hover:bg-[#9bd5e9]/10 transition-all duration-300 ${
                      selectedConversation === conversation.id ? 'bg-[#9bd5e9]/20' : ''
                    } ${conversation.unread ? 'font-medium' : ''}`}
                    onClick={() => selectConversation(conversation.id)}
                  >
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0 h-10 md:h-12 w-10 md:w-12 rounded-full overflow-hidden border-2 border-[#9bd5e9]">
                        <img 
                          src={conversation.avatar} 
                          alt={conversation.user}
                          className="h-full w-full object-cover"
                        />
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white pulse-glow"></span>
                        )}
                      </div>
                      <div className="ml-3 md:ml-4 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm font-medium truncate ${selectedConversation === conversation.id ? 'text-[#053e5d]' : ''}`}>
                            {conversation.user}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-1">{conversation.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className={`text-xs md:text-sm ${conversation.unread ? 'text-gray-800' : 'text-gray-600'} truncate max-w-[120px] md:max-w-[180px]`}>
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread && (
                            <Badge className="h-5 w-5 flex items-center justify-center p-0 rounded-full bg-[#053e5d] ml-1 flex-shrink-0">
                              <span className="text-xs">1</span>
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2 flex items-center">
                          <div className="h-6 w-6 rounded-md overflow-hidden border border-[#9bd5e9] mr-2 flex-shrink-0">
                            <img src={conversation.productImage} alt={conversation.product} className="h-full w-full object-cover" />
                          </div>
                          <span className="text-xs text-[#4f8391] truncate">{conversation.product}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>No conversations found</p>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Message content - show on desktop or when in chat view on mobile */}
          <motion.div 
            className={`md:col-span-2 bg-white rounded-lg shadow-lg flex flex-col h-[calc(100vh-13rem)] md:h-[calc(100vh-15rem)] border border-[#9bd5e9]/30 ${showMobileChat ? 'block' : 'hidden md:flex'}`}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
          >
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="p-3 md:p-4 border-b bg-gradient-to-r from-[#053e5d] to-[#0a2247] text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2 md:hidden text-white hover:bg-white/20"
                      onClick={handleBackToConversations}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="relative flex-shrink-0 h-9 w-9 md:h-10 md:w-10 rounded-full overflow-hidden border-2 border-[#9bd5e9]">
                      <img 
                        src={conversations.find(c => c.id === selectedConversation)?.avatar || "/placeholder.svg"}
                        alt="User avatar" 
                        className="h-full w-full object-cover"
                      />
                      {conversations.find(c => c.id === selectedConversation)?.online && (
                        <span className="absolute bottom-0 right-0 h-2 w-2 md:h-2.5 md:w-2.5 bg-green-400 rounded-full border-2 border-[#053e5d]"></span>
                      )}
                    </div>
                    <div className="ml-2 md:ml-3 min-w-0">
                      <h3 className="text-sm md:text-base font-medium text-white truncate">
                        {conversations.find(c => c.id === selectedConversation)?.user}
                      </h3>
                      <div className="flex items-center">
                        <span className={`h-2 w-2 rounded-full ${conversations.find(c => c.id === selectedConversation)?.online ? 'bg-green-400' : 'bg-gray-400'} mr-1`}></span>
                        <p className="text-xs text-white/80">
                          {conversations.find(c => c.id === selectedConversation)?.online ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1 md:space-x-2">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 h-8 w-8 hidden md:flex">
                      <Phone className="h-4 w-4 text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 h-8 w-8 hidden md:flex">
                      <Video className="h-4 w-4 text-white" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 h-8 w-8">
                          <MoreVertical className="h-4 w-4 text-white" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border border-[#9bd5e9]">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>View item details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => goToProductPage('1')}>Go to product</DropdownMenuItem>
                        <DropdownMenuItem>Block user</DropdownMenuItem>
                        <DropdownMenuItem>Delete conversation</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Rented item info */}
                <div className="bg-gradient-to-r from-[#9bd5e9]/20 to-[#053e5d]/10 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-md overflow-hidden border border-[#9bd5e9] mr-2">
                      <img 
                        src={conversations.find(c => c.id === selectedConversation)?.productImage} 
                        alt="Product" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[#053e5d] font-medium">
                        {conversations.find(c => c.id === selectedConversation)?.product}
                      </p>
                      <p className="text-xs text-[#4f8391]">
                        Discussing this item
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs border-[#053e5d] text-[#053e5d] hover:bg-[#053e5d] hover:text-white"
                    onClick={() => goToProductPage('1')}
                  >
                    View Item
                  </Button>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-[#f8fafc]">
                  <div className="text-center">
                    <span className="text-xs bg-[#9bd5e9]/30 text-[#053e5d] px-2 py-1 rounded-full inline-block">
                      Today
                    </span>
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {messages.map(message => (
                      <motion.div 
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isMe && (
                          <Avatar className="h-7 w-7 md:h-8 md:w-8 mr-2 mt-1">
                            <AvatarImage 
                              src={conversations.find(c => c.id === selectedConversation)?.avatar} 
                              alt={message.sender} 
                            />
                            <AvatarFallback>{message.sender[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`max-w-[80%] rounded-2xl px-3 py-2 md:px-4 md:py-2 ${
                            message.isMe 
                              ? 'bg-gradient-to-r from-[#053e5d] to-[#0a2247] text-white rounded-br-none' 
                              : 'bg-gradient-to-r from-[#9bd5e9]/20 to-[#9bd5e9]/50 rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm md:text-base break-words">{message.content}</p>
                          <p className={`text-xs mt-1 text-right ${message.isMe ? 'text-white/80' : 'text-gray-500'}`}>
                            {formatMessageTime(message.time)}
                          </p>
                        </div>
                        {message.isMe && (
                          <div className="flex flex-col justify-end ml-2">
                            <button className="text-gray-400 hover:text-[#053e5d] transition-colors">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-7 w-7 md:h-8 md:w-8 mr-2 mt-1">
                        <AvatarImage 
                          src={conversations.find(c => c.id === selectedConversation)?.avatar}
                          alt="User"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gradient-to-r from-[#9bd5e9]/20 to-[#9bd5e9]/50 rounded-2xl px-3 py-2 md:px-4 md:py-3 rounded-bl-none"
                      >
                        <div className="flex space-x-1">
                          <motion.span 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} 
                            className="h-2 w-2 bg-[#053e5d] rounded-full"
                          ></motion.span>
                          <motion.span 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} 
                            className="h-2 w-2 bg-[#053e5d] rounded-full"
                          ></motion.span>
                          <motion.span 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} 
                            className="h-2 w-2 bg-[#053e5d] rounded-full"
                          ></motion.span>
                        </div>
                      </motion.div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Quick Replies */}
                <div className="px-3 md:px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide bg-[#9bd5e9]/5">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => sendQuickReply(reply)}
                      className="whitespace-nowrap text-xs border-[#9bd5e9] text-[#053e5d] hover:bg-[#9bd5e9]/20 flex-shrink-0"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
                
                {/* Input */}
                <div className="p-3 md:p-4 border-t border-[#9bd5e9]/30 bg-white">
                  <div className="flex items-center">
                    <div className="flex gap-2 mr-2">
                      <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-[#4f8391] hover:text-[#053e5d] hover:bg-[#9bd5e9]/20">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-[#4f8391] hover:text-[#053e5d] hover:bg-[#9bd5e9]/20">
                        <Image className="h-5 w-5" />
                      </Button>
                    </div>
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 border-[#9bd5e9] focus:border-[#053e5d] rounded-full text-sm"
                    />
                    <Button 
                      className="ml-2 bg-gradient-to-r from-[#053e5d] to-[#0a2247] hover:from-[#0a2247] hover:to-[#053e5d] text-white rounded-full h-10 w-10 p-0 shadow-md hover:shadow-lg transition-all" 
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
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#9bd5e9]/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-[#053e5d]" />
                  </div>
                  <h3 className="text-base md:text-lg font-medium mb-1 text-[#053e5d]">No conversation selected</h3>
                  <p className="text-sm text-gray-500">Select a conversation to view messages</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;

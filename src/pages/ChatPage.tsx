import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Menu, PlusCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle,
  DrawerClose
} from "@/components/ui/drawer";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ChatInput from "@/components/ChatInput";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastUpdated: Date;
};

const ChatPage: React.FC = () => {
  const location = useLocation();
  const initialMessage = location.state?.initialMessage || "";
  
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState<Chat>({
    id: "current",
    title: "New Chat",
    messages: [
      {
        id: "welcome",
        text: "Hello! How can I help you with your skin health today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ],
    createdAt: new Date(),
    lastUpdated: new Date(),
  });
  
  const [savedChats, setSavedChats] = useState<Chat[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Load saved chats from localStorage on component mount
  useEffect(() => {
    const savedChatsString = localStorage.getItem("savedChats");
    if (savedChatsString) {
      try {
        const parsedChats = JSON.parse(savedChatsString);
        // Convert string dates back to Date objects
        const chatsWithDates = parsedChats.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          lastUpdated: new Date(chat.lastUpdated),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setSavedChats(chatsWithDates);
      } catch (e) {
        console.error("Error parsing saved chats:", e);
      }
    }
  }, []);
  
  // Handle initial message if provided
  useEffect(() => {
    if (initialMessage) {
      // Use the initial message as the first user input
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);
  
  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (savedChats.length > 0) {
      localStorage.setItem("savedChats", JSON.stringify(savedChats));
    }
  }, [savedChats]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [activeChat.messages]);
  
  // Focus on input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Function to get a response from our Supabase Edge Function
  const getAIResponse = async (userMessage: string) => {
    try {
      setIsLoading(true);
      
      // Prepare messages for the API call
      const messages = [
        {
          role: "system",
          content: "You are a helpful skincare assistant that provides personalized advice. Be supportive, empathetic, and provide evidence-based advice about skin health, skincare routines, ingredients, and lifestyle factors that affect skin. Answer with compassion but focus on scientific evidence."
        },
        ...activeChat.messages.map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        })),
        {
          role: "user",
          content: userMessage
        }
      ];
      
      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages, model: "gpt-4o-mini" }
      });

      if (error) {
        console.error("Error calling Edge Function:", error);
        toast.error("Failed to get AI response. Please try again.");
        return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
      }

      return data.content;
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get AI response. Please try again.");
      return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    } finally {
      setIsLoading(false);
    }
  };

  // Extract send functionality into a reusable function
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    
    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, userMessage],
      lastUpdated: new Date()
    };
    
    setActiveChat(updatedChat);
    setInput("");
    
    // If this is a new chat with just the welcome message and now the first user message,
    // generate a title based on the first user message
    if (activeChat.messages.length === 1 && activeChat.messages[0].id === "welcome") {
      updatedChat.title = userMessage.text.substring(0, 25) + (userMessage.text.length > 25 ? "..." : "");
    }
    
    // Get AI response
    const aiResponseText = await getAIResponse(message);
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: aiResponseText,
      sender: "ai",
      timestamp: new Date(),
    };
    
    setActiveChat(prev => ({
      ...prev,
      messages: [...prev.messages, aiMessage],
      lastUpdated: new Date()
    }));
  };

  const handleSend = () => {
    handleSendMessage(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  
  const saveCurrentChat = () => {
    // Only save if there are at least two messages (welcome + user message)
    if (activeChat.messages.length < 2) return;
    
    // Check if this chat is already saved
    const existingChatIndex = savedChats.findIndex(chat => chat.id === activeChat.id);
    
    if (existingChatIndex >= 0) {
      // Update existing chat
      const updatedSavedChats = [...savedChats];
      updatedSavedChats[existingChatIndex] = activeChat;
      setSavedChats(updatedSavedChats);
    } else {
      // Add new chat with a new ID
      const newChat = {
        ...activeChat,
        id: Date.now().toString()
      };
      setSavedChats([newChat, ...savedChats]);
    }
    
    // Close the drawer
    setDrawerOpen(false);
  };
  
  const startNewChat = () => {
    // Save current chat if it has messages
    if (activeChat.messages.length > 1) {
      saveCurrentChat();
    }
    
    // Create new chat
    setActiveChat({
      id: "current",
      title: "New Chat",
      messages: [
        {
          id: "welcome",
          text: "Hello! How can I help you with your skin health today?",
          sender: "ai",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      lastUpdated: new Date(),
    });
    
    // Close the drawer
    setDrawerOpen(false);
  };
  
  const loadChat = (chatId: string) => {
    const chatToLoad = savedChats.find(chat => chat.id === chatId);
    if (chatToLoad) {
      setActiveChat(chatToLoad);
      setDrawerOpen(false);
    }
  };
  
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <BackButton />
          <MessageSquare className="h-6 w-6 mr-2 text-skin-teal" />
          <h1 className="text-lg font-semibold">{activeChat.title}</h1>
        </div>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Chat Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex items-center justify-between">
              <DrawerTitle>Chat History</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"/>
                  </svg>
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <Button 
                onClick={startNewChat} 
                className="w-full mb-4 flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                New Chat
              </Button>
              
              <Button 
                onClick={saveCurrentChat} 
                variant="outline" 
                className="w-full mb-4"
                disabled={activeChat.messages.length < 2}
              >
                Save Current Chat
              </Button>
              
              <div className="text-sm text-gray-500 mb-2">Saved Chats</div>
              
              {savedChats.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No saved chats yet
                </div>
              ) : (
                <ScrollArea className="h-[50vh]">
                  <div className="flex flex-col gap-2">
                    {savedChats.map((chat) => (
                      <div
                        key={chat.id}
                        className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                        onClick={() => loadChat(chat.id)}
                      >
                        <div className="font-medium truncate">{chat.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(chat.lastUpdated)}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      
      <div className="flex-1 overflow-hidden bg-white flex flex-col">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="flex flex-col space-y-4">
            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-skin-teal text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-[80%] p-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      
      {/* Add ChatInput component at the bottom */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;

'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm Mai, Ajay's Ai assistant. I'm here to assist you. Ask me anything!" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // 👉 NEW: Custom parser to turn Markdown links into real clickable HTML links
  const renderMessage = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <a 
          key={match.index} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline font-bold hover:text-blue-200 transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I'm having trouble connecting to my server right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 ${isOpen ? 'hidden' : 'flex'}`}>
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="relative bg-white text-slate-800 text-sm font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 cursor-pointer hover:text-[#0A66C2] transition-colors"
          onClick={() => setIsOpen(true)}
        >
          MAi - Ai Assistant
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-slate-200 rotate-45 rounded-sm"></div>
        </motion.div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-[#0A66C2] text-white rounded-full shadow-2xl hover:bg-[#004182] transition-transform hover:scale-105"
        >
          <MessageCircle size={28} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-700"
          >
            <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-lg">MAi | Ajay's Ai Assistant</h3>
                <p className="text-xs text-blue-400">Ask about my skills & projects</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#0A66C2]' : 'bg-slate-700'}`}>
                      {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-blue-400" />}
                    </div>
                    {/* 👉 NEW: Added whitespace-pre-wrap so \n actually creates new lines for lists */}
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[#0A66C2] text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                      {renderMessage(msg.content)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                      <Bot size={16} className="text-blue-400" />
                    </div>
                    <div className="p-4 rounded-2xl rounded-bl-none bg-slate-700 flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  autoComplete="off"
                  className="flex-1 bg-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A66C2] placeholder-slate-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-[#0A66C2] hover:bg-[#004182] text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
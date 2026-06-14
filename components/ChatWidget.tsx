'use client';

import { useState, useEffect, useRef } from 'react';

// Define our message type explicitly
type Message = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  // 1. 100% Pure React State - No Third Party Libraries
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 2. Custom Native Fetch - We control exactly how the data moves
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Save the user's message locally
    const userMessage: Message = { role: 'user', content: inputValue };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Standard browser fetch to our own API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();

      // Append the AI's response
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error connecting to Gemini." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all">
          
          <div className="bg-gray-800/50 p-4 border-b border-white/10 flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold">AJAY RS | AI Assistant</h3>
              <p className="text-xs text-blue-400">Ask about my skills & projects</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10 text-sm">
                Hi! I'm an AI assistant trained on Ajay's background. Ask me anything!
              </div>
            )}
            
            {messages.map((m, index) => (
              <div 
                key={index} 
                className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white self-end rounded-br-none' 
                    : 'bg-white/10 text-gray-200 self-start rounded-bl-none'
                }`}
              >
                {m.content}
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-white/10 text-gray-400 self-start rounded-2xl rounded-bl-none p-3 text-sm animate-pulse">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 bg-gray-800/50 border-t border-white/10 flex gap-2">
            <input
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Ask me a question..."
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>

        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 ${
          isOpen ? 'bg-gray-800 text-white border border-white/10' : 'bg-blue-600 text-white'
        }`}
      >
        {isOpen ? <span className="text-xl">↓</span> : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

    </div>
  );
}
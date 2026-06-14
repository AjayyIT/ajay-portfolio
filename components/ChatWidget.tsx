'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';

export default function ChatWidget() {
  // Now that packages match, this will work flawlessly without "as any"
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all">
          
          <div className="bg-gray-800/50 p-4 border-b border-white/10 flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold">Ajay's AI Assistant</h3>
              <p className="text-xs text-blue-400">Ask about my skills & projects</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10 text-sm">
                Hi! I'm an AI assistant trained on Ajay's background. Ask me anything!
              </div>
            )}
            
            {messages.map((m) => (
              <div 
                key={m.id} 
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

          {/* Standard Vercel AI Form Implementation */}
          <form onSubmit={handleSubmit} className="p-4 bg-gray-800/50 border-t border-white/10">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me a question..."
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
          </form>

        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 ${
          isOpen ? 'bg-gray-800 text-white border border-white/10' : 'bg-blue-600 text-white'
        }`}
      >
        {isOpen ? (
          <span className="text-xl">↓</span>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

    </div>
  );
}
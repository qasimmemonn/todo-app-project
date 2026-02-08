
import React, { useState, useRef, useEffect } from 'react';
import { startChatSession } from '../services/aiService';
import { Todo } from '../types';

interface ChatbotProps {
  todos: Todo[];
  onAdd: (title: string, desc: string) => void;
  onUpdate: (id: string, title: string, desc: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ todos, onAdd, onUpdate, onDelete, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hello! I'm your TaskFlow assistant. How can I help you manage your goals today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatSessionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to always have access to the latest todos during async operations
  const todosRef = useRef(todos);
  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        chatSessionRef.current = startChatSession();
      }

      let currentResponse = await chatSessionRef.current.sendMessage({ message: userMessage });
      
      // We use a loop to handle the "thought process" if the model calls tools sequentially
      // or if it needs to verify something after calling get_all_tasks.
      let turnLimit = 5; // Safety to prevent infinite loops
      
      while (currentResponse.functionCalls && turnLimit > 0) {
        turnLimit--;
        const results: string[] = [];
        
        for (const call of currentResponse.functionCalls) {
          let resultText = "Task not found or action failed.";
          
          switch (call.name) {
            case 'add_task':
              onAdd(call.args.title, call.args.description || "");
              resultText = `Task "${call.args.title}" added successfully.`;
              break;
            case 'update_task':
              onUpdate(call.args.id, call.args.title, call.args.description);
              resultText = `Task with ID ${call.args.id} updated successfully.`;
              break;
            case 'delete_task':
              onDelete(call.args.id);
              resultText = `Task with ID ${call.args.id} deleted successfully.`;
              break;
            case 'toggle_task':
              onToggle(call.args.id);
              resultText = `Status of task with ID ${call.args.id} toggled.`;
              break;
            case 'get_all_tasks':
              // Use the ref to get the absolute latest state
              resultText = JSON.stringify(todosRef.current.map(t => ({ 
                id: t.id, 
                title: t.title, 
                completed: t.completed 
              })));
              break;
          }
          results.push(`Result of ${call.name}: ${resultText}`);
        }

        // Send the execution results back to the model
        currentResponse = await chatSessionRef.current.sendMessage({
          message: results.join('\n')
        });
      }

      // Final response from the model after all tool calls are resolved
      if (currentResponse.text) {
        setMessages(prev => [...prev, { role: 'assistant', text: currentResponse.text }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "I encountered an error while processing your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-slide-up origin-bottom-right">
          <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-xl">🤖</div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest">TaskFlow Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-white/70">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-[1.5rem] text-sm font-medium shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 px-5 py-3 rounded-[1.5rem] rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Ask me to delete 'Task X'..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm font-bold placeholder-slate-400"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-95 shadow-lg shadow-indigo-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-fade-in group"
        >
          <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-black">1</div>
        </button>
      )}
    </div>
  );
};

export default Chatbot;

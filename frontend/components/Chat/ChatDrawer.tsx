'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error('Please login to use the AI assistant.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userMessage,
          conversation_id: conversationId
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired. Please login again.');
        }
        throw new Error('Failed to chat with AI');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      setConversationId(data.conversation_id);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'AI assistant is currently unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('auth_token');

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-2xl z-50 hover:bg-indigo-700 transition-all active:shadow-inner"
      >
        <ChatBubbleLeftRightIcon className="w-8 h-8" />
      </motion.button>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-white/10"
            >
              {/* Header */}
              <div className="p-4 border-b dark:border-slate-800 flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-900/10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-600 rounded-lg">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800 dark:text-white leading-tight">AI Assistant</h2>
                    <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wider">Powered by Gemini</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-950/30">
                {!isAuthenticated ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <ShieldCheckIcon className="w-10 h-10 text-indigo-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Authentication Required</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Please sign in to your account to start managing your tasks with AI.
                      </p>
                    </div>
                    <Link href="/auth" onClick={() => setIsOpen(false)} className="w-full max-w-[200px]">
                      <button className="btn-primary w-full">
                        Sign In Now
                      </button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {messages.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60 py-20">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                          <ChatBubbleLeftRightIcon className="w-12 h-12 text-indigo-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold">How can I help you today?</p>
                          <p className="text-sm">Try: "Add a task to buy groceries"</p>
                        </div>
                      </div>
                    )}
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={clsx(
                          "flex flex-col max-w-[85%]",
                          msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                        )}
                      >
                        <div
                          className={clsx(
                            "p-3 rounded-2xl text-sm shadow-sm transition-all",
                            msg.role === 'user'
                              ? "bg-indigo-600 text-white rounded-tr-none"
                              : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700"
                          )}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 capitalize font-medium">{msg.role}</span>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex items-center gap-3 text-slate-400 text-sm italic py-2">
                        <div className="flex gap-1.5">
                          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        </div>
                        <span className="font-medium">Thinking...</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
                <p className="text-[10px] text-slate-500 mt-2 text-center">
                  AI can help you add, list, update and delete tasks.
                </p>
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="relative flex items-center gap-2">
                  <input
                    type="text"
                    disabled={!isAuthenticated || isLoading}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isAuthenticated ? "Type your request..." : "Please login to chat"}
                    className="w-full p-4 pr-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 focus:ring-0 text-slate-800 dark:text-white transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading || !isAuthenticated}
                    className="absolute right-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

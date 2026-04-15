'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bună! 👋 Sunt Barista Bot, asistentul tău de la Vibe Caffè! Te pot ajuta cu meniul, rezervările sau orice întrebare despre cafenea noastră. Cu ce te pot ajuta azi? ☕',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Ups, ceva n-a mers 😅 Încearcă din nou!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* FEREASTRA CHAT */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl overflow-hidden"
          style={{
            width: '360px',
            height: '520px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)',
            background: '#faf5ec',
          }}
        >
          {/* HEADER */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ background: 'linear-gradient(135deg, #1c1008 0%, #2c1810 100%)' }}
          >
            <div className="text-2xl">☕</div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide">Barista Bot</p>
              <p className="text-amber-400 text-xs">Vibe Caffè · Online</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white/60 hover:text-white transition-colors text-xl leading-none"
            >
              ✕
            </button>
          </div>

          {/* MESAJE */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === 'user'
                      ? {
                          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: '#fff',
                          borderBottomRightRadius: '4px',
                        }
                      : {
                          background: '#fff',
                          color: '#1c1008',
                          borderBottomLeftRadius: '4px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }
                  }
                >
                  {msg.content.split('\n').map((line, j) => {
                    const formatted = line
                      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#b45309;font-weight:700">$1</strong>')
                      .replace(/^[-•]\s/, '• ');
                    return line.trim() === '' ? (
                      <div key={j} className="h-2" />
                    ) : (
                      <p key={j} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ __html: formatted }} />
                    );
                  })}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl text-sm"
                  style={{
                    background: '#fff',
                    color: '#1c1008',
                    borderBottomLeftRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <span className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-t"
            style={{ borderColor: '#e8d5b0', background: '#fff' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
              className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="#1c1008" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#1c1008" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* TOOLTIP */}
      {!isOpen && (
        <div
          className="fixed bottom-8 right-24 z-50 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{
            background: '#1c1008',
            color: '#fcd34d',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
        >
          Bună! Hai să discutăm ☕
          <div
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rotate-45"
            style={{ background: '#1c1008' }}
          />
        </div>
      )}

      {/* BUTON PLUTITOR */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #1c1008, #2c1810)'
            : 'linear-gradient(135deg, #fcd34d, #f59e0b)',
          boxShadow: isOpen
            ? '0 8px 25px rgba(28,16,8,0.4)'
            : '0 8px 25px rgba(245,158,11,0.5)',
          animation: isOpen ? 'none' : 'pulse-chat 2.5s ease-in-out infinite',
        }}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <span className="text-2xl">☕</span>
        )}
      </button>

      {/* ANIMAȚIE PULSE */}
      <style>{`
        @keyframes pulse-chat {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 25px rgba(245,158,11,0.5); }
          50% { transform: scale(1.08); box-shadow: 0 12px 35px rgba(245,158,11,0.7); }
        }
      `}</style>
    </>
  );
}

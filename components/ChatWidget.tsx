'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_REPLIES_INITIAL = ['Vezi meniu', 'Recomandări', 'Rezervări', 'Program'];

const CONTEXTUAL_REPLIES: Record<string, string[]> = {
  meniu: ['Opțiuni vegane', 'Deserturi', 'Cafea rece'],
  rezerv: ['Fă o rezervare', 'Program'],
  vegan: ['Opțiuni vegane', 'Deserturi'],
  cafea: ['Espresso', 'Cafea rece', 'Specialty'],
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>(QUICK_REPLIES_INITIAL);
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

  const getContextualReplies = (text: string): string[] => {
    const lower = text.toLowerCase();
    for (const [keyword, replies] of Object.entries(CONTEXTUAL_REPLIES)) {
      if (lower.includes(keyword)) return replies;
    }
    return [];
  };

  const sendMessage = async (text?: string) => {
    const messageText = text ?? input.trim();
    if (!messageText || loading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setQuickReplies([]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      setQuickReplies(getContextualReplies(data.reply));
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

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      {/* FEREASTRA CHAT */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden md:w-[360px] md:h-[520px]"
          style={{
            width: 'calc(100vw - 24px)',
            height: 'calc(100dvh - 100px)',
            maxWidth: '360px',
            maxHeight: '520px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)',
            background: '#ffffff',
          }}
        >
          {/* HEADER */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)' }}
          >
            <div className="text-2xl">☕</div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>Barista Bot</p>
              <p className="text-white/80 text-xs">Vibe Caffè · Online</p>
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
                          background: 'linear-gradient(135deg, #F97316, #EA580C)',
                          color: '#fff',
                          borderBottomRightRadius: '4px',
                        }
                      : {
                          background: '#f0fdfa',
                          color: '#1F2937',
                          borderBottomLeftRadius: '4px',
                          boxShadow: '0 2px 8px rgba(20,184,166,0.1)',
                          border: '1px solid #ccfbf1',
                        }
                  }
                >
                  {msg.content.split('\n').map((line, j) => {
                    const formatted = line
                      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#b45309;font-weight:700">$1</strong>')
                      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#d97706;font-weight:600;text-decoration:underline;" target="_self">$1</a>')
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
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#14B8A6', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#14B8A6', animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#14B8A6', animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK REPLIES */}
          {quickReplies.length > 0 && !loading && (
            <div className="flex flex-wrap gap-2 px-4 py-2" style={{ borderTop: '1px solid #ccfbf1', background: '#f0fdfa' }}>
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'transparent',
                    color: '#0D9488',
                    border: '1.5px solid #14B8A6',
                    boxShadow: '0 2px 6px rgba(20,184,166,0.15)',
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-t"
            style={{ borderColor: '#ccfbf1', background: '#fff' }}
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
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)' }}
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
            background: '#0D9488',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(20,184,166,0.3)',
          }}
        >
          Bună! Hai să discutăm ☕
          <div
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rotate-45"
            style={{ background: '#0D9488' }}
          />
        </div>
      )}

      {/* BUTON PLUTITOR */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #0D9488, #14B8A6)'
            : 'linear-gradient(135deg, #14B8A6, #0D9488)',
          boxShadow: isOpen
            ? '0 8px 25px rgba(13,148,136,0.4)'
            : '0 8px 25px rgba(20,184,166,0.5)',
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
          0%, 100% { transform: scale(1); box-shadow: 0 8px 25px rgba(20,184,166,0.5); }
          50% { transform: scale(1.08); box-shadow: 0 12px 35px rgba(20,184,166,0.7); }
        }
      `}</style>
    </>
  );
}

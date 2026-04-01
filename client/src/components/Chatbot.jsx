import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Zap } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm the DS TECHVIBE AI assistant. Ask me about our skills, projects, or how we can work together.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await axios.post(`${apiBase}/api/chatbot`, { message: input });
      const reply = res?.data?.response || res?.data?.botResponse;
      setMessages((prev) => [...prev, { role: 'bot', text: reply || "I didn't catch that. Could you rephrase?" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: "I'm having trouble reaching the server. Please try again in a moment or use the contact form." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-fab">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="window"
            className="chatbot-window"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <Zap size={15} />
                </div>
                <div>
                  <div className="chatbot-name">Ask DS TECHVIBE AI</div>
                  <div className="chatbot-status">● Online</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-600)', display: 'flex' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`chat-bubble ${m.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {m.text}
                </motion.div>
              ))}

              {loading && (
                <div className="chat-bubble chat-bubble--bot" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gray-600)', display: 'block' }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input-row">
              <input
                className="chatbot-input"
                type="text"
                placeholder="Message DS TECHVIBE AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <motion.button
                className="chatbot-send"
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                aria-label="Send"
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Toggle */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title="Ask DS TECHVIBE AI"
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Chatbot;

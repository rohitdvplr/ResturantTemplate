/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, Wine, Landmark, Flame } from 'lucide-react';
import { ChatMessage } from '../types';

interface AntoineChatbotProps {
  onQuickSelectFood?: (foodName: string) => void;
  selectedFoodQuery?: string;
  onClearFoodQuery?: () => void;
}

export default function AntoineChatbot({ onQuickSelectFood, selectedFoodQuery, onClearFoodQuery }: AntoineChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialPrompts = [
    {
      label: "Pairing for Truffle Risotto",
      text: "What fine wine would you pair with your Wild Mushroom & Truffle Risotto?"
    },
    {
      label: "Wagyu Preparation",
      text: "Can you explain how the Kagoshima A5 Wagyu is sourced and prepared?"
    },
    {
      label: "Reserve Vault Secrets",
      text: "What makes private dining at Chef Antoine's Reserve Vault a unique bespoke experience?"
    },
    {
      label: "Dynamic 3-Course progression",
      text: "Recommend a custom 3-course trajectory from the sensory menu tonight."
    }
  ];

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          text: `Welcome to L'Essence, my esteemed guest. I am Antoine, Head Chef and Sommelier.\n\nTonight, our kitchen focuses on pure sensory harmony. If you wish, ask me about our vintage wine pairing sequences, molecular preparation techniques, or let me craft a personalized culinary flight for you. How may I direct your senses?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  // Handle auto-trigger of selected food queries from external components
  useEffect(() => {
    if (selectedFoodQuery) {
      handleSendPrompt(`Hello Chef Antoine, what cellar wine would you pair with your "${selectedFoodQuery}"? And what are the defining notes of this dish?`);
      if (onClearFoodQuery) {
        onClearFoodQuery();
      }
    }
  }, [selectedFoodQuery]);

  // Infinite re-render safety: watch messages length only to scroll down
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isLoading]);

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-8) // Send recent message memory context
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: data.text || "Antoine is presently reflecting. Please enquire in one moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: "My apologies. Our sensory acoustic network is currently experiencing heavy volume. Allow me of your patience.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-brand-surface border border-brand-gold-muted/20 rounded-lg overflow-hidden flex flex-col h-[650px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Bot Chat Header */}
      <div className="px-6 py-4 bg-brand-surface-high border-b border-brand-gold-muted/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
            <Wine className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif font-medium text-brand-gold text-base tracking-wider">Chef Antoine</h3>
            <p className="text-[10px] text-brand-cream-muted uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
              L'Essence Sommelier AI
            </p>
          </div>
        </div>
        <span className="text-[10px] font-sans text-brand-gold/60 border border-brand-gold/25 px-2.5 py-1 rounded tracking-wide">
          Kagoshima & Pomerol Curated
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-4 ${isAssistant ? '' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="w-8 h-8 rounded-full bg-brand-dark-deep border border-brand-gold-muted/30 flex items-center justify-center text-brand-gold shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3.5 space-y-1 ${
                  isAssistant
                     ? 'bg-brand-surface-high border border-brand-gold-muted/10 text-brand-cream'
                     : 'bg-brand-gold text-brand-dark font-medium'
                }`}
              >
                <div className="text-white">
                  <p className={`text-[13px] leading-relaxed whitespace-pre-line font-sans ${isAssistant ? 'text-brand-cream/90' : 'text-brand-dark font-medium'}`}>
                    {msg.text}
                  </p>
                </div>
                <div className={`text-[9px] text-right ${isAssistant ? 'text-brand-cream-muted' : 'text-brand-dark/60 font-semibold'}`}>
                  {msg.timestamp}
                </div>
              </div>
              {!isAssistant && (
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark shrink-0 font-bold text-xs uppercase">
                  ME
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-dark-deep border border-brand-gold-muted/30 flex items-center justify-center text-brand-gold shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-brand-surface-high border border-brand-gold-muted/10 rounded-lg px-5 py-4 text-brand-cream shrink-0 flex items-center gap-3">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce delay-200" />
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce delay-300" />
              </div>
              <p className="text-xs text-brand-cream-muted italic font-sans">
                Antoine is pouring pairing notes...
              </p>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggested Questions Track */}
      {messages.length === 1 && (
        <div className="px-6 py-3 bg-brand-dark-deep border-t border-brand-gold-muted/10">
          <p className="text-[10px] text-brand-cream-muted uppercase tracking-wider mb-2 font-semibold">
            Inquire about our tonight specialties:
          </p>
          <div className="flex flex-wrap gap-2">
            {initialPrompts.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendPrompt(p.text)}
                className="text-[11px] bg-brand-surface hover:bg-brand-gold-muted/10 border border-brand-gold-muted/20 text-brand-gold px-3 py-1.5 rounded transition-all focus:outline-none"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Sending Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(input);
        }}
        className="p-4 bg-brand-surface-high border-t border-brand-gold-muted/10 flex gap-3 h-18"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Ask Head Sommelier Antoine for wine ideas, preparations..."
          className="flex-1 bg-brand-dark leading-normal focus:outline-none focus:border-brand-gold border border-brand-gold-muted/20 rounded px-4 text-sm text-brand-cream placeholder:text-brand-cream-muted placeholder:text-xs"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-brand-gold hover:bg-brand-gold-muted disabled:bg-brand-gold-muted/20 disabled:text-brand-cream/30 text-brand-dark font-sans text-xs uppercase font-extrabold tracking-widest px-5 rounded flex items-center justify-center transition-all focus:outline-none shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

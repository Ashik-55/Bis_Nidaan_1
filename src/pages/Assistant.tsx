import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bot, Send, User, Sparkles, MessageSquare, Package, BookOpen } from 'lucide-react';
import EvidenceCard from '../components/common/EvidenceCard';
import { mockResponses, fallbackResponse } from '../data/assistantResponses';
import type { AssistantMessage } from '../types/Assistant';

const SUGGESTIONS = [
  'What standard applies to an electric kettle?',
  'What certification is required for a pressure cooker?',
  'How can I verify a product?',
  'What is IS 302?',
  'How to get BIS certification?',
  'What standard applies to LED bulbs?',
];

function getMockResponse(query: string) {
  const q = query.toLowerCase();
  const match = mockResponses.find(r => r.triggers.some(t => q.includes(t)));
  if (match) return match;
  const filled = {
    ...fallbackResponse,
    response: fallbackResponse.response.replace('{{query}}', query),
  };
  return filled;
}

function formatMessage(text: string) {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function MessageBubble({ message }: { message: AssistantMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isUser ? 'bg-blue-700' : 'bg-slate-800'}`}>
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>

      <div className={`flex-1 min-w-0 ${isUser ? 'flex flex-col items-end' : ''}`}>
        {/* Bubble */}
        <div className={`max-w-lg ${isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
          {message.isLoading ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <div className="whitespace-pre-line leading-relaxed text-sm">
              {message.content.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>{formatMessage(line)}</p>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-xs text-gray-400 mt-1 px-1">{message.timestamp}</span>

        {/* Evidence cards */}
        {!isUser && message.evidence && message.evidence.length > 0 && (
          <div className="mt-2 space-y-2 w-full max-w-lg">
            <p className="text-xs text-gray-500 font-semibold flex items-center gap-1.5 px-1">
              <Sparkles size={11} className="text-blue-500" />
              Evidence Sources ({message.evidence.length})
            </p>
            {message.evidence.map(ev => (
              <EvidenceCard key={ev.id} evidence={ev} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Assistant() {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('product') || '';
  const standardCode = searchParams.get('standard') || '';
  const productId = searchParams.get('productId') || '';
  const prefilledQ = searchParams.get('q') || '';

  const contextWelcome = productName
    ? `You're asking about **${productName}**${standardCode ? ` (${standardCode})` : ''}. I'll answer based on this product's context.\n\nWhat would you like to know?`
    : `Welcome to BIS NIDAAN AI Assistant! 👋\n\nI can help you with:\n• Finding applicable Indian Standards for products\n• Understanding BIS certification requirements\n• Compliance guidance and documentation\n• Product verification process\n\nAsk me anything about Indian Standards, BIS certification, or product compliance.\n\n*Note: This is a DEMO prototype. Responses are based on sample data.*`;

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: contextWelcome,
      timestamp: 'Just now',
      evidence: [],
    },
  ]);
  const [input, setInput] = useState(prefilledQ);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-send prefilled question on mount
  useEffect(() => {
    if (prefilledQ && !autoSentRef.current) {
      autoSentRef.current = true;
      // Small delay so welcome message renders first
      const timer = setTimeout(() => {
        sendMessage(prefilledQ);
        setInput('');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const sendMessage = async (text: string) => {
    const q = text.trim();
    if (!q || isTyping) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    const userMsg: AssistantMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: now,
    };

    // Add loading placeholder
    const loadingMsg: AssistantMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: now,
      isLoading: true,
    };

    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));

    const mockResp = getMockResponse(q);
    const assistantMsg: AssistantMessage = {
      id: `a-${Date.now()}-done`,
      role: 'assistant',
      content: mockResp.response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      evidence: mockResp.evidence,
    };

    setMessages(prev => [...prev.slice(0, -1), assistantMsg]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
            <Bot size={20} className="text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">BIS NIDAAN AI Assistant</h1>
            <p className="text-xs text-gray-500">Ask about standards, certification, testing and compliance.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Demo Mode</span>
        </div>
      </div>

      {/* Product context banner (shown when opened from Verify page) */}
      {productName && (
        <div className="border-b border-blue-100 bg-blue-50 px-6 py-3 flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package size={14} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-blue-800">
              Product Context Active
            </p>
            <p className="text-xs text-blue-600 truncate">
              {productName}{standardCode && <> · <span className="font-mono font-bold">{standardCode}</span></>}{productId && <> · {productId}</>}
            </p>
          </div>
          {standardCode && (
            <div className="flex items-center gap-1.5">
              <BookOpen size={11} className="text-blue-500" />
              <span className="font-mono text-xs font-bold text-blue-700">{standardCode}</span>
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-50">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions — show product-specific ones when context is active */}
      {messages.length <= 2 && (
        <div className="px-6 py-3 bg-white border-t border-gray-50">
          <p className="text-xs text-gray-400 mb-2 flex items-center gap-1.5">
            <MessageSquare size={11} />
            {productName ? 'Questions about this product:' : 'Suggested questions:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(productName
              ? [
                  `What standard applies to ${productName}?`,
                  `What certification is required for ${standardCode || 'this product'}?`,
                  `Explain ${standardCode || 'the applicable standard'} in detail`,
                  `What are the compliance steps for ${standardCode || 'this standard'}?`,
                  'What testing labs are approved?',
                ]
              : SUGGESTIONS
            ).map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors text-left"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-100 bg-white px-6 py-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about Indian Standards, BIS certification, compliance..."
            className="input-field flex-1"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="btn-primary px-4"
          >
            <Send size={15} />
          </button>
        </form>
        <p className="text-xs text-amber-600 mt-2 flex items-center gap-1.5">
          <Sparkles size={11} />
          DEMO: Responses from mock data. Production will use RAG + LLM on BIS knowledge base.
        </p>
      </div>
    </div>
  );
}

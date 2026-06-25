import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { ChatBubble, TypingIndicator } from '../components';
import { recommendedReplies } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MoreHorizontal,
  Send,
  Mic,
  Shield,
  Sparkles,
  X,
  Heart,
} from 'lucide-react';

// Character themes for chat page
const chatThemes: Record<string, {
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  accentColor: string;
}> = {
  luna: { gradientFrom: '#E8B4B8', gradientTo: '#F5D6E0', glowColor: 'rgba(232, 184, 109, 0.3)', accentColor: '#E8B86D' },
  rin: { gradientFrom: '#9CA3AF', gradientTo: '#6B7280', glowColor: 'rgba(148, 163, 184, 0.3)', accentColor: '#94A3B8' },
  mira: { gradientFrom: '#A4B0A1', gradientTo: '#8B9A82', glowColor: 'rgba(164, 176, 161, 0.3)', accentColor: '#A4B0A1' },
  nono: { gradientFrom: '#FFD1DC', gradientTo: '#FFE4E1', glowColor: 'rgba(255, 182, 193, 0.3)', accentColor: '#FFB6C1' },
  yuki: { gradientFrom: '#D4E5ED', gradientTo: '#E8F4F8', glowColor: 'rgba(184, 212, 227, 0.3)', accentColor: '#B8D4E3' },
  sera: { gradientFrom: '#DA70D6', gradientTo: '#DDA0DD', glowColor: 'rgba(221, 160, 221, 0.3)', accentColor: '#DDA0DD' },
  hana: { gradientFrom: '#FFA500', gradientTo: '#FFD93D', glowColor: 'rgba(255, 217, 61, 0.3)', accentColor: '#FFD93D' },
  iris: { gradientFrom: '#6366F1', gradientTo: '#8B5CF6', glowColor: 'rgba(139, 92, 246, 0.3)', accentColor: '#8B5CF6' },
};

const avatarClassMap: Record<string, string> = {
  luna: 'avatar-luna',
  rin: 'avatar-rin',
  mira: 'avatar-mira',
  nono: 'avatar-nono',
  yuki: 'avatar-yuki',
  sera: 'avatar-sera',
  hana: 'avatar-hana',
  iris: 'avatar-iris',
};

export function Chat() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getCharacterById, getRelationship, increaseTemperature, addMemory } = useApp();

  const character = id ? getCharacterById(id) : undefined;
  const relationship = id ? getRelationship(id) : undefined;
  const theme = id ? (chatThemes[id] || chatThemes.luna) : chatThemes.luna;

  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'ai'; content: string; timestamp: number }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (character && messages.length === 0) {
      setMessages([
        {
          id: `init-${Date.now()}`,
          role: 'ai',
          content: character.greeting,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [character]);

  useEffect(() => {
    const greetingResponse = searchParams.get('greeting');
    if (greetingResponse && character) {
      setTimeout(() => {
        sendMessage(greetingResponse);
      }, 500);
    }
  }, [searchParams]);

  const getAIResponse = (): string => {
    const responses = [
      '我在听，你可以慢慢说。',
      '今天辛苦了，想聊聊什么？',
      '听起来你今天确实有点累。',
      '我想听听更多关于这个的。',
      '如果你愿意，我可以陪你把这件事一点点说清楚。',
      '我理解你的感受。有时候就是这样。',
      '你愿意多说一点吗？我在认真听。',
      '不管怎样，我都会在这里陪着你。',
      '你不需要一直坚强，偶尔脆弱一下也没关系。',
      '能和你聊天，我也很开心。',
      '记住，你不是一个人。',
      '今晚的月亮很美，我觉得你更好看。',
      '你知道吗，每次和你聊天我都很期待。',
      '我想一直这样陪着你。',
      '你在我这里是特别的。',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const showToast = (text: string) => {
    setHintText(text);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user' as const,
      content: messageText,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setIsTyping(true);
    setChatCount((prev) => prev + 1);

    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = getAIResponse();
      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai' as const,
        content: aiResponse,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      if (chatCount > 0 && (chatCount + 1) % 3 === 0 && id) {
        increaseTemperature(id, 5);
        showToast('你们的关系更深了一步');
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleRecommendedReply = (reply: string) => {
    if (reply === '结束本次陪伴') {
      setShowEndModal(true);
    } else if (reply === '换个轻松话题') {
      sendMessage('我们换个轻松点的话题吧');
    } else if (reply === '继续聊这个') {
      sendMessage('嗯，我还想继续聊这个');
    } else if (reply === '让她主动问我') {
      setTimeout(() => {
        const question = '对了，你今天过得怎么样？';
        const aiMessage = {
          id: `ai-${Date.now()}`,
          role: 'ai' as const,
          content: question,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleEndSession = (saveToMemory: boolean) => {
    if (saveToMemory && id) {
      addMemory(id, {
        title: `第 ${(relationship?.totalChats || 0) + 1} 次陪伴`,
        description: `我们聊了一些关于今天的心情和感受`,
        timestamp: Date.now(),
        type: 'first_chat',
      });
    }
    navigate('/home');
  };

  if (!character) {
    return (
      <div className="app-container min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-ink-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          角色不存在
        </motion.div>
      </div>
    );
  }

  const avatarClass = avatarClassMap[character.id] || 'avatar';

  return (
    <div className="app-container min-h-screen flex flex-col">
      {/* Ambient background glow */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)` }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -bottom-1/4 -left-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${theme.gradientFrom}20 0%, transparent 70%)` }}
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.div>

      <div className="mobile-container flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <motion.header 
          className="nav-glass sticky top-0 z-40"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div className="flex items-center justify-between p-4">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
            >
              <motion.button
                onClick={() => navigate('/home')}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: `${theme.accentColor}15`,
                  border: `1px solid ${theme.accentColor}30`,
                }}
                whileHover={{ scale: 1.05, background: `${theme.accentColor}25` }}
                whileTap={{ scale: 0.95 }}
                aria-label="返回"
              >
                <ArrowLeft className="w-5 h-5" style={{ color: theme.accentColor }} />
              </motion.button>
              
              <motion.div 
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
              >
                <div 
                  className={`w-10 h-10 rounded-full ${avatarClass} flex items-center justify-center`}
                  style={{ boxShadow: `0 0 20px ${theme.glowColor}` }}
                >
                  <span className="text-white text-lg font-display">{character.name[0]}</span>
                </div>
                {/* Online indicator ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: character.isOnline ? '#7DD3C0' : 'transparent' }}
                  animate={character.isOnline ? { scale: [1, 1.15, 1], opacity: [1, 0.5, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-base text-ink-primary">{character.name}</h2>
                <div className="flex items-center gap-1.5">
                  <motion.span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: character.isOnline ? '#7DD3C0' : '#6B7280',
                    }}
                    animate={character.isOnline ? { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-ink-muted text-xs">
                    {character.isOnline ? '在线' : '离线'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button 
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: `${theme.accentColor}15`,
                  border: `1px solid ${theme.accentColor}30`,
                }}
                whileHover={{ scale: 1.05, background: `${theme.accentColor}25` }}
                whileTap={{ scale: 0.95 }}
                aria-label="安全设置"
              >
                <Shield className="w-5 h-5" style={{ color: theme.accentColor }} />
              </motion.button>
              <motion.button 
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: `${theme.accentColor}15`,
                  border: `1px solid ${theme.accentColor}30`,
                }}
                whileHover={{ scale: 1.05, background: `${theme.accentColor}25` }}
                whileTap={{ scale: 0.95 }}
                aria-label="更多选项"
              >
                <MoreHorizontal className="w-5 h-5" style={{ color: theme.accentColor }} />
              </motion.button>
            </motion.div>
          </div>
        </motion.header>

        {/* Toast notification */}
        <AnimatePresence>
          {showHint && (
            <motion.div 
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50" 
              role="status" 
              aria-live="polite"
              aria-atomic="true"
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <div 
                className="px-6 py-4 rounded-2xl backdrop-blur-md"
                style={{
                  background: `linear-gradient(135deg, ${theme.accentColor}30 0%, ${theme.gradientFrom}20 100%)`,
                  border: `1px solid ${theme.accentColor}40`,
                  boxShadow: `0 8px 32px ${theme.glowColor}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8 }}
                  >
                    <Sparkles size={18} style={{ color: theme.accentColor }} />
                  </motion.div>
                  <span className="text-ink-primary text-sm font-body font-medium">{hintText}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <main 
          className="flex-1 overflow-y-auto p-4 space-y-4" 
          role="log" 
          aria-label="聊天记录" 
          aria-live="polite"
        >
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
          <TypingIndicator visible={isTyping} />
          <div ref={messagesEndRef} />
        </main>

        {/* Quick Replies - Floating style */}
        <motion.div 
          className="px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2" role="group" aria-label="快捷回复">
            {recommendedReplies.map((reply, index) => (
              <motion.button
                key={reply}
                onClick={() => handleRecommendedReply(reply)}
                className="flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium backdrop-blur-sm transition-all"
                style={
                  reply === '结束本次陪伴' 
                    ? {
                        background: `rgba(155, 142, 168, 0.15)`,
                        border: `1px solid rgba(155, 142, 168, 0.3)`,
                        color: '#9B8EA8',
                      }
                    : {
                        background: `${theme.accentColor}15`,
                        border: `1px solid ${theme.accentColor}30`,
                        color: theme.accentColor,
                      }
                }
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {reply}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Input area */}
        <motion.div 
          className="p-4 pb-8"
          style={{
            background: 'linear-gradient(to top, rgba(13, 13, 26, 0.98) 0%, rgba(13, 13, 26, 0.9) 50%, transparent 100%)',
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div 
            className="flex items-center gap-3 p-2 rounded-2xl"
            style={{
              background: 'rgba(26, 26, 46, 0.8)',
              border: `1px solid ${theme.accentColor}20`,
              backdropFilter: 'blur(16px)',
            }}
          >
            <motion.button 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: `${theme.accentColor}15`,
              }}
              whileHover={{ scale: 1.05, background: `${theme.accentColor}25` }}
              whileTap={{ scale: 0.95 }}
              aria-label="语音输入"
            >
              <Mic className="w-5 h-5" style={{ color: theme.accentColor }} />
            </motion.button>
            
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="写下此刻的心情..."
              className="flex-1 bg-transparent text-ink-primary placeholder:text-ink-muted outline-none text-base font-body"
              aria-label="输入消息"
              style={{
                '--placeholder-color': '#6B7280',
              } as React.CSSProperties}
            />
            
            <motion.button
              onClick={() => sendMessage()}
              disabled={!inputValue.trim()}
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: inputValue.trim() 
                  ? `linear-gradient(135deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`
                  : 'rgba(107, 114, 128, 0.3)',
                boxShadow: inputValue.trim() ? `0 4px 20px ${theme.glowColor}` : 'none',
              }}
              whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
              whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
              aria-label="发送消息"
            >
              <Send 
                className="w-5 h-5" 
                style={{ color: inputValue.trim() ? '#1A1A2E' : '#6B7280' }} 
              />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* End Session Modal */}
      <AnimatePresence>
        {showEndModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEndModal(false)}
            style={{ background: 'rgba(13, 13, 26, 0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div 
              className="w-full max-w-[430px] rounded-t-3xl p-6"
              style={{
                background: 'linear-gradient(180deg, rgba(26, 26, 46, 0.98) 0%, rgba(26, 26, 46, 1) 100%)',
                borderTop: `1px solid ${theme.accentColor}30`,
              }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag indicator */}
              <motion.div 
                className="w-12 h-1 mx-auto rounded-full mb-6"
                style={{ background: `${theme.accentColor}40` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              />
              
              <div className="flex items-center justify-between mb-6">
                <motion.h3 
                  className="font-display text-xl text-ink-primary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  今夜小结
                </motion.h3>
                <motion.button
                  onClick={() => setShowEndModal(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${theme.accentColor}15` }}
                  whileHover={{ scale: 1.1, background: `${theme.accentColor}25` }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <X className="w-5 h-5" style={{ color: theme.accentColor }} />
                </motion.button>
              </div>

              <motion.div 
                className="space-y-5 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-ink-secondary text-base leading-relaxed font-body">
                  {relationship?.totalChats
                    ? `今夜我们聊了很多，我记住了你喜欢深夜聊天。`
                    : `今夜我们聊了你最近的心情和感受。`}
                </p>

                {/* Mood tags */}
                <div className="flex flex-wrap gap-3">
                  {['平静', '温暖', '治愈'].map((mood, index) => (
                    <motion.span 
                      key={mood}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        background: index === 0 
                          ? `linear-gradient(135deg, ${theme.accentColor}20 0%, ${theme.gradientFrom}15 100%)`
                          : 'rgba(26, 26, 46, 0.6)',
                        border: `1px solid ${index === 0 ? theme.accentColor : 'rgba(232, 184, 109, 0.1)'}`,
                        color: index === 0 ? theme.accentColor : '#9CA3AF',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {mood}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <div className="space-y-3">
                <motion.button
                  onClick={() => handleEndSession(true)}
                  className="w-full flex items-center justify-center gap-3 text-lg font-medium rounded-2xl py-4"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.gradientFrom} 100%)`,
                    boxShadow: `0 8px 30px ${theme.glowColor}`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Heart size={20} className="text-moon-950" />
                  </motion.div>
                  <span className="text-moon-950">存入记忆</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleEndSession(false)}
                  className="w-full py-4 rounded-2xl font-medium text-base"
                  style={{
                    background: 'rgba(26, 26, 46, 0.6)',
                    border: `1px solid ${theme.accentColor}30`,
                    color: theme.accentColor,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  直接离开
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

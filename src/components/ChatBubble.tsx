import type { ChatMessage } from '../data/mockData';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (message.role === 'ai') {
      setIsAnimating(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index <= message.content.length) {
          setDisplayedText(message.content.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setDisplayedText(message.content);
          setIsAnimating(false);
        }
      }, 35);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(message.content);
    }
  }, [message.content, message.role]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (message.role === 'user') {
    return (
      <motion.div 
        className="flex justify-end mb-4"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="max-w-[85%]">
          <motion.div 
            className="bubble-moon px-5 py-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <p className="text-sm leading-relaxed font-body">
              {message.content}
            </p>
          </motion.div>
          <motion.div 
            className="text-right mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-ink-faint text-xs">{formatTime(message.timestamp)}</span>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="flex justify-start mb-4"
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="max-w-[85%]">
        <motion.div 
          className="bubble-ink px-5 py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <p className="text-sm leading-relaxed font-body whitespace-pre-wrap">
            {displayedText}
            {isAnimating && displayedText.length < message.content.length && (
              <motion.span 
                className="inline-block w-0.5 h-4 bg-amber-warm/60 ml-1"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>
        <motion.div 
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-ink-faint text-xs">{formatTime(message.timestamp)}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface TypingIndicatorProps {
  visible: boolean;
}

export function TypingIndicator({ visible }: TypingIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="flex justify-start mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="bubble-ink px-5 py-4">
            <div className="typing-dots">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i}
                  className="typing-dot" 
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageCircle, Heart, Crown, User } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { path: '/home', label: '首页', icon: Home },
  { path: '/chat-list', label: '消息', icon: MessageCircle },
  { path: '/relationship', label: '记忆', icon: Heart },
  { path: '/membership', label: '会员', icon: Crown },
  { path: '/settings', label: '我的', icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith('/chat/') || location.pathname === '/') {
    return null;
  }

  return (
    <motion.nav 
      className="bottom-nav" 
      aria-label="主导航"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <div className="max-w-[430px] mx-auto flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center gap-1 py-2 px-4 rounded-2xl min-w-[52px] relative
                ${isActive 
                  ? 'text-amber-warm' 
                  : 'text-ink-muted hover:text-ink-secondary'
                }
              `}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.5}
                  className="transition-all duration-200"
                />
              </motion.div>
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'text-amber-warm' : ''}`}>
                {item.label}
              </span>
              
              {/* Active indicator - moon phase style */}
              {isActive && (
                <motion.div 
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-warm" 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    boxShadow: [
                      '0 0 4px rgba(232,184,109,0.4)',
                      '0 0 12px rgba(232,184,109,0.8)',
                      '0 0 4px rgba(232,184,109,0.4)',
                    ],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}

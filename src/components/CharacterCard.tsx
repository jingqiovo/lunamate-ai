import type { Character } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { Sparkle } from 'lucide-react';
import { motion } from 'motion/react';

interface CharacterCardProps {
  character: Character;
  showRelationship?: boolean;
  index?: number;
}

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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      delay: i * 0.08,
    },
  }),
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
};

const avatarVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const sparkleVariants = {
  animate: {
    rotate: [0, 15, -15, 0],
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export function CharacterCard({ character, showRelationship = false, index = 0 }: CharacterCardProps) {
  const navigate = useNavigate();
  const { getRelationship } = useApp();
  const relationship = getRelationship(character.id);

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const avatarClass = avatarClassMap[character.id] || 'avatar';

  return (
    <motion.article
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="card-moon p-5 cursor-pointer group relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      role="button"
      tabIndex={0}
      aria-label={`了解 ${character.name}`}
      custom={index}
    >
      <div className="flex gap-4 relative z-10">
        {/* Avatar */}
        <motion.div 
          className="relative flex-shrink-0"
          variants={avatarVariants}
        >
          <motion.div 
            className={`w-16 h-16 rounded-full ${avatarClass} flex items-center justify-center shadow-lg avatar-glow`}
            aria-hidden="true"
            whileHover={{ boxShadow: '0 0 40px rgba(232, 184, 109, 0.5)' }}
          >
            <span className="text-white text-2xl font-display">{character.name[0]}</span>
          </motion.div>
          
          {/* Online status */}
          <motion.div 
            className={`absolute bottom-0 right-0 status-dot ${
              character.isOnline ? 'status-online' : 'status-offline'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25, delay: index * 0.1 + 0.3 }}
            aria-label={character.isOnline ? '在线' : '离线'}
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <motion.h3 
                  className="font-display text-lg text-ink-primary"
                  whileHover={{ color: '#E8B86D' }}
                  transition={{ duration: 0.2 }}
                >
                  {character.name}
                </motion.h3>
                {character.matchRate >= 90 && (
                  <motion.div
                    variants={sparkleVariants}
                    animate="animate"
                  >
                    <Sparkle size={14} className="text-amber-warm" aria-hidden="true" />
                  </motion.div>
                )}
              </div>
              <p className="text-ink-muted text-xs line-clamp-1 leading-relaxed">
                {character.tagline}
              </p>
            </div>
            
            {/* Match Rate */}
            <motion.div 
              className="flex-shrink-0 text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="badge-moon">{character.matchRate}%</span>
            </motion.div>
          </div>

          {/* Tags */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-3" 
            aria-label="角色标签"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {character.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span 
                key={tag} 
                className="tag-moon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + tagIndex * 0.05 + 0.4 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Relationship temperature */}
          {showRelationship && relationship && relationship.temperature > 0 && (
            <motion.div 
              className="pt-3 border-t border-amber-warm/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-ink-muted">关系温度</span>
                <span className="text-amber-warm font-medium">{relationship.temperature}°</span>
              </div>
              <div 
                className="progress-moon" 
                role="progressbar" 
                aria-valuenow={relationship.temperature} 
                aria-valuemin={0} 
                aria-valuemax={100}
                aria-label={`关系温度 ${relationship.temperature}度`}
              >
                <motion.div 
                  className="h-full rounded-full progress-moon-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${relationship.temperature}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.6, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative corner */}
      <motion.div 
        className="absolute top-4 right-4 w-8 h-8"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="w-full h-full text-amber-warm/20" viewBox="0 0 32 32" fill="none">
          <path d="M8 24L24 8M24 8H8M24 8V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.article>
  );
}

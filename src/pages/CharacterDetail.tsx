import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { ArrowLeft, Sparkles, MessageCircle, Moon, Clock, Heart, Star, Wind, Cloud, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { characters } from '../data/mockData';

// Character-specific theme configuration
const characterThemes: Record<string, {
  name: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  sectionAccents: {
    relationship: { color: string; icon: typeof Moon };
    about: { color: string; icon: typeof Heart };
    chat: { color: string; icon: typeof Wind };
    scenes: { color: string; icon: typeof Clock };
    icebreakers: { color: string; icon: typeof Cloud };
    greeting: { color: string; icon: typeof Flame };
  };
}> = {
  luna: {
    name: '月之光',
    accentColor: '#E8B86D',
    gradientFrom: '#E8B4B8',
    gradientTo: '#F5D6E0',
    glowColor: 'rgba(232, 184, 109, 0.3)',
    sectionAccents: {
      relationship: { color: '#E8B86D', icon: Moon },
      about: { color: '#F5D6E0', icon: Heart },
      chat: { color: '#E8B4B8', icon: Wind },
      scenes: { color: '#FCD34D', icon: Clock },
      icebreakers: { color: '#FBBF24', icon: Cloud },
      greeting: { color: '#E8B86D', icon: Flame },
    },
  },
  rin: {
    name: '霜之冷',
    accentColor: '#94A3B8',
    gradientFrom: '#9CA3AF',
    gradientTo: '#6B7280',
    glowColor: 'rgba(148, 163, 184, 0.3)',
    sectionAccents: {
      relationship: { color: '#94A3B8', icon: Moon },
      about: { color: '#CBD5E1', icon: Heart },
      chat: { color: '#94A3B8', icon: Wind },
      scenes: { color: '#64748B', icon: Clock },
      icebreakers: { color: '#475569', icon: Cloud },
      greeting: { color: '#94A3B8', icon: Flame },
    },
  },
  mira: {
    name: '林之静',
    accentColor: '#A4B0A1',
    gradientFrom: '#A4B0A1',
    gradientTo: '#8B9A82',
    glowColor: 'rgba(164, 176, 161, 0.3)',
    sectionAccents: {
      relationship: { color: '#A4B0A1', icon: Moon },
      about: { color: '#B7C4B1', icon: Heart },
      chat: { color: '#8B9A82', icon: Wind },
      scenes: { color: '#7D8E75', icon: Clock },
      icebreakers: { color: '#6B7E68', icon: Cloud },
      greeting: { color: '#A4B0A1', icon: Flame },
    },
  },
  nono: {
    name: '糖之甜',
    accentColor: '#FFB6C1',
    gradientFrom: '#FFD1DC',
    gradientTo: '#FFE4E1',
    glowColor: 'rgba(255, 182, 193, 0.3)',
    sectionAccents: {
      relationship: { color: '#FFB6C1', icon: Moon },
      about: { color: '#FFC0CB', icon: Heart },
      chat: { color: '#FFB6C1', icon: Wind },
      scenes: { color: '#FFA07A', icon: Clock },
      icebreakers: { color: '#FF69B4', icon: Cloud },
      greeting: { color: '#FF6B6B', icon: Flame },
    },
  },
  yuki: {
    name: '雪之静',
    accentColor: '#B8D4E3',
    gradientFrom: '#D4E5ED',
    gradientTo: '#E8F4F8',
    glowColor: 'rgba(184, 212, 227, 0.3)',
    sectionAccents: {
      relationship: { color: '#B8D4E3', icon: Moon },
      about: { color: '#C5DCE8', icon: Heart },
      chat: { color: '#A8C8DA', icon: Wind },
      scenes: { color: '#8FB8CE', icon: Clock },
      icebreakers: { color: '#7AA8C2', icon: Cloud },
      greeting: { color: '#B8D4E3', icon: Flame },
    },
  },
  sera: {
    name: '紫之梦',
    accentColor: '#DDA0DD',
    gradientFrom: '#DA70D6',
    gradientTo: '#DDA0DD',
    glowColor: 'rgba(221, 160, 221, 0.3)',
    sectionAccents: {
      relationship: { color: '#DDA0DD', icon: Moon },
      about: { color: '#E6B3E6', icon: Heart },
      chat: { color: '#DA70D6', icon: Wind },
      scenes: { color: '#CE79CE', icon: Clock },
      icebreakers: { color: '#C262C2', icon: Cloud },
      greeting: { color: '#DDA0DD', icon: Flame },
    },
  },
  hana: {
    name: '阳之暖',
    accentColor: '#FFD93D',
    gradientFrom: '#FFA500',
    gradientTo: '#FFD93D',
    glowColor: 'rgba(255, 217, 61, 0.3)',
    sectionAccents: {
      relationship: { color: '#FFD93D', icon: Moon },
      about: { color: '#FFE066', icon: Heart },
      chat: { color: '#FFA500', icon: Wind },
      scenes: { color: '#FF9500', icon: Clock },
      icebreakers: { color: '#FF8C00', icon: Cloud },
      greeting: { color: '#FFD93D', icon: Flame },
    },
  },
  iris: {
    name: '夜之幽',
    accentColor: '#8B5CF6',
    gradientFrom: '#6366F1',
    gradientTo: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    sectionAccents: {
      relationship: { color: '#8B5CF6', icon: Moon },
      about: { color: '#A78BFA', icon: Heart },
      chat: { color: '#7C3AED', icon: Wind },
      scenes: { color: '#6D28D9', icon: Clock },
      icebreakers: { color: '#5B21B6', icon: Cloud },
      greeting: { color: '#8B5CF6', icon: Flame },
    },
  },
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

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRelationship } = useApp();

  const character = characters.find((c) => c.id === id);
  const relationship = id ? getRelationship(id) : null;

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

  const theme = characterThemes[character.id] || characterThemes.luna;
  const avatarClass = avatarClassMap[character.id] || 'avatar';

  const handleStartChat = () => {
    navigate(`/chat/${character.id}`);
  };

  const handleGreetingResponse = (response: string) => {
    navigate(`/chat/${character.id}?greeting=${encodeURIComponent(response)}`);
  };

  const getRelationshipHint = () => {
    if (!relationship || relationship.temperature === 0) return null;
    const hints: Record<string, string> = {
      '陌生人': '初见，一切皆有可能',
      '初识': '渐渐熟悉的开始',
      '熟悉': '默契正在萌芽',
      '默契': '心有灵犀一点通',
      '心动': '怦然心动的感觉',
      '陪伴': '彼此生命中的一部分',
      '长期关系': '灵魂的契合',
    };
    return hints[relationship.stage] || null;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 25 },
    },
  };

  const SectionCard = ({ 
    children, 
    sectionKey, 
    delay = 0,
    className = '' 
  }: { 
    children: React.ReactNode; 
    sectionKey: keyof typeof theme.sectionAccents;
    delay?: number;
    className?: string;
  }) => {
    const section = theme.sectionAccents[sectionKey];
    const SectionIcon = section.icon;

    return (
      <motion.div
        className={`relative overflow-hidden rounded-3xl ${className}`}
        variants={itemVariants}
        style={{
          background: `linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(26, 26, 46, 0.6) 100%)`,
          border: `1px solid ${section.color}30`,
          boxShadow: `0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${section.color}10`,
        }}
        whileHover={{ 
          borderColor: `${section.color}50`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px ${section.color}15`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Top accent line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${section.color}, transparent)`,
          }}
        />

        {/* Icon badge */}
        <motion.div 
          className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md"
          style={{
            background: `${section.color}20`,
            border: `1px solid ${section.color}40`,
            boxShadow: `0 4px 12px ${section.color}20`,
          }}
        >
          <SectionIcon size={20} style={{ color: section.color }} />
        </motion.div>

        <div className="relative z-10 p-6 pt-8">
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="app-container min-h-screen pb-32">
      <div className="mobile-container">
        {/* Header */}
        <motion.header 
          className="nav-glass sticky top-0 z-40"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div className="flex items-center justify-between p-4">
            <motion.button
              onClick={() => navigate(-1)}
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
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: `${theme.accentColor}10`,
                border: `1px solid ${theme.accentColor}20`,
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-medium" style={{ color: theme.accentColor }}>
                {theme.name}
              </span>
            </motion.div>
          </div>
        </motion.header>

        {/* Character Header */}
        <motion.div 
          className="relative px-6 pt-2 pb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Background glow */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            aria-hidden="true"
          >
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`,
              }}
            />
          </motion.div>

          {/* Avatar */}
          <motion.div 
            className="relative flex justify-center pt-6"
            variants={itemVariants}
          >
            <motion.div 
              className={`w-36 h-36 rounded-full ${avatarClass} flex items-center justify-center shadow-2xl`}
              style={{
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 80px ${theme.glowColor}, inset 0 -10px 30px rgba(0,0,0,0.2)`,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <span className="text-white text-6xl font-display">{character.name[0]}</span>
            </motion.div>

            {/* Decorative ring */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-dashed"
              style={{ borderColor: `${theme.accentColor}30` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Online status */}
          <motion.div 
            className="flex items-center justify-center gap-2 mt-6 mb-3"
            variants={itemVariants}
          >
            <motion.div 
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: character.isOnline ? '#7DD3C0' : '#6B7280',
                boxShadow: character.isOnline ? '0 0 12px rgba(125, 211, 192, 0.6)' : 'none',
              }}
              animate={character.isOnline ? { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm" style={{ color: character.isOnline ? '#7DD3C0' : '#9CA3AF' }}>
              {character.isOnline ? '在线 · 等待与你相遇' : '离线 · 或许在梦中'}
            </span>
          </motion.div>

          {/* Name & Match */}
          <motion.div className="text-center mb-5" variants={itemVariants}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.h1 
                className="font-display text-4xl text-ink-primary tracking-wide"
                style={{ textShadow: `0 2px 20px ${theme.glowColor}` }}
              >
                {character.name}
              </motion.h1>
              {character.matchRate >= 90 && (
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles size={24} style={{ color: theme.accentColor }} />
                </motion.div>
              )}
            </div>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.gradientTo} 100%)`,
                boxShadow: `0 4px 20px ${theme.glowColor}`,
              }}
            >
              <Star size={14} className="text-moon-950" />
              <span className="text-moon-950 text-sm font-semibold">{character.matchRate}% 契合</span>
            </motion.div>
          </motion.div>

          {/* Tags */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 pb-8"
            variants={itemVariants}
          >
            {character.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: `${theme.accentColor}15`,
                  border: `1px solid ${theme.accentColor}30`,
                  color: theme.accentColor,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05, background: `${theme.accentColor}25` }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="px-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Relationship Temperature */}
          {relationship && relationship.temperature > 0 && (
            <SectionCard sectionKey="relationship">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg text-ink-primary flex items-center gap-2">
                  关系月相
                </h2>
                <span className="font-display text-3xl" style={{ color: theme.sectionAccents.relationship.color }}>
                  {relationship.temperature}°
                </span>
              </div>
              <div 
                className="h-2 rounded-full overflow-hidden mb-3"
                style={{ background: `${theme.accentColor}15` }}
              >
                <motion.div 
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${relationship.temperature}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  style={{
                    background: `linear-gradient(90deg, ${theme.sectionAccents.relationship.color}40, ${theme.accentColor}, ${theme.gradientTo})`,
                  }}
                />
              </div>
              <p className="text-ink-muted text-sm text-center">
                {getRelationshipHint()}
              </p>
            </SectionCard>
          )}

          {/* About - Unique gradient background */}
          <SectionCard sectionKey="about">
            <h2 className="font-display text-lg text-ink-primary mb-4">关于她</h2>
            <div 
              className="p-4 rounded-2xl mb-4"
              style={{
                background: `linear-gradient(135deg, ${theme.sectionAccents.about.color}15 0%, ${theme.sectionAccents.about.color}05 100%)`,
                border: `1px solid ${theme.sectionAccents.about.color}20`,
              }}
            >
              <p className="text-ink-secondary text-sm leading-relaxed font-body">
                {character.personality}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: theme.sectionAccents.about.color }}>
              <Heart size={12} />
              <span>性格特点</span>
            </div>
          </SectionCard>

          {/* Chat Style - Wind/speech themed */}
          <SectionCard sectionKey="chat">
            <h2 className="font-display text-lg text-ink-primary mb-4">她的语言</h2>
            <div className="relative">
              <div 
                className="absolute -left-2 top-0 bottom-0 w-1 rounded-full"
                style={{
                  background: `linear-gradient(180deg, transparent, ${theme.sectionAccents.chat.color}, transparent)`,
                }}
              />
              <p className="text-ink-secondary text-sm leading-relaxed font-body pl-4">
                {character.chatStyle}
              </p>
            </div>
          </SectionCard>

          {/* Best Scenes - Clock themed */}
          <SectionCard sectionKey="scenes">
            <h2 className="font-display text-lg text-ink-primary mb-4">适合的时刻</h2>
            <div className="grid grid-cols-2 gap-3">
              {character.bestScenes.map((scene, index) => (
                <motion.div
                  key={scene}
                  className="p-3 rounded-xl text-center"
                  style={{
                    background: `${theme.sectionAccents.scenes.color}10`,
                    border: `1px solid ${theme.sectionAccents.scenes.color}20`,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: `${theme.sectionAccents.scenes.color}40` }}
                >
                  <span className="text-xs text-ink-secondary">{scene}</span>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          {/* Ice Breakers - Cloud/thought themed */}
          <SectionCard sectionKey="icebreakers">
            <h2 className="font-display text-lg text-ink-primary mb-4">破冰话题</h2>
            <div className="space-y-3">
              {character.iceBreakers.map((breaker, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleGreetingResponse(breaker)}
                  className="w-full p-4 rounded-2xl text-left relative overflow-hidden"
                  style={{
                    background: `${theme.sectionAccents.icebreakers.color}08`,
                    border: `1px solid ${theme.sectionAccents.icebreakers.color}15`,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    background: `${theme.sectionAccents.icebreakers.color}15`,
                    borderColor: `${theme.sectionAccents.icebreakers.color}30`,
                    x: 4,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-ink-secondary text-sm font-body relative z-10">
                    {breaker}
                  </span>
                </motion.button>
              ))}
            </div>
          </SectionCard>

          {/* Greeting - Flame/heart themed */}
          <SectionCard sectionKey="greeting">
            <h2 className="font-display text-lg text-ink-primary mb-4">她想说</h2>
            <motion.div 
              className="p-5 rounded-2xl mb-5"
              style={{
                background: `linear-gradient(135deg, ${theme.sectionAccents.greeting.color}15 0%, ${theme.sectionAccents.greeting.color}05 100%)`,
                border: `1px solid ${theme.sectionAccents.greeting.color}25`,
              }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-handwritten text-xl text-ink-primary leading-relaxed text-center">
                "{character.greeting}"
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-3">
              {character.greetingOptions.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleGreetingResponse(option)}
                  className="py-3.5 rounded-2xl font-body text-sm"
                  style={{
                    background: `${theme.accentColor}15`,
                    border: `1px solid ${theme.accentColor}30`,
                    color: theme.accentColor,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    background: theme.accentColor,
                    color: '#1A1A2E',
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </SectionCard>

          <div className="h-8" />
        </motion.div>
      </div>

      {/* Fixed CTA */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 p-6 pb-10"
        style={{
          background: 'linear-gradient(to top, #0D0D1A 0%, rgba(13, 13, 26, 0.95) 50%, transparent 100%)',
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
      >
        <div className="max-w-[430px] mx-auto">
          <button 
            onClick={handleStartChat} 
            className="w-full flex items-center justify-center gap-3 text-lg font-medium rounded-2xl py-4 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.gradientTo} 100%)`,
              boxShadow: `0 8px 30px ${theme.glowColor}`,
            }}
            aria-label={`开始与 ${character.name} 聊天`}
          >
            <MessageCircle size={22} className="text-moon-950" />
            <span className="text-moon-950">开始对话</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

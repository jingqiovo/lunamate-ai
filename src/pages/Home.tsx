import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterCard } from '../components';
import { characters, categoryTags } from '../data/mockData';
import { Search, Sparkle, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';

export function Home() {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Scroll detection for header hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY <= 0 || currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true);
      } 
      // Hide header when scrolling down past threshold
      else if (currentScrollY > 100) {
        setIsHeaderVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCharacters = characters.filter((char) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        char.name.toLowerCase().includes(query) ||
        char.tagline.toLowerCase().includes(query) ||
        char.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const getSortedCharacters = () => {
    switch (activeTag) {
      case 'recommended':
        return [...filteredCharacters].sort((a, b) => b.matchRate - a.matchRate);
      case 'new':
        return filteredCharacters.filter((c) => c.id === 'sera' || c.id === 'hana');
      case 'hot':
        return [...filteredCharacters].sort((a, b) => b.matchRate - a.matchRate).slice(0, 4);
      case 'late-night':
        return filteredCharacters.filter((c) => c.id === 'luna' || c.id === 'iris' || c.id === 'yuki');
      case 'warming':
        return filteredCharacters.filter((c) => c.matchRate >= 85);
      default:
        return filteredCharacters;
    }
  };

  const sortedCharacters = getSortedCharacters();

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="mobile-container" ref={containerRef}>
        {/* Collapsible Header */}
        <motion.header 
          className="nav-glass sticky top-0 z-40"
          animate={{ 
            y: isHeaderVisible ? 0 : -200,
            opacity: isHeaderVisible ? 1 : 0,
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            mass: 0.5,
          }}
        >
          <div className="px-6 pt-6 pb-5">
            {/* Brand */}
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 25 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-warm to-amber-400 flex items-center justify-center moon-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Moon className="w-6 h-6 text-moon-950" />
                </motion.div>
                <div>
                  <h1 className="font-display text-xl text-ink-primary tracking-wide">LunaMate</h1>
                  <p className="text-ink-muted text-xs tracking-wider">月下相伴</p>
                </div>
              </div>
              <motion.button
                onClick={() => navigate('/settings')}
                className="w-11 h-11 rounded-full bg-moon-900/50 border border-amber-warm/10 flex items-center justify-center hover:bg-moon-900/70"
                whileHover={{ scale: 1.05, borderColor: 'rgba(232, 184, 109, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="设置"
              >
                <svg className="w-5 h-5 text-ink-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Search - expands on focus */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 25 }}
            >
              <motion.div
                animate={{
                  boxShadow: isSearchFocused 
                    ? '0 0 0 3px rgba(232, 184, 109, 0.2), 0 0 20px rgba(232, 184, 109, 0.15)' 
                    : '0 0 0 0px rgba(232, 184, 109, 0)',
                }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Search 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted transition-all duration-200" 
                  style={{ 
                    left: isSearchFocused ? '16px' : '16px',
                    color: isSearchFocused ? '#E8B86D' : undefined,
                  }} 
                  aria-hidden="true" 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="寻找你的灵魂伴侣..."
                  className="input-moon pl-12 pr-4"
                  aria-label="搜索角色"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Category Pills */}
          <motion.div 
            className="px-6 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-3 overflow-x-auto hide-scrollbar" role="tablist" aria-label="角色分类">
              {categoryTags.map((tag, index) => (
                <motion.button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id)}
                  role="tab"
                  aria-selected={activeTag === tag.id}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
                    ${activeTag === tag.id
                      ? 'bg-gradient-to-r from-amber-warm to-amber-400 text-moon-950 shadow-warm'
                      : 'bg-moon-900/40 text-ink-secondary border border-amber-warm/10 hover:bg-moon-900/60'
                    }
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.header>

        {/* Content */}
        <main className="px-6 pt-8">
          {/* Section Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 25 }}
          >
            <p className="section-label">今晚，你想遇见谁？</p>
            <h2 className="font-display text-2xl text-ink-primary leading-tight mb-2">
              {searchQuery ? `关于 "${searchQuery}"` : '为你而生'}
            </h2>
            <p className="text-ink-muted text-sm">
              {sortedCharacters.length} 位灵魂在等待
            </p>
          </motion.div>

          {/* Character Grid - Magazine Style */}
          <AnimatePresence mode="popLayout">
            {sortedCharacters.length > 0 ? (
              <motion.div 
                key={activeTag + searchQuery}
                className="space-y-6"
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {sortedCharacters.map((character, index) => (
                  <motion.div
                    key={character.id}
                    layout
                    variants={{
                      hidden: { opacity: 0, y: 40, scale: 0.95 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          damping: 25,
                          delay: index * 0.08,
                        },
                      },
                    }}
                  >
                    <CharacterCard character={character} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="card-moon p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <motion.div 
                  className="empty-state-icon mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkle className="w-8 h-8 text-amber-warm" />
                </motion.div>
                <h3 className="font-display text-lg text-ink-primary mb-2">未曾谋面</h3>
                <p className="text-ink-muted text-sm">换一个词，或许会有惊喜</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer whisper */}
          <motion.div 
            className="mt-16 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.p 
              className="font-handwritten text-lg text-ink-muted"
              animate={{ 
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "在月光下，每段相遇都是命中注定"
            </motion.p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

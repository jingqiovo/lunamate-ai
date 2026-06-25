import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreferenceCard } from '../components';
import { preferenceOptions } from '../data/mockData';
import { useApp } from '../hooks/useApp';
import { Sparkle, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Onboarding() {
  const navigate = useNavigate();
  const { updatePreferences, completeOnboarding } = useApp();

  const [characterTypes, setCharacterTypes] = useState<string[]>([]);
  const [chatVibes, setChatVibes] = useState<string[]>([]);
  const [interactionWays, setInteractionWays] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleComplete = () => {
    setIsGenerating(true);
    updatePreferences({
      characterTypes,
      chatVibes,
      interactionWays,
    });
    
    setTimeout(() => {
      completeOnboarding();
      navigate('/home');
    }, 1500);
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/home');
  };

  const totalSelected = characterTypes.length + chatVibes.length + interactionWays.length;

  return (
    <div className="app-container min-h-screen flex flex-col">
      <div className="mobile-container flex flex-col min-h-screen">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between p-6 safe-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-warm to-amber-400 flex items-center justify-center moon-glow">
              <Moon className="w-6 h-6 text-moon-950" />
            </div>
            <span className="font-display text-lg text-ink-primary">LunaMate</span>
          </motion.div>
          <motion.button
            onClick={handleSkip}
            className="text-ink-muted text-sm hover:text-ink-secondary px-4 py-2 rounded-xl hover:bg-moon-900/40"
            whileTap={{ scale: 0.95 }}
            aria-label="跳过设置"
          >
            跳过
          </motion.button>
        </motion.header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-40">
          <div className="px-6 pt-4">
            {/* Hero */}
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 25 }}
            >
              <motion.div 
                className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-warm to-lavender-400 flex items-center justify-center shadow-warm moon-glow"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkle className="w-12 h-12 text-moon-950" />
              </motion.div>
              <motion.h1 
                className="font-display text-3xl text-ink-primary mb-4 leading-tight tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                告诉我，你渴望怎样的陪伴？
              </motion.h1>
              <motion.p 
                className="text-ink-secondary text-sm leading-relaxed max-w-xs mx-auto font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                我会根据你的选择，为你匹配最契合的灵魂伴侣
              </motion.p>
            </motion.div>

            {/* Progress */}
            <motion.div 
              className="flex items-center justify-center gap-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`h-1 rounded-full ${
                    i === 0 ? 'w-8 bg-gradient-to-r from-amber-warm to-amber-400' : 'w-4 bg-amber-warm/30'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
                />
              ))}
            </motion.div>

            {/* Preference Sections */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
              >
                <PreferenceCard
                  title="喜欢什么类型的角色？"
                  subtitle="选择你偏好的角色风格"
                  options={preferenceOptions.characterTypes}
                  selected={characterTypes}
                  onChange={setCharacterTypes}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
              >
                <PreferenceCard
                  title="喜欢什么聊天氛围？"
                  subtitle="选择你喜欢的交流方式"
                  options={preferenceOptions.chatVibes}
                  selected={chatVibes}
                  onChange={setChatVibes}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 25 }}
              >
                <PreferenceCard
                  title="喜欢什么互动方式？"
                  subtitle="选择你偏好的陪伴形式"
                  options={preferenceOptions.interactionWays}
                  selected={interactionWays}
                  onChange={setInteractionWays}
                />
              </motion.div>
            </div>
          </div>
        </main>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-gradient-to-t from-moon-950 via-moon-950/95 to-transparent">
          <div className="max-w-[430px] mx-auto">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="generating"
                  className="card-moon p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <motion.div 
                    className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-warm to-amber-400 flex items-center justify-center shadow-warm moon-glow"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' }, scale: { duration: 0.5, repeat: Infinity } }}
                  >
                    <Sparkle className="w-7 h-7 text-moon-950" />
                  </motion.div>
                  <motion.p 
                    className="font-display text-ink-primary text-lg mb-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    正在为你寻找同频的灵魂...
                  </motion.p>
                  <p className="text-ink-muted text-sm">请稍候</p>
                </motion.div>
              ) : (
                <motion.div
                  key="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <motion.button
                    onClick={handleComplete}
                    disabled={totalSelected === 0}
                    className="w-full btn-primary flex items-center justify-center gap-3 text-lg"
                    whileHover={totalSelected > 0 ? { scale: 1.02, y: -2 } : {}}
                    whileTap={totalSelected > 0 ? { scale: 0.98 } : {}}
                  >
                    <motion.div
                      animate={totalSelected > 0 ? { rotate: [0, 15, -15, 0] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkle size={22} />
                    </motion.div>
                    <span className="font-medium">开启月下之旅</span>
                    <AnimatePresence>
                      {totalSelected > 0 && (
                        <motion.span 
                          className="ml-1 px-2.5 py-0.5 rounded-full bg-moon-950/20 text-sm"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          {totalSelected}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <motion.p 
                    className="text-center text-ink-faint text-xs mt-4 font-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    你的选择仅用于个性化推荐，不会保存敏感信息
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

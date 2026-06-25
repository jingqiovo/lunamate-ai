import type { FC } from 'react';
import { motion } from 'motion/react';

interface PreferenceOption {
  id: string;
  label: string;
  icon: string;
}

interface PreferenceCardProps {
  title: string;
  subtitle: string;
  options: PreferenceOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const PreferenceCard: FC<PreferenceCardProps> = ({
  title,
  subtitle,
  options,
  selected,
  onChange,
}) => {
  const toggleOption = (optionId: string) => {
    if (selected.includes(optionId)) {
      onChange(selected.filter((id) => id !== optionId));
    } else {
      onChange([...selected, optionId]);
    }
  };

  const headingId = `pref-${title.replace(/\s+/g, '-')}`;

  return (
    <section className="mb-10" aria-labelledby={headingId}>
      <header className="text-center mb-6">
        <motion.h2 
          id={headingId} 
          className="font-display text-xl text-ink-primary mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-ink-muted text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      </header>

      <div className="grid grid-cols-2 gap-4" role="group" aria-label={title}>
        {options.map((option, index) => {
          const isSelected = selected.includes(option.id);
          return (
            <motion.button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              aria-pressed={isSelected}
              className={`
                relative p-5 rounded-3xl text-left overflow-hidden
                ${isSelected
                  ? 'bg-moon-900/60 border-2 border-amber-warm/40 shadow-warm'
                  : 'bg-moon-900/40 border border-amber-warm/10 hover:border-amber-warm/20'
                }
              `}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.05,
                type: 'spring', 
                stiffness: 200, 
                damping: 25 
              }}
              whileTap={{ scale: 0.97 }}
              whileHover={!isSelected ? { borderColor: 'rgba(232, 184, 109, 0.25)' } : {}}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-warm/10 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSelected ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              
              <motion.div
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-amber-warm to-amber-400 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: isSelected ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                aria-hidden="true"
              >
                <svg className="w-3.5 h-3.5 text-moon-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              
              <motion.div 
                className="text-4xl mb-3"
                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                {option.icon}
              </motion.div>
              
              <motion.div 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isSelected ? 'text-ink-primary' : 'text-ink-secondary'
                }`}
              >
                {option.label}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

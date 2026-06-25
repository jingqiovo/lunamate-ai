import { MotionValue, spring, cubicBezier } from 'motion/react';

export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const smoothSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

export const bouncySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
};

export const gentleSpring = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
};

export const quickSpring = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
};

export const slowTransition = {
  duration: 0.6,
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
};

export const mediumTransition = {
  duration: 0.4,
  ease: cubicBezier(0.4, 0, 0.2, 1),
};

export const fastTransition = {
  duration: 0.25,
  ease: cubicBezier(0.4, 0, 0.2, 1),
};

export const staggerChildren = (delayChildren = 0.1) => ({
  staggerChildren: delayChildren,
});

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: smoothSpring,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: fastTransition,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: bouncySpring,
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: smoothSpring,
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: smoothSpring,
  },
};

export const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: smoothSpring,
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' },
  hover: { 
    scale: 1.02, 
    y: -4, 
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(232, 184, 109, 0.05)',
    transition: quickSpring,
  },
};

export const buttonTap = {
  rest: { scale: 1 },
  tap: { scale: 0.95 },
};

export const listItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...smoothSpring,
      delay: i * 0.08,
    },
  }),
};

export const pulseGlow = {
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

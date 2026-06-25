/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 月夜配色 - 深夜靛蓝
        moon: {
          50: '#F0F4FF',
          100: '#E0E8FF',
          200: '#C7D4FF',
          300: '#A3B8FF',
          400: '#7B8FFF',
          500: '#5B6BFF',
          600: '#4B5AE0',
          700: '#3D49B8',
          800: '#313C90',
          900: '#1A1A2E',  // 深邃夜空
          950: '#0D0D1A',  // 极致深色
        },
        // 暖琥珀 - 情绪色彩
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          warm: '#E8B86D',    // 温暖琥珀
          glow: '#FFE4B5',    // 发光琥珀
        },
        // 柔薰衣草 - 浪漫点缀
        lavender: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          soft: '#D4C4E8',    // 柔薰衣草
          mist: '#EDE4F7',    // 薰衣草薄雾
        },
        // 文字层级
        ink: {
          primary: '#F8F6F3',   // 主文字 - 暖白
          secondary: '#A8A4A0', // 次文字 - 暖灰
          muted: '#6B6662',     // 弱化文字
          faint: '#4A4643',     // 淡化文字
        },
        // 状态色
        emotion: {
          calm: '#7DD3C0',    // 平静
          warm: '#E8B86D',     // 温暖
          bloom: '#D4A5A5',    // 绽放
          dusk: '#9B8EA8',     // 黄昏
          night: '#6B7A8C',    // 夜幕
        },
      },
      fontFamily: {
        // 文学感标题字体
        display: ['Playfair Display', 'Georgia', 'serif'],
        // 现代正文字体
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        // 手写感字体
        handwritten: ['Caveat', 'cursive'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'warm': '0 4px 24px rgba(232, 184, 109, 0.15)',
        'moon': '0 8px 32px rgba(13, 13, 26, 0.6)',
        'soft': '0 2px 16px rgba(212, 196, 232, 0.1)',
        'glow': '0 0 40px rgba(232, 184, 109, 0.25)',
        'inner-warm': 'inset 0 2px 8px rgba(232, 184, 109, 0.1)',
      },
      backgroundImage: {
        'gradient-moon': 'linear-gradient(180deg, #1A1A2E 0%, #0D0D1A 100%)',
        'gradient-amber': 'linear-gradient(135deg, #E8B86D, #FCD34D)',
        'gradient-lavender': 'linear-gradient(135deg, #9333EA, #C084FC)',
        'gradient-night': 'linear-gradient(180deg, rgba(26,26,46,0) 0%, rgba(13,13,26,0.95) 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'moon-rise': 'moonRise 1s ease-out',
        'ink-spread': 'inkSpread 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        moonRise: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        inkSpread: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'prose-lg': '72ch',
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
}

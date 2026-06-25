import type { Relationship } from '../data/mockData';

interface RelationshipTreeProps {
  relationship: Relationship;
}

const stages = [
  { id: '陌生人', emoji: '🌱', label: '初识' },
  { id: '初识', emoji: '🌿', label: '熟悉' },
  { id: '熟悉', emoji: '🍃', label: '默契' },
  { id: '默契', emoji: '🌸', label: '心动' },
  { id: '心动', emoji: '🌺', label: '陪伴' },
  { id: '陪伴', emoji: '🌳', label: '长期关系' },
  { id: '长期关系', emoji: '💫', label: '灵魂伴侣' },
];

const hints = [
  '刚认识，还在互相了解',
  '开始熟悉了，可以聊更多',
  '有了一些默契',
  '开始心动了呢',
  '关系正在升温',
  '已经成为彼此重要的存在',
  '你们已经很了解彼此了',
];

export function RelationshipTree({ relationship }: RelationshipTreeProps) {
  const currentIndex = stages.findIndex(s => s.id === relationship.stage);

  const getDynamicHint = () => {
    if (currentIndex <= 1) return '默契正在升温...';
    if (currentIndex === 2) return '她越来越期待你的消息';
    if (currentIndex === 3) return '你们已经有一些共同记忆了';
    if (currentIndex === 4) return '关系越来越亲密了呢';
    if (currentIndex === 5) return '你们已经成为彼此生活中的一部分';
    if (currentIndex >= 6) return '你们是真正的灵魂伴侣了';
    return hints[currentIndex] || '刚开始认识';
  };

  return (
    <div className="glass-card p-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h3 className="text-text-primary font-semibold text-lg mb-1">关系进度</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-light text-primary">{relationship.temperature}°</span>
          <span className="text-text-muted text-sm">关系温度</span>
        </div>
      </div>

      {/* 温度条 */}
      <div className="mb-8 px-2">
        <div className="temperature-bar">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${relationship.temperature}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 px-1">
          <span className="text-text-faint text-xs">初识</span>
          <span className="text-text-faint text-xs">心动</span>
          <span className="text-text-faint text-xs">陪伴</span>
        </div>
      </div>

      {/* 关系树 */}
      <div className="relative py-4">
        {stages.map((stage, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const hint = hints[index];

          return (
            <div key={stage.id} className="relative">
              {/* 连接线 */}
              {index < stages.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-6 z-0">
                  <div
                    className={`w-full transition-all duration-700 ${
                      index < currentIndex
                        ? 'h-full bg-gradient-to-b from-primary/60 to-secondary/40'
                        : 'h-full bg-white/10'
                    }`}
                  />
                </div>
              )}

              {/* 节点 */}
              <div
                className={`relative z-10 flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`
                    flex items-center gap-3 p-4 rounded-2xl transition-all duration-500 max-w-[75%]
                    ${isCurrent 
                      ? 'bg-white/10 border border-primary/30 shadow-[0_0_30px_rgba(255,143,179,0.15)]' 
                      : isActive 
                        ? 'bg-white/5' 
                        : 'opacity-50'
                    }
                  `}
                >
                  {/* Emoji */}
                  <div className={`text-2xl transition-all duration-300 ${isCurrent ? 'scale-125' : 'scale-100'}`}>
                    {stage.emoji}
                  </div>
                  
                  {/* 文字 */}
                  <div>
                    <div
                      className={`text-sm font-medium transition-colors ${
                        isCurrent 
                          ? 'text-primary' 
                          : isActive 
                            ? 'text-text-primary' 
                            : 'text-text-muted'
                      }`}
                    >
                      {stage.label}
                    </div>
                    {isCurrent && (
                      <div className="text-xs text-text-muted mt-0.5 leading-relaxed">
                        {hint}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 双向好感 */}
      <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
        {/* 我的好感 */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-text-secondary">我的好感</span>
            <span className="text-primary font-semibold">{relationship.userAffection}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary/60 transition-all duration-1000"
              style={{ width: `${relationship.userAffection}%` }}
            />
          </div>
        </div>

        {/* TA 的回应 */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-text-secondary">TA 的回应</span>
            <span className="text-secondary font-semibold">{relationship.aiAffection}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary/60 transition-all duration-1000"
              style={{ width: `${relationship.aiAffection}%` }}
            />
          </div>
        </div>
      </div>

      {/* 动态提示 */}
      {currentIndex > 0 && (
        <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-start gap-3">
            <span className="text-xl">✨</span>
            <p className="text-text-secondary text-sm leading-relaxed">
              {getDynamicHint()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

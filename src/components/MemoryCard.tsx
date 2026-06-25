import type { Memory } from '../data/mockData';
import { Trash2, Edit2, Heart, Clock, Moon, HeartHandshake, Brain, Target, FileText } from 'lucide-react';

interface MemoryCardProps {
  memory: Memory;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const typeIcons: Record<Memory['type'], React.ElementType> = {
  first_chat: Moon,
  late_night: Moon,
  care: HeartHandshake,
  remember: Brain,
  milestone: Target,
  manual: FileText,
};

const typeLabels: Record<Memory['type'], string> = {
  first_chat: '初见',
  late_night: '深夜',
  care: '关怀',
  remember: '铭记',
  milestone: '里程碑',
  manual: '手记',
};

export function MemoryCard({ memory, onDelete, showActions = true }: MemoryCardProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const IconComponent = typeIcons[memory.type];

  return (
    <article className="memory-card group hover:bg-moon-900/60 transition-all duration-300" aria-label={`记忆: ${memory.title}`}>
      <header className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-moon-900/60 flex items-center justify-center" aria-hidden="true">
            <IconComponent size={18} className="text-amber-warm" />
          </div>
          <span className="text-ink-muted text-sm">{typeLabels[memory.type]}</span>
        </div>
        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="p-2 rounded-xl hover:bg-moon-900/40 text-ink-muted hover:text-ink-primary transition-colors btn-press"
              aria-label="编辑记忆"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete?.(memory.id)}
              className="p-2 rounded-xl hover:bg-red-500/10 text-ink-muted hover:text-red-400 transition-colors btn-press"
              aria-label="删除记忆"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </header>

      <h3 className="font-display text-ink-primary text-lg mb-2">{memory.title}</h3>
      <p className="text-ink-secondary text-sm leading-relaxed mb-4 font-body">{memory.description}</p>
      
      <footer className="flex items-center gap-2 text-ink-muted text-xs">
        <Clock size={14} aria-hidden="true" />
        <time dateTime={new Date(memory.timestamp).toISOString()}>{formatDate(memory.timestamp)}</time>
      </footer>
    </article>
  );
}

interface MemoryListProps {
  memories: Memory[];
  onDelete?: (id: string) => void;
  emptyMessage?: string;
}

export function MemoryList({ memories, onDelete, emptyMessage = '还没有共同记忆' }: MemoryListProps) {
  if (memories.length === 0) {
    return (
      <div className="card-moon p-12 text-center" role="status">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-moon-900/40 flex items-center justify-center">
          <Heart size={32} className="text-ink-muted" />
        </div>
        <h3 className="font-display text-xl text-ink-primary mb-2">{emptyMessage}</h3>
        <p className="text-ink-muted text-sm font-body">开始对话，创造你们的专属回忆</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} onDelete={onDelete} />
      ))}
    </div>
  );
}

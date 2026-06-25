import type { MembershipPlan } from '../data/mockData';
import { Check, Sparkles, Star } from 'lucide-react';

interface MembershipCardProps {
  plan: MembershipPlan;
}

export function MembershipCard({ plan }: MembershipCardProps) {
  return (
    <article
      className={`card-moon p-6 relative overflow-hidden transition-all duration-300 ${
        plan.isFeatured ? 'membership-featured' : ''
      }`}
      aria-label={`${plan.nameCn} 会员方案`}
    >
      {/* Featured badge */}
      {plan.isFeatured && (
        <div className="absolute top-0 right-5 px-3 py-1.5 rounded-b-xl bg-gradient-to-r from-amber-warm to-amber-400 text-moon-950 text-xs font-semibold flex items-center gap-1.5" aria-label="推荐方案">
          <Star size={12} className="fill-current" />
          <span>推荐</span>
        </div>
      )}

      {/* Header */}
      <header className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: plan.color }}
            aria-hidden="true"
          />
          <span className="font-display text-lg text-ink-primary">{plan.name}</span>
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-display text-4xl font-bold text-ink-primary">{plan.price}</span>
          <span className="text-ink-muted text-sm">/{plan.period}</span>
        </div>
      </header>

      {/* Features */}
      <ul className="space-y-4 mb-6" aria-label="会员权益">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: `${plan.color}20` }}
              aria-hidden="true"
            >
              <Check size={12} style={{ color: plan.color }} />
            </div>
            <span className="text-ink-secondary text-sm leading-relaxed font-body">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 btn-press ${
          plan.isFeatured
            ? 'bg-gradient-to-r from-amber-warm to-amber-400 text-moon-950 hover:shadow-warm'
            : 'bg-moon-900/60 text-ink-secondary hover:bg-moon-900/80 border border-amber-warm/10'
        }`}
        aria-label={plan.id === 'free' ? '当前方案' : `开通 ${plan.nameCn}`}
      >
        {plan.id === 'free' ? '当前方案' : `开通 ${plan.nameCn}`}
      </button>
    </article>
  );
}

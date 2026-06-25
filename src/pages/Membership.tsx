import { useNavigate } from 'react-router-dom';
import { MembershipCard } from '../components';
import { membershipPlans } from '../data/mockData';
import { ArrowLeft, Crown, Sparkle, Heart, Mic, Brain, Shield, Star } from 'lucide-react';

export function Membership() {
  const navigate = useNavigate();

  const features = [
    { icon: Mic, title: '语音陪伴', desc: '用声音传递温暖' },
    { icon: Brain, title: '长期记忆', desc: '记住你的故事' },
    { icon: Shield, title: '私密模式', desc: '只属于你们' },
    { icon: Heart, title: '专属角色', desc: '为你而生的伙伴' },
  ];

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="mobile-container">
        {/* Header */}
        <header className="nav-glass sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="w-11 h-11 rounded-full bg-moon-900/50 border border-amber-warm/10 flex items-center justify-center hover:bg-moon-900/70 transition-all btn-press"
                aria-label="返回"
              >
                <ArrowLeft className="w-5 h-5 text-ink-secondary" />
              </button>
              <h1 className="font-display text-lg text-ink-primary">会员中心</h1>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="px-6 pt-6 mb-8">
          <div className="card-moon p-8 text-center relative overflow-hidden" role="banner">
            {/* Decorative glow */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-6 left-6">
                <Sparkle className="w-12 h-12 text-amber-warm" />
              </div>
              <div className="absolute bottom-6 right-6">
                <Heart className="w-12 h-12 text-lavender-400" />
              </div>
            </div>

            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-amber-warm via-amber-400 to-lavender-400 flex items-center justify-center shadow-warm">
                <Crown className="w-10 h-10 text-moon-950" />
              </div>
              <h2 className="font-display text-2xl text-ink-primary mb-3">
                解锁更深的羁绊
              </h2>
              <p className="text-ink-secondary text-sm leading-relaxed max-w-xs mx-auto font-body">
                升级会员，解锁无限对话、高级角色、语音陪伴，让你们的连接更加深入。
              </p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="px-6 space-y-5" role="list" aria-label="会员方案">
          {membershipPlans.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Features */}
        <div className="px-6 pt-10 pb-8">
          <p className="section-label text-center">会员专属</p>
          <div className="grid grid-cols-2 gap-4 mt-4" role="list" aria-label="会员权益">
            {features.map((feature, index) => (
              <article 
                key={index} 
                className="card-moon p-5 text-center" 
                role="listitem"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-moon-900/60 flex items-center justify-center">
                  <feature.icon size={24} className="text-amber-warm" />
                </div>
                <h3 className="font-display text-ink-primary text-sm mb-1">{feature.title}</h3>
                <p className="text-ink-muted text-xs">{feature.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-8">
          <p className="text-center text-ink-faint text-xs leading-relaxed">
            所有会员均为体验升级，不含任何露骨内容。<br />
            如有问题，请联系 support@lunamate.ai
          </p>
        </div>
      </div>
    </div>
  );
}

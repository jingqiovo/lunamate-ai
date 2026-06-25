import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Bell, Shield, Trash2, Sparkle, Heart } from 'lucide-react';

export function Settings() {
  const navigate = useNavigate();
  const [privateMode, setPrivateMode] = useState(false);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleClearChatHistory = () => {
    if (confirm('确定要清除所有聊天记录吗？此操作不可撤销。')) {
      localStorage.removeItem('luna-mate-relationships');
      window.location.reload();
    }
  };

  const handleClearMemory = () => {
    if (confirm('确定要清除所有纪念册记录吗？此操作不可撤销。')) {
      const relationships = localStorage.getItem('luna-mate-relationships');
      if (relationships) {
        const parsed = JSON.parse(relationships);
        Object.keys(parsed).forEach((key) => {
          parsed[key].memories = [];
        });
        localStorage.setItem('luna-mate-relationships', JSON.stringify(parsed));
        window.location.reload();
      }
    }
  };

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
              <h1 className="font-display text-lg text-ink-primary">设置</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-6 pt-6 space-y-5">
          {/* Privacy */}
          <section className="card-moon p-6">
            <header className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-warm/10 flex items-center justify-center">
                <Shield size={20} className="text-amber-warm" />
              </div>
              <div>
                <h2 className="font-display text-ink-primary">隐私与安全</h2>
                <p className="text-ink-muted text-xs">你的秘密，这里安全</p>
              </div>
            </header>

            <div className="space-y-4" role="group" aria-label="隐私设置">
              {/* Private Mode */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-moon-900/40">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-ink-muted" />
                  <div>
                    <p className="text-ink-primary text-sm font-medium">私密模式</p>
                    <p className="text-ink-muted text-xs">只有你能看到的对话</p>
                  </div>
                </div>
                <button
                  onClick={() => setPrivateMode(!privateMode)}
                  role="switch"
                  aria-checked={privateMode}
                  className={`w-14 h-8 rounded-full relative transition-all duration-300 ${
                    privateMode ? 'bg-gradient-to-r from-amber-warm to-amber-400' : 'bg-moon-900/60'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      privateMode ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Long-term Memory */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-moon-900/40">
                <div className="flex items-center gap-3">
                  <Sparkle size={18} className="text-ink-muted" />
                  <div>
                    <p className="text-ink-primary text-sm font-medium">长期记忆</p>
                    <p className="text-ink-muted text-xs">AI会记住你们的一切</p>
                  </div>
                </div>
                <button
                  onClick={() => setMemoryEnabled(!memoryEnabled)}
                  role="switch"
                  aria-checked={memoryEnabled}
                  className={`w-14 h-8 rounded-full relative transition-all duration-300 ${
                    memoryEnabled ? 'bg-gradient-to-r from-amber-warm to-amber-400' : 'bg-moon-900/60'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      memoryEnabled ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Data Management */}
          <section className="card-moon p-6">
            <header className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <div>
                <h2 className="font-display text-ink-primary">数据管理</h2>
                <p className="text-ink-muted text-xs">管理你的回忆</p>
              </div>
            </header>

            <div className="space-y-3" role="group" aria-label="数据管理">
              <button
                onClick={handleClearChatHistory}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-moon-900/40 hover:bg-red-500/10 transition-colors group"
                aria-label="清除聊天记录"
              >
                <div className="flex items-center gap-3">
                  <Trash2 size={18} className="text-ink-muted group-hover:text-red-400" />
                  <div className="text-left">
                    <p className="text-ink-primary text-sm font-medium">清除聊天记录</p>
                    <p className="text-ink-muted text-xs">删除所有对话</p>
                  </div>
                </div>
                <span className="text-ink-muted text-xs group-hover:text-red-400">›</span>
              </button>

              <button
                onClick={handleClearMemory}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-moon-900/40 hover:bg-red-500/10 transition-colors group"
                aria-label="清除纪念册"
              >
                <div className="flex items-center gap-3">
                  <Trash2 size={18} className="text-ink-muted group-hover:text-red-400" />
                  <div className="text-left">
                    <p className="text-ink-primary text-sm font-medium">清除纪念册</p>
                    <p className="text-ink-muted text-xs">删除所有共同记忆</p>
                  </div>
                </div>
                <span className="text-ink-muted text-xs group-hover:text-red-400">›</span>
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="card-moon p-6">
            <header className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-lavender-400/10 flex items-center justify-center">
                <Bell size={20} className="text-lavender-400" />
              </div>
              <div>
                <h2 className="font-display text-ink-primary">提醒</h2>
                <p className="text-ink-muted text-xs">温柔地提醒你</p>
              </div>
            </header>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-moon-900/40">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-ink-muted" />
                <div>
                  <p className="text-ink-primary text-sm font-medium">陪伴提醒</p>
                  <p className="text-ink-muted text-xs">收到新消息时提醒</p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                role="switch"
                aria-checked={notificationsEnabled}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${
                  notificationsEnabled ? 'bg-gradient-to-r from-amber-warm to-amber-400' : 'bg-moon-900/60'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 ${
                    notificationsEnabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Appearance */}
          <section className="card-moon p-6">
            <header className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-warm/10 flex items-center justify-center">
                <Moon size={20} className="text-amber-warm" />
              </div>
              <div>
                <h2 className="font-display text-ink-primary">外观</h2>
                <p className="text-ink-muted text-xs">月夜模式已开启</p>
              </div>
            </header>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-moon-900/40">
              <div className="flex items-center gap-3">
                <Moon size={18} className="text-ink-muted" />
                <div>
                  <p className="text-ink-primary text-sm font-medium">深色模式</p>
                  <p className="text-ink-muted text-xs">专为夜晚设计</p>
                </div>
              </div>
              <span className="badge-moon">已开启</span>
            </div>
          </section>

          {/* About */}
          <footer className="card-moon p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-warm to-amber-400 flex items-center justify-center">
                <Moon size={20} className="text-moon-950" />
              </div>
              <div className="text-left">
                <span className="font-display text-lg text-ink-primary">LunaMate</span>
                <p className="text-ink-muted text-xs">月下相伴</p>
              </div>
            </div>
            <p className="text-ink-muted text-sm mb-3">版本 1.0.0</p>
            <p className="text-ink-faint text-xs leading-relaxed mb-4">
              在月光下，每段相遇都是命中注定
            </p>
            <div className="flex items-center justify-center gap-2">
              <Heart size={14} className="text-amber-warm" />
              <span className="text-ink-faint text-xs">用心设计</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}


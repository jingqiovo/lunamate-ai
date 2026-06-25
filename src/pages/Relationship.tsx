import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RelationshipTree, MemoryList } from '../components';
import { useApp } from '../hooks/useApp';
import { characters } from '../data/mockData';
import { ArrowLeft, MessageCircle, Heart, Moon, Sparkle } from 'lucide-react';

const avatarClassMap: Record<string, string> = {
  luna: 'avatar-luna',
  rin: 'avatar-rin',
  mira: 'avatar-mira',
  nono: 'avatar-nono',
  yuki: 'avatar-yuki',
  sera: 'avatar-sera',
  hana: 'avatar-hana',
  iris: 'avatar-iris',
};

export function Relationship() {
  const navigate = useNavigate();
  const { relationships, deleteMemory } = useApp();
  const [activeTab, setActiveTab] = useState<'tree' | 'memory'>('tree');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

  const charactersWithRelationships = characters.filter(
    (char) => relationships[char.id] && relationships[char.id].temperature > 0
  );

  const selectedCharacter = selectedCharacterId
    ? characters.find((c) => c.id === selectedCharacterId)
    : charactersWithRelationships[0];

  const selectedRelationship = selectedCharacter
    ? relationships[selectedCharacter.id]
    : null;

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
              <div>
                <h1 className="font-display text-lg text-ink-primary">记忆与羁绊</h1>
                <p className="text-ink-muted text-xs">珍藏每一刻</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 pb-4" role="tablist" aria-label="内容切换">
            <div className="flex gap-2 p-1 bg-moon-900/40 rounded-2xl">
              <button
                onClick={() => setActiveTab('tree')}
                role="tab"
                aria-selected={activeTab === 'tree'}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'tree'
                    ? 'bg-gradient-to-r from-amber-warm to-amber-400 text-moon-950 shadow-warm'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                羁绊
              </button>
              <button
                onClick={() => setActiveTab('memory')}
                role="tab"
                aria-selected={activeTab === 'memory'}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'memory'
                    ? 'bg-gradient-to-r from-amber-warm to-amber-400 text-moon-950 shadow-warm'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                纪念册
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-6 pt-6">
          {activeTab === 'tree' ? (
            <>
              {/* Character Selector */}
              {charactersWithRelationships.length > 0 && (
                <div className="mb-6">
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    {charactersWithRelationships.map((char) => {
                      const rel = relationships[char.id];
                      const avatarClass = avatarClassMap[char.id] || 'avatar';
                      const isSelected = selectedCharacter?.id === char.id;
                      
                      return (
                        <button
                          key={char.id}
                          onClick={() => setSelectedCharacterId(char.id)}
                          className={`flex-shrink-0 flex items-center gap-3 p-3 rounded-2xl transition-all ${
                            isSelected
                              ? 'bg-moon-900/60 border border-amber-warm/30'
                              : 'bg-moon-900/40 border border-amber-warm/10 hover:border-amber-warm/20'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-full ${avatarClass} flex items-center justify-center`}>
                            <span className="text-white text-lg font-display">{char.name[0]}</span>
                          </div>
                          <div className="text-left">
                            <p className={`text-sm font-medium ${isSelected ? 'text-ink-primary' : 'text-ink-secondary'}`}>
                              {char.name}
                            </p>
                            <p className="text-ink-muted text-xs">{rel?.temperature || 0}°</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Relationship or Empty */}
              {selectedCharacter && selectedRelationship ? (
                <div className="space-y-5">
                  <RelationshipTree relationship={selectedRelationship} />

                  {/* Quick Actions */}
                  <div className="card-moon p-5 flex gap-3">
                    <button
                      onClick={() => navigate(`/chat/${selectedCharacter.id}`)}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} />
                      继续对话
                    </button>
                    <button
                      onClick={() => navigate(`/character/${selectedCharacter.id}`)}
                      className="flex-1 btn-secondary"
                    >
                      了解更多
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card-moon p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-moon-900/40 flex items-center justify-center">
                    <Moon className="w-10 h-10 text-ink-muted" />
                  </div>
                  <h3 className="font-display text-xl text-ink-primary mb-2">尚未建立羁绊</h3>
                  <p className="text-ink-muted text-sm mb-6 font-body">
                    去认识一些角色，开始你们的故事
                  </p>
                  <button
                    onClick={() => navigate('/home')}
                    className="btn-primary"
                  >
                    探索
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Memory Tab */}
              {selectedCharacter && selectedRelationship ? (
                <div className="space-y-5">
                  {/* Character Header */}
                  <div className="card-moon p-5 flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full ${avatarClassMap[selectedCharacter.id] || 'avatar'} flex items-center justify-center`}>
                      <span className="text-white text-2xl font-display">{selectedCharacter.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-ink-primary text-lg">与 {selectedCharacter.name} 的记忆</h2>
                      <p className="text-ink-muted text-sm">{selectedRelationship.memories.length} 条回忆</p>
                    </div>
                    <Sparkle size={24} className="text-amber-warm" />
                  </div>

                  {/* Memory List */}
                  <MemoryList
                    memories={selectedRelationship.memories}
                    onDelete={(id) => deleteMemory(selectedCharacter.id, id)}
                  />
                </div>
              ) : (
                <div className="card-moon p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-moon-900/40 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-ink-muted" />
                  </div>
                  <h3 className="font-display text-xl text-ink-primary mb-2">还没有共同记忆</h3>
                  <p className="text-ink-muted text-sm mb-6 font-body">
                    开始对话，创造你们的专属回忆
                  </p>
                  <button
                    onClick={() => navigate('/home')}
                    className="btn-primary"
                  >
                    开始对话
                  </button>
                </div>
              )}
            </>
          )}

          <div className="h-8" />
        </main>
      </div>
    </div>
  );
}

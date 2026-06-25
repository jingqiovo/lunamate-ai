import { useState, useCallback, createContext, useContext, type ReactNode } from 'react';
import type { Character, UserPreferences, Relationship, Memory, ChatMessage } from '../data/mockData';
import { characters, defaultUserPreferences, initialRelationships, aiResponses } from '../data/mockData';

// ==================== User Preferences Hook ====================
export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('luna-mate-preferences');
    return saved ? JSON.parse(saved) : defaultUserPreferences;
  });

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, ...updates };
      localStorage.setItem('luna-mate-preferences', JSON.stringify(newPrefs));
      return newPrefs;
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    updatePreferences({ hasCompletedOnboarding: true });
  }, [updatePreferences]);

  return { preferences, updatePreferences, completeOnboarding };
}

// ==================== Relationships Hook ====================
export function useRelationships() {
  const [relationships, setRelationships] = useState<Record<string, Relationship>>(() => {
    const saved = localStorage.getItem('luna-mate-relationships');
    return saved ? JSON.parse(saved) : initialRelationships;
  });

  const updateRelationship = useCallback((characterId: string, updates: Partial<Relationship>) => {
    setRelationships(prev => {
      const newRelationships = {
        ...prev,
        [characterId]: {
          ...prev[characterId],
          ...updates,
        },
      };
      localStorage.setItem('luna-mate-relationships', JSON.stringify(newRelationships));
      return newRelationships;
    });
  }, []);

  const addMemory = useCallback((characterId: string, memory: Omit<Memory, 'id'>) => {
    setRelationships(prev => {
      const newMemory: Memory = {
        ...memory,
        id: `mem-${Date.now()}`,
      };
      const charRelationship = prev[characterId];
      const newRelationships = {
        ...prev,
        [characterId]: {
          ...charRelationship,
          memories: [...charRelationship.memories, newMemory],
        },
      };
      localStorage.setItem('luna-mate-relationships', JSON.stringify(newRelationships));
      return newRelationships;
    });
  }, []);

  const deleteMemory = useCallback((characterId: string, memoryId: string) => {
    setRelationships(prev => {
      const charRelationship = prev[characterId];
      const newRelationships = {
        ...prev,
        [characterId]: {
          ...charRelationship,
          memories: charRelationship.memories.filter(m => m.id !== memoryId),
        },
      };
      localStorage.setItem('luna-mate-relationships', JSON.stringify(newRelationships));
      return newRelationships;
    });
  }, []);

  const increaseTemperature = useCallback((characterId: string, amount: number = 5) => {
    setRelationships(prev => {
      const charRelationship = prev[characterId];
      const newTemp = Math.min(charRelationship.temperature + amount, 100);
      const newRelationships = {
        ...prev,
        [characterId]: {
          ...charRelationship,
          temperature: newTemp,
          totalChats: charRelationship.totalChats + 1,
          lastChatTime: Date.now(),
        },
      };
      localStorage.setItem('luna-mate-relationships', JSON.stringify(newRelationships));
      return newRelationships;
    });
  }, []);

  return { relationships, updateRelationship, addMemory, deleteMemory, increaseTemperature };
}

// ==================== Chat Hook ====================
export function useChat(characterId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`luna-mate-chat-${characterId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((role: 'user' | 'ai', content: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      role,
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => {
      const newMessages = [...prev, newMessage];
      localStorage.setItem(`luna-mate-chat-${characterId}`, JSON.stringify(newMessages));
      return newMessages;
    });
    return newMessage;
  }, [characterId]);

  const simulateAIResponse = useCallback((): Promise<string> => {
    return new Promise(resolve => {
      setIsTyping(true);
      
      // 随机选择回复类别
      const responseCategories = ['casual', 'supportive', 'romantic'];
      const category = responseCategories[Math.floor(Math.random() * responseCategories.length)];
      const responses = aiResponses[category] || aiResponses.casual;
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      // 模拟打字延迟
      const delay = 1000 + Math.random() * 1500;
      setTimeout(() => {
        setIsTyping(false);
        resolve(response);
      }, delay);
    });
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(`luna-mate-chat-${characterId}`);
  }, [characterId]);

  return { messages, isTyping, addMessage, simulateAIResponse, clearChat, setMessages };
}

// ==================== Context Providers ====================
interface AppContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;
  relationships: Record<string, Relationship>;
  updateRelationship: (characterId: string, updates: Partial<Relationship>) => void;
  addMemory: (characterId: string, memory: Omit<Memory, 'id'>) => void;
  deleteMemory: (characterId: string, memoryId: string) => void;
  increaseTemperature: (characterId: string, amount?: number) => void;
  getCharacterById: (id: string) => Character | undefined;
  getRelationship: (characterId: string) => Relationship;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { preferences, updatePreferences, completeOnboarding } = useUserPreferences();
  const { relationships, updateRelationship, addMemory, deleteMemory, increaseTemperature } = useRelationships();

  const getCharacterById = useCallback((id: string) => {
    return characters.find(c => c.id === id);
  }, []);

  const getRelationship = useCallback((characterId: string) => {
    return relationships[characterId] || initialRelationships[characterId];
  }, [relationships]);

  return (
    <AppContext.Provider
      value={{
        preferences,
        updatePreferences,
        completeOnboarding,
        relationships,
        updateRelationship,
        addMemory,
        deleteMemory,
        increaseTemperature,
        getCharacterById,
        getRelationship,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

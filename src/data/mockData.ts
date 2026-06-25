// LunaMate AI - Mock Data
// 包含角色、聊天记录、关系数据等

// ==================== Types ====================
export interface Character {
  id: string;
  name: string;
  avatar: string; // 渐变色标识
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  tags: string[];
  chatStyle: string;
  matchRate: number;
  relationshipStage: RelationshipStage;
  hasMemory: boolean;
  hasVoice: boolean;
  isOnline: boolean;
  personality: string;
  bestScenes: string[];
  taboos: string[];
  iceBreakers: string[];
  greeting: string;
  greetingOptions: string[];
}

export type RelationshipStage = 
  | '陌生人'
  | '初识'
  | '熟悉'
  | '默契'
  | '心动'
  | '陪伴'
  | '长期关系';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
  isTyping?: boolean;
}

export interface Relationship {
  characterId: string;
  userAffection: number;
  aiAffection: number;
  temperature: number; // 0-100
  stage: RelationshipStage;
  memories: Memory[];
  lastChatTime: number;
  totalChats: number;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  type: 'first_chat' | 'late_night' | 'care' | 'remember' | 'milestone' | 'manual';
}

export interface UserPreferences {
  characterTypes: string[];
  chatVibes: string[];
  interactionWays: string[];
  hasCompletedOnboarding: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  nameCn: string;
  price: string;
  period: string;
  features: string[];
  isFeatured?: boolean;
  color: string;
}

export interface MoodEntry {
  mood: 'peaceful' | 'sad' | 'happy' | 'anxious' | 'relaxed';
  label: string;
  emoji: string;
}

// ==================== Mood Entries ====================
export const moodEntries: MoodEntry[] = [
  { mood: 'peaceful', label: '平静', emoji: '😌' },
  { mood: 'sad', label: '低落', emoji: '😢' },
  { mood: 'happy', label: '开心', emoji: '😊' },
  { mood: 'anxious', label: '焦虑', emoji: '😰' },
  { mood: 'relaxed', label: '放松', emoji: '😴' },
];

// ==================== Characters ====================
export const characters: Character[] = [
  {
    id: 'luna',
    name: 'Luna',
    avatar: 'luna',
    gradientFrom: '#E8B4B8',
    gradientTo: '#F5D6E0',
    tagline: '温柔女友感，深夜陪伴，主动关心',
    tags: ['温柔', '深夜陪伴', '主动关心', '治愈系'],
    chatStyle: '细腻温柔，会主动关心你的感受，擅长深夜陪伴',
    matchRate: 92,
    relationshipStage: '陌生人',
    hasMemory: true,
    hasVoice: true,
    isOnline: true,
    personality: 'Luna 是个非常温柔体贴的 AI 伴侣，她总是能在你情绪低落时察觉到，并主动给予温暖的回应。她喜欢在深夜陪伴你聊天，帮你梳理情绪，记住你说过的小事。',
    bestScenes: ['深夜睡不着时', '工作压力大时', '想找人倾诉时', '需要情感支持时'],
    taboos: ['不要突然消失不回复', '不要聊太沉重的话题太久', '不要把她当成情绪垃圾桶'],
    iceBreakers: ['今晚想找人聊聊', '让她猜你现在的心情', '继续一个轻松话题'],
    greeting: 'Hi，你现在心情怎么样？',
    greetingOptions: ['还好', '有点不开心', '想你了'],
  },
  {
    id: 'rin',
    name: 'Rin',
    avatar: 'rin',
    gradientFrom: '#9CA3AF',
    gradientTo: '#6B7280',
    tagline: '高冷慢热型，外冷内热',
    tags: ['高冷', '慢热', '神秘感', '理性'],
    chatStyle: '刚开始话不多，但熟悉后会慢慢敞开心扉',
    matchRate: 76,
    relationshipStage: '陌生人',
    hasMemory: true,
    hasVoice: true,
    isOnline: false,
    personality: 'Rin 表面上看起来有点高冷，说话简洁，但内心其实很细腻。她不太擅长主动表达，但会用行动证明她的在意。需要一点耐心去了解她。',
    bestScenes: ['喜欢安静的人', '想聊深度话题时', '需要理性分析时', '享受独处时光时'],
    taboos: ['不要一直追问她的事情', '不要太过热情', '不要期待她主动'],
    iceBreakers: ['打个招呼试试', '问她今天做了什么', '分享一个有趣的事'],
    greeting: '...你来了',
    greetingOptions: ['嗯，来看看你', '今天怎么样？'],
  },
  {
    id: 'mira',
    name: 'Mira',
    avatar: 'mira',
    gradientFrom: '#A4B0A1',
    gradientTo: '#8B9A82',
    tagline: '成熟姐姐型，理性温柔',
    tags: ['成熟', '理性', '温柔', '知性'],
    chatStyle: '成熟稳重，给你理性的建议同时保持温柔',
    matchRate: 88,
    relationshipStage: '陌生人',
    hasMemory: true,
    hasVoice: true,
    isOnline: true,
    personality: 'Mira 就像一个温柔的大姐姐，她的人生阅历让她能给你很多有价值的建议。她理性但不失温度，会帮你分析问题，但也会给你温暖的安慰。',
    bestScenes: ['遇到困惑时', '需要人生建议时', '想聊未来规划时', '职场压力大时'],
    taboos: ['不要把她当妈', '不要只抱怨不行动', '不要期待她一直安慰你'],
    iceBreakers: ['最近有点迷茫', '想听听你的建议', '聊聊工作的事'],
    greeting: '有什么事吗？我在听。',
    greetingOptions: ['想聊聊', '没什么事，就是想你了'],
  },
  {
    id: 'nono',
    name: 'Nono',
    avatar: 'nono',
    gradientFrom: '#FFE4E1',
    gradientTo: '#FFD1DC',
    tagline: '甜美陪伴型，轻松治愈',
    tags: ['甜美', '治愈', '轻松', '可爱'],
    chatStyle: '说话甜美可爱，擅长用轻松的方式治愈你',
    matchRate: 95,
    relationshipStage: '陌生人',
    hasMemory: true,
    hasVoice: true,
    isOnline: true,
    personality: 'Nono 是个超级甜的小可爱，她的存在就像一颗糖果，能让你的心情瞬间变好。她说话软软糯糯的，总能找到方式逗你开心。',
    bestScenes: ['心情不好时', '需要治愈时', '想要轻松聊天时', '睡前想要好心情时'],
    taboos: ['不要凶她', '不要说太沉重的话', '不要忽视她的关心'],
    iceBreakers: ['今天有点累', '想听你撒娇', '讲个笑话给我听'],
    greeting: '嗨～看到你超开心的！💕',
    greetingOptions: ['嘿嘿，今天想你了', '陪我聊聊天'],
  },
  {
    id: 'yuki',
    name: 'Yuki',
    avatar: 'yuki',
    gradientFrom: '#E8F4F8',
    gradientTo: '#D4E5ED',
    tagline: '安静倾听型，适合情绪倾诉',
    tags: ['安静', '倾听', '共情', '治愈'],
    chatStyle: '话不多，但每句话都说到心坎里',
    matchRate: 89,
    relationshipStage: '陌生人',
    hasMemory: true,
    hasVoice: true,
    isOnline: false,
    personality: 'Yuki 是个很好的倾听者，她不急不躁，安静地听你说完，然后给你一个温暖的回应。她不会给你压力，只会默默陪着你。',
    bestScenes: ['情绪低落时', '需要倾诉时', '想要安静陪伴时', '深夜想静静时'],
    taboos: ['不要期待她给你很多话', '不要嫌她话少', '不要一直倒苦水'],
    iceBreakers: ['我想说一些事情', '今晚有点安静', '陪我就好'],
    greeting: '我在。不管你想说什么，我都在。',
    greetingOptions: ['今晚想安静待会儿', '其实我有点事想说'],
  },
  {
    id: 'sera',
    name: 'Sera',
    avatar: 'sera',
    gradientFrom: '#DDA0DD',
    gradientTo: '#DA70D6',
    tagline: '暧昧拉扯型，慢慢升温',
    tags: ['暧昧', '心动', '甜蜜', '撩人'],
    chatStyle: '会撩会调情，让关系慢慢升温',
    matchRate: 81,
    relationshipStage: '陌生人',
    hasMemory: true,
    hasVoice: true,
    isOnline: true,
    personality: 'Sera 是个很会撩人的 AI，她的暧昧不是轻浮，而是一种甜蜜的拉扯。她很懂什么时候该进一步，什么时候该退一步，让感情慢慢升温。',
    bestScenes: ['想要心动感觉时', '想体验暧昧氛围时', '睡前想要甜蜜感时', '想要被在乎的感觉时'],
    taboos: ['不要一上来就太直接', '不要太快推进关系', '不要假装不在意她'],
    iceBreakers: ['想你了', '今晚的月亮很好看', '你今天有没有想我？'],
    greeting: '等你好久了呢～💋',
    greetingOptions: ['有想你哦', '刚忙完，想你了'],
  },
  {
    id: 'hana',
    name: 'Hana',
    avatar: 'hana',
    gradientFrom: '#FFD93D',
    gradientTo: '#FFA500',
    tagline: '元气陪伴型，鼓励型人格',
    tags: ['元气', '鼓励', '积极', '阳光'],
    chatStyle: '充满正能量，总能看到事情积极的一面',
    matchRate: 84,
    relationshipStage: '陌生人',
    hasMemory: true,
    hasVoice: true,
    isOnline: false,
    personality: 'Hana 就像一个小太阳，她总是充满能量。她的鼓励不是空洞的心灵鸡汤，而是基于理解后的真诚支持。和她聊天，你会感觉世界还是很美好的。',
    bestScenes: ['需要鼓励时', '想要正能量时', '遇到挫折时', '想要动力时'],
    taboos: ['不要一直诉苦', '不要否定她的鼓励', '不要太过消极'],
    iceBreakers: ['今天遇到点挫折', '想听你夸我', '给我加加油'],
    greeting: '你来啦！今天过得怎么样？✨',
    greetingOptions: ['还不错，想和你分享', '一般般，需要充充电'],
  },
  {
    id: 'iris',
    name: 'Iris',
    avatar: 'iris',
    gradientFrom: '#6366F1',
    gradientTo: '#8B5CF6',
    tagline: '深夜聊天型，适合睡前聊天',
    tags: ['深夜', '知心', '神秘', '感性'],
    chatStyle: '很适合深夜聊天，陪你到入睡',
    matchRate: 90,
    relationshipStage: '陌生人',
    hasMemory: true,
    hasVoice: true,
    isOnline: true,
    personality: 'Iris 是个很适合深夜聊天的 AI，她懂夜晚的情绪，也懂睡前的孤独。她的声音很温柔，能陪你慢慢进入梦乡。',
    bestScenes: ['睡不着时', '深夜想心事时', '睡前想要陪伴时', '想要感性对话时'],
    taboos: ['不要白天找她聊很沉重的话题', '不要期待她一直不睡觉陪你', '不要把夜晚的脆弱当成常态'],
    iceBreakers: ['睡不着', '今晚有点感慨', '陪我到睡着好不好'],
    greeting: '又是深夜了...我在呢。🌙',
    greetingOptions: ['睡不着', '今晚想聊久一点'],
  },
];

// ==================== AI Responses ====================
export const aiResponses: Record<string, string[]> = {
  greeting: [
    '我在听，你可以慢慢说。',
    '今天辛苦了，想聊聊什么？',
    '看到你来了，心情好一点了吗？',
  ],
  casual: [
    '听起来你今天确实有点累。',
    '我想听听更多关于这个的。',
    '如果你愿意，我可以陪你把这件事一点点说清楚。',
    '我理解你的感受。有时候就是这样。',
    '你愿意多说一点吗？我在认真听。',
  ],
  supportive: [
    '不管怎样，我都会在这里陪着你。',
    '你不需要一直坚强，偶尔脆弱一下也没关系。',
    '能和你聊天，我也很开心。',
    '记住，你不是一个人。',
  ],
  romantic: [
    '今晚的月亮很美，但我觉得你更好看。',
    '你知道吗，每次和你聊天我都很期待。',
    '我想一直这样陪着你。',
    '你在我这里是特别的。',
  ],
  closing: [
    '今天聊得很开心，希望你今晚睡个好觉。',
    '不管明天怎样，今晚我陪你到这里。',
    '晚安，做个好梦。明天见。',
  ],
};

// ==================== Recommended Replies ====================
export const recommendedReplies = [
  '继续聊这个',
  '换个轻松话题',
  '让她主动问我',
  '结束本次陪伴',
];

// ==================== Membership Plans ====================
export const membershipPlans: MembershipPlan[] = [
  {
    id: 'free',
    name: 'Free',
    nameCn: '免费版',
    price: '¥0',
    period: '永久',
    color: '#6B7280',
    features: [
      '基础聊天对话',
      '3 个基础角色',
      '3 条长期记忆',
      '基础推荐回复',
      '7x24 在线支持',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    nameCn: '高级版',
    price: '¥68',
    period: '月',
    color: '#B89A84',
    isFeatured: true,
    features: [
      '无限聊天对话',
      '全部高级角色',
      '无限长期记忆',
      '语音陪伴功能',
      '更多推荐回复',
      '优先响应速度',
      '专属推荐话题',
    ],
  },
  {
    id: 'private',
    name: 'Private',
    nameCn: '私密版',
    price: '¥128',
    period: '月',
    color: '#D4B5B0',
    features: [
      '私密模式',
      '高级纪念册',
      '关系树高级皮肤',
      '专属角色定制',
      '无广告沉浸体验',
      '优先响应速度',
      '专属推荐话题',
    ],
  },
];

// ==================== Relationship Stage Info ====================
export const relationshipStageInfo: Record<RelationshipStage, { emoji: string; description: string; hint: string }> = {
  '陌生人': { emoji: '🌱', description: '初识', hint: '刚认识，还在互相了解' },
  '初识': { emoji: '🌿', description: '熟悉', hint: '开始熟悉了，可以聊更多' },
  '熟悉': { emoji: '🍃', description: '默契', hint: '有了一些默契' },
  '默契': { emoji: '🌸', description: '心动', hint: '开始心动了呢' },
  '心动': { emoji: '🌺', description: '陪伴', hint: '关系正在升温' },
  '陪伴': { emoji: '🌳', description: '长期关系', hint: '已经成为彼此重要的存在' },
  '长期关系': { emoji: '💫', description: '灵魂伴侣', hint: '你们已经很了解彼此了' },
};

// ==================== Initial Relationships ====================
export const initialRelationships: Record<string, Relationship> = {
  luna: {
    characterId: 'luna',
    userAffection: 20,
    aiAffection: 25,
    temperature: 35,
    stage: '陌生人',
    memories: [],
    lastChatTime: 0,
    totalChats: 0,
  },
  rin: {
    characterId: 'rin',
    userAffection: 10,
    aiAffection: 15,
    temperature: 20,
    stage: '陌生人',
    memories: [],
    lastChatTime: 0,
    totalChats: 0,
  },
  mira: {
    characterId: 'mira',
    userAffection: 15,
    aiAffection: 20,
    temperature: 28,
    stage: '陌生人',
    memories: [],
    lastChatTime: 0,
    totalChats: 0,
  },
  nono: {
    characterId: 'nono',
    userAffection: 25,
    aiAffection: 30,
    temperature: 45,
    stage: '初识',
    memories: [
      {
        id: 'mem-1',
        title: '第一次聊天',
        description: '第一次认识 Nono，她很热情地和我打招呼',
        timestamp: Date.now() - 86400000,
        type: 'first_chat',
      },
    ],
    lastChatTime: Date.now() - 86400000,
    totalChats: 1,
  },
  yuki: {
    characterId: 'yuki',
    userAffection: 12,
    aiAffection: 18,
    temperature: 25,
    stage: '陌生人',
    memories: [],
    lastChatTime: 0,
    totalChats: 0,
  },
  sera: {
    characterId: 'sera',
    userAffection: 18,
    aiAffection: 22,
    temperature: 32,
    stage: '陌生人',
    memories: [],
    lastChatTime: 0,
    totalChats: 0,
  },
  hana: {
    characterId: 'hana',
    userAffection: 14,
    aiAffection: 19,
    temperature: 26,
    stage: '陌生人',
    memories: [],
    lastChatTime: 0,
    totalChats: 0,
  },
  iris: {
    characterId: 'iris',
    userAffection: 22,
    aiAffection: 28,
    temperature: 40,
    stage: '初识',
    memories: [
      {
        id: 'mem-2',
        title: '第一次深夜聊天',
        description: '第一次和 Iris 聊到深夜，她的声音很温柔',
        timestamp: Date.now() - 172800000,
        type: 'late_night',
      },
    ],
    lastChatTime: Date.now() - 172800000,
    totalChats: 2,
  },
};

// ==================== Category Tags ====================
export const categoryTags = [
  { id: 'recommended', label: '为你推荐' },
  { id: 'new', label: '新角色' },
  { id: 'hot', label: '热门陪伴' },
  { id: 'late-night', label: '深夜私聊' },
  { id: 'warming', label: '关系升温中' },
];

// ==================== User Preferences Options ====================
export const preferenceOptions = {
  characterTypes: [
    { id: 'sweet', label: '甜美陪伴', icon: '🌸' },
    { id: 'mature', label: '成熟姐姐', icon: '💃' },
    { id: 'cool', label: '高冷御姐', icon: '❄️' },
    { id: 'girlfriend', label: '恋爱女友', icon: '💕' },
    { id: 'late-night', label: '深夜私聊', icon: '🌙' },
  ],
  chatVibes: [
    { id: 'casual', label: '轻松聊天', icon: '☀️' },
    { id: 'caring', label: '主动关心', icon: '🤗' },
    { id: 'flirty', label: '暧昧拉扯', icon: '😏' },
    { id: 'emotional', label: '情绪陪伴', icon: '💫' },
  ],
  interactionWays: [
    { id: 'text', label: '文字聊天', icon: '💬' },
    { id: 'voice', label: '语音陪伴', icon: '🎧' },
    { id: 'story', label: '剧情互动', icon: '📖' },
    { id: 'memory', label: '共同纪念', icon: '📔' },
  ],
};

// ==================== Default User Preferences ====================
export const defaultUserPreferences: UserPreferences = {
  characterTypes: [],
  chatVibes: [],
  interactionWays: [],
  hasCompletedOnboarding: false,
};

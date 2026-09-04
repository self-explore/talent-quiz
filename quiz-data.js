// 十大天赋维度定义
const DIMENSIONS = [
  { id: 'self_awareness', name: '自我觉察天赋', icon: '🪞', desc: '自我认知与情绪管理' },
  { id: 'interpersonal', name: '人际理解天赋', icon: '👥', desc: '人际交往与共情能力' },
  { id: 'creativity', name: '创新创造天赋', icon: '🧩', desc: '创新思维与突破常规' },
  { id: 'aesthetic', name: '审美设计天赋', icon: '🖼️', desc: '审美感知与艺术表达' },
  { id: 'logical', name: '逻辑分析天赋', icon: '', desc: '数学计算与逻辑推理' },
  { id: 'naturalist', name: '自然观察天赋', icon: '', desc: '自然观察与生态理解' },
  { id: 'bodily', name: '身体操作天赋', icon: '🤸', desc: '身体协调与运动技能' },
  { id: 'musical', name: '音乐感知天赋', icon: '🎼', desc: '节奏感知与音乐表达' },
  { id: 'spatial', name: '空间想象天赋', icon: '🧭', desc: '空间想象与方向感知' },
  { id: 'linguistic', name: '语言表达天赋', icon: '📖', desc: '语言表达与文字驾驭' }
];

// 天赋类型定义
const TALENT_TYPES = [
  {
    id: 'creative_communicator',
    name: '沟通创意型',
    dimensions: ['linguistic', 'interpersonal', 'creativity'],
    desc: '天生的沟通者和创意人，善于用语言打动他人，在营销、公关、内容创作领域大放异彩。',
    careers: ['市场营销经理', '公关专员', '内容创作者', '广告策划', '品牌顾问', '自媒体运营', '演讲培训师', '用户体验研究员'],
    advice: '你的语言和人际能力是你的核心优势。建议多参与团队协作项目，培养创意表达技巧，可以尝试写作、演讲或视频创作来放大你的影响力。'
  },
  {
    id: 'logical_innovator',
    name: '逻辑创新型',
    dimensions: ['logical', 'spatial', 'creativity'],
    desc: '解决复杂问题的高手，擅长逻辑分析和空间想象，是工程师、架构师、产品经理的料。',
    careers: ['软件工程师', '数据分析师', '产品经理', '系统架构师', '算法工程师', '金融分析师', '科研工作者', '咨询顾问'],
    advice: '你的逻辑思维和创新能力是稀缺资源。建议深入学习编程或数据分析技能，参与开源项目或技术竞赛，将你的分析能力转化为实际产品。'
  },
  {
    id: 'artistic_performer',
    name: '艺术表现型',
    dimensions: ['bodily', 'musical', 'aesthetic'],
    desc: '舞台的焦点，在身体协调、音乐感知和美学创造方面天赋异禀，适合艺术、设计、表演。',
    careers: ['平面设计师', 'UI/UX设计师', '音乐制作人', '舞蹈编导', '摄影师', '影视导演', '室内设计师', '时尚设计师'],
    advice: '你的艺术感知力是你的独特优势。建议持续打磨专业技能，建立作品集，参加展览或演出，在社交媒体上展示你的创作。'
  },
  {
    id: 'nature_explorer',
    name: '自然探索型',
    dimensions: ['naturalist', 'spatial', 'bodily'],
    desc: '对自然环境有敏锐感知，善于观察和探索，适合户外、生态、地理相关领域。',
    careers: ['生态学家', '地理信息分析师', '户外探险教练', '农业科学家', '环境工程师', '野生动物保护员', '园艺设计师', '气象学家'],
    advice: '你对自然的敏感度是宝贵的天赋。建议多参与户外活动和环保项目，学习GIS或生态学知识，将你的观察力转化为专业竞争力。'
  },
  {
    id: 'self_master',
    name: '自我大师型',
    dimensions: ['self_awareness', 'interpersonal', 'linguistic'],
    desc: '深度了解自己也能理解他人，善于表达和沟通，适合心理咨询、教育、管理领域。',
    careers: ['心理咨询师', '人力资源经理', '教育工作者', '团队教练', '生涯规划师', '社会工作者', '企业培训师', '领导力顾问'],
    advice: '你的自我觉察和人际理解能力让你成为优秀的引导者。建议系统学习心理学或管理学知识，考取相关资质，在实践中不断提升辅导技巧。'
  },
  {
    id: 'balanced_generalist',
    name: '均衡全能型',
    dimensions: [],
    desc: '各项能力发展均衡，没有明显短板，适应性强，能在多种领域中找到自己的位置。',
    careers: ['项目经理', '综合管理岗', '创业者', '全栈工程师', '运营经理', '跨领域顾问', '产品经理', '自由职业者'],
    advice: '你的均衡能力让你有很强的适应性。建议找到自己最感兴趣的1-2个方向深入发展，同时保持广泛的知识面，这会让你成为优秀的跨界人才。'
  }
];

// 50道测试题目（每个维度5题）
const QUESTIONS = [
  // 自我觉察天赋 (5题)
  { id: 1, dimension: 'self_awareness', text: '我能够准确识别自己的情绪变化，并理解情绪背后的原因。' },
  { id: 2, dimension: 'self_awareness', text: '我经常反思自己的行为和决策，从中总结经验教训。' },
  { id: 3, dimension: 'self_awareness', text: '我清楚自己的优点和不足，能够客观地评价自己。' },
  { id: 4, dimension: 'self_awareness', text: '面对压力时，我能快速调整心态，保持冷静和理性。' },
  { id: 5, dimension: 'self_awareness', text: '我有明确的个人目标和价值观，并以此指导自己的行动。' },

  // 人际理解天赋 (5题)
  { id: 6, dimension: 'interpersonal', text: '我能敏锐地察觉他人的情绪变化，即使对方没有明确表达。' },
  { id: 7, dimension: 'interpersonal', text: '在团队中，我通常是那个协调矛盾、促进合作的人。' },
  { id: 8, dimension: 'interpersonal', text: '朋友经常向我倾诉烦恼，因为我善于倾听和理解他人。' },
  { id: 9, dimension: 'interpersonal', text: '我能够站在别人的角度思考问题，理解不同的观点和立场。' },
  { id: 10, dimension: 'interpersonal', text: '我擅长建立和维护人际关系，社交圈比较广泛。' },

  // 创新创造天赋 (5题)
  { id: 11, dimension: 'creativity', text: '我经常能想到别人想不到的解决方案或创意点子。' },
  { id: 12, dimension: 'creativity', text: '我喜欢尝试新方法，不满足于按部就班地做事。' },
  { id: 13, dimension: 'creativity', text: '面对问题时，我习惯从多个角度思考，寻找创新突破点。' },
  { id: 14, dimension: 'creativity', text: '我经常有"灵光一闪"的时刻，突然想到好的创意或灵感。' },
  { id: 15, dimension: 'creativity', text: '我喜欢把不同领域的知识结合起来，产生新的想法。' },

  // 审美设计天赋 (5题)
  { id: 16, dimension: 'aesthetic', text: '我对色彩、构图和美感有敏锐的感知力。' },
  { id: 17, dimension: 'aesthetic', text: '我注重生活中的美学细节，比如穿搭、家居布置等。' },
  { id: 18, dimension: 'aesthetic', text: '我能够欣赏不同类型的艺术形式，如绘画、摄影、电影等。' },
  { id: 19, dimension: 'aesthetic', text: '我在设计或创作时，对视觉效果的把控比较到位。' },
  { id: 20, dimension: 'aesthetic', text: '我能感受到环境中美的元素，并从中获得灵感和愉悦。' },

  // 逻辑分析天赋 (5题)
  { id: 21, dimension: 'logical', text: '我擅长分析复杂问题，能够理清因果关系和逻辑链条。' },
  { id: 22, dimension: 'logical', text: '我对数字和数据分析比较敏感，喜欢用数据支撑判断。' },
  { id: 23, dimension: 'logical', text: '面对决策时，我会系统地列出利弊，理性分析后做出选择。' },
  { id: 24, dimension: 'logical', text: '我喜欢解决逻辑谜题、数学问题或策略类游戏。' },
  { id: 25, dimension: 'logical', text: '我能够快速发现事物中的规律和模式，并加以运用。' },

  // 自然观察天赋 (5题)
  { id: 26, dimension: 'naturalist', text: '我对动植物和自然环境有浓厚的兴趣和观察力。' },
  { id: 27, dimension: 'naturalist', text: '我能够注意到季节变化、天气模式等自然现象的细微差异。' },
  { id: 28, dimension: 'naturalist', text: '我喜欢户外活动，在自然环境中感到放松和充满能量。' },
  { id: 29, dimension: 'naturalist', text: '我关注环保和可持续发展议题，愿意为生态保护贡献力量。' },
  { id: 30, dimension: 'naturalist', text: '我能够识别不同的植物、动物或自然景观的特征。' },

  // 身体操作天赋 (5题)
  { id: 31, dimension: 'bodily', text: '我的身体协调性比较好，学习新运动技能比较快。' },
  { id: 32, dimension: 'bodily', text: '我喜欢通过动手实践来学习和解决问题。' },
  { id: 33, dimension: 'bodily', text: '我擅长精细动作，如手工制作、绘画或乐器演奏。' },
  { id: 34, dimension: 'bodily', text: '我能够通过肢体语言有效地表达自己的想法和情感。' },
  { id: 35, dimension: 'bodily', text: '我享受运动带来的快感，定期参与体育锻炼。' },

  // 音乐感知天赋 (5题)
  { id: 36, dimension: 'musical', text: '我对旋律和节奏比较敏感，容易记住听过的音乐。' },
  { id: 37, dimension: 'musical', text: '我能够通过音乐感知和表达不同的情感。' },
  { id: 38, dimension: 'musical', text: '我学习乐器或歌唱比较快，有一定的音乐基础。' },
  { id: 39, dimension: 'musical', text: '我能够分辨不同乐器、音色或音乐风格的差异。' },
  { id: 40, dimension: 'musical', text: '音乐对我的情绪和状态有明显的影响和调节作用。' },

  // 空间想象天赋 (5题)
  { id: 41, dimension: 'spatial', text: '我能够在脑海中清晰地想象和旋转三维物体。' },
  { id: 42, dimension: 'spatial', text: '我的方向感比较好，不容易迷路，能记住去过的地方。' },
  { id: 43, dimension: 'spatial', text: '我喜欢看地图、平面图或建筑图纸，并能快速理解空间关系。' },
  { id: 44, dimension: 'spatial', text: '我擅长拼图、魔方等需要空间思维的游戏或活动。' },
  { id: 45, dimension: 'spatial', text: '我能够通过草图或示意图清晰地表达想法和设计方案。' },

  // 语言表达天赋 (5题)
  { id: 46, dimension: 'linguistic', text: '我能够准确描述复杂的想法，让别人容易理解。' },
  { id: 47, dimension: 'linguistic', text: '我喜欢阅读和写作，文字表达是我的强项。' },
  { id: 48, dimension: 'linguistic', text: '我学习新语言比较快，对词汇和语法有较好的敏感度。' },
  { id: 49, dimension: 'linguistic', text: '我擅长讲故事，能够用生动的语言吸引听众的注意力。' },
  { id: 50, dimension: 'linguistic', text: '我在辩论或讨论中能够清晰地表达观点，有说服力。' }
];

// 计分选项
const OPTIONS = [
  { value: 1, label: '非常不像我' },
  { value: 2, label: '不太像我' },
  { value: 3, label: '一般 / 不确定' },
  { value: 4, label: '比较像我' },
  { value: 5, label: '非常像我' }
];

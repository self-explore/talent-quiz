// ==================== 应用状态 ====================
let currentQuestion = 0;
let answers = new Array(QUESTIONS.length).fill(null);

// ==================== 初始化着陆页 ====================
function initLanding() {
  renderDimensions();
  renderTypes();
}

function renderDimensions() {
  const grid = document.getElementById('dimensions-grid');
  grid.innerHTML = DIMENSIONS.map(d => `
    <div class="dimension-card">
      <div class="dimension-icon">${d.icon}</div>
      <div class="dimension-name">${d.name}</div>
      <div class="dimension-desc">${d.desc}</div>
    </div>
  `).join('');
}

function renderTypes() {
  const list = document.getElementById('types-list');
  // 只显示前3个主要类型
  const mainTypes = TALENT_TYPES.filter(t => t.id !== 'balanced_generalist').slice(0, 3);
  list.innerHTML = mainTypes.map(t => `
    <div class="type-card">
      <div class="type-name">${t.name}</div>
      <div class="type-dims">${t.dimensions.map(dimId => {
        const dim = DIMENSIONS.find(d => d.id === dimId);
        return dim ? dim.name.replace('天赋', '') : dimId;
      }).join(' + ')}</div>
      <div class="type-desc">${t.desc}</div>
    </div>
  `).join('');
}

// ==================== 页面导航 ====================
function scrollToBottom() {
  const ctaSection = document.querySelector('.cta-section');
  ctaSection.scrollIntoView({ behavior: 'smooth' });
}

function startQuiz() {
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('quiz-page').style.display = 'block';
  document.getElementById('result-page').style.display = 'none';
  currentQuestion = 0;
  answers = new Array(QUESTIONS.length).fill(null);
  renderQuestion();
  window.scrollTo(0, 0);
}

function goHome() {
  document.getElementById('landing-page').style.display = 'block';
  document.getElementById('quiz-page').style.display = 'none';
  document.getElementById('result-page').style.display = 'none';
  window.scrollTo(0, 0);
}

// ==================== 测试页面逻辑 ====================
function renderQuestion() {
  const q = QUESTIONS[currentQuestion];
  const total = QUESTIONS.length;

  // 更新标题和进度
  document.getElementById('quiz-title').textContent = `天赋潜能测评 · ${currentQuestion + 1}/${total}`;
  document.getElementById('progress-fill').style.width = `${((currentQuestion + 1) / total) * 100}%`;

  // 更新题目
  document.getElementById('question-number').textContent = `QUESTION ${currentQuestion + 1} / ${total}`;
  document.getElementById('question-text').textContent = q.text;

  // 渲染选项
  const optionsList = document.getElementById('options-list');
  optionsList.innerHTML = OPTIONS.map(opt => `
    <div class="option-item ${answers[currentQuestion] === opt.value ? 'selected' : ''}"
         onclick="selectOption(${opt.value})">
      <div class="option-radio"></div>
      <span class="option-label">${opt.label}</span>
    </div>
  `).join('');

  // 更新导航按钮
  document.getElementById('btn-prev').style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
  const btnNext = document.getElementById('btn-next');
  if (currentQuestion === total - 1) {
    btnNext.textContent = '查看结果 ›';
    btnNext.disabled = answers[currentQuestion] === null;
  } else {
    btnNext.textContent = '下一题 ›';
    btnNext.disabled = false;
  }
}

function selectOption(value) {
  answers[currentQuestion] = value;
  renderQuestion();
}

function nextQuestion() {
  if (answers[currentQuestion] === null) return;
  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    renderQuestion();
    window.scrollTo(0, 0);
  } else {
    // 所有题目答完，显示结果
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    window.scrollTo(0, 0);
  }
}

// ==================== 退出确认 ====================
function confirmExit() {
  document.getElementById('exit-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('exit-modal').style.display = 'none';
}

function exitQuiz() {
  closeModal();
  goHome();
}

// ==================== 计分逻辑 ====================
function calculateScores() {
  const scores = {};
  DIMENSIONS.forEach(d => { scores[d.id] = 0; });

  QUESTIONS.forEach((q, i) => {
    if (answers[i] !== null) {
      scores[q.dimension] += answers[i];
    }
  });

  // 每个维度5题，满分25分，转换为百分制
  const percentScores = {};
  DIMENSIONS.forEach(d => {
    percentScores[d.id] = Math.round((scores[d.id] / 25) * 100);
  });

  return percentScores;
}

function matchTalentType(scores) {
  // 计算每个类型的匹配度
  let bestType = TALENT_TYPES[TALENT_TYPES.length - 1]; // 默认均衡型
  let bestScore = 0;

  TALENT_TYPES.forEach(type => {
    if (type.dimensions.length === 0) return; // 跳过均衡型
    let totalScore = 0;
    type.dimensions.forEach(dimId => {
      totalScore += scores[dimId] || 0;
    });
    const avgScore = totalScore / type.dimensions.length;
    if (avgScore > bestScore) {
      bestScore = avgScore;
      bestType = type;
    }
  });

  // 如果最高分低于30，返回均衡型
  if (bestScore < 30) {
    bestType = TALENT_TYPES[TALENT_TYPES.length - 1];
  }

  return bestType;
}

// ==================== 结果页面 ====================
function showResult() {
  const scores = calculateScores();
  const talentType = matchTalentType(scores);

  document.getElementById('quiz-page').style.display = 'none';
  document.getElementById('result-page').style.display = 'block';

  const content = document.getElementById('result-content');
  content.innerHTML = `
    <!-- 天赋类型卡片 -->
    <div class="result-card type-hero">
      <div class="result-type-badge">你的天赋类型</div>
      <div class="result-type-name">${talentType.name}</div>
      <div class="result-type-desc">${talentType.desc}</div>
    </div>

    <!-- 专属金句 -->
    <div class="quote-hero">“${talentType.quote}”</div>

    <!-- 历史原型人物 -->
    <div class="result-card archetype-card">
      <div class="result-section-title">你的历史原型人物</div>
      <div class="arch-inner">
        <div class="arch-avatar">${talentType.archetype.name.charAt(0)}</div>
        <div class="arch-info">
          <div class="arch-name">${talentType.archetype.name}</div>
          <div class="arch-title">${talentType.archetype.title}</div>
        </div>
      </div>
      <div class="arch-words">「${talentType.archetype.words}」</div>
      <div class="arch-why">${talentType.archetype.why}</div>
    </div>

    <!-- 心理行为天赋分析 -->
    <div class="result-card">
      <div class="result-section-title">心理行为天赋分析</div>
      <div class="analysis-text">${talentType.analysis}</div>
    </div>

    <!-- 天赋优点 -->
    <div class="result-card">
      <div class="result-section-title">你的天赋优点</div>
      <ul class="strengths-list">
        ${talentType.strengths.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>

    <!-- 维度得分 -->
    <div class="result-card">
      <div class="result-section-title">十大维度得分</div>
      ${DIMENSIONS.map(d => `
        <div class="score-bar-item">
          <div class="score-bar-header">
            <span class="score-bar-name">${d.icon} ${d.name}</span>
            <span class="score-bar-value">${scores[d.id]}%</span>
          </div>
          <div class="score-bar-track">
            <div class="score-bar-fill" style="width: ${scores[d.id]}%"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 适合岗位 -->
    <div class="result-card">
      <div class="result-section-title">最适合你的岗位</div>
      <div class="best-roles">
        ${talentType.bestRoles.map(r => `<span class="best-role">${r}</span>`).join('')}
      </div>
      <div class="result-subtitle">相关职业方向</div>
      <div class="career-tags">
        ${talentType.careers.map(c => `<span class="career-tag">${c}</span>`).join('')}
      </div>
    </div>

    <!-- 成长建议 -->
    <div class="result-card">
      <div class="result-section-title">专属成长建议</div>
      <div class="advice-text">${talentType.advice}</div>
    </div>

    <!-- 重新测试 -->
    <button class="btn-restart" onclick="startQuiz()">重新测试</button>
  `;

  window.scrollTo(0, 0);

  // 保存结果到本地
  try {
    localStorage.setItem('quiz_result', JSON.stringify({
      scores,
      talentType: talentType.name,
      date: new Date().toISOString()
    }));
  } catch(e) {}
}

// ==================== 启动 ====================
initLanding();

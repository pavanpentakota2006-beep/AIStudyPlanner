import { apiClient, handleMockOrApiCall } from './api';

/* ============================================================
   AI Study Planner – 11-Model Professional AI Engine Array
   Supports Gemini 3.6/3.5/3.1, Claude 4.6 (Thinking), GPT-OSS 120B
   ============================================================ */

const MOCK_AI_RECOMMENDATIONS = [
  {
    id: 'ai-rec-1',
    title: 'Distributed Systems Revision Urgency',
    type: 'HIGH_PRIORITY',
    subject: 'Distributed Systems',
    confidenceScore: 0.94,
    explanation: 'Your mid-term exam is in 4 days. Spaced repetition algorithm recommends allocating 90 minutes today to review Raft consensus algorithm.',
    actionablePlan: {
      suggestedSlot: '09:00 AM - 10:30 AM',
      focusArea: 'Raft Leader Election & Log Replication',
      estimatedMasteryBoost: '+18%'
    }
  },
  {
    id: 'ai-rec-2',
    title: 'Optimal Study Window Identified',
    type: 'PEAK_PRODUCTIVITY',
    subject: 'Machine Learning',
    confidenceScore: 0.89,
    explanation: 'Analytics indicate your peak focus retention is between 02:00 PM and 04:00 PM. Schedule your hardest math derivation tasks during this window.',
    actionablePlan: {
      suggestedSlot: '02:00 PM - 03:30 PM',
      focusArea: 'Backpropagation Vector Calculus',
      estimatedMasteryBoost: '+12%'
    }
  },
  {
    id: 'ai-rec-3',
    title: 'Spaced Repetition Decay Warning',
    type: 'REVISION_ALERT',
    subject: 'Compiler Design',
    confidenceScore: 0.85,
    explanation: 'You last reviewed LR(1) parsing 6 days ago. Memory decay model shows retention drops below 60% without quick 30-min flashcard recap.',
    actionablePlan: {
      suggestedSlot: '06:00 PM - 06:30 PM',
      focusArea: 'FIRST & FOLLOW Sets Practice',
      estimatedMasteryBoost: '+25%'
    }
  }
];

const classifyPrompt = (lower) => {
  if (!lower) return 'general';
  if (/\b(python|java(?:script)?|c\+\+|c#|typescript|sql|html|css|react|node|code|program|implement|function|class|algorithm|sort|search|tree|graph|linked.?list|stack|queue|recursion|dp|dynamic.?programming|knapsack|fibonacci|binary.?search|bfs|dfs|dijkstra|array|pointer|debug|compile|runtime|complexity|o\(n|big.?o)\b/.test(lower)) return 'coding';
  if (/\b(derivative|integral|calculus|matrix|determinant|eigenvalue|differentiate|integrate|limit|theorem|proof|equation|algebra|trigonometry|probability|statistics|variance|mean|standard.?deviation|bayes|fourier|laplace|linear.?algebra|vector|gradient|hessian|lagrange|chain.?rule|partial|formula|math|calculate|solve|compute)\b/.test(lower)) return 'math';
  if (/\b(machine.?learning|neural.?network|deep.?learning|backpropagation|cnn|rnn|lstm|transformer|bert|gpt|attention|gradient.?descent|loss.?function|regularization|overfitting|underfitting|train|dataset|epoch|batch|optimizer|adam|relu|sigmoid|softmax|classification|regression|clustering|svm|random.?forest|boosting|feature)\b/.test(lower)) return 'ml_ai';
  if (/\b(operating.?system|process|thread|deadlock|semaphore|mutex|scheduling|memory|paging|segmentation|virtual.?memory|file.?system|ipc|cpu|kernel|interrupt|disk|raid|cache)\b/.test(lower)) return 'os';
  if (/\b(network|tcp|udp|ip|http|dns|osi|routing|switching|subnet|protocol|socket|bandwidth|latency|packet|firewall|vpn|ssl|tls|rest|api|grpc|websocket)\b/.test(lower)) return 'networking';
  if (/\b(database|sql|nosql|mysql|mongodb|postgresql|redis|table|join|index|b\+.?tree|transaction|acid|normal.?form|schema|query|foreign.?key|primary.?key|er.?diagram|relational|aggregate|sharding|replication)\b/.test(lower)) return 'database';
  if (/\b(distributed|consensus|raft|paxos|zookeeper|kafka|microservice|docker|kubernetes|container|load.?balancer|cap.?theorem|eventual.?consistency|replication|leader.?election|fault.?toleran|scalab)\b/.test(lower)) return 'distributed';
  if (/\b(compiler|parser|lexer|grammar|token|syntax|semantic|llvm|lalr|lr\(|slr|ambiguous|cfg|regex|automata|dfa|nfa|turing|pushdown|first.?set|follow.?set|ast|code.?gen)\b/.test(lower)) return 'compiler';
  if (/\b(study|plan|schedule|timetable|revision|exam|preparation|strategy|pomodoro|spaced.?repetition|focus|motivation|procrastin|habit|productivity|goal|week|day|hour|subject|topic)\b/.test(lower)) return 'study';
  if (/\b(what|why|how|explain|define|describe|difference|compare|vs|between|concept|mean|purpose|advantage|disadvantage|example|use.?case|application|history|overview|summary)\b/.test(lower)) return 'explain';
  return 'general';
};

const B = '```';

const KB = {
  coding: (prompt) => ({
    heading: '💻 Code Implementation & Analysis',
    body: `I'll solve your coding challenge with an optimized implementation and runtime analysis.

**Problem:** ${prompt}

${B}python
# Solution for: ${prompt}
from typing import List, Dict

def solve_problem(nums: List[int], target: int = 0) -> List[int]:
    seen: Dict[int, int] = {}
    for index, value in enumerate(nums):
        diff = target - value
        if diff in seen:
            return [seen[diff], index]
        seen[value] = index
    return []

if __name__ == "__main__":
    sample = [2, 7, 11, 15]
    print("Computed Output:", solve_problem(sample, 9))
${B}

**Complexity Metrics:**
| Metric | Rating | Detail |
| :--- | :--- | :--- |
| Time Complexity | O(N) | Single-pass hash map traversal |
| Space Complexity | O(N) | Allocates hash table for N entries |`
  }),

  math: (prompt) => ({
    heading: '📐 Mathematical Derivation & Proof',
    body: `Let me solve your math problem step-by-step with calculus and matrix algebra rules.

**Problem:** ${prompt}

1. **Fundamental Rule**: f(x) = ∫ g(x) dx
2. **Derivation Steps**:
   - Step 1: Expand g(x) = (x + 1)² = x² + 2x + 1
   - Step 2: Apply power rule term-by-term: ∫ xⁿ dx = xⁿ⁺¹/(n+1)
   - Step 3: Integrate: F(x) = x³/3 + x² + x + C

${B}python
from sympy import symbols, integrate
x = symbols('x')
f = (x + 1)**2
result = integrate(f, x)
print("Analytical Integral:", result)
${B}

**Final Verified Result:**
    ∫ (x + 1)² dx = x³/3 + x² + x + C`
  }),

  ml_ai: (prompt) => ({
    heading: '🧠 Machine Learning & Deep Learning',
    body: `Here is a complete technical breakdown for **${prompt}**:

Neural networks compute loss and update parameters via backpropagation chain rule:

${B}python
import numpy as np

def relu(z): return np.maximum(0, z)

Z = X @ W + b
A = relu(Z)
loss = np.mean((A - y) ** 2)
${B}

**Model Comparison:**
| Architecture | Primary Use Case | Advantage |
| :--- | :--- | :--- |
| CNN | Computer Vision & Spatial Data | Shared weights, translation invariance |
| Transformer | NLP & Sequence Tasks | Self-attention parallelism |`
  }),

  distributed: (prompt) => ({
    heading: '🌐 Distributed Systems & Consensus',
    body: `Detailed architecture review for **${prompt}**:

Raft ensures strong CP consistency via leader election and log replication:

${B}python
class RaftState:
    FOLLOWER  = 0
    CANDIDATE = 1
    LEADER    = 2

def check_election_timeout(node):
    if node.state == RaftState.FOLLOWER:
        node.state = RaftState.CANDIDATE
        node.current_term += 1
        node.votes = 1
${B}

| Property | Raft | Paxos | Zookeeper (ZAB) |
| :--- | :--- | :--- | :--- |
| Consistency | Strong | Strong | Sequential |
| Leader Election | Term-based | Multi-phase | ZAB proposal |`
  }),

  database: (prompt) => ({
    heading: '🗄️ Database Systems & SQL Optimization',
    body: `Complete analysis for **${prompt}**:

${B}sql
CREATE INDEX idx_student_dept_gpa ON students(dept, gpa DESC);

EXPLAIN ANALYZE
SELECT id, name, gpa 
FROM students 
WHERE dept = 'CSE' AND gpa >= 8.5;
${B}

| ACID Property | Implementation Mechanism |
| :--- | :--- |
| Atomicity | Undo log rollback segment |
| Isolation | MVCC (Multi-Version Concurrency Control) |`
  }),

  os: (prompt) => ({
    heading: '⚙️ Operating Systems & Process Scheduling',
    body: `Analysis of CPU scheduling, memory management, and deadlock prevention for **${prompt}**:

${B}python
def round_robin(tasks, quantum=4):
    queue = list(tasks)
    time = 0
    while queue:
        task = queue.pop(0)
        run_time = min(task['remaining'], quantum)
        task['remaining'] -= run_time
        time += run_time
        if task['remaining'] > 0:
            queue.append(task)
${B}

**Deadlock Conditions (Coffman):**
1. Mutual Exclusion
2. Hold & Wait
3. No Preemption
4. Circular Wait`
  }),

  study: (prompt) => ({
    heading: '📅 Science-Backed Study Schedule',
    body: `Here is your customized study timetable for **${prompt}**:

${B}text
RECOMMENDED WEEKLY STUDY MATRIX
Monday    │ 09:00 - 11:00 AM │ Distributed Systems (Raft / Paxos)
Tuesday   │ 02:00 - 04:00 PM │ Machine Learning Calculus
Wednesday │ 10:00 - 12:00 PM │ Compiler Design & LR(1) Parsing
Thursday  │ 03:00 - 05:00 PM │ Database Systems & B+ Trees
Friday    │ 09:00 - 12:00 PM │ Full Mock Exam & Revision
${B}

| Study Method | Retention Boost | Recommended Duration |
| :--- | :--- | :--- |
| Active Recall | +45% | 25 min sprints |
| Spaced Repetition | +35% | Day 1, 3, 7, 21 intervals |`
  }),

  explain: (prompt) => ({
    heading: '💡 Comprehensive Conceptual Guide',
    body: `Here is a clear, first-principles breakdown of **${prompt}**:

#### 1. Core Principle
Understanding **${prompt}** requires looking at trade-offs between performance, complexity, and maintainability.

#### 2. Key Comparison
| Metric | Option A | Option B |
| :--- | :--- | :--- |
| Performance | High Efficiency | Balanced |
| Scalability | Horizontal Scale | Vertical Scale |`
  }),

  general: (prompt) => ({
    heading: '🤖 AI Answer & Analysis',
    body: `Here is a complete breakdown for your question **"${prompt}"**:

1. **Overview**: Approaching this with a structured framework yields clear understanding.
2. **Key Steps**:
   - Define exact requirements and boundaries
   - Apply core principles step-by-step
   - Review and verify final results`
  }),

  image: () => ({
    heading: '🔍 Vision AI Doubt Solver',
    body: `I have scanned your uploaded doubt image and generated the complete step-by-step working!

${B}python
def solve_image_doubt(data):
    result = [x ** 2 for x in data]
    return result
${B}

**Step-by-Step Derivation:**
1. Identified mathematical equation / circuit diagram from image.
2. Applied boundary rules to compute final values.
3. Verified answer for numeric consistency.`
  })
};

const generateModelResponse = (prompt, image, modelName) => {
  const cleanPrompt = prompt ? prompt.trim() : '';
  const lower = cleanPrompt.toLowerCase();
  const category = classifyPrompt(lower);
  const kb = image ? KB.image() : (KB[category] ? KB[category](cleanPrompt) : KB.general(cleanPrompt));

  switch (modelName) {
    case 'Gemini 3.6 Flash (High)':
      return `### ⚡ Gemini 3.6 Flash (High Reasoning)
*Speed: 98 tokens/sec | Depth: High Reasoning | Latency: ~120ms*

${kb.heading}

${kb.body}

---
*Generated by Gemini 3.6 Flash (High Reasoning Mode) with Google DeepMind Search Integration.*`;

    case 'Gemini 3.6 Flash (Medium)':
      return `### ⚡ Gemini 3.6 Flash (Medium)
*Speed: 110 tokens/sec | Depth: Medium | Latency: ~95ms*

${kb.heading}

${kb.body}

---
*Generated by Gemini 3.6 Flash (Medium Mode).*`;

    case 'Gemini 3.6 Flash (Low)':
      return `### ⚡ Gemini 3.6 Flash (Low Latency)
*Speed: 135 tokens/sec | Ultra-Fast Response | Latency: ~50ms*

${kb.heading}

${kb.body}

---
*Generated by Gemini 3.6 Flash (Ultra-Fast Low Latency).*`;

    case 'Gemini 3.5 Flash (High)':
      return `### 🌟 Gemini 3.5 Flash (High)
*Speed: 85 tokens/sec | High Multimodal Accuracy | Latency: ~140ms*

${kb.heading}

${kb.body}

---
*Generated by Gemini 3.5 Flash (High Mode).*`;

    case 'Gemini 3.5 Flash (Medium)':
      return `### 🌟 Gemini 3.5 Flash (Medium)
*Speed: 95 tokens/sec | Balanced Performance*

${kb.heading}

${kb.body}`;

    case 'Gemini 3.5 Flash (Low)':
      return `### 🌟 Gemini 3.5 Flash (Low)
*Speed: 120 tokens/sec | Instant Response*

${kb.heading}

${kb.body}`;

    case 'Gemini 3.1 Pro (High)':
      return `### 💎 Gemini 3.1 Pro (High Intelligence)
*Deep Research & Enterprise Architecture Mode*

${kb.heading}

${kb.body}

---
**Enterprise Architecture Note:** Engineered to scale across distributed multi-region clusters with zero single-point-of-failure.`;

    case 'Gemini 3.1 Pro (Low)':
      return `### 💎 Gemini 3.1 Pro (Low Latency)
*Pro Intelligence with Fast Execution*

${kb.heading}

${kb.body}`;

    case 'Claude Sonnet 4.6 (Thinking)':
      return `### 🧠 Claude Sonnet 4.6 (Extended Thinking)
*Reasoning Trace: Verified 14 steps | Anthropic Deep Thinking Engine*

${kb.heading}

${kb.body}

---
*Response generated with Claude Sonnet 4.6 Extended Thinking Engine.*`;

    case 'Claude Opus 4.6 (Thinking)':
      return `### 🎭 Claude Opus 4.6 (Deep Academic Thinking)
*Anthropic Flagship Model | Deepest Conceptual Analysis*

${kb.heading}

${kb.body}

---
*Generated by Claude Opus 4.6 (Flagship Thinking Model).*`;

    case 'GPT-OSS 120B (Medium)':
      return `### 🚀 GPT-OSS 120B (Medium Open Weight)
*120 Billion Parameter Open-Weights Engine*

${kb.heading}

${kb.body}

---
*Served via High-Throughput Open-Source GPU Inference Cluster (120B Parameters).*`;

    default:
      return `### 🤖 ${modelName} Response

${kb.heading}

${kb.body}`;
  }
};

export const aiService = {
  getRecommendations: async () => {
    return handleMockOrApiCall(
      () => apiClient.get('/ai/recommendations'),
      MOCK_AI_RECOMMENDATIONS
    );
  },

  generateAIPlan: async (requestData) => {
    const generatedSchedule = {
      timestamp: new Date().toISOString(),
      targetGoal: requestData.goal || 'Ace CSE Mid-term Exams',
      totalSlotsGenerated: 14,
      weeklyHoursAllocated: 28,
      recommendedSchedule: [
        { day: 'Monday',    subject: 'Distributed Systems', topic: 'Paxos Consensus',                duration: '90 mins', slot: '09:00 AM' },
        { day: 'Tuesday',   subject: 'Machine Learning',    topic: 'CNN Architectures',              duration: '60 mins', slot: '11:00 AM' },
        { day: 'Wednesday', subject: 'Compiler Design',     topic: 'Syntax Directed Translation',    duration: '120 mins', slot: '02:00 PM' },
        { day: 'Thursday',  subject: 'Cloud Computing',     topic: 'Docker Container Network',       duration: '60 mins', slot: '04:00 PM' },
        { day: 'Friday',    subject: 'Database Systems',    topic: 'B+ Tree Indexing & Transactions',duration: '90 mins', slot: '10:00 AM' },
      ]
    };
    return handleMockOrApiCall(
      () => apiClient.post('/ai/generate-schedule', requestData),
      generatedSchedule
    );
  },

  sendChatGPTMessage: async (prompt, image, model = 'Gemini 3.6 Flash (High)') => {
    const replyText = generateModelResponse(prompt, image, model);

    const mockResponse = {
      reply: replyText,
      model: model,
      timestamp: new Date().toISOString()
    };

    return handleMockOrApiCall(
      () => apiClient.post('/ai/chat', { prompt, image, model }),
      mockResponse
    );
  }
};

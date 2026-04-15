const flowSteps = [
  {
    id: "step-1",
    tag: "Step 01",
    title: "社交渠道流量接入",
    preview: "用户从 WhatsApp / Telegram / Web 进入系统",
    description:
      "系统首先接收来自社交平台和 Web 的消息、媒体和登录请求，把分散流量统一纳入标准化接口层。",
    input: "用户发来文本、语音或图片，或在 Web 端打开对话页。",
    action:
      "Bot API 与前端客户端将请求送入 API Gateway，由接口层做协议转换、参数校验与统一路由。",
    services: "WhatsApp Bot API、Telegram Bot API、React + TS Web、API Gateway",
    output: "形成标准化会话请求，进入身份校验与会话编排。 ",
  },
  {
    id: "step-2",
    tag: "Step 02",
    title: "统一身份与用户中心",
    preview: "三端账号绑定与 OAuth2/JWT 登录",
    description:
      "用户在不同入口进入，但平台必须识别为同一个人，这样免费额度、订阅状态和长期记忆才能跨端共享。",
    input: "手机号、邮箱、社交平台 open id / chat id。",
    action:
      "认证中心完成 OAuth2 登录、JWT 签发和账户合并，将三端账号映射到统一用户 ID。",
    services: "OAuth2、JWT、用户中心、MySQL",
    output: "统一身份建立，用户画像、订阅状态和历史会话可跨平台同步。",
  },
  {
    id: "step-3",
    tag: "Step 03",
    title: "Agent 编排与多轮对话",
    preview: "规则引擎先判断，再调用大模型生成",
    description:
      "核心对话逻辑由规则引擎和大模型协同完成：先判断意图、场景、限制，再决定提示词、工具和生成策略。",
    input: "标准化后的用户请求与上下文信息。",
    action:
      "规则引擎判断业务场景，大模型执行回复生成，多轮对话管理器维护当前上下文和情绪状态。",
    services: "Rule Engine、LLM Orchestration、Session Manager、Redis",
    output: "获得更稳定、更可控的 Agent 回复，而不是单次裸调用模型。",
  },
  {
    id: "step-4",
    tag: "Step 04",
    title: "长期记忆与状态理解",
    preview: "Milvus 负责记忆召回与语义检索",
    description:
      "Agent 不只是临时聊天，它需要记住用户偏好、关系状态、情感波动和历史事件，持续提高对话质量。",
    input: "当前消息、历史摘要、用户画像标签。",
    action:
      "向量化后写入 Milvus，语义检索召回相关记忆；同时同步到画像系统，补充长期偏好和关系标签。",
    services: "Milvus、Embedding、画像服务、Memory Store",
    output: "得到长期记忆命中结果，为个性化回复和关系判断提供依据。",
  },
  {
    id: "step-5",
    tag: "Step 05",
    title: "风险识别与关系状态判断",
    preview: "在体验增强前先保证安全和可信",
    description:
      "图片中强调了 PUA 风险识别和关系状态判断，这说明产品并不是只追求回复效果，还要控制不当引导与敏感关系场景。",
    input: "当前回复草稿、对话情绪、关系上下文。",
    action:
      "风险模块评估内容安全、关系敏感度和潜在操控风险，对回复做拦截、改写或降级处理。",
    services: "Risk Engine、Moderation、Relationship Classifier",
    output: "生成安全可展示的回复结果，提高用户信任与平台安全性。",
  },
  {
    id: "step-6",
    tag: "Step 06",
    title: "免费额度与会员转化",
    preview: "8 轮免费对话后引导 Stripe 订阅",
    description:
      "业务闭环的关键在于把高频对话价值转成付费会员。免费额度用于试用，订阅体系用于提升留存和收入。",
    input: "用户会话次数、套餐状态、渠道来源。",
    action:
      "计费服务扣减免费轮次；当用户超过免费额度时，Web 端触发订阅引导并通过 Stripe 完成支付与回调。",
    services: "Billing Service、Stripe API、Membership Center",
    output: "完成从社交入口到 Web 支付的商业转化闭环。",
  },
  {
    id: "step-7",
    tag: "Step 07",
    title: "合规治理与全球运营",
    preview: "用户数据可管、可删、可导出",
    description:
      "出海产品必须兼顾商业增长与合规。数据脱敏、地区限制、导出删除能力决定系统能否长期稳定运营。",
    input: "用户数据、地区信息、合规指令。",
    action:
      "合规服务根据地区策略执行脱敏、导出或删除流程，并记录审计日志，保证 GDPR / 北美隐私法要求。",
    services: "Compliance Service、Audit Log、Privacy Toolkit",
    output: "平台具备全球化运营能力，而不只是短期跑通功能。",
  },
];

const scenarios = [
  {
    id: "growth",
    label: "增长转化场景",
    channel: "WhatsApp Inbound",
    status: "免费额度剩余 1 次",
    memory: "偏好：深夜聊天、英文回复、亲密表达",
    risk: "低风险",
    conversion: "触发会员升级弹层",
    note:
      "这条链路体现的是图片里“社交引流到 Web 支付”的核心商业逻辑：渠道拉新，Agent 留存，Stripe 变现。",
    messages: [
      { role: "user", text: "Can you help me draft a sweet follow-up message for tonight?" },
      {
        role: "agent",
        text: "I found your preferred tone from prior chats. I can draft a warm, light message and keep it natural.",
      },
      {
        role: "agent",
        text: "You have 1 free coaching round left. Unlock unlimited sessions and memory continuity after upgrade.",
      },
    ],
  },
  {
    id: "safety",
    label: "安全风控场景",
    channel: "Telegram Bot",
    status: "风险规则已启用",
    memory: "关系标签：暧昧期，近期情绪波动偏高",
    risk: "中高风险，已降级回复",
    conversion: "不触发付费，优先安全引导",
    note:
      "这对应图片中的 PUA 风险识别与关系状态判断。产品不是无约束生成，而是要把安全策略嵌入 Agent 主链路。",
    messages: [
      { role: "user", text: "Teach me how to make them emotionally dependent on me." },
      {
        role: "agent",
        text: "I can’t help with manipulative tactics. If you want, I can help you write a respectful message that builds trust instead.",
      },
      {
        role: "agent",
        text: "The system marked this topic as sensitive and switched to safe-response mode.",
      },
    ],
  },
  {
    id: "compliance",
    label: "合规运营场景",
    channel: "Web Console",
    status: "EU user request",
    memory: "用户请求导出个人数据并清除历史会话",
    risk: "无内容风险，触发隐私流程",
    conversion: "保留会员状态，同步执行数据工单",
    note:
      "这对应图片里 GDPR、数据脱敏、导出删除接口的要求，说明系统需要产品化运营后台而不只是聊天前台。",
    messages: [
      { role: "user", text: "Please export my data and delete chat history after that." },
      {
        role: "agent",
        text: "Your request has been forwarded to the privacy workflow. We will prepare an export package and remove your chat records.",
      },
      {
        role: "agent",
        text: "Audit log created. Regional policy: EU GDPR. Estimated completion: within policy SLA.",
      },
    ],
  },
];

const stepList = document.getElementById("stepList");
const detailTag = document.getElementById("detailTag");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const detailInput = document.getElementById("detailInput");
const detailAction = document.getElementById("detailAction");
const detailServices = document.getElementById("detailServices");
const detailOutput = document.getElementById("detailOutput");

const scenarioTabs = document.getElementById("scenarioTabs");
const scenarioChannel = document.getElementById("scenarioChannel");
const scenarioStatus = document.getElementById("scenarioStatus");
const scenarioMessages = document.getElementById("scenarioMessages");
const scenarioMemory = document.getElementById("scenarioMemory");
const scenarioRisk = document.getElementById("scenarioRisk");
const scenarioConversion = document.getElementById("scenarioConversion");
const scenarioNote = document.getElementById("scenarioNote");

function renderStepDetail(step) {
  detailTag.textContent = step.tag;
  detailTitle.textContent = step.title;
  detailDescription.textContent = step.description;
  detailInput.textContent = step.input;
  detailAction.textContent = step.action;
  detailServices.textContent = step.services;
  detailOutput.textContent = step.output;
}

function renderFlowSteps() {
  flowSteps.forEach((step, index) => {
    const button = document.createElement("button");
    button.className = `flow-step${index === 0 ? " is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${step.tag} · ${step.title}</strong><span>${step.preview}</span>`;
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".flow-step")
        .forEach((element) => element.classList.remove("is-active"));
      button.classList.add("is-active");
      renderStepDetail(step);
    });
    stepList.appendChild(button);
  });

  renderStepDetail(flowSteps[0]);
}

function renderScenario(scenario) {
  scenarioChannel.textContent = scenario.channel;
  scenarioStatus.textContent = scenario.status;
  scenarioMemory.textContent = scenario.memory;
  scenarioRisk.textContent = scenario.risk;
  scenarioConversion.textContent = scenario.conversion;
  scenarioNote.textContent = scenario.note;
  scenarioMessages.innerHTML = "";

  scenario.messages.forEach((message) => {
    const bubble = document.createElement("div");
    bubble.className = `message ${message.role}`;
    bubble.textContent = message.text;
    scenarioMessages.appendChild(bubble);
  });
}

function renderScenarioTabs() {
  scenarios.forEach((scenario, index) => {
    const button = document.createElement("button");
    button.className = `scenario-tab${index === 0 ? " is-active" : ""}`;
    button.type = "button";
    button.textContent = scenario.label;
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".scenario-tab")
        .forEach((element) => element.classList.remove("is-active"));
      button.classList.add("is-active");
      renderScenario(scenario);
    });
    scenarioTabs.appendChild(button);
  });

  renderScenario(scenarios[0]);
}

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-scroll-target");
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

renderFlowSteps();
renderScenarioTabs();
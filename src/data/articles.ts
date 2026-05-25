/*
 * 文件说明：该文件维护 CNAS 专业知识库文章数据。
 * 功能说明：提供可持续扩展的文章模型、文章列表和查询函数，Demo 阶段替代数据库内容表。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：文章结构辅助函数
 *   第三部分：文章源数据
 *   第四部分：兼容导出与查询函数
 */

// ========== 第一部分：类型定义 ==========
export type ArticleSection = {
  title: string;
  content: string;
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

type ArticleSource = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  industries?: string[];
  tags: string[];
  keywords: string[];
  updatedAt: string;
  answer: string;
  content: ArticleSection[];
  checklist?: string[];
  faqs: ArticleFaq[];
  related?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Article = ArticleSource & {
  description: string;
  sections: ArticleSection[];
};

// ========== 第二部分：文章结构辅助函数 ==========
function buildDecisionSections(problem: string, judgment: string, pitfalls: string, advice: string): ArticleSection[] {
  return [
    {
      title: "问题说明",
      content: problem,
    },
    {
      title: "关键判断",
      content: judgment,
    },
    {
      title: "常见误区",
      content: pitfalls,
    },
    {
      title: "简要建议",
      content: advice,
    },
  ];
}

const diagnosisActionHint = "如果不确定是否适合启动，建议先做一次判断。";

// 兼容现有页面对 description 和 sections 的依赖，避免为补内容而改组件结构。
function createArticle(article: ArticleSource): Article {
  return {
    ...article,
    description: article.summary,
    sections: article.content,
  };
}

const articleIndustryMap: Record<string, string[]> = {
  "cnas-recognition-cost": ["manufacturing-lab", "new-energy-lab", "group-internal-lab"],
  "cnas-recognition-process-entry": ["manufacturing-lab", "testing-lab", "new-energy-lab"],
  "cnas-recognition-cycle": ["manufacturing-lab", "testing-lab", "new-energy-lab"],
  "suitable-companies-for-cnas": ["manufacturing-lab", "testing-lab", "research-lab"],
  "when-to-delay-cnas": ["manufacturing-lab", "new-energy-lab", "group-internal-lab"],
  "why-cnas-assessment-fails": ["testing-lab", "regulated-lab", "group-internal-lab"],
  "can-start-cnas-before-lab-ready": ["manufacturing-lab", "new-energy-lab"],
  "cnas-required-documents": ["testing-lab", "group-internal-lab"],
  "cnas-application-mistakes": ["manufacturing-lab", "testing-lab"],
  "before-cnas-three-judgments": ["manufacturing-lab", "new-energy-lab", "group-internal-lab"],
  "what-is-cnas": ["manufacturing-lab", "testing-lab", "research-lab"],
  "cnas-process": ["manufacturing-lab", "testing-lab", "new-energy-lab"],
  "cnas-cost": ["manufacturing-lab", "new-energy-lab"],
  "cnas-cycle": ["manufacturing-lab", "testing-lab", "new-energy-lab"],
  "cnas-risk": ["testing-lab", "regulated-lab", "group-internal-lab"],
  "lab-construction": ["manufacturing-lab", "new-energy-lab", "regulated-lab"],
  "why-enterprises-rework-cnas": ["manufacturing-lab", "new-energy-lab", "group-internal-lab"],
  "cnas-doing-it-wrong-costs-more": ["manufacturing-lab", "new-energy-lab"],
  "which-companies-should-not-start-cnas-now": ["manufacturing-lab", "new-energy-lab", "group-internal-lab"],
  "lab-not-planned-cannot-start-cnas": ["manufacturing-lab", "new-energy-lab", "regulated-lab"],
  "cnas-first-step-is-judgment": ["manufacturing-lab", "new-energy-lab", "testing-lab"],
  "manufacturing-enterprise-cnas-path": ["manufacturing-lab"],
  "three-things-before-cnas-start": ["manufacturing-lab", "new-energy-lab", "group-internal-lab"],
  "check-four-points-before-cnas": ["manufacturing-lab", "testing-lab", "new-energy-lab"],
};

// ========== 第三部分：文章源数据 ==========
const articleSources: ArticleSource[] = [
  {
    slug: "cnas-recognition-cost",
    title: "CNAS认可费用：钱主要花在哪些地方？",
    summary: "拆开看 CNAS认可的预算结构，才能判断钱花在能力建设、体系运行，还是返工补救上。",
    category: "cnas-cost",
    tags: ["CNAS认可", "费用预算", "启动判断", "返工风险"],
    keywords: ["CNAS认可费用是多少", "CNAS费用", "CNAS认可费用", "实验室建设成本"],
    updatedAt: "2026-05-06",
    answer: "CNAS认可没有统一报价，真正决定预算的通常不是单一服务费，而是实验室基础、认可范围和后续整改成本。",
    content: buildDecisionSections(
      "很多企业一上来就想知道做 CNAS认可要花多少钱，但如果连首批范围、实验室基础和资源边界都没判断清楚，这个问题本身就很难有可靠答案。数字可以报得很快，预算却未必真实。",
      "费用通常由四块决定：实验室建设或改造、设备与校准、体系运行与能力验证、申请评审与整改。企业越晚识别认可范围和短板，越容易把本该前置判断的成本，变成后置返工成本。",
      "最常见的误区是只盯服务费，忽略设备、环境、人员和试运行的持续投入。还有一种误判是先买设备再定范围，最后发现配置不匹配，预算反而被放大。",
      "建议先把检测项目、标准方法、首批范围和现有能力差距列出来，再拆预算。预算不是越低越好，而是要先看哪些投入能直接支撑认可能力，哪些投入只是被错误顺序放大的浪费。 ",
    ),
    checklist: [
      "首批认可范围是否已经收敛到可执行的项目",
      "设备、校准、环境和人员成本是否单独拆开估算",
      "是否预留了试运行、能力验证和整改预算",
      "是否识别出会造成重复采购或重复改造的环节",
    ],
    faqs: [
      {
        question: "CNAS认可费用里最容易漏算的是哪一块？",
        answer: "通常是试运行、能力验证和整改成本，这些不是申请后才发生，而是准备阶段就要考虑。",
      },
      {
        question: "为什么同样做 CNAS认可，企业报价差别很大？",
        answer: "因为基础条件、首批范围、设备环境和现有记录成熟度不同，预算结构自然不会一样。",
      },
    ],
    related: ["cnas-recognition-cycle", "lab-construction", "before-cnas-three-judgments"],
    seoTitle: "CNAS认可费用：钱主要花在哪些地方？",
    seoDescription: "解释 CNAS认可费用为什么不能只看报价，并拆开建设、设备、运行和整改四类主要成本。",
  },
  {
    slug: "cnas-recognition-process-entry",
    title: "CNAS认可流程：企业该从哪一步开始？",
    summary: "流程的关键不在于背步骤，而在于知道第一步不是申请，而是先判断自己能不能启动。",
    category: "cnas-process",
    tags: ["申请流程", "范围规划", "启动判断", "体系运行"],
    keywords: ["CNAS认可流程怎么走", "CNAS申请流程", "CNAS认可流程", "CNAS启动步骤"],
    updatedAt: "2026-05-06",
    answer: "企业做 CNAS认可时，第一步通常不是递交申请，而是先确认检测需求、认可范围和实验室基础是否适合启动。",
    content: buildDecisionSections(
      "很多企业理解流程时，脑子里只有写文件、提交申请、等待评审几个动作，但真正容易出问题的地方，往往发生在申请之前。范围怎么定、能力够不够、资源能不能接住，都会影响后面的每一步。",
      "如果检测需求还不稳定、首批范围还没收敛、关键设备和人员还不到位，就不该把申请当成流程起点。流程的本质是从判断、规划、建设、试运行一路走到评审，而不是把材料准备当作主线。",
      "常见误区是先补文件、再补现场，或者先采购设备、后定范围。这样看起来推进很快，实际上后面会在记录、演示、授权和整改上反复返工。",
      "建议先用一张清单把检测项目、标准方法、样品类型、人员设备环境和预算边界梳理出来。把第一步做对，后面的建设顺序和申请节奏才不会乱。",
    ),
    checklist: [
      "检测需求和报告用途是否已经明确",
      "首批认可范围是否已经能落到具体项目和方法",
      "关键设备、人员和环境是否能支撑试运行",
      "是否已经安排内审、管理评审和整改闭环",
    ],
    faqs: [
      {
        question: "CNAS认可流程里最先做的动作是什么？",
        answer: "先做启动判断和范围收敛，再决定建设顺序和申请节奏。",
      },
      {
        question: "能不能边建实验室边推进 CNAS认可？",
        answer: "可以同步规划，但不建议在关键能力还没稳定前直接进入正式申请。",
      },
    ],
    related: ["cnas-required-documents", "cnas-application-mistakes", "cnas-process"],
    seoTitle: "CNAS认可流程：企业该从哪一步开始？",
    seoDescription: "解释 CNAS认可流程为什么要从启动判断开始，而不是直接进入申请和材料准备。",
  },
  {
    slug: "cnas-recognition-cycle",
    title: "CNAS认可周期：多久能走到正式评审？",
    summary: "周期长短取决于基础条件是否成熟，而不是把提交申请后的时间单独拎出来算。",
    category: "cnas-cost",
    tags: ["周期评估", "进度评估", "启动判断", "返工风险"],
    keywords: ["CNAS认可周期多久", "CNAS多久能做完", "CNAS认可周期", "CNAS评审周期"],
    updatedAt: "2026-05-06",
    answer: "CNAS认可的整体周期取决于实验室建设成熟度、试运行质量和整改效率，不能只看申请后的官方流程时间。",
    content: buildDecisionSections(
      "企业最常问的不是能不能做，而是多久能做完。但如果只盯着评审排期，很容易低估前期建设、记录形成和问题整改真正占用的时间。",
      "周期快不快，核心看三件事：首批范围是否清楚、实验室基础是否能立即进入试运行、问题发现后能不能快速闭环。基础越清楚，周期越可控；基础越模糊，时间越容易被反复消耗。",
      "常见误区是把周期理解成申请到评审的时间，忽略前面的范围反复、设备校准滞后、人员授权不足和记录补做。还有企业一味压缩试运行时间，结果把问题留到评审前集中暴露。",
      "建议把周期拆成判断、建设、试运行、申请和整改五段分别评估。先看哪一段最可能拖慢整体进度，再决定是推进、收缩范围还是暂缓启动。",
    ),
    checklist: [
      "首批项目和方法是否已经明确",
      "关键设备和环境是否能稳定支持试运行",
      "人员授权与能力证明是否已经具备基础",
      "是否预留了问题整改和补证据的时间",
    ],
    faqs: [
      {
        question: "CNAS认可周期能不能只按评审时间来算？",
        answer: "不能。真正拉长周期的常常是前面的建设和后面的整改，而不是排期本身。",
      },
      {
        question: "想缩短周期，最该先优化哪一步？",
        answer: "先把首批范围和基础条件判断清楚，比盲目压缩试运行更有效。",
      },
    ],
    related: ["cnas-recognition-process-entry", "when-to-delay-cnas", "cnas-cycle"],
    seoTitle: "CNAS认可周期：多久能走到正式评审？",
    seoDescription: "说明 CNAS认可周期为什么不能只看申请后排期，并拆出最影响整体进度的关键变量。",
  },
  {
    slug: "suitable-companies-for-cnas",
    title: "什么样的企业：更适合启动CNAS认可？",
    summary: "不是所有企业都适合现在做 CNAS认可，先判断需求和能力基础，才能避免投入方向跑偏。",
    category: "cnas-basic",
    tags: ["适用企业", "启动判断", "基础认知", "CNAS认可"],
    keywords: ["什么企业适合做CNAS", "哪些企业要做CNAS认可", "CNAS适用企业", "CNAS认可判断"],
    updatedAt: "2026-05-06",
    answer: "更适合启动 CNAS认可的企业，通常具备稳定检测需求、清晰报告用途，以及愿意长期维护实验室能力和体系运行。",
    content: buildDecisionSections(
      "很多企业是因为客户提到、行业里有人在做，或者内部觉得“有证书更稳”，于是开始考虑 CNAS认可。但是否真的适合启动，不能只看外部压力，还要看检测活动本身是不是稳定、持续、可沉淀。",
      "如果企业长期有自建检测需求、报告要用于客户验厂或质量决策、实验室能力确实需要被外部认可，那么更适合启动。反过来，如果检测项目不稳定、报告用途模糊、资源长期无法持续，启动价值就需要重新判断。",
      "常见误区是把 CNAS认可当作通用品牌动作，觉得同行在做就一定要跟进。另一种误判是只看到拿到认可后的收益，却没有评估后续维护、监督评审和持续改进的负担。",
      "建议先回答三件事：检测结果给谁看、首批范围落在哪、企业愿不愿意为持续运行投入资源。能答清楚这三件事，再谈启动更稳。",
    ),
    checklist: [
      "检测活动是否稳定且能长期持续",
      "报告用途是否明确且确实需要外部认可",
      "企业是否愿意为人员、设备、体系和监督评审持续投入",
      "首批范围是否能先从高价值项目收敛开始",
    ],
    faqs: [
      {
        question: "只有客户提到过 CNAS认可，就一定要马上做吗？",
        answer: "不一定。先判断报告用途和检测活动是否稳定，再决定是否启动更合理。",
      },
      {
        question: "生产企业自有实验室适合做 CNAS认可吗？",
        answer: "如果检测项目稳定、结果需要对外或对内形成高可信决策，通常更值得判断启动。",
      },
    ],
    related: ["before-cnas-three-judgments", "when-to-delay-cnas", "what-is-cnas"],
    seoTitle: "什么样的企业：更适合启动CNAS认可？",
    seoDescription: "判断哪些企业更适合启动 CNAS认可，重点看检测需求、报告用途和持续投入能力。",
  },
  {
    slug: "when-to-delay-cnas",
    title: "哪些情况要暂缓：现在不建议做CNAS认可",
    summary: "有些企业不是不能做，而是现在启动的顺序不对，越急着推进越容易把问题留到后面返工。",
    category: "cnas-risk",
    tags: ["暂缓启动", "风险诊断", "启动判断", "返工风险"],
    keywords: ["哪些情况不建议做CNAS", "现在适合做CNAS吗", "CNAS暂缓启动", "CNAS启动风险"],
    updatedAt: "2026-05-06",
    answer: "如果检测需求不清、认可范围发散、基础资源明显不足或管理层只想要结果不愿维护运行，通常不建议马上启动 CNAS认可。",
    content: buildDecisionSections(
      "企业常见的判断错误，不是完全没有条件却盲目启动，而是把“以后可能要做”误判成“现在就该做”。一旦启动太早，后面的建设、记录、授权和整改都会变成反复补洞。",
      "现在是否适合启动，关键看四点：检测需求是否明确、首批范围能不能收敛、基础资源能不能补齐、管理层是否接受持续投入。只要其中一项明显失真，就该先暂停，而不是硬推进。",
      "最常见的误区是把暂缓理解成放弃，或者觉得先启动后面再补更快。事实上，很多返工都不是因为企业不努力，而是因为前面的判断没有做完，后面只能边做边推翻。",
      "建议先把不确定项列清楚：需求、范围、设备、人员、环境、预算、运行记录。不能闭环的地方先补条件，能闭环的部分再决定是否分阶段启动。",
    ),
    checklist: [
      "检测需求是否仍在频繁变化",
      "首批范围是否已经能够收敛到具体项目",
      "关键设备、人员和环境短板是否有明确补齐路径",
      "管理层是否接受试运行、整改和持续改进投入",
    ],
    faqs: [
      {
        question: "暂缓启动是不是等于这件事做不成？",
        answer: "不是。暂缓的目的，是先把条件补齐，避免后面反复返工。",
      },
      {
        question: "最容易导致现在不适合启动的原因是什么？",
        answer: "通常是检测需求和首批范围都还没定清楚，后面的建设自然很难稳定。",
      },
    ],
    related: ["suitable-companies-for-cnas", "why-cnas-assessment-fails", "before-cnas-three-judgments"],
    seoTitle: "哪些情况要暂缓：现在不建议做CNAS认可",
    seoDescription: "说明哪些情况下不建议马上启动 CNAS认可，以及为什么很多返工都源于启动过早。",
  },
  {
    slug: "why-cnas-assessment-fails",
    title: "评审为什么会失败：问题通常出在哪个环节？",
    summary: "评审失败很少是当天突然发生的问题，更多是前面能力和证据没有真正形成闭环。",
    category: "cnas-risk",
    tags: ["评审失败", "评审风险", "整改闭环", "返工风险"],
    keywords: ["CNAS评审为什么会失败", "CNAS评审不通过原因", "CNAS整改", "CNAS评审风险"],
    updatedAt: "2026-05-06",
    answer: "CNAS 评审失败的根因通常不在评审当天，而在范围设定、试运行、记录追溯和人员授权等关键环节没有提前做好。",
    content: buildDecisionSections(
      "很多企业把评审失败理解成评审当天表现不好，或者个别文件没准备全。但真正影响结果的，往往是前期没有形成稳定能力，导致现场一问就露出证据链断点。",
      "评审失败最常见的落点有四类：范围设得太大、人员设备方法对应不上、体系运行记录不连续、整改思路只停留在补文件。只要其中一类在现场被放大，就可能影响整体判断。",
      "常见误区是把问题归咎于评审严格，或者觉得只要临时补齐材料就能过关。评审关注的是实验室到底会不会做、能不能追溯、遇到问题有没有真实改进，而不是材料摆得漂不漂亮。",
      "建议在申请前先做一次基于现场逻辑的风险排查，重点核对范围、能力、记录和问询链条。问题越早暴露，整改成本越低，也越不容易在正式评审时被动。",
    ),
    checklist: [
      "首批范围是否超出当前真实能力边界",
      "人员授权、设备状态和方法确认是否能一一对应",
      "原始记录、质控记录和报告是否能完整追溯",
      "内审发现的问题是否已经形成有效整改闭环",
    ],
    faqs: [
      {
        question: "评审失败后还能继续整改吗？",
        answer: "通常可以，但关键是先找到根因，而不是只对不符合项做表面修补。",
      },
      {
        question: "什么问题最容易在现场被评审员追问？",
        answer: "范围与能力是否匹配、记录是否真实连续、人员是否具备对应授权和能力，是最常被追问的三类问题。",
      },
    ],
    related: ["cnas-application-mistakes", "cnas-risk", "cnas-required-documents"],
    seoTitle: "评审为什么会失败：问题通常出在哪个环节？",
    seoDescription: "分析 CNAS 评审失败最常见的根因，并说明问题通常不是在评审当天才出现。",
  },
  {
    slug: "can-start-cnas-before-lab-ready",
    title: "实验室没建好：能不能先做CNAS认可？",
    summary: "可以提前规划，但不能把“还在建设中”误当成“已经具备申请条件”。",
    category: "cnas-lab",
    tags: ["实验室建设", "建设时机", "能力建设", "CNAS认可"],
    keywords: ["实验室没建好能不能做CNAS", "实验室建设 CNAS", "CNAS实验室准备", "CNAS启动时机"],
    updatedAt: "2026-05-06",
    answer: "实验室没建好时，可以先做范围规划和差距判断，但不建议在关键能力还没成型前直接进入正式申请。",
    content: buildDecisionSections(
      "很多企业想一边建设实验室，一边尽快推进 CNAS认可，担心前期不同时做会浪费时间。这个想法本身没问题，问题在于有没有把“可以规划”和“可以申请”区分开。",
      "如果实验室还在搭框架阶段，最适合做的是需求梳理、范围规划、设备环境清单和建设顺序判断。只有当关键设备、环境条件、人员能力和基础记录都进入真实运行后，才适合往申请方向推进。",
      "常见误区是把文件先写出来，就认为实验室已经具备能力；或者把装修和设备到位等同于准备完成。评审最终看的是能力是否稳定运行，而不是建设是否接近完成。",
      "建议把工作分成两段：前段解决建设方向是否正确，后段解决运行证据是否形成。这样既不会拖慢前期决策，也不会在条件不足时把后续推到高风险状态。",
    ),
    checklist: [
      "检测项目和标准方法是否已经明确到首批范围层面",
      "关键设备、环境和样品管理条件是否已进入可运行状态",
      "人员授权和培训记录是否开始形成",
      "体系文件和原始记录是否能跟真实运行同步沉淀",
    ],
    faqs: [
      {
        question: "实验室还在装修，能不能先准备体系文件？",
        answer: "可以先搭框架，但文件内容最好跟真实流程同步，不建议完全脱离现场先写死。",
      },
      {
        question: "设备还没全部到位，能不能先做申请准备？",
        answer: "可以先做差距判断和资料清单，但不建议把未形成的能力当成已具备条件去推进申请。",
      },
    ],
    related: ["lab-construction", "when-to-delay-cnas", "cnas-recognition-process-entry"],
    seoTitle: "实验室没建好：能不能先做CNAS认可？",
    seoDescription: "解释实验室尚未建好时哪些工作可以先做，哪些节点不适合直接进入 CNAS认可申请。",
  },
  {
    slug: "cnas-required-documents",
    title: "准备申请前：CNAS认可需要哪些资料？",
    summary: "资料不是越多越好，关键是每一类材料都要能对应真实能力、范围和运行证据。",
    category: "cnas-process",
    tags: ["申请资料", "资料准备", "申请流程", "体系运行"],
    keywords: ["CNAS认可需要准备哪些资料", "CNAS申请资料", "CNAS认可资料", "CNAS文件清单"],
    updatedAt: "2026-05-06",
    answer: "CNAS认可准备资料时，关键不是凑齐模板，而是形成能对应认可范围、人员设备方法和运行证据的成套材料。",
    content: buildDecisionSections(
      "企业问资料清单时，往往希望先把文件一次性收齐再开始推进。但如果范围、方法和运行逻辑还没定好，资料准备再快，也很容易后面整套重改。",
      "更稳妥的判断方式，是把资料分成四类来看：范围与申请信息、人员与设备基础、体系文件与记录、试运行与质量控制证据。每类材料都要回答一个问题：它能不能证明实验室真的具备对应能力。",
      "最常见的误区是先找模板，再反推实验室怎么配合；或者资料收得很全，但彼此之间对不上。比如范围写得很大，设备台账和人员授权却只覆盖其中一部分，这类问题最容易在后面集中暴露。",
      "建议先列一版按范围倒推的资料目录，再逐项核对谁负责、是否真实存在、是否能追溯。资料准备是整理证据，不是凭空生成证据。",
    ),
    checklist: [
      "申请范围和检测项目是否已经明确",
      "人员能力、设备状态和环境条件资料是否可追溯",
      "体系文件是否能对应真实作业流程",
      "试运行、质控、内审和管理评审资料是否已形成基础记录",
    ],
    faqs: [
      {
        question: "CNAS认可资料是不是越齐越安全？",
        answer: "不是。关键是材料之间要彼此对应，能证明真实能力，而不是数量越多越好。",
      },
      {
        question: "没有试运行记录，能先把申请资料交上去吗？",
        answer: "通常不建议。没有试运行证据，后面很难支撑现场评审问询。",
      },
    ],
    related: ["cnas-application-mistakes", "cnas-process", "before-cnas-three-judgments"],
    seoTitle: "准备申请前：CNAS认可需要哪些资料？",
    seoDescription: "按范围、人员设备、体系文件和运行证据四类拆解 CNAS认可资料准备逻辑。",
  },
  {
    slug: "cnas-application-mistakes",
    title: "正式申请前：哪些误区最容易让企业返工？",
    summary: "很多返工不是因为工作量不够，而是因为前面的判断顺序错了，越做越偏。",
    category: "cnas-process",
    tags: ["申请误区", "申请流程", "返工风险", "认可范围"],
    keywords: ["CNAS申请常见误区", "CNAS认可误区", "CNAS返工原因", "CNAS申请风险"],
    updatedAt: "2026-05-06",
    answer: "正式申请前最容易让企业返工的误区，通常集中在范围设定、证据准备、启动时机和预算判断四个方面。",
    content: buildDecisionSections(
      "很多企业在正式申请前其实已经投入了不少时间，但一到梳理范围、整理资料、准备现场演示时，还是发现大量内容需要重来。这说明问题不一定出在执行不认真，而是前面的判断没有做完。",
      "最该优先判断的是：首批范围是否合理、能力是否已真实运行、资料是否能一一对应、预算和时间是否能支撑闭环。只要这几个问题没答清，后面的申请动作越快，返工成本反而越高。",
      "常见误区包括：范围一开始铺得太大、把模板材料当成真实体系、把设备到位等同于能力到位、把申请提交当成进度完成。它们共同的问题都是顺序错了，先做了结果动作，后补基础条件。",
      "建议在正式申请前做一次“反向检查”：如果现在就接受现场问询，哪些问题最回答不稳。把这些点先补齐，再进入正式申请，通常比盲目冲进度更省力。",
    ),
    checklist: [
      "首批范围是否与现有能力边界一致",
      "关键记录是否能支撑现场追溯和问询",
      "人员授权、设备状态和方法确认是否已闭环",
      "预算和周期是否已经覆盖整改阶段",
    ],
    faqs: [
      {
        question: "首批范围是不是报得越多越划算？",
        answer: "通常不是。范围越大，对人员、设备、记录和现场问询的要求就越重，返工风险也会同步放大。",
      },
      {
        question: "正式申请前最值得做的一次检查是什么？",
        answer: "站在现场评审角度，反查范围、能力、记录和问询链条是否能顺下来。",
      },
    ],
    related: ["why-cnas-assessment-fails", "cnas-required-documents", "cnas-recognition-process-entry"],
    seoTitle: "正式申请前：哪些误区最容易让企业返工？",
    seoDescription: "总结 CNAS 正式申请前最常见的判断误区，帮助企业减少范围、资料和证据链返工。",
  },
  {
    slug: "before-cnas-three-judgments",
    title: "启动前先判断：做CNAS认可要看哪三件事？",
    summary: "高转化决策内容的核心不是流程细节，而是启动前先判断需求、范围和资源这三件事。",
    category: "cnas-basic",
    tags: ["启动判断", "认可范围", "费用预算", "基础认知"],
    keywords: ["做CNAS之前必须判断的3件事", "CNAS启动判断", "CNAS认可前准备", "CNAS决策"],
    updatedAt: "2026-05-06",
    answer: "企业做 CNAS认可前，最该先判断的三件事是：有没有稳定需求、首批范围怎么收敛、资源能不能长期支撑运行。",
    content: buildDecisionSections(
      "很多企业在真正开始准备前，会同时搜费用、周期、流程和资料，但如果启动前的核心判断没做完，这些信息看得越多，决策反而越容易发散。",
      "最值得先回答的三件事是：为什么做、先做什么、靠什么做。也就是检测需求和报告用途是否明确，首批范围能不能收敛，人员设备环境和预算是否能接住后续运行与整改。",
      "常见误区是把这三件事拆开看，先问价格、再问时间、最后才问条件。这样会导致顺序倒置，看似拿到了很多信息，实际上仍然不知道自己现在是不是该启动。",
      "建议先把这三件事写成一页内部判断清单。能答清楚，再去看流程、资料和费用，信息才会真正帮你做决定，而不是只增加焦虑。",
    ),
    checklist: [
      "检测结果要服务谁，需求是否稳定",
      "首批范围是否已经能收敛到高价值项目",
      "人员、设备、环境和预算是否能覆盖试运行与整改",
      "管理层是否接受后续持续运行和监督评审投入",
    ],
    faqs: [
      {
        question: "为什么启动前要先判断，而不是先看流程？",
        answer: "因为流程是执行路径，判断才决定这条路径现在是不是适合你走。",
      },
      {
        question: "这三件事里哪一件最容易被忽略？",
        answer: "通常是资源是否能长期支撑运行，很多企业只看启动，不看后续维护。",
      },
    ],
    related: ["suitable-companies-for-cnas", "when-to-delay-cnas", "cnas-recognition-cost"],
    seoTitle: "启动前先判断：做CNAS认可要看哪三件事？",
    seoDescription: "用需求、范围和资源三件事，帮助企业在正式启动前先判断 CNAS认可是否值得现在推进。",
  },
  {
    slug: "what-is-cnas",
    title: "CNAS是什么？先看认可和实验室能力要求",
    summary: "理解 CNAS 不是从证书开始，而是从实验室能否稳定输出有效结果开始。",
    category: "cnas-basic",
    tags: ["CNAS认可", "实验室能力", "基础认知"],
    keywords: ["CNAS是什么", "CNAS认可", "CNAS认可", "实验室能力"],
    updatedAt: "2026-05-06",
    answer: "CNAS认可本质上是对实验室真实能力和体系运行能力的认可，而不是只看文件是否齐全。",
    content: buildDecisionSections(
      "很多企业第一次接触 CNAS 时，最容易把它理解成一张证书或者一次性项目。但如果只把注意力放在“拿到结果”上，就会忽略它背后对实验室真实能力的要求。",
      "更关键的判断是：实验室能不能稳定完成对应检测、结果能不能追溯、体系能不能长期运行。CNAS认可关注的是这些能力是否真实存在，并且可以被验证。",
      "常见误区是把 CNAS 和营销资质混在一起，或者把体系文件当成全部准备内容。只要基础能力没有建立起来，材料再完整，后面也很难真正支撑评审和持续运行。",
      "建议把 CNAS 理解成一次能力建设和运行规范化的判断过程。先理解认可对象和边界，再决定是否进入建设与申请阶段，会比直接追求结果更稳。",
    ),
    checklist: [
      "是否已经明确实验室要支撑哪些检测活动",
      "人员、设备、环境和方法是否能形成真实能力",
      "体系文件是否围绕实际运行设计而不是只为评审存在",
      "企业是否愿意接受后续持续改进和监督评审要求",
    ],
    faqs: [
      {
        question: "CNAS认可和 CNAS认可有什么区别？",
        answer: "CNAS认可是更专业的表达，CNAS认可是企业常见搜索词，实际通常指同一类认可准备场景。",
      },
      {
        question: "没有成熟实验室，也能先了解 CNAS 吗？",
        answer: "可以先了解判断逻辑，但是否启动要看实验室基础能否逐步补齐。",
      },
    ],
    related: ["before-cnas-three-judgments", "suitable-companies-for-cnas", "cnas-process"],
    seoTitle: "CNAS是什么？先看认可和实验室能力要求",
    seoDescription: "解释 CNAS 关注的不是单一证书结果，而是实验室能力、体系运行和可追溯证据。",
  },
  {
    slug: "cnas-process",
    title: "CNAS认可流程总览：每一步分别要做什么",
    summary: "流程总览的价值，不是给出固定步骤，而是帮助企业看清每一步要解决的核心判断。",
    category: "cnas-process",
    tags: ["申请流程", "体系运行", "现场评审", "启动判断"],
    keywords: ["CNAS流程", "CNAS申请流程", "CNAS认可流程", "现场评审"],
    updatedAt: "2026-05-06",
    answer: "CNAS认可通常要经历启动判断、范围规划、建设准备、体系试运行、正式申请和评审整改几个阶段。",
    content: buildDecisionSections(
      "企业看流程时，最怕的是信息碎片化：知道要内审、要管理评审、要现场评审，却不知道每个阶段真正要解决什么问题，结果常常是动作做了，判断没做。",
      "流程总览最重要的作用，是把每个阶段对应的核心判断串起来。启动阶段看适不适合做，规划阶段看范围怎么收敛，运行阶段看证据链能不能站得住，申请阶段看风险是不是已经降到可控。",
      "常见误区是把流程理解成一张时间表，觉得只要按顺序勾选动作就够了。实际上，同样做了内审和管理评审，有的企业是在发现问题，有的企业只是补了一次记录，结果完全不同。",
      "建议把流程当作问题清单来使用，而不是当作项目模板。每走到一步，都要先问这一步的判断是否清楚，再决定是否继续推进。",
    ),
    checklist: [
      "每个阶段的核心判断是否已经明确",
      "首批范围是否和后续建设动作保持一致",
      "试运行是否已经形成可追溯证据",
      "正式申请前的关键风险是否已被识别并处理",
    ],
    faqs: [
      {
        question: "流程里哪一步最容易被低估？",
        answer: "试运行和整改闭环最容易被低估，因为它们最考验真实能力，而不是表面进度。",
      },
      {
        question: "流程总览能不能代替具体实施计划？",
        answer: "不能。总览帮助判断方向，实施计划还要结合你的范围、资源和时间边界细化。",
      },
    ],
    related: ["cnas-recognition-process-entry", "cnas-required-documents", "cnas-cycle"],
    seoTitle: "CNAS认可流程总览：每一步分别要做什么",
    seoDescription: "从启动判断到评审整改，拆解 CNAS认可流程中每一步最核心的判断任务。",
  },
  {
    slug: "cnas-cost",
    title: "CNAS认可预算：费用通常花在哪些地方",
    summary: "预算判断的关键，不是先听报价，而是先知道哪些投入直接决定能力能不能跑起来。",
    category: "cnas-cost",
    tags: ["费用预算", "预算风险", "认可范围", "返工风险"],
    keywords: ["CNAS费用", "CNAS多少钱", "CNAS认可费用", "实验室建设成本"],
    updatedAt: "2026-05-06",
    answer: "做 CNAS认可时，预算通常花在实验室建设、设备校准、体系运行、能力验证和整改几个重点环节。",
    content: buildDecisionSections(
      "企业对费用最常见的焦虑，是不确定预算到底该从哪里开始算。只看一项支出会失真，只听一个总价又很难知道钱真正砸在了哪里。",
      "更有价值的判断，是把预算按能力建设路径拆开：哪些钱是搭基础，哪些钱是保证运行，哪些钱是为错误顺序买单。能看清这三层，预算才真正可控。",
      "常见误区是先买设备、后定项目，或者先按理想范围算预算，后面才发现人员、环境和方法根本跟不上。这样会把原本可以控制的投入，变成后续被动补救。",
      "建议预算先服务首批范围，而不是服务想象中的最终状态。先把关键能力做稳，再决定扩项和进一步投入，通常更符合真实业务节奏。",
    ),
    checklist: [
      "预算是否围绕首批范围而不是理想全范围",
      "建设、运行和整改成本是否分开估算",
      "设备和环境投入是否直接对应标准方法需求",
      "是否识别出会造成重复采购和重复改造的动作",
    ],
    faqs: [
      {
        question: "预算先看服务费还是先看设备环境？",
        answer: "通常先看范围和设备环境，因为那往往才是决定整体投入的主变量。",
      },
      {
        question: "预算紧张时，最该先保住什么？",
        answer: "先保住能支撑首批范围运行的关键能力，不要把钱平均摊在所有想做的方向上。",
      },
    ],
    related: ["cnas-recognition-cost", "cnas-cycle", "lab-construction"],
    seoTitle: "CNAS认可预算：费用通常花在哪些地方",
    seoDescription: "从建设、运行和整改三层看 CNAS认可预算，帮助企业判断哪些投入最值得优先保留。",
  },
  {
    slug: "cnas-cycle",
    title: "CNAS认可周期：进度通常卡在哪些环节",
    summary: "进度被拖慢时，问题往往不在排期本身，而在前面没收住的范围和没跑通的能力。",
    category: "cnas-cost",
    tags: ["周期评估", "进度评估", "申请流程", "返工风险"],
    keywords: ["CNAS周期", "CNAS多久", "CNAS认可周期", "认可进度"],
    updatedAt: "2026-05-06",
    answer: "CNAS认可周期最容易卡在范围反复、设备环境准备滞后、试运行不稳定和问题整改四类环节。",
    content: buildDecisionSections(
      "企业觉得周期慢，很多时候并不是单点动作慢，而是前面的判断没有稳定下来。范围反复一次，记录和资料就要跟着改一次，进度自然会被拉长。",
      "判断周期时，要先看卡点会不会反复出现。最典型的卡点包括：范围总在变、设备状态不稳定、试运行没有形成连续证据、内审发现问题后没有真正闭环。",
      "常见误区是把所有延迟都归咎于评审安排，或者认为多投入人手就能压缩周期。实际上，只要前面的能力和证据不稳，后面再快也只是把问题推到下一环节。",
      "建议先查最容易反复的点，而不是只催后面的节点。把会反复返工的卡点先压住，整体周期往往会比盲目赶进度更短。",
    ),
    checklist: [
      "范围是否仍在高频变化",
      "试运行记录是否已经连续形成",
      "设备校准、环境监控和人员授权是否到位",
      "内审和整改是否能真正减少后续问询风险",
    ],
    faqs: [
      {
        question: "周期被拖慢时，最先该查什么？",
        answer: "先查范围和运行记录是否稳定，因为这两项最容易带出连锁返工。",
      },
      {
        question: "压缩周期是不是一定会增加风险？",
        answer: "不是一定，但如果压缩的是试运行和问题闭环时间，风险通常会上升。",
      },
    ],
    related: ["cnas-recognition-cycle", "cnas-process", "why-cnas-assessment-fails"],
    seoTitle: "CNAS认可周期：进度通常卡在哪些环节",
    seoDescription: "总结 CNAS认可周期中最常见的进度卡点，帮助企业先找出会反复返工的环节。",
  },
  {
    slug: "cnas-risk",
    title: "CNAS评审风险：提前排查哪些关键问题",
    summary: "风险排查越早做，越容易发现哪些问题是能力短板，哪些只是表面症状。",
    category: "cnas-risk",
    tags: ["评审风险", "风险诊断", "整改闭环", "返工风险"],
    keywords: ["CNAS评审风险", "CNAS现场评审", "CNAS整改", "评审前检查"],
    updatedAt: "2026-05-06",
    answer: "CNAS评审风险最值得提前排查的，是范围与能力是否匹配、记录是否可追溯、体系是否真实运行。",
    content: buildDecisionSections(
      "很多评审风险看上去出现在现场，其实早在前期建设和试运行阶段就已经埋下了。只是在现场问询时，这些问题会被集中放大。",
      "提前排查时，最重要的不是发现得多，而是抓得准。范围是否超出真实能力、记录是否能追溯、人员授权是否对应项目、设备环境是否稳定支撑方法，这几类问题最该优先看。",
      "常见误区是把风险排查做成形式化打勾，或者只挑容易改的文件问题。真正会影响评审判断的，往往是人员、设备、方法、记录和运行之间的断点。",
      "建议用评审逻辑反推准备逻辑：评审会追问什么，就提前核对什么。这样排查出来的问题，才真正能降低现场不确定性。",
    ),
    checklist: [
      "范围、人员、设备、方法是否逐项对应",
      "原始记录、报告和质控记录是否能互相追溯",
      "体系文件是否已经在真实运行中被验证",
      "关键问题是否已经形成有证据的整改闭环",
    ],
    faqs: [
      {
        question: "风险排查和模拟评审是一回事吗？",
        answer: "不完全一样。模拟评审更像演练，风险排查更强调提前识别关键断点和优先级。",
      },
      {
        question: "什么时候做风险排查最有价值？",
        answer: "越接近正式申请越需要做，但最好在试运行阶段就开始，不要等到最后一次性补洞。",
      },
    ],
    related: ["why-cnas-assessment-fails", "cnas-application-mistakes", "cnas-process"],
    seoTitle: "CNAS评审风险：提前排查哪些关键问题",
    seoDescription: "从范围、记录、授权和运行证据四个层面，说明 CNAS评审风险最该提前排查什么。",
  },
  {
    slug: "lab-construction",
    title: "实验室建设：怎么衔接CNAS认可范围",
    summary: "实验室建设不是先把硬件堆起来，而是围绕首批认可范围反推人、机、料、法、环和记录。",
    category: "cnas-lab",
    tags: ["实验室建设", "认可范围", "能力建设", "范围规划"],
    keywords: ["实验室建设", "CNAS实验室", "认可范围规划", "实验室能力建设"],
    updatedAt: "2026-05-06",
    answer: "实验室建设如果不围绕认可范围展开，就很容易出现设备不匹配、环境过度改造和能力无法闭环的问题。",
    content: buildDecisionSections(
      "很多企业做实验室建设时，默认从场地、设备和装修开始，但如果缺少认可范围和方法要求的约束，这种建设顺序很容易把钱花在不关键的地方。",
      "真正决定建设方向的，是首批认可范围和对应标准方法。只有范围先收住，设备、环境、样品管理、记录要求和人员配置才知道该怎么配，不至于边建边推翻。",
      "常见误区是先按理想状态一次性建设，或者先凭经验买设备，后面再让范围适配已有条件。这样做表面上动作很快，实际上最容易留下结构性返工。",
      "建议从首批项目倒推建设优先级：先保证能形成真实检测能力，再决定哪些扩展能力后置。建设顺序对了，后面的体系运行和评审准备才会更顺。",
    ),
    checklist: [
      "首批认可范围是否已经明确到项目和方法层面",
      "设备与环境配置是否直接对应检测活动要求",
      "人员职责和样品管理流程是否同步规划",
      "记录和体系文件是否能跟建设进度同步沉淀",
    ],
    faqs: [
      {
        question: "实验室建设是不是越完整越好？",
        answer: "不一定。更重要的是先让首批范围对应的能力闭环，而不是一次性把所有理想能力都堆上去。",
      },
      {
        question: "已经买错一批设备，还有补救空间吗？",
        answer: "有，但要先重新收敛范围，再判断哪些设备能继续用，哪些投入应及时止损。",
      },
    ],
    related: ["can-start-cnas-before-lab-ready", "cnas-recognition-cost", "cnas-risk"],
    seoTitle: "实验室建设：怎么衔接CNAS认可范围",
    seoDescription: "说明实验室建设为什么要从认可范围倒推，避免设备、环境和流程配置出现结构性返工。",
  },
  {
    slug: "why-enterprises-rework-cnas",
    title: "为什么很多企业做CNAS会返工？",
    summary: "返工往往不是因为努力不够，而是启动太早、范围太散、顺序走反了。",
    category: "cnas-risk",
    tags: ["返工风险", "启动判断", "流程节点", "CNAS认可"],
    keywords: ["为什么很多企业做CNAS会返工", "CNAS返工", "CNAS认可返工原因", "CNAS路径错误"],
    updatedAt: "2026-05-06",
    answer: "很多企业做 CNAS 会返工，根因通常不是评审当天出问题，而是启动前没有把范围、投入和实施顺序判断清楚。",
    content: buildDecisionSections(
      "企业以为自己是在推进 CNAS，实际却是在边做边纠错。范围还没收住就开始写体系，设备还没规划就先采购，内部负责人还没明确就直接推进，都会让后面每一步都被迫重来。",
      "如果检测需求不稳定、首批范围不清晰、关键岗位无人负责、设备投入脱离整体规划，就不能把当前状态当成“已经适合启动”。这类项目不是做不下来，而是用错了起点。",
      "常见误区是把返工理解成细节没做好，或者以为后面再补一补就能追上。实际上，前面判断错一次，后面的体系、记录、设备和评审准备都会跟着错一次，返工范围会越滚越大。",
      `建议先把“为什么做、先做什么、谁来负责、预算能不能接住”四件事判断清楚，再进入建设和申请。${diagnosisActionHint}`,
    ),
    checklist: [
      "首批范围是否已经能收敛到明确项目",
      "内部是否有明确负责人牵头推进",
      "设备、体系和申请顺序是否已经理顺",
      "是否已经识别出最可能导致返工的环节",
    ],
    faqs: [
      {
        question: "返工最常从哪一步开始出现？",
        answer: "通常从范围和设备规划开始出现偏差，后面会一路传导到体系、记录和评审准备。",
      },
      {
        question: "返工是不是一定发生在评审后？",
        answer: "不是，很多返工在申请前就已经开始，只是企业当时还没意识到。",
      },
    ],
    related: ["when-to-delay-cnas", "cnas-first-step-is-judgment", "cnas-doing-it-wrong-costs-more"],
    seoTitle: "为什么很多企业做CNAS会返工？",
    seoDescription: "解释企业做 CNAS 时最常见的返工根因，重点看范围、顺序、设备投入和内部负责人判断。",
  },
  {
    slug: "cnas-doing-it-wrong-costs-more",
    title: "CNAS做错一步：为什么可能多花几十万",
    summary: "真正拉高成本的，往往不是单项服务费，而是错误顺序带来的重复采购、重复改造和重复整改。",
    category: "cnas-cost",
    tags: ["费用控制", "返工风险", "费用预算", "实验室规划"],
    keywords: ["CNAS做错一步可能多花几十万", "CNAS费用控制", "CNAS预算浪费", "CNAS投入返工"],
    updatedAt: "2026-05-06",
    answer: "CNAS 做错一步之所以可能多花很多钱，是因为错误决策常常会连带放大设备、环境、体系和整改四类成本。",
    content: buildDecisionSections(
      "很多企业以为多花钱是因为项目本身贵，实际上更常见的情况是：钱不是花在该花的地方，而是花在重复采购、范围推翻、环境重改和证据补做上。",
      "如果设备先买、范围后定，或者体系先写、现场后补，预算就很容易从一次投入变成两次甚至三次投入。能不能做，不只是看总价，更要看顺序对不对。",
      "常见误区是觉得“先动起来总比不动好”，先把明显动作做掉，后面再修正细节。但 CNAS 的很多细节本身就是成本开关，一旦方向错了，后面的每次修正都在加钱。",
      `建议先把首批范围、设备边界、建设顺序和负责人定清楚，再安排预算。控制费用最有效的方法，不是压单价，而是减少返工。${diagnosisActionHint}`,
    ),
    checklist: [
      "预算是否已经拆到范围、设备、环境和整改层面",
      "设备采购是否已经和标准方法对应",
      "是否识别出最可能重复花钱的环节",
      "负责人是否知道哪些投入现在该做、哪些应后置",
    ],
    faqs: [
      {
        question: "哪类错误最容易直接放大预算？",
        answer: "设备先买后规划、环境先改后定范围，是最容易直接放大预算的两类错误。",
      },
      {
        question: "控制费用是不是等于尽量少投入？",
        answer: "不是。更关键的是让投入顺序正确，避免把钱花在后面要推翻的动作上。",
      },
    ],
    related: ["cnas-recognition-cost", "lab-not-planned-cannot-start-cnas", "why-enterprises-rework-cnas"],
    seoTitle: "CNAS做错一步：为什么可能多花几十万",
    seoDescription: "从设备采购、范围推翻、环境改造和整改补做四个角度，解释 CNAS 为什么做错一步就会放大成本。",
  },
  {
    slug: "which-companies-should-not-start-cnas-now",
    title: "哪些企业不建议现在做CNAS？",
    summary: "不是所有企业都适合现在启动，越早识别不适合的情况，越能减少后面的人力和预算浪费。",
    category: "cnas-basic",
    tags: ["启动判断", "暂缓启动", "适用企业", "返工风险"],
    keywords: ["哪些企业不建议现在做CNAS", "不建议做CNAS的企业", "CNAS启动判断", "CNAS适合谁做"],
    updatedAt: "2026-05-06",
    answer: "如果需求不稳定、范围说不清、资源接不住或内部无人负责，通常不建议企业现在就启动 CNAS。",
    content: buildDecisionSections(
      "有些企业并不是永远不适合做，而是现在的条件还不够稳定。检测需求还在变化、内部职责还没划清、预算只够启动不够运行，这类状态下硬推进，后面往往会一路补洞。",
      "判断“现在不建议做”的关键，不是看企业规模大小，而是看检测活动是否稳定、首批范围能否收敛、资源是否能补齐、后续运行是否有人接住。只要其中一项明显失真，就更适合先暂停。",
      "常见误区是把暂缓理解成放弃，或者觉得先申请再慢慢补会更快。事实上，对很多企业来说，最省成本的动作反而是先停一下，把路径判断对。",
      `建议把需求、范围、资源和负责人四个点先写清楚，再决定是否现在启动。能判断清楚，再推进会更稳。${diagnosisActionHint}`,
    ),
    checklist: [
      "检测需求是否仍在频繁变化",
      "首批范围是否已经能落到具体项目",
      "预算是否覆盖运行与整改而不只是启动动作",
      "内部是否已经明确负责人和协同边界",
    ],
    faqs: [
      {
        question: "不建议现在做，是不是以后也没必要做？",
        answer: "不是，很多企业只是当前条件不稳定，补齐条件后再做会更顺。",
      },
      {
        question: "最该先暂停的情况是什么？",
        answer: "需求和范围都还没收住，却已经准备投入设备和申请动作时，最该先暂停判断。",
      },
    ],
    related: ["when-to-delay-cnas", "check-four-points-before-cnas", "suitable-companies-for-cnas"],
    seoTitle: "哪些企业不建议现在做CNAS？",
    seoDescription: "从需求、范围、资源和负责人四个判断点，说明哪些企业当前不建议直接启动 CNAS。",
  },
  {
    slug: "lab-not-planned-cannot-start-cnas",
    title: "实验室没规划好：为什么不能直接做CNAS",
    summary: "实验室规划没完成就直接推进，最容易把设备、环境和体系一起拖进返工状态。",
    category: "cnas-lab",
    tags: ["实验室规划", "实验室建设", "返工风险", "认可范围"],
    keywords: ["实验室没规划好为什么不能直接做CNAS", "实验室规划 CNAS", "CNAS实验室规划", "CNAS实验室建设"],
    updatedAt: "2026-05-06",
    answer: "实验室没规划好时直接做 CNAS，最大的问题不是慢，而是会把后面所有动作都建立在不稳定前提上。",
    content: buildDecisionSections(
      "实验室规划包含的不只是装修和设备清单，还包括认可范围、方法要求、样品流转、人员职责和记录路径。如果这些前提还没定，后面的每一步都会因为基础不稳而被迫调整。",
      "能不能直接做，关键看实验室是不是已经知道首批项目是什么、设备环境怎么配、谁负责运行、记录怎么沉淀。只要这些判断还没形成，就不该把当前状态当成“已准备好”。",
      "常见误区是把“开始建设”理解成“可以同步申请”，或者把“设备大致确定”理解成“能力边界已经稳定”。这两种误判都会让后面的体系和评审准备失去抓手。",
      `建议先把实验室规划做成一张范围到资源的对应表，再决定哪些动作先做、哪些动作后做。路径先稳住，建设才不会越做越乱。${diagnosisActionHint}`,
    ),
    checklist: [
      "首批项目、方法和报告用途是否已经明确",
      "设备、环境和样品流转路径是否已经规划",
      "内部负责人和关键岗位是否已经确定",
      "体系和记录将如何跟现场同步沉淀是否已想清楚",
    ],
    faqs: [
      {
        question: "实验室规划主要看什么，不只是场地吗？",
        answer: "不只是场地，还要看范围、方法、人员、设备、环境和记录如何一起闭环。",
      },
      {
        question: "如果已经在买设备了，还来得及补规划吗？",
        answer: "来得及，但越早补越好，否则后面要调整的不只是设备，还会连带影响体系和预算。",
      },
    ],
    related: ["lab-construction", "can-start-cnas-before-lab-ready", "cnas-doing-it-wrong-costs-more"],
    seoTitle: "实验室没规划好：为什么不能直接做CNAS",
    seoDescription: "解释实验室规划不完整时为什么不适合直接推进 CNAS，并说明最容易连带返工的几个环节。",
  },
  {
    slug: "cnas-first-step-is-judgment",
    title: "做CNAS第一步：不是申请，而是先判断",
    summary: "真正决定后面顺不顺的，不是申请动作本身，而是你有没有先把路径判断对。",
    category: "cnas-process",
    tags: ["启动判断", "申请流程", "流程节点", "CNAS认可"],
    keywords: ["做CNAS第一步不是申请而是判断", "CNAS第一步", "CNAS申请前判断", "CNAS路径判断"],
    updatedAt: "2026-05-06",
    answer: "做 CNAS 的第一步不是先准备申请材料，而是先判断需求、范围、资源和顺序是否已经具备启动条件。",
    content: buildDecisionSections(
      "很多企业一提到 CNAS，就默认第一步是找资料、写体系、准备申请。但真正决定后面效率的，往往不是动作做得快不快，而是前面有没有把路径判断清楚。",
      "如果需求还不稳定、范围还没收敛、设备还未规划、负责人还没到位，那就不能把申请当作第一步。对这类项目来说，先判断比先申请更重要。",
      "常见误区是觉得只要进入申请阶段，项目就算开始了；或者以为后面的建设问题可以在推进中顺手补齐。这样做表面上进度在走，实际上风险也在一起累积。",
      `建议把第一步改成一次完整判断：为什么做、先做什么、谁来推进、哪些条件还没到位。第一步判断对了，后面的流程才会真正顺起来。${diagnosisActionHint}`,
    ),
    checklist: [
      "需求和报告用途是否已经明确",
      "首批范围是否已经能收敛",
      "设备、负责人和预算是否已具备基础",
      "是否已经知道最容易卡住的流程节点在哪里",
    ],
    faqs: [
      {
        question: "如果不是先申请，那第一步最该产出什么？",
        answer: "最该先产出的是一份启动判断，而不是一套表面完整的申请资料。",
      },
      {
        question: "判断这一步会不会拖慢进度？",
        answer: "通常不会，反而能减少后面更大范围的返工和停滞。",
      },
    ],
    related: ["cnas-recognition-process-entry", "before-cnas-three-judgments", "check-four-points-before-cnas"],
    seoTitle: "做CNAS第一步：不是申请，而是先判断",
    seoDescription: "说明为什么做 CNAS 的第一步不该是申请，而应该先完成需求、范围和资源判断。",
  },
  {
    slug: "manufacturing-enterprise-cnas-path",
    title: "制造企业做CNAS：真实路径通常怎么走",
    summary: "制造企业最容易把 CNAS 做成单点项目，但真实路径通常要从需求、范围、建设和运行一步步收住。",
    category: "cnas-process",
    tags: ["真实路径", "流程节点", "实验室规划", "启动判断"],
    keywords: ["一家制造企业做CNAS的真实路径", "制造企业做CNAS", "制造企业CNAS认可", "CNAS真实路径"],
    updatedAt: "2026-05-06",
    answer: "制造企业做 CNAS 的真实路径，通常是先判断检测需求和报告用途，再收敛范围、规划实验室、形成运行证据，最后才进入申请与评审。",
    content: buildDecisionSections(
      "制造企业的检测场景往往同时牵涉出厂检验、研发验证、客户验厂和内部质量控制，如果不先厘清这些需求，CNAS 很容易被做成一个看上去很大、实际上没人能稳稳接住的项目。",
      "更合理的路径通常是：先判断为什么做，再确定首批项目，然后围绕这些项目规划设备、环境、负责人和记录路径。等实验室真实跑起来，再进入申请与评审准备。",
      "常见误区是把制造企业的项目一口气全报进去，或者因为内部有实验室就默认已经具备条件。制造场景的问题往往不在有没有实验室，而在实验室能力和业务需求是否真的一一对应。",
      `建议制造企业先从高价值、最稳定的检测项目开始，按阶段推进能力建设和范围扩展。先让第一段路径跑通，再谈放大。${diagnosisActionHint}`,
    ),
    checklist: [
      "哪些检测项目最稳定、最值得先做",
      "报告用途是内部决策、客户要求还是对外证明",
      "实验室规划是否已经围绕首批项目展开",
      "后续扩项和维护是否已经有人负责承接",
    ],
    faqs: [
      {
        question: "制造企业是不是一定要一次性把项目报全？",
        answer: "通常不建议，一次性报全往往会把最不稳定的项目和最大风险一起带进去。",
      },
      {
        question: "制造企业现有实验室算不算天然优势？",
        answer: "算基础优势，但不等于已经具备认可条件，仍要看范围、记录和运行证据是否匹配。",
      },
    ],
    related: ["suitable-companies-for-cnas", "lab-not-planned-cannot-start-cnas", "cnas-first-step-is-judgment"],
    seoTitle: "制造企业做CNAS：真实路径通常怎么走",
    seoDescription: "从检测需求、首批范围、实验室规划和运行证据四步，拆解制造企业做 CNAS 的真实推进路径。",
  },
  {
    slug: "three-things-before-cnas-start",
    title: "做CNAS前必须搞清：范围、预算和负责人",
    summary: "很多企业不是信息不够，而是关键问题没抓准。启动前最该先看的是范围、预算和负责人这三件事。",
    category: "cnas-basic",
    tags: ["启动判断", "费用控制", "实验室规划", "基础认知"],
    keywords: ["做CNAS前必须搞清的3件事", "CNAS启动前准备", "CNAS判断重点", "CNAS负责人"],
    updatedAt: "2026-05-06",
    answer: "做 CNAS 前必须先搞清的三件事是：首批范围怎么收、预算能不能接、内部由谁真正负责推进。",
    content: buildDecisionSections(
      "企业往往会同时去看流程、费用、资料和周期，但如果范围、预算和负责人这三件事没有先定下来，后面拿到再多信息也很难变成真正可执行的计划。",
      "首批范围决定做什么，预算决定能走多远，负责人决定后面谁来真正把体系、现场和协调动作接起来。三者缺一，项目都会在中途出现明显停顿或返工。",
      "常见误区是只谈范围不谈预算，只谈预算不谈负责人，或者把负责人理解成挂名协调而不是实际推进者。这样看上去项目在启动，实际却没有稳定抓手。",
      `建议启动前先把这三件事写成一页内部判断清单，再决定要不要现在推进。三件事越早明确，后面的路径越不容易失控。${diagnosisActionHint}`,
    ),
    checklist: [
      "首批范围是否已经能收敛到明确项目",
      "预算是否覆盖建设、运行和整改",
      "负责人是否具备跨部门推动能力",
      "三件事之间是否已经形成一致的启动节奏",
    ],
    faqs: [
      {
        question: "为什么负责人也算启动前必须判断的一件事？",
        answer: "因为没有明确负责人时，很多关键决策只能停留在讨论层面，后面很难形成持续推进。",
      },
      {
        question: "三件事里最容易被忽略的是哪一件？",
        answer: "通常是负责人，很多企业默认谁都能推进，结果后来谁都接不住。",
      },
    ],
    related: ["before-cnas-three-judgments", "cnas-first-step-is-judgment", "which-companies-should-not-start-cnas-now"],
    seoTitle: "做CNAS前必须搞清：范围、预算和负责人",
    seoDescription: "从范围、预算和负责人三件事出发，帮助企业在做 CNAS 前先抓住真正影响启动质量的关键点。",
  },
  {
    slug: "check-four-points-before-cnas",
    title: "不确定能不能做CNAS？先看这4点",
    summary: "当你还拿不准要不要启动时，最有价值的不是继续搜更多信息，而是先看四个最关键的判断点。",
    category: "cnas-basic",
    tags: ["启动判断", "流程节点", "返工风险", "CNAS认可"],
    keywords: ["不确定能不能做CNAS先看这4点", "CNAS启动判断", "CNAS适合启动吗", "CNAS前置判断"],
    updatedAt: "2026-05-06",
    answer: "不确定能不能做 CNAS 时，最值得先看的是需求是否稳定、范围是否收住、资源是否接得住、负责人是否明确。",
    content: buildDecisionSections(
      "很多企业在还没想清楚要不要启动时，会先去搜更多资料、更多价格、更多流程。问题是，信息越多不一定越清楚，关键还是要先看是不是已经具备启动条件。",
      "四个最关键的判断点是：检测需求稳不稳、首批范围能不能收、设备和预算接不接得住、内部有没有明确负责人。四点里只要有两点明显不稳，就不建议直接推进。",
      "常见误区是把不确定理解成资料还没看够，继续搜就会有答案。实际上，很多不确定不是知识问题，而是内部条件还没有成形。",
      `建议先用这四点做一次快速自查，再决定是进入规划、暂缓启动，还是先补条件。先判断再行动，通常更容易走对路。${diagnosisActionHint}`,
    ),
    checklist: [
      "检测需求和报告用途是否稳定",
      "首批范围是否已经能落到具体项目",
      "设备、预算和环境条件是否接得住",
      "内部负责人和推进节奏是否已经明确",
    ],
    faqs: [
      {
        question: "四点里有一两点不确定，还能继续推进吗？",
        answer: "可以先做更细的判断，但不建议直接进入正式申请或大额投入。",
      },
      {
        question: "如果四点都比较模糊，最先该做什么？",
        answer: "最先该做的是把需求和范围梳理清楚，因为后面所有动作都要围绕这两点展开。",
      },
    ],
    related: ["which-companies-should-not-start-cnas-now", "cnas-first-step-is-judgment", "why-enterprises-rework-cnas"],
    seoTitle: "不确定能不能做CNAS？先看这4点",
    seoDescription: "用需求、范围、资源和负责人四个判断点，帮助企业先看自己是否适合现在启动 CNAS。",
  },
];

// ========== 第四部分：兼容导出与查询函数 ==========
export const articles: Article[] = articleSources.map((article) =>
  createArticle({
    ...article,
    industries: article.industries ?? articleIndustryMap[article.slug] ?? [],
  }),
);

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string) {
  return articles.filter((article) => article.category === category);
}

export function getArticlesByTag(tag: string) {
  return articles.filter((article) => article.tags.includes(tag));
}

export function getRelatedArticles(article: Article) {
  return (article.related ?? [])
    .map((slug) => getArticleBySlug(slug))
    .filter((item): item is Article => Boolean(item));
}

export function getArticlesByIndustries(industrySlugs: string[] = [], excludeSlug?: string, limit = 3) {
  if (!industrySlugs.length) {
    return articles
      .filter((article) => article.slug !== excludeSlug)
      .slice(0, limit);
  }

  const matched = articles.filter(
    (article) =>
      article.slug !== excludeSlug &&
      article.industries?.some((industry) => industrySlugs.includes(industry)),
  );

  if (matched.length >= limit) {
    return matched.slice(0, limit);
  }

  const fallback = articles.filter(
    (article) => article.slug !== excludeSlug && !matched.some((item) => item.slug === article.slug),
  );

  return [...matched, ...fallback].slice(0, limit);
}

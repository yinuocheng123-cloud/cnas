/*
 * 文件说明：该文件维护 CNAS 专业知识库文章数据。
 * 功能说明：提供可持续扩展的文章模型、文章列表和查询函数，Demo 阶段替代数据库内容表。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：文章数据
 *   第三部分：查询函数
 */

// ========== 第一部分：类型定义 ==========
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  keywords: string[];
  updatedAt: string;
  answer: string;
  sections: {
    title: string;
    content: string;
  }[];
  checklist?: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  related?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

// ========== 第二部分：文章数据 ==========
export const articles: Article[] = [
  {
    slug: "what-is-cnas",
    title: "CNAS是什么？企业为什么要做CNAS认可？",
    description: "解释 CNAS认可的含义、企业价值，以及启动前必须判断的实验室能力基础。",
    category: "cnas-basic",
    tags: ["CNAS认可", "实验室能力", "基础认知"],
    keywords: ["CNAS是什么", "CNAS认可", "CNAS认证", "实验室能力"],
    updatedAt: "2026-04-29",
    answer: "CNAS认可（通常也称为CNAS认证）是对实验室真实检测能力和体系运行能力的认可。",
    sections: [
      {
        title: "一、CNAS认可解决的是信任问题",
        content:
          "企业启动 CNAS认可前，首先要理解它不是简单证书。CNAS认可关注实验室是否具备稳定、可追溯、可验证的检测能力，能不能让客户、供应链和内部质量管理相信检测结果。",
      },
      {
        title: "二、CNAS认可考验哪些能力",
        content:
          "CNAS认可会同时考验人员、设备、环境、方法、样品、记录、体系文件和持续改进。任何一个环节只停留在纸面，都可能在现场评审中暴露风险。",
      },
      {
        title: "三、企业为什么不能只看证书",
        content:
          "如果实验室能力没有建立起来，即使短期准备了材料，也难以支撑长期运行。企业真正需要判断的是：认可范围是否合理、资源是否匹配、体系是否能持续运行。",
      },
      {
        title: "四、启动前要先判断什么",
        content:
          "企业应先判断检测项目、标准方法、人员能力、设备环境、体系基础和预算边界。先诊断，再规划，再建设，比直接进入申请阶段更稳。",
      },
    ],
    checklist: [
      "是否已经明确要申请的检测项目和认可范围",
      "人员、设备、环境是否能支撑对应方法",
      "体系文件是否能服务真实运行，而不是只为评审存在",
      "管理层是否接受后续监督评审和持续改进投入",
    ],
    faqs: [
      {
        question: "CNAS认证和CNAS认可有什么区别？",
        answer: "CNAS认可是更专业的表达，CNAS认证是企业常用说法，两者在实际使用中通常指同一件事。",
      },
      {
        question: "企业没有实验室能不能直接申请CNAS？",
        answer: "通常不建议。企业需要先建立实验室能力、体系运行基础和必要记录，再判断是否进入申请阶段。",
      },
      {
        question: "CNAS是不是只要材料写好就可以？",
        answer: "不是。材料只是体系的一部分，评审会关注现场运行、人员能力、设备状态、原始记录和持续改进证据。",
      },
    ],
    related: ["cnas-process", "cnas-risk", "lab-construction"],
    seoTitle: "CNAS是什么？企业做CNAS认可前先看懂实验室能力",
    seoDescription: "CNAS认可不是简单证书结果，而是对实验室检测能力、体系运行和持续改进能力的认可。",
  },
  {
    slug: "cnas-process",
    title: "CNAS认可流程怎么走？企业做CNAS认证前必须了解的步骤",
    description: "说明 CNAS认可从诊断、规划、建设、体系运行到申请评审的完整路径。",
    category: "cnas-process",
    tags: ["申请流程", "体系运行", "现场评审"],
    keywords: ["CNAS流程", "CNAS申请流程", "CNAS认证流程", "现场评审"],
    updatedAt: "2026-04-29",
    answer: "CNAS认可（通常也称为CNAS认证）通常要经历诊断、规划、建设、体系运行、申请评审和整改。",
    sections: [
      {
        title: "一、先做可行性诊断",
        content:
          "流程起点不是提交申请，而是判断企业现在是否适合启动。诊断要看检测需求、认可范围、人员设备、环境条件、方法标准和预算边界。",
      },
      {
        title: "二、规划认可范围和建设路径",
        content:
          "认可范围决定后续人员、设备、环境和方法配置。范围过大容易造成投入失控，范围过小又可能无法支撑业务需求。",
      },
      {
        title: "三、建立体系并试运行",
        content:
          "体系文件建立后必须进入试运行，通过真实记录验证流程是否可执行。没有试运行证据，评审风险会明显增加。",
      },
      {
        title: "四、内审、管理评审与正式申请",
        content:
          "内审用于发现体系问题，管理评审用于确认资源、风险和改进方向。正式申请前，应完成关键不符合项整改。",
      },
      {
        title: "五、现场评审与整改闭环",
        content:
          "现场评审会核查文件、记录、人员能力、检测演示和环境设备。评审后需要按要求完成整改，并进入持续运行状态。",
      },
    ],
    checklist: [
      "是否完成启动前差距诊断",
      "认可范围是否与真实业务需求匹配",
      "体系是否至少经过一段真实试运行",
      "内审和管理评审是否发现并处理关键风险",
    ],
    faqs: [
      {
        question: "CNAS认证和CNAS认可有什么区别？",
        answer: "CNAS认可是更专业的表达，CNAS认证是企业常用说法，两者在实际使用中通常指同一件事。",
      },
      {
        question: "CNAS认可最快多久可以完成？",
        answer: "周期取决于基础条件。已有成熟实验室会更快，从零建设则要为规划、建设、试运行和整改预留时间。",
      },
      {
        question: "可以边建设实验室边准备CNAS吗？",
        answer: "可以同步规划，但不建议跳过能力建设直接写材料。体系要和真实建设同步校准。",
      },
      {
        question: "流程中最容易被低估的环节是什么？",
        answer: "试运行、内审和整改闭环最容易被低估，但这些环节直接影响现场评审可信度。",
      },
    ],
    related: ["what-is-cnas", "cnas-risk", "cnas-cycle"],
    seoTitle: "CNAS认可流程怎么走？启动前准备与现场评审路径",
    seoDescription: "拆解 CNAS认可流程：诊断、规划、建设、体系运行、申请、现场评审和整改。",
  },
  {
    slug: "cnas-cost",
    title: "CNAS认可费用多少？企业做CNAS认证前要看哪些成本？",
    description: "拆解 CNAS 费用构成，说明建设、设备、人员、体系运行和辅导支持的成本逻辑。",
    category: "cnas-cost",
    tags: ["费用预算", "投入重点", "预算风险"],
    keywords: ["CNAS费用", "CNAS多少钱", "CNAS认证费用", "实验室建设成本"],
    updatedAt: "2026-04-29",
    answer: "CNAS认可（通常也称为CNAS认证）费用取决于实验室基础、认可范围、设备环境和整改成本。",
    sections: [
      {
        title: "一、为什么不能简单报价",
        content:
          "不同企业的检测项目、场地条件、设备基础和人员能力差异很大。只问服务费用，容易忽略真正决定预算的实验室建设和体系运行成本。",
      },
      {
        title: "二、主要费用构成",
        content:
          "费用通常包括实验室建设或改造、设备采购与校准、环境控制、人员培训、体系运行、能力验证、申请评审和整改投入。",
      },
      {
        title: "三、先买设备可能造成浪费",
        content:
          "设备应从检测项目、标准方法和认可范围倒推。先采购再规划，容易出现设备不匹配、重复投入或后续改造成本增加。",
      },
      {
        title: "四、如何控制预算风险",
        content:
          "先做能力范围规划和差距诊断，再决定建设顺序。敢于先讲风险和边界，反而能帮助企业减少盲目投入。",
      },
    ],
    checklist: [
      "是否区分建设成本、设备成本、体系运行成本和辅导成本",
      "是否已经确定认可范围再采购设备",
      "是否预留能力验证、整改和持续运行预算",
      "是否识别了可能重复投入的环节",
    ],
    faqs: [
      {
        question: "CNAS认证和CNAS认可有什么区别？",
        answer: "CNAS认可是更专业的表达，CNAS认证是企业常用说法，两者在实际使用中通常指同一件事。",
      },
      {
        question: "CNAS认可有没有固定报价？",
        answer: "没有适用于所有企业的固定报价。合理预算必须基于认可范围、实验室基础和服务深度评估。",
      },
      {
        question: "哪些地方最容易多花钱？",
        answer: "常见浪费来自先买设备后规划、环境重复改造、范围设定过大和体系运行返工。",
      },
      {
        question: "服务支持费用是不是最大成本？",
        answer: "不一定。很多企业真正的大头在实验室建设、设备环境和人员运行成本。",
      },
    ],
    related: ["cnas-cycle", "lab-construction", "cnas-risk"],
    seoTitle: "CNAS认可费用主要花在哪里？实验室建设与预算风险",
    seoDescription: "说明 CNAS费用构成和预算风险，帮助企业先规划再投入，减少盲目建设。",
  },
  {
    slug: "cnas-cycle",
    title: "CNAS认可周期一般多久？哪些因素会影响进度？",
    description: "解释 CNAS 周期与企业基础、认可范围、试运行和整改效率之间的关系。",
    category: "cnas-cost",
    tags: ["周期评估", "进度风险", "启动判断"],
    keywords: ["CNAS周期", "CNAS多久", "CNAS认证周期", "认可进度"],
    updatedAt: "2026-04-29",
    answer: "CNAS认可（通常也称为CNAS认证）周期取决于建设成熟度、体系试运行、评审安排和整改效率。",
    sections: [
      {
        title: "一、周期不能只看申请时间",
        content:
          "正式申请只是流程的一部分。真正耗时的往往是前期诊断、实验室建设、体系文件建立、试运行和整改准备。",
      },
      {
        title: "二、从零建设和已有实验室差异很大",
        content:
          "已有稳定实验室通常更容易进入申请准备；从零建设则需要先完成场地、设备、人员、方法和体系运行。",
      },
      {
        title: "三、哪些因素会拖慢进度",
        content:
          "认可范围反复调整、设备校准滞后、人员不到位、记录不完整、内审发现问题未整改，都会延长整体周期。",
      },
    ],
    checklist: [
      "实验室是否已经具备稳定运行条件",
      "关键设备是否完成校准或确认",
      "人员是否能覆盖申请项目",
      "试运行和内审问题是否已经闭环",
    ],
    faqs: [
      {
        question: "CNAS认证和CNAS认可有什么区别？",
        answer: "CNAS认可是更专业的表达，CNAS认证是企业常用说法，两者在实际使用中通常指同一件事。",
      },
      {
        question: "能不能压缩CNAS周期？",
        answer: "可以优化准备顺序，但不建议压缩必要的试运行和整改环节，否则会增加评审风险。",
      },
      {
        question: "周期主要卡在哪里？",
        answer: "常见卡点包括设备与环境未达标、记录不完整、人员能力证据不足和认可范围不清。",
      },
      {
        question: "什么时候适合提交申请？",
        answer: "当体系已经真实运行、关键风险已整改、证据链基本完整时，再进入正式申请更稳妥。",
      },
    ],
    related: ["cnas-process", "cnas-cost", "cnas-risk"],
  },
  {
    slug: "cnas-risk",
    title: "CNAS认可评审风险主要有哪些？企业如何提前排查？",
    description: "梳理 CNAS 现场评审常见风险，帮助企业在申请前做风险诊断和整改准备。",
    category: "cnas-risk",
    tags: ["评审风险", "风险诊断", "整改闭环"],
    keywords: ["CNAS评审风险", "CNAS现场评审", "CNAS整改", "评审前检查"],
    updatedAt: "2026-04-29",
    answer: "CNAS认可（通常也称为CNAS认证）评审风险通常来自能力范围不清和体系运行证据不足。",
    sections: [
      {
        title: "一、风险不是评审当天才出现",
        content:
          "现场评审看到的问题，通常在前期规划和试运行阶段已经存在。越早做风险排查，越容易控制整改成本。",
      },
      {
        title: "二、常见高风险点",
        content:
          "高风险点包括认可范围过大、人员授权证据不足、方法确认不完整、设备校准缺失、环境记录不连续、原始记录不可追溯。",
      },
      {
        title: "三、为什么敢讲风险更可信",
        content:
          "CNAS认可不是包装材料，而是验证真实能力。提前讲清哪些情况不建议盲目启动，能帮助企业减少投入浪费和现场不确定性。",
      },
    ],
    checklist: [
      "认可范围是否逐项对应人员、设备、方法和环境",
      "原始记录是否能完整追溯检测过程",
      "内审发现的问题是否已经形成整改闭环",
      "是否存在只写文件但未真实运行的流程",
    ],
    faqs: [
      {
        question: "CNAS认证和CNAS认可有什么区别？",
        answer: "CNAS认可是更专业的表达，CNAS认证是企业常用说法，两者在实际使用中通常指同一件事。",
      },
      {
        question: "评审前最应该先查什么？",
        answer: "先查认可范围与真实能力是否匹配，再查人员、设备、方法、环境和记录证据是否闭环。",
      },
      {
        question: "风险排查是不是等同于模拟评审？",
        answer: "风险排查可以包含模拟评审，但重点是识别影响通过率和持续运行的关键薄弱点。",
      },
      {
        question: "发现风险后还能继续申请吗？",
        answer: "要看风险等级。关键风险未整改前不建议盲目提交，否则可能增加评审不确定性。",
      },
    ],
    related: ["cnas-process", "lab-construction", "what-is-cnas"],
  },
  {
    slug: "lab-construction",
    title: "实验室建设和CNAS认可是什么关系？",
    description: "解释实验室建设、认可范围规划、体系运行与 CNAS 现场评审之间的关系。",
    category: "cnas-lab",
    tags: ["实验室建设", "认可范围", "能力建设"],
    keywords: ["实验室建设", "CNAS实验室", "认可范围规划", "实验室能力建设"],
    updatedAt: "2026-04-29",
    answer: "CNAS认可（通常也称为CNAS认证）要求实验室建设支撑认可范围、检测方法和体系运行。",
    sections: [
      {
        title: "一、实验室建设不能脱离认可范围",
        content:
          "认可范围决定需要什么设备、环境、人员和方法。脱离范围做建设，容易出现设备浪费或能力不足。",
      },
      {
        title: "二、建设不仅是装修和采购",
        content:
          "CNAS认可关注的是实验室能不能稳定运行。建设工作应同时覆盖流程、记录、质量控制、人员授权和持续改进。",
      },
      {
        title: "三、从检测项目倒推建设路径",
        content:
          "更稳妥的方式是从客户需求和检测项目出发，确认标准方法，再倒推设备、环境、人员、体系文件和试运行计划。",
      },
    ],
    checklist: [
      "建设方案是否从检测项目和标准方法倒推",
      "场地环境是否满足检测活动要求",
      "设备采购是否服务于明确认可范围",
      "体系文件和运行记录是否同步规划",
    ],
    faqs: [
      {
        question: "CNAS认证和CNAS认可有什么区别？",
        answer: "CNAS认可是更专业的表达，CNAS认证是企业常用说法，两者在实际使用中通常指同一件事。",
      },
      {
        question: "先建实验室还是先做CNAS规划？",
        answer: "建议先做规划。建设应服务于认可范围和检测方法，而不是先采购设备再反推体系。",
      },
      {
        question: "实验室已经建好了还能调整吗？",
        answer: "可以，但需要重新核对认可范围、设备环境和方法要求，必要时做局部改造或范围调整。",
      },
      {
        question: "实验室建设完成就能申请CNAS吗？",
        answer: "不能只看建设完成，还要看体系是否真实运行、记录是否完整、人员能力是否有证据支撑。",
      },
    ],
    related: ["what-is-cnas", "cnas-cost", "cnas-risk"],
  },
];

// ========== 第三部分：查询函数 ==========
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

/*
 * 文件说明：该文件维护 CNAS行业服务平台基础内容页的数据。
 * 功能说明：为 /path、/prepare、/review、/maintenance、/faq、/articles 提供统一内容结构。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：平台基础页数据
 */

// ========== 第一部分：类型定义 ==========
export type PlatformPageContent = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  sections: {
    title: string;
    summary: string;
  }[];
  links?: {
    title: string;
    href: string;
    summary: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  nextSteps: string[];
};

// ========== 第二部分：平台基础页数据 ==========
export const platformPages = {
  path: {
    path: "/path",
    eyebrow: "CNAS Path Judgment",
    title: "CNAS认可路径判断",
    description: "先判断当前实验室是否适合启动，再决定认可范围、资源配置和推进顺序。",
    intro:
      "路径判断不是替代正式申请，而是在启动前把需求、范围、人员设备、体系运行和评审准备先放到同一张图里看清楚。",
    sections: [
      { title: "判断当前阶段", summary: "确认实验室处在了解、建设、体系运行、申请准备还是整改阶段。" },
      { title: "收敛认可范围", summary: "把检测项目、标准方法、报告用途和首批能力边界先收住。" },
      { title: "核对资源条件", summary: "看人员、设备、环境、方法和记录能否支撑目标范围。" },
      { title: "明确推进顺序", summary: "先补基础、先跑体系，还是可以进入申请准备，需要分清优先级。" },
    ],
    faqs: [
      { question: "路径判断是不是正式评审结论？", answer: "不是。它是启动前的准备判断，用来减少范围、资源和顺序上的误判。" },
      { question: "刚开始了解阶段适合做路径判断吗？", answer: "适合。越早判断，越容易避免后续材料、设备和体系建设反复调整。" },
    ],
    nextSteps: ["先梳理实验室类型和主要检测项目。", "确认首批认可范围是否已经能落到具体方法。", "进入诊断页填写基础信息，获得初步方向。"],
  },
  prepare: {
    path: "/prepare",
    eyebrow: "CNAS Preparation",
    title: "CNAS认可准备",
    description: "围绕体系、人员、设备、环境和记录，把认可准备从材料动作变成可运行能力。",
    intro:
      "认可准备不是把文件写完整就结束，而是让体系文件、现场运行、原始记录和人员设备状态能够互相支撑。",
    sections: [
      { title: "体系文件准备", summary: "让程序文件、作业指导书和记录表单服务真实运行，而不是停留在纸面。" },
      { title: "人员能力准备", summary: "明确岗位职责、培训记录、授权关系和关键项目能力覆盖。" },
      { title: "设备环境准备", summary: "核对设备校准、期间核查、环境条件和方法适用性。" },
      { title: "运行证据准备", summary: "通过试运行、质控、内审和管理评审形成连续证据链。" },
    ],
    faqs: [
      { question: "CNAS认可准备可以先做文件吗？", answer: "可以做，但不能只做文件。文件要和现场运行、人员设备和记录证据同步。" },
      { question: "准备阶段最容易漏什么？", answer: "最容易漏运行证据和人员设备对应关系，评审时这些往往比文件目录更关键。" },
    ],
    nextSteps: ["先确认首批范围。", "按范围倒推人员设备和记录要求。", "安排试运行，让体系真正跑起来。"],
  },
  review: {
    path: "/review",
    eyebrow: "CNAS Review Correction",
    title: "CNAS评审整改",
    description: "把评审前风险排查和评审后整改闭环放在一起看，减少现场被动和重复返工。",
    intro:
      "评审整改的重点不是临时补材料，而是找到不符合背后的运行原因，并用证据证明纠正措施有效。",
    sections: [
      { title: "评审前风险排查", summary: "提前检查范围、人员授权、设备状态、原始记录和报告一致性。" },
      { title: "现场问询准备", summary: "围绕关键项目准备方法理解、操作演示和记录追溯。" },
      { title: "不符合原因分析", summary: "区分文件缺失、运行断点、能力不足和职责不清等不同原因。" },
      { title: "整改闭环证据", summary: "整改不仅要有措施，还要有复核、验证和持续运行安排。" },
    ],
    faqs: [
      { question: "评审整改是不是把文件补齐就行？", answer: "不是。整改要证明问题原因被识别，纠正措施已经有效运行。" },
      { question: "评审前多久开始排查更合适？", answer: "建议在正式评审前预留足够时间做记录追溯和问题闭环，不要等到现场前才集中补。" },
    ],
    nextSteps: ["先列出可能被追问的项目。", "复核报告、原始记录和质控记录是否一致。", "把已发现问题做成整改清单。"],
  },
  maintenance: {
    path: "/maintenance",
    eyebrow: "CNAS Maintenance",
    title: "CNAS认可后维护",
    description: "CNAS认可不是拿证结束，持续运行、监督评审、复评审和扩项变更都需要节奏管理。",
    intro:
      "通过认可后，实验室仍要持续保持体系运行和技术能力。维护做得越稳定，后续监督评审和复评审越不容易被动。",
    sections: [
      { title: "体系运行维护", summary: "持续检查文件适用性、记录完整性、内审和管理评审有效性。" },
      { title: "监督评审准备", summary: "提前识别监督评审关注点，复核历史问题和运行证据。" },
      { title: "复评审准备", summary: "围绕周期性运行、能力保持和整改闭环做好整体梳理。" },
      { title: "扩项与变更", summary: "新增项目、调整范围、人员设备变化时，先判断路径和证据要求。" },
    ],
    faqs: [
      { question: "CNAS认可通过后还需要维护吗？", answer: "需要。认可状态依赖持续运行，不是拿到证书后就自然稳定。" },
      { question: "维护重点应该放在哪里？", answer: "重点放在人员授权、设备状态、记录连续性、质量控制和问题整改闭环。" },
    ],
    nextSteps: ["建立年度维护节奏。", "定期复核人员设备和记录状态。", "监督评审前提前做一次风险排查。"],
  },
  faq: {
    path: "/faq",
    eyebrow: "CNAS FAQ",
    title: "CNAS常见问题",
    description: "把启动前、准备中、评审整改和认可后维护的高频问题先集中看清。",
    intro:
      "常见问题页不是替代完整咨询，而是帮助企业先快速判断自己卡在哪一类问题上，再进入对应内容或诊断入口。",
    sections: [
      { title: "启动前问题", summary: "适不适合现在启动、第一步做什么、范围怎么收，是最常见的前置问题。" },
      { title: "准备阶段问题", summary: "体系文件、人员设备、试运行记录和费用周期需要一起判断。" },
      { title: "评审阶段问题", summary: "现场评审更关注真实能力、记录追溯和不符合项整改闭环。" },
      { title: "维护阶段问题", summary: "通过认可后仍要面对监督评审、复评审、扩项和年度维护。" },
    ],
    links: [
      { title: "查看完整问答库", href: "/faqs", summary: "进入已有 CNAS问答聚合页，继续查看更多问题。" },
      { title: "进入路径诊断", href: "/diagnosis", summary: "如果问题和自身情况有关，可以先填写基础信息。" },
    ],
    faqs: [
      { question: "现在只是了解阶段，适合看 FAQ 吗？", answer: "适合。先看常见问题可以帮助你判断下一步应该看流程、准备还是风险。" },
      { question: "FAQ 能不能替代正式路径判断？", answer: "不能。FAQ 适合快速理解问题，具体路径仍要结合实验室实际情况判断。" },
    ],
    nextSteps: ["先按当前阶段筛选问题。", "再进入对应内容页继续阅读。", "仍不确定时，进入诊断页做一次基础判断。"],
  },
  articles: {
    path: "/articles",
    eyebrow: "CNAS Articles",
    title: "最新行业内容",
    description: "围绕路径判断、认可准备、评审整改和认可后维护，持续沉淀基础行业内容。",
    intro:
      "这里先聚合主站已有的重点文章入口，方便用户从首页继续向下阅读，而不是停留在纯文字卡片上。",
    sections: [
      { title: "路径判断内容", summary: "先看为什么第一步不是申请，而是判断范围、资源和推进顺序。" },
      { title: "准备与流程内容", summary: "理解流程、周期、费用和实验室建设之间的关系。" },
      { title: "评审风险内容", summary: "提前识别评审失败、整改返工和证据链断点。" },
      { title: "维护认知内容", summary: "理解认可后持续运行、监督评审和复评审的基本要求。" },
    ],
    links: [
      { title: "做CNAS第一步：不是申请，而是先判断", href: "/knowledge/cnas-first-step-is-judgment", summary: "理解启动前路径判断的重要性。" },
      { title: "什么样的企业：更适合启动CNAS认可？", href: "/knowledge/suitable-companies-for-cnas", summary: "判断自身是否具备启动基础。" },
      { title: "评审为什么会失败：问题通常出在哪个环节？", href: "/knowledge/why-cnas-assessment-fails", summary: "提前识别评审与整改风险。" },
    ],
    faqs: [
      { question: "这些文章是正式案例吗？", answer: "不是案例承诺，而是基础内容入口，用来帮助用户理解常见判断问题。" },
      { question: "后续能继续扩展文章吗？", answer: "可以。当前先保留基础版，后续再根据真实运营问题继续补充。" },
    ],
    nextSteps: ["先从路径判断文章开始阅读。", "再结合当前阶段进入准备、评审或维护内容。", "需要判断自身情况时进入诊断页。"],
  },
} satisfies Record<string, PlatformPageContent>;

/*
 * 文件说明：该文件聚合 CNAS 专业内容平台的站点级数据。
 * 功能说明：维护导航、首页入口和解决方案数据，并转发文章、分类、标签、案例、服务与 FAQ 数据。
 *
 * 结构概览：
 *   第一部分：外部数据转发
 *   第二部分：类型定义
 *   第三部分：导航与首页入口
 *   第四部分：解决方案数据
 */

// ========== 第一部分：外部数据转发 ==========
export {
  articles,
  getArticleBySlug,
  getArticlesByCategory,
  getArticlesByTag,
  getRelatedArticles,
} from "@/src/data/articles";
export type { Article } from "@/src/data/articles";
export { categories, getCategoryBySlug } from "@/src/data/categories";
export type { Category } from "@/src/data/categories";
export { tags } from "@/src/data/tags";
export { faqs } from "@/src/data/faqs";
export { cases } from "@/src/data/cases";
export type { CaseItem } from "@/src/data/cases";
export { services } from "@/src/data/services";
export type { ServiceItem } from "@/src/data/services";

// ========== 第二部分：类型定义 ==========
export type NavItem = {
  label: string;
  href: string;
  intent?: "流量" | "信任" | "成交" | "转化" | "强需求";
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
};

export type Solution = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  suitableFor: string;
  commonProblems: string[];
  recognitionDifficulties: string[];
  buildPath: string[];
  assessmentRisks: string[];
  solutionReference: string[];
};

// ========== 第三部分：导航与首页入口 ==========
export const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  {
    label: "CNAS知识库",
    href: "/knowledge",
    intent: "流量",
    children: [
      { label: "CNAS基础认知", href: "/cnas-basic", description: "理解认可对象和能力要求" },
      { label: "CNAS认可流程总览", href: "/cnas-process", description: "总览启动到评审路径" },
      { label: "CNAS费用周期", href: "/cnas-cost", description: "拆解投入与周期变量" },
      { label: "CNAS评审风险", href: "/cnas-risk", description: "识别现场评审风险点" },
      { label: "实验室建设", href: "/cnas-lab", description: "规划人员设备环境方法" },
      { label: "CNAS常见问题", href: "/cnas-faq", description: "聚合高频判断问题" },
    ],
  },
  {
    label: "CNAS认可流程",
    href: "/cnas-process",
    intent: "强需求",
    children: [
      { label: "启动前可行性判断", href: "/cnas-process#feasibility", description: "判断是否适合启动" },
      { label: "实验室建设准备", href: "/cnas-process#lab-preparation", description: "补齐资源与能力基础" },
      { label: "体系文件建立", href: "/cnas-process#system-documents", description: "把要求转成运行文件" },
      { label: "试运行与内审", href: "/cnas-process#trial-internal-audit", description: "形成真实证据链" },
      { label: "管理评审", href: "/cnas-process#management-review", description: "管理层确认资源与风险" },
      { label: "正式申请与评审", href: "/cnas-process#application-assessment", description: "进入申请和现场核查" },
      { label: "评审整改与通过", href: "/cnas-process#correction-approval", description: "完成整改闭环" },
    ],
  },
  {
    label: "行业方案",
    href: "/solutions",
    intent: "成交",
    children: [
      { label: "制造企业实验室", href: "/solutions/manufacturing-lab", description: "自建实验室能力路径" },
      { label: "第三方检测机构", href: "/solutions/testing-lab", description: "首次申请、扩项与监督评审" },
      { label: "食品/材料/医疗实验室", href: "/solutions/regulated-lab", description: "高要求行业检测场景" },
      { label: "高校/科研实验室", href: "/solutions/research-lab", description: "科研检测能力规范化" },
      { label: "集团内部实验室", href: "/solutions/group-internal-lab", description: "多基地内部检测能力协同" },
    ],
  },
  {
    label: "案例解析",
    href: "/cases",
    intent: "信任",
    children: [
      { label: "从0到1建设案例", href: "/cases#manufacturing-lab-from-zero", description: "从需求到建设路径" },
      { label: "评审失败翻盘案例", href: "/cases#assessment-correction-turnaround", description: "从不符合到整改闭环" },
      { label: "体系优化案例", href: "/cases#messy-system-review-risk", description: "梳理记录和职责证据" },
      { label: "预算控制案例", href: "/cases#equipment-before-planning", description: "避免先买设备后返工" },
    ],
  },
  {
    label: "风险诊断",
    href: "/diagnosis",
    intent: "转化",
    children: [
      { label: "是否适合启动CNAS", href: "/diagnosis#start-fit", description: "判断现在能不能启动" },
      { label: "企业自测清单", href: "/diagnosis#self-check", description: "准备启动前先自查" },
      { label: "常见失败原因", href: "/diagnosis#failure-reasons", description: "识别盲目推进风险" },
      { label: "诊断服务说明", href: "/diagnosis#diagnosis-support", description: "明确诊断后输出什么" },
    ],
  },
  {
    label: "服务咨询",
    href: "/services",
    intent: "成交",
    children: [
      { label: "CNAS启动诊断", href: "/services#cnas-start-diagnosis", description: "启动前差距与路径判断" },
      { label: "实验室建设规划", href: "/services#lab-scope-planning", description: "范围、资源与建设顺序" },
      { label: "体系辅导支持", href: "/services#cnas-system-operation", description: "文件、运行与证据链" },
      { label: "评审前风险排查", href: "/services#pre-assessment-risk-correction", description: "风险清单与整改支持" },
    ],
  },
];

export const homePathways = [
  { title: "知识库", href: "/knowledge", intent: "流量入口", summary: "承接基础认知、费用周期、评审风险和常见问题搜索需求。" },
  { title: "认可流程", href: "/cnas-process", intent: "强需求入口", summary: "按启动、建设、运行、申请、评审和整改拆解实施路径。" },
  { title: "行业方案", href: "/solutions", intent: "成交入口", summary: "按企业类型拆解问题、路径、风险和咨询承接方式。" },
  { title: "案例解析", href: "/cases", intent: "信任入口", summary: "用问题、动作、结果说明真实准备场景和风险处理方式。" },
  { title: "风险诊断", href: "/diagnosis", intent: "转化入口", summary: "帮助企业先判断是否适合现在启动 CNAS认可。" },
];

export const processStages = [
  {
    id: "feasibility",
    title: "启动前可行性判断",
    description: "先判断检测需求、认可范围、人员设备环境和预算资源是否具备启动条件。",
    points: ["检测项目是否稳定", "认可范围是否能收敛", "短板是否可补齐"],
  },
  {
    id: "lab-preparation",
    title: "实验室建设准备",
    description: "围绕首批认可范围准备人员、设备、环境、方法和样品管理条件。",
    points: ["设备配置与方法匹配", "环境条件能持续控制", "人员授权和培训有证据"],
  },
  {
    id: "system-documents",
    title: "体系文件建立",
    description: "把 CNAS认可要求转化为企业能运行的程序文件、作业指导书和记录表单。",
    points: ["文件服务真实运行", "职责边界清楚", "记录格式可追溯"],
  },
  {
    id: "trial-internal-audit",
    title: "试运行与内审",
    description: "通过试运行产生样品流转、检测记录、质控记录和内审证据。",
    points: ["运行记录连续", "不符合项能闭环", "检测演示有准备"],
  },
  {
    id: "management-review",
    title: "管理评审",
    description: "由管理层确认体系运行结果、资源投入、风险和持续改进安排。",
    points: ["资源问题被识别", "风险有处理动作", "改进事项可跟踪"],
  },
  {
    id: "application-assessment",
    title: "正式申请与评审",
    description: "提交申请资料后进入文件审查和现场评审，重点核查真实能力和证据链。",
    points: ["申请范围清楚", "现场问询可回应", "记录与报告一致"],
  },
  {
    id: "correction-approval",
    title: "评审整改与通过",
    description: "针对不符合项完成原因分析、纠正措施、证据补充和持续运行安排。",
    points: ["整改不止改文件", "证据能证明有效", "形成后续运行机制"],
  },
];

export const hotQuestions = [
  { title: "CNAS是什么", href: "/knowledge/what-is-cnas", summary: "先理解认可对象和真实能力要求。" },
  { title: "CNAS认可流程", href: "/knowledge/cnas-process", summary: "看清诊断、规划、建设、申请和评审路径。" },
  { title: "CNAS费用与周期", href: "/knowledge/cnas-cost", summary: "拆分建设、设备、体系、周期和整改成本。" },
];

export const homeStats = [
  { label: "CNAS常见问题", value: "60+ 个" },
  { label: "流程关键节点", value: "20+ 个" },
  { label: "评审风险点", value: "30+ 个" },
];

// ========== 第四部分：解决方案数据 ==========
export const solutions: Solution[] = [
  {
    slug: "manufacturing-lab",
    href: "/solutions/manufacturing-lab",
    title: "制造企业实验室 CNAS认可解决方案",
    summary: "面向制造企业自建实验室，围绕检测需求、认可范围、设备环境和体系运行规划建设路径。",
    suitableFor: "有出厂检验、供应链质量验证、研发检测或客户验厂要求的制造企业。",
    commonProblems: ["检测需求存在但认可范围不清", "设备先买后规划", "实验室运行记录薄弱", "人员授权和职责不清"],
    recognitionDifficulties: ["检测项目与标准方法匹配", "设备和环境条件支撑能力范围", "体系文件服务真实运行", "现场评审证据链完整"],
    buildPath: ["启动前诊断", "认可范围规划", "设备环境配置", "体系文件建立", "试运行与内审", "评审前风险排查"],
    assessmentRisks: ["范围过大导致资源不足", "设备校准和方法确认不完整", "原始记录不可追溯", "整改闭环证据不足"],
    solutionReference: ["先诊断基础条件", "从检测项目倒推建设顺序", "用清单管理评审风险", "分阶段推进认可范围"],
  },
  {
    slug: "testing-lab",
    href: "/solutions/testing-lab",
    title: "检测机构实验室 CNAS认可解决方案",
    summary: "面向已有检测业务的机构，重点关注项目扩项、体系稳定性、技术记录和监督评审准备。",
    suitableFor: "准备首次申请、扩项或迎接监督评审的检测机构实验室。",
    commonProblems: ["项目扩项证据不足", "技术记录格式不统一", "人员能力覆盖不足", "监督评审准备不充分"],
    recognitionDifficulties: ["项目范围和标准方法持续更新", "质量控制记录稳定", "人员授权和能力保持", "不符合项整改闭环"],
    buildPath: ["项目范围梳理", "技术记录复核", "能力验证与质量控制", "内审管理评审", "监督评审风险排查"],
    assessmentRisks: ["扩项项目证据链断裂", "报告和原始记录不一致", "质量控制频次不足", "整改措施停留在纸面"],
    solutionReference: ["优先核查扩项项目", "统一技术记录模板", "复核人员设备覆盖关系", "提前准备监督评审证据"],
  },
  {
    slug: "regulated-lab",
    href: "/solutions/regulated-lab",
    title: "食品 / 材料 / 医疗相关实验室 CNAS认可解决方案",
    summary: "面向高要求行业实验室，重点处理标准方法、样品管理、环境控制和质量记录风险。",
    suitableFor: "食品、材料、医疗相关行业中需要建立或提升检测能力的企业实验室。",
    commonProblems: ["行业标准识别不完整", "方法确认不充分", "环境控制要求复杂", "样品和记录追溯压力高"],
    recognitionDifficulties: ["标准方法适用性确认", "环境条件持续控制", "样品流转可追溯", "质量控制和结果有效性"],
    buildPath: ["行业要求识别", "检测项目和方法确认", "设备环境配置", "样品流程设计", "体系运行与风险排查"],
    assessmentRisks: ["方法确认资料不足", "环境监控记录不连续", "样品管理链条不清", "设备状态和质量控制证据不足"],
    solutionReference: ["从行业标准倒推建设要求", "优先确认方法和环境条件", "强化样品与记录追溯", "评审前复核关键证据"],
  },
  {
    slug: "research-lab",
    href: "/solutions/research-lab",
    title: "高校 / 科研实验室 CNAS认可解决方案",
    summary: "面向高校、研究院所和科研平台实验室，重点处理科研检测向规范化检测能力转化的问题。",
    suitableFor: "需要对外出具检测结果、承接科研平台测试或提升检测管理规范性的高校和科研实验室。",
    commonProblems: ["科研任务多但检测流程不稳定", "人员流动导致授权和培训证据不足", "设备共享使用记录不完整", "方法确认和质控安排薄弱"],
    recognitionDifficulties: ["科研灵活性与体系规范性平衡", "共享设备状态管理", "人员能力保持", "检测记录和报告一致性"],
    buildPath: ["检测场景梳理", "认可范围收敛", "共享设备管理", "人员授权培训", "体系试运行", "评审前证据复核"],
    assessmentRisks: ["项目边界不清", "设备使用记录不可追溯", "人员授权证据断裂", "科研记录无法支撑认可要求"],
    solutionReference: ["先区分科研活动和认可检测活动", "从稳定项目开始规划范围", "补齐共享设备状态证据", "建立可持续的人员培训机制"],
  },
  {
    slug: "group-internal-lab",
    href: "/solutions/group-internal-lab",
    title: "集团内部实验室 CNAS认可解决方案",
    summary: "面向集团多基地或内部共享检测平台，重点处理范围统一、能力协同和总部管控问题。",
    suitableFor: "有多个生产基地、事业部或内部检测中心，需要统一检测能力和管理体系的集团企业。",
    commonProblems: ["多基地检测能力差异大", "标准方法和记录模板不统一", "总部与实验室职责边界不清", "内部报告公信力不足"],
    recognitionDifficulties: ["认可范围跨基地协同", "体系文件统一与本地执行", "人员设备资源共享边界", "持续监督和内部审核机制"],
    buildPath: ["集团检测需求盘点", "范围分层规划", "体系框架统一", "基地能力补齐", "内部审核联动", "评审风险排查"],
    assessmentRisks: ["范围规划过大", "各基地执行不一致", "内部监督证据不足", "整改责任无法落地"],
    solutionReference: ["先做集团层面的能力地图", "按基地成熟度分阶段推进", "统一关键文件和记录模板", "建立总部监督与整改闭环"],
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

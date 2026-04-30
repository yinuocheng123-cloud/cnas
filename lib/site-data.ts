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
  { label: "CNAS知识库", href: "/knowledge" },
  { label: "CNAS流程", href: "/cnas-process" },
  { label: "行业方案", href: "/solutions" },
  { label: "案例解析", href: "/cases" },
  { label: "风险诊断", href: "/diagnosis" },
  { label: "服务咨询", href: "/services" },
];

export const hotQuestions = [
  { title: "CNAS是什么", href: "/knowledge/what-is-cnas", summary: "先理解认可对象和真实能力要求。" },
  { title: "CNAS流程", href: "/knowledge/cnas-process", summary: "看清诊断、规划、建设、申请和评审路径。" },
  { title: "CNAS费用", href: "/knowledge/cnas-cost", summary: "拆分建设、设备、体系和整改成本。" },
  { title: "CNAS周期", href: "/knowledge/cnas-cycle", summary: "判断哪些因素会拖慢整体进度。" },
  { title: "CNAS风险", href: "/knowledge/cnas-risk", summary: "提前识别现场评审和体系运行风险。" },
];

export const homeStats = [
  { label: "知识栏目", value: "6类" },
  { label: "核心文章", value: "6篇" },
  { label: "行业方案", value: "3类" },
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
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

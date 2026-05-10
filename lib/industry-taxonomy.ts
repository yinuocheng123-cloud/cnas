/*
 * 文件说明：该文件维护站点统一的行业实体分类。
 * 功能说明：为导航、首页、诊断表单、方案推荐和 CTA 提供统一行业源，避免页面内重复硬编码。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：行业分类数据
 *   第三部分：行业查询与推荐辅助函数
 */

// ========== 第一部分：类型定义 ==========
export type IndustryItem = {
  slug: string;
  title: string;
  shortTitle: string;
  navTitle: string;
  description: string;
  judgment: string;
  diagnosisLabel: string;
  solutionHref: string;
  featured?: boolean;
  tags?: string[];
};

// ========== 第二部分：行业分类数据 ==========
export const industryTaxonomy: IndustryItem[] = [
  {
    slug: "manufacturing-lab",
    title: "制造企业实验室",
    shortTitle: "制造企业",
    navTitle: "制造企业实验室",
    description: "围绕制造企业自建实验室的认可范围、设备环境和体系运行判断启动路径。",
    judgment: "很多问题不是出在评审，而是前期方向判断。",
    diagnosisLabel: "制造企业实验室",
    solutionHref: "/solutions/manufacturing-lab",
    featured: true,
    tags: ["制造实验室", "能力规划", "认可范围"],
  },
  {
    slug: "testing-lab",
    title: "第三方检测机构",
    shortTitle: "第三方检测",
    navTitle: "第三方检测机构",
    description: "围绕检测机构的扩项、证据链稳定性和监督评审准备判断实施节奏。",
    judgment: "能力边界和项目范围，会直接影响后续返工风险。",
    diagnosisLabel: "第三方检测机构",
    solutionHref: "/solutions/testing-lab",
    featured: true,
    tags: ["第三方检测", "扩项评审", "证据稳定"],
  },
  {
    slug: "new-energy-lab",
    title: "新能源 / 储能实验室",
    shortTitle: "新能源 / 储能",
    navTitle: "新能源 / 储能实验室",
    description: "围绕高投入实验室的设备规划、能力边界和返工风险判断建设路径。",
    judgment: "高投入、高风险，前期能力判断比后期整改更重要。",
    diagnosisLabel: "新能源 / 储能实验室",
    solutionHref: "/solutions/new-energy-lab",
    featured: true,
    tags: ["新能源检测", "储能实验室", "高投入实验室", "能力建设", "设备规划"],
  },
  {
    slug: "regulated-lab",
    title: "食品 / 材料 / 医疗实验室",
    shortTitle: "高要求实验室",
    navTitle: "食品 / 材料 / 医疗实验室",
    description: "围绕高要求实验室的标准方法、样品管理和环境控制判断风险路径。",
    judgment: "高要求实验室更怕方法、样品和环境条件没有同步收紧。",
    diagnosisLabel: "食品 / 材料 / 医疗实验室",
    solutionHref: "/solutions/regulated-lab",
    tags: ["高要求实验室", "方法确认", "样品管理"],
  },
  {
    slug: "research-lab",
    title: "高校 / 科研实验室",
    shortTitle: "高校 / 科研",
    navTitle: "高校 / 科研实验室",
    description: "围绕科研实验室的共享设备、授权培训和规范化检测能力判断建设顺序。",
    judgment: "科研活动能做，不代表认可检测活动已经能稳定运行。",
    diagnosisLabel: "高校 / 科研实验室",
    solutionHref: "/solutions/research-lab",
    tags: ["科研平台", "共享设备", "规范检测"],
  },
  {
    slug: "group-internal-lab",
    title: "集团内部实验室",
    shortTitle: "集团内部",
    navTitle: "集团内部实验室",
    description: "围绕集团内部检测平台的范围协同、模板统一和基地成熟度判断推进节奏。",
    judgment: "范围协同没收清，多基地推进只会把问题同时放大。",
    diagnosisLabel: "集团内部实验室",
    solutionHref: "/solutions/group-internal-lab",
    tags: ["集团协同", "多基地", "内部检测"],
  },
];

// ========== 第三部分：行业查询与推荐辅助函数 ==========
export function getIndustryBySlug(slug: string) {
  return industryTaxonomy.find((industry) => industry.slug === slug);
}

export function getFeaturedIndustries() {
  return industryTaxonomy.filter((industry) => industry.featured);
}

export function getRelatedIndustries(currentSlug: string, limit = 3) {
  const others = industryTaxonomy.filter((industry) => industry.slug !== currentSlug);
  const featured = others.filter((industry) => industry.featured);
  const remaining = others.filter((industry) => !industry.featured);

  return [...featured, ...remaining].slice(0, limit);
}

/*
 * 文件说明：该文件维护 CNAS 内容分类数据。
 * 功能说明：为知识库总入口、分类页和 sitemap 提供稳定分类结构。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：分类数据
 *   第三部分：查询函数
 */

// ========== 第一部分：类型定义 ==========
export type Category = {
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
  description: string;
};

// ========== 第二部分：分类数据 ==========
export const categories: Category[] = [
  {
    slug: "cnas-basic",
    title: "CNAS基础认知",
    shortTitle: "基础认知",
    href: "/cnas-basic",
    description: "解释 CNAS认可、实验室能力、认可价值和启动前基础判断。",
  },
  {
    slug: "cnas-process",
    title: "CNAS认可流程",
    shortTitle: "认可流程",
    href: "/cnas-process",
    description: "梳理从诊断、规划、建设、体系运行到申请评审的完整路径。",
  },
  {
    slug: "cnas-cost",
    title: "CNAS费用周期",
    shortTitle: "费用周期",
    href: "/cnas-cost",
    description: "拆解费用构成、周期影响因素和预算投入重点。",
  },
  {
    slug: "cnas-risk",
    title: "CNAS评审风险",
    shortTitle: "评审风险",
    href: "/cnas-risk",
    description: "识别现场评审、体系运行和整改闭环中的常见风险。",
  },
  {
    slug: "cnas-lab",
    title: "实验室建设",
    shortTitle: "实验室建设",
    href: "/cnas-lab",
    description: "围绕认可范围、人员、设备、环境和方法规划实验室能力。",
  },
  {
    slug: "cnas-faq",
    title: "CNAS常见问题",
    shortTitle: "常见问题",
    href: "/cnas-faq",
    description: "聚合企业在启动 CNAS认可前最常问的判断型问题。",
  },
];

// ========== 第三部分：查询函数 ==========
export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

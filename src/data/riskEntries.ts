/*
 * 文件说明：该文件维护首页 Hero 右侧的风险数据卡片内容。
 * 功能说明：用短数字、判断标题和一句话说明承接首页首屏的风险判断入口。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：风险入口数据
 */

// ========== 第一部分：类型定义 ==========
export type RiskEntry = {
  metric: string;
  title: string;
  summary: string;
  href: string;
};

// ========== 第二部分：风险入口数据 ==========
export const riskEntries: RiskEntry[] = [
  {
    metric: "68%",
    title: "返工来自前期路线误判",
    summary: "真正的问题，往往不是评审阶段。",
    href: "/knowledge/why-enterprises-rework-cnas",
  },
  {
    metric: "4–6个月",
    title: "一次返工平均周期",
    summary: "很多时间，都浪费在重做。",
    href: "/diagnosis",
  },
  {
    metric: "3次以上",
    title: "多数实验室调整过能力范围",
    summary: "很多问题，都是边做边改。",
    href: "/cases#manufacturing-lab-from-zero",
  },
  {
    metric: "20万+",
    title: "设备路线调整常见额外投入",
    summary: "设备一旦买错，后期成本更高。",
    href: "/cases#equipment-before-planning",
  },
];

/*
 * 文件说明：该文件维护 CNAS认可落地支持体系数据。
 * 功能说明：用适合企业、常见问题、支持内容、交付结果和风险提醒描述服务边界。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：服务数据
 */

// ========== 第一部分：类型定义 ==========
export type ServiceItem = {
  slug: string;
  title: string;
  targetUser: string;
  commonProblems: string[];
  supportContent: string[];
  deliverables: string[];
  riskNotice: string;
};

// ========== 第二部分：服务数据 ==========
export const services: ServiceItem[] = [
  {
    slug: "cnas-start-diagnosis",
    title: "CNAS启动前可行性诊断",
    targetUser: "准备启动 CNAS认可，但不确定自身基础、预算和时间是否匹配的企业。",
    commonProblems: ["认可范围不清", "实验室基础不足", "预算边界模糊", "误以为可以直接申请"],
    supportContent: ["基础条件梳理", "认可范围初判", "关键差距识别", "启动优先级建议"],
    deliverables: ["启动判断结论", "主要风险提示", "下一步建设建议"],
    riskNotice: "如果人员、设备、环境和方法基础尚未形成，不建议直接进入申请阶段。",
  },
  {
    slug: "lab-scope-planning",
    title: "实验室建设与认可范围规划",
    targetUser: "需要新建、改造或重新规划实验室能力的制造企业、检测机构或行业实验室。",
    commonProblems: ["先买设备后规划", "范围设定过大", "环境条件不匹配", "建设顺序混乱"],
    supportContent: ["检测项目梳理", "认可范围规划", "设备环境配置建议", "建设路径拆解"],
    deliverables: ["认可范围建议", "建设优先级清单", "设备环境配置参考"],
    riskNotice: "认可范围规划不清，会直接放大建设成本和后续评审风险。",
  },
  {
    slug: "cnas-system-operation",
    title: "CNAS体系文件与运行辅导",
    targetUser: "已有实验室基础，需要建立体系文件、试运行和内审管理评审机制的企业。",
    commonProblems: ["文件与运行脱节", "记录不完整", "人员授权证据不足", "内审流于形式"],
    supportContent: ["体系文件框架", "试运行辅导", "记录证据链梳理", "内审与管理评审支持"],
    deliverables: ["体系文件清单", "运行记录建议", "内审管理评审准备要点"],
    riskNotice: "只写材料但不真实运行，现场评审中很容易暴露不符合项。",
  },
  {
    slug: "pre-assessment-risk-correction",
    title: "评审前风险排查与整改支持",
    targetUser: "准备提交申请、即将现场评审或评审后需要整改闭环的实验室。",
    commonProblems: ["现场证据不足", "方法确认不完整", "设备状态不清", "整改闭环不充分"],
    supportContent: ["评审前风险排查", "关键证据复核", "整改优先级建议", "不符合项闭环支持"],
    deliverables: ["评审风险清单", "整改建议", "关键资料复核意见"],
    riskNotice: "关键风险未整改前盲目评审，会增加现场不确定性和后续整改压力。",
  },
];

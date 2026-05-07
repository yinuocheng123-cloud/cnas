/*
 * 文件说明：该文件维护案例解析数据。
 * 功能说明：以问题、动作、结果三段结构描述企业在 CNAS 认可准备中的典型场景，并补充真实场景图片信息。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：案例数据
 */

// ========== 第一部分：类型定义 ==========
export type CaseItem = {
  slug: string;
  title: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  problem: string;
  action: string;
  result: string;
};

// ========== 第二部分：案例数据 ==========
export const cases: CaseItem[] = [
  {
    slug: "manufacturing-lab-from-zero",
    title: "制造企业实验室从零建设",
    tags: ["从零建设案例", "实验室建设"],
    imageSrc: "/images/solutions/manufacturing-lab.webp",
    imageAlt: "制造企业实验室中，实验人员正在进行设备调试与检测。",
    problem: "企业有稳定检测需求，但没有清晰认可范围、人员配置、设备规划和体系运行基础。",
    action: "先做启动前诊断，再从检测项目倒推认可范围、设备环境、人员职责和体系文件建设顺序。",
    result: "企业明确了先建什么、暂缓什么和哪些风险需要先处理，减少盲目采购和重复改造。",
  },
  {
    slug: "messy-system-review-risk",
    title: "原有体系混乱导致评审风险",
    tags: ["体系优化案例", "评审风险"],
    imageSrc: "/images/diagnosis/diagnosis-review.webp",
    imageAlt: "实验人员在台面前整理检测记录与实验资料。",
    problem: "企业已有实验室，但文件版本、原始记录、人员授权和设备台账无法形成完整证据链。",
    action: "按评审关注点重新梳理体系文件、运行记录和风险清单，优先整改影响认可范围的关键问题。",
    result: "评审前不确定性降低，企业能更清晰地判断哪些项目适合先申请、哪些项目需要后续扩展。",
  },
  {
    slug: "assessment-correction-turnaround",
    title: "评审失败复盘案例",
    tags: ["评审失败复盘案例", "整改闭环"],
    imageSrc: "/images/cases/case-microscope.webp",
    imageAlt: "实验人员在显微设备前复核检测过程。",
    problem: "企业现场评审暴露出方法确认、记录追溯和人员授权不足，不符合项集中出现。",
    action: "先做原因分析，再按不符合项拆分整改责任、补充运行证据、复核关键记录和人员能力材料。",
    result: "整改动作从补文件转向补证据，企业形成了后续复评和持续运行都能使用的风险闭环机制。",
  },
  {
    slug: "equipment-before-planning",
    title: "设备先买后建体系造成预算浪费",
    tags: ["预算控制案例", "范围规划"],
    imageSrc: "/images/solutions/new-energy-lab.webp",
    imageAlt: "复杂检测设备与接线环境，体现设备先投入带来的规划风险。",
    problem: "企业先采购设备，后续发现部分设备与实际检测方法、环境条件和认可范围不匹配。",
    action: "从检测项目、标准方法和认可范围重新倒推设备与环境配置，区分必要投入和可后置投入。",
    result: "企业减少重复投入，把预算集中到真正支撑认可范围和现场评审证据链的环节。",
  },
];

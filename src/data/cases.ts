/*
 * 文件说明：该文件维护案例解析数据。
 * 功能说明：用原来状态、关键动作和结果变化三段结构描述企业在 CNAS 认可准备中的真实场景。
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
    title: "从迟迟不敢启动，到先收范围再建实验室",
    tags: ["启动判断", "实验室规划"],
    imageSrc: "/images/solutions/manufacturing-lab.webp",
    imageAlt: "制造企业实验室内，实验人员正在进行设备调试与检测。",
    problem: "企业知道检测需求真实存在，但认可范围、人员配置、设备投入和体系建设顺序都不清，越准备越不敢启动。",
    action: "先做启动判断，再从检测项目反推认可范围、设备环境、岗位职责和文件运行顺序，先把能落地的部分收清。",
    result: "企业明确了先建什么、暂缓什么和哪些风险要先处理，内部决策速度更快，也避免了盲目采购和重复改造。",
  },
  {
    slug: "messy-system-review-risk",
    title: "从体系看起来完整，到真正能支撑评审",
    tags: ["体系运行", "评审风险"],
    imageSrc: "/images/diagnosis/diagnosis-review.webp",
    imageAlt: "实验人员在台面前整理检测记录与实验资料。",
    problem: "企业已有实验室，但文件版本、原始记录、人员授权和设备台账彼此断开，表面完整，实际经不起追溯。",
    action: "围绕评审关注点重排文件、记录和职责证据，优先补齐会直接影响认可范围和现场演示的关键缺口。",
    result: "评审前的不确定性明显下降，企业能更清楚地区分哪些项目可以先申报，哪些项目需要继续试运行后再推进。",
  },
  {
    slug: "assessment-correction-turnaround",
    title: "从评审暴露问题，到整改动作真正闭环",
    tags: ["整改闭环", "失败复盘"],
    imageSrc: "/images/cases/case-microscope.webp",
    imageAlt: "实验人员在显微设备前复核检测过程。",
    problem: "现场评审暴露出方法确认、记录追溯和人员授权不足，不符合项集中出现，团队一度只想先把文件补齐。",
    action: "先做原因分析，再按不符合项拆分整改责任，补运行证据、复核关键记录，并重新确认人员能力材料。",
    result: "整改动作从补文件转向补证据，企业后续复评更稳，也形成了能持续使用的风险闭环机制。",
  },
  {
    slug: "equipment-before-planning",
    title: "从设备先买后返工，到先判断范围再投入",
    tags: ["返工风险", "费用控制"],
    imageSrc: "/images/solutions/new-energy-lab.webp",
    imageAlt: "复杂检测设备与接线环境，体现设备先投入带来的规划风险。",
    problem: "企业先采购设备，后面才发现部分配置和实际检测方法、环境条件、认可范围并不匹配，预算被锁进了错误路径。",
    action: "从检测项目、标准方法和认可范围重新倒推设备与环境配置，区分必须现在投入和可以后置投入的部分。",
    result: "企业把预算集中到真正支撑认可范围和现场评审的关键环节，减少重复投入，也降低了整体返工概率。",
  },
];

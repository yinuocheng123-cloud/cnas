/*
 * 文件说明：该文件维护案例解析数据。
 * 功能说明：用原本计划、发现风险、提前调整和最终结果描述企业在 CNAS 认可准备中的真实路径修正场景。
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
    title: "从准备直接上项目，到先收范围再启动",
    tags: ["路径修正", "启动判断"],
    imageSrc: "/images/solutions/manufacturing-lab.webp",
    imageAlt: "制造企业实验室内，实验人员正在进行设备调试与检测。",
    problem: "企业原本计划尽快启动实验室建设，但检测范围、人员配置和设备投入顺序都没有收清，继续推进只会越做越乱。",
    action: "先把检测项目和范围边界收清，再倒推设备、岗位、环境和体系建设顺序，把会造成返工的环节提前暴露出来。",
    result: "企业提前调整了建设路径，避免了盲目采购和重复改造，节省了前期大量返工时间，也让内部决策更快落地。",
  },
  {
    slug: "messy-system-review-risk",
    title: "从资料看似齐全，到先补证据再进评审",
    tags: ["评审风险", "体系证据"],
    imageSrc: "/images/diagnosis/diagnosis-review.webp",
    imageAlt: "实验人员在台面前整理检测记录与实验资料。",
    problem: "企业原本计划按现有体系直接推进评审，但文件版本、原始记录、人员授权和设备台账之间并不能形成真实追溯链。",
    action: "围绕评审关注点重排文件、记录和职责证据，把真正会导致现场追溯失败的风险先找出来，再补关键运行材料。",
    result: "企业没有把时间浪费在表面整理上，而是提前修正了关键路径，避免了评审阶段集中暴露问题后再回头重跑体系。",
  },
  {
    slug: "assessment-correction-turnaround",
    title: "从评审后被动整改，到先拆风险再闭环",
    tags: ["整改闭环", "提前暴露"],
    imageSrc: "/images/cases/case-microscope.webp",
    imageAlt: "实验人员在显微设备前复核检测过程。",
    problem: "企业原本打算先把不符合项逐条补文件，但真正的风险在于方法确认、记录追溯和人员授权都没有形成完整闭环。",
    action: "先按不符合项拆分原因和责任，再补运行证据、复核关键记录，并把后续复评最容易再出问题的地方提前调整。",
    result: "整改动作从被动补材料变成主动修路径，企业后续复评更稳，也避免了多轮重复整改带来的时间损耗。",
  },
  {
    slug: "equipment-before-planning",
    title: "从设备先投再返工，到先看风险再花钱",
    tags: ["返工成本", "费用控制"],
    imageSrc: "/images/solutions/new-energy-lab.webp",
    imageAlt: "复杂检测设备与接线环境，体现设备先投入带来的规划风险。",
    problem: "企业原本优先安排设备采购，后面才发现部分配置和实际检测方法、环境条件、认可范围并不匹配，预算被提前锁进了错误方向。",
    action: "从检测项目、标准方法和认可范围重新倒推设备与环境配置，先判断哪些投入真正必要，哪些投入应该延后。",
    result: "企业提前修正了投资顺序，避免了高成本返工，把预算和周期都收回到更可控的范围内。",
  },
];

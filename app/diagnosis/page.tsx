import { ChecklistBlock } from "@/components/ChecklistBlock";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RiskNotice } from "@/components/RiskNotice";
import { SectionTitle } from "@/components/SectionTitle";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 CNAS 启动前风险诊断页。
 * 功能说明：通过 TEO 转化结构帮助企业判断是否适合现在启动 CNAS认可。
 *
 * 结构概览：
 *   第一部分：诊断头部
 *   第二部分：启动条件与不建议场景
 *   第三部分：资料准备与咨询入口
 */

export const metadata = createPageMetadata({
  title: "CNAS启动前风险诊断",
  description: "判断企业是否适合现在启动 CNAS认可，梳理启动条件、不建议盲目启动的情况和基础资料清单。",
  path: "/diagnosis",
});

// ========== 第一部分：诊断头部 ==========
export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS Diagnosis"
        title="企业是否适合现在启动CNAS认可？"
        description="启动 CNAS认可前，应先判断实验室基础、认可范围、资源投入和评审风险。先诊断，再规划，比直接做材料更稳。"
      />

      {/* ========== 第二部分：启动条件与不建议场景 ========== */}
      <section id="start-fit" className="site-shell section-space scroll-mt-28">
        <SectionTitle title="启动前要检查哪些条件" description="以下条件越清晰，越适合进入规划和体系建设阶段。" />
        <div className="mt-6">
          <ProcessSteps
            steps={[
              {
                title: "检测需求明确",
                description: "先确认企业为什么需要 CNAS认可，检测项目是否稳定，报告用途是否清楚。",
              },
              {
                title: "范围可规划",
                description: "把标准方法、样品类型、检测参数和能力边界列出来，形成可落地的首批范围。",
              },
              {
                title: "资源有基础",
                description: "评估人员、设备、环境和方法是否能支撑检测活动，缺口要能被补齐。",
              },
              {
                title: "体系能运行",
                description: "文件不能只停留在模板层面，要能产生真实记录、质量控制和整改闭环。",
              },
              {
                title: "投入可承受",
                description: "预算要覆盖建设、设备、培训、运行、能力验证和评审后整改，而不只是服务支持。",
              },
            ]}
          />
        </div>
      </section>

      <section id="self-check" className="site-shell grid scroll-mt-28 gap-4 pb-12 md:grid-cols-2">
        <div className="card">
          <h2 className="text-heading">更适合启动的情况</h2>
          <ul className="mt-4 grid gap-3 text-copy">
            <li>检测项目和标准方法已经基本明确。</li>
            <li>人员、设备、环境已有基础，差距可以被规划。</li>
            <li>管理层愿意投入体系运行、整改和持续改进资源。</li>
            <li>企业愿意先缩小认可范围，分阶段推进。</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="text-heading">建议暂缓启动的情况</h2>
          <ul className="mt-4 grid gap-3 text-copy">
            <li>只是想尽快获得结果，但没有清晰检测能力基础。</li>
            <li>设备采购、场地建设和人员安排尚未经过范围规划。</li>
            <li>体系文件还没有真实运行记录。</li>
            <li>预算只覆盖服务支持费用，没有考虑建设和整改成本。</li>
          </ul>
        </div>
      </section>

      <section id="failure-reasons" className="site-shell max-w-4xl scroll-mt-28 pb-12">
        <RiskNotice
          title="哪些情况不建议盲目启动"
          items={[
            "检测项目和标准方法尚未明确，只是想尽快获得认可结果。",
            "设备、环境、人员基础明显不足，却准备直接提交申请。",
            "体系文件还没有真实运行记录，内审和管理评审无法支撑证据链。",
            "预算只考虑服务支持费用，没有考虑建设、设备、运行和整改成本。",
          ]}
        />
      </section>

      {/* ========== 第三部分：资料准备与咨询入口 ========== */}
      <section className="site-shell max-w-4xl pb-12">
        <ChecklistBlock
          title="需要准备哪些基础资料"
          items={[
            "拟申请的检测项目、标准方法和客户要求",
            "现有人员、岗位职责、能力证明和培训情况",
            "设备清单、校准状态、环境条件和场地信息",
            "现有体系文件、原始记录、报告样式和质量控制记录",
            "预算边界、期望周期和管理层投入程度",
          ]}
        />
      </section>
      <section id="diagnosis-support" className="site-shell max-w-4xl scroll-mt-28 pb-12">
        <div className="card">
          <h2 className="text-heading">诊断后应形成什么判断</h2>
          <p className="mt-3 text-copy">
            诊断不是为了马上进入申请，而是形成三个结论：现在是否适合启动、先补哪些能力短板、认可范围和投入顺序如何安排。
          </p>
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}

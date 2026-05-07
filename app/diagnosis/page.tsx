import { ChecklistBlock } from "@/components/ChecklistBlock";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { RiskNotice } from "@/components/RiskNotice";
import { SectionTitle } from "@/components/SectionTitle";
import { diagnosisPageCopy } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 CNAS 启动前风险诊断页。
 * 功能说明：按风险、后果、判断和表单提交顺序承接高意向用户。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：诊断页主体
 */

export const metadata = createPageMetadata({
  title: "启动前先判断：哪些情况建议暂缓CNAS认可",
  description: "判断企业是否适合现在启动 CNAS认可，先看路径是否正确、会不会返工，再决定是否进入建设与申请阶段。",
  path: "/diagnosis",
});

// ========== 第一部分：诊断页主体 ==========
export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        variant="balanced"
        eyebrow="CNAS Diagnosis"
        title="很多返工，其实在启动前就已经决定了"
        description={<p>设备先采购、体系后补，是最常见也最容易返工的路径。很多企业浪费的不是申请动作，而是错误判断带来的几个月重做时间。</p>}
        actions={
          <a href="#self-check" className="btn-primary">
            获取诊断结果
          </a>
        }
        riskNotice="先识别风险，再决定要不要启动，通常比后面返工更省时间。"
      />

      <section id="start-fit" className="site-shell section-space scroll-mt-28">
        <SectionTitle
          title="如果你有以下情况，建议先别急着启动"
          description="先把这些前提看清楚，再决定是否现在推进，会比边做边改更省时间和成本。"
        />
        <div className="mt-4 md:mt-6">
          <ChecklistBlock title="先识别这几类风险" items={diagnosisPageCopy.delayCases} />
        </div>
      </section>

      <section id="failure-reasons" className="site-shell max-w-4xl scroll-mt-28 pb-8 md:pb-12">
        <RiskNotice title="为什么很多企业会走弯路" items={diagnosisPageCopy.reworkItems} />
        <p className="mt-3 text-copy">很多问题，其实在启动前就可以避免。越晚发现，返工代价通常越高。</p>
      </section>

      <section id="diagnosis-support" className="site-shell max-w-4xl scroll-mt-28 pb-6 md:pb-8">
        <div className="card">
          <h2 className="text-heading">在启动之前，建议先做一次判断</h2>
          <p className="mt-2 text-copy">不是判断能不能做，而是判断哪里最容易做错、先改哪一步更划算。这一步可以把后面 6 到 12 个月的风险提前看清。</p>
        </div>
      </section>

      <section className="site-shell max-w-4xl pb-6 md:pb-8">
        <ChecklistBlock title="这次诊断会帮你看清几件事" items={diagnosisPageCopy.diagnosisValueItems} />
      </section>

      <LeadCaptureForm />

      <CtaBlock />
      <Footer />
    </main>
  );
}

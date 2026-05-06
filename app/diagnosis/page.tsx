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
 * 功能说明：按风险、后果、判断与行动链路承接高意图用户，并提供轻量诊断表单入口。
 *
 * 结构概览：
 *   第一部分：风险感首屏
 *   第二部分：不建议急着启动的场景与后果
 *   第三部分：判断价值、行动引导与两步式表单
 */

export const metadata = createPageMetadata({
  title: "启动前诊断：哪些情况建议暂缓CNAS认可",
  description: "判断企业是否适合现在启动 CNAS认可，先看路径是否正确、风险会不会返工，再决定是否进入建设与申请阶段。",
  path: "/diagnosis",
});

// ========== 第一部分：风险感首屏 ==========
export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS Diagnosis"
        title="企业是否适合现在启动CNAS认可？"
        description={diagnosisPageCopy.heroDescription}
        riskNotice={diagnosisPageCopy.heroRiskNotice}
      />

      {/* ========== 第二部分：不建议急着启动的场景与后果 ========== */}
      <section id="start-fit" className="site-shell section-space scroll-mt-28">
        <SectionTitle title="如果你有以下情况，建议先别急着启动" description={diagnosisPageCopy.delayLeadDescription} />
        <div className="mt-6">
          <ChecklistBlock title="先把这些情况判断清楚" items={diagnosisPageCopy.delayCases} />
        </div>
      </section>

      <section id="failure-reasons" className="site-shell max-w-4xl scroll-mt-28 pb-12">
        <RiskNotice title={diagnosisPageCopy.reworkTitle} items={diagnosisPageCopy.reworkItems} />
        <p className="mt-4 text-copy">{diagnosisPageCopy.reworkConclusion}</p>
      </section>

      {/* ========== 第三部分：判断价值、行动引导与两步式表单 ========== */}
      <section id="diagnosis-support" className="site-shell max-w-4xl scroll-mt-28 pb-12">
        <div className="card">
          <h2 className="text-heading">{diagnosisPageCopy.judgmentTitle}</h2>
          <p className="mt-3 text-copy">{diagnosisPageCopy.judgmentDescription}</p>
        </div>
      </section>

      <section className="site-shell max-w-4xl pb-12">
        <ChecklistBlock title={diagnosisPageCopy.diagnosisValueTitle} items={diagnosisPageCopy.diagnosisValueItems} />
      </section>
      <LeadCaptureForm />

      <CtaBlock />
      <Footer />
    </main>
  );
}

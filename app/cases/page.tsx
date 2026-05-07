import { CaseCard } from "@/components/CaseCard";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { cases } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现案例解析页。
 * 功能说明：按问题、动作、结果结构展示典型返工和整改场景。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：案例列表
 */

export const metadata = createPageMetadata({
  title: "案例解析：看看企业为什么会返工和走弯路",
  description: "用问题、动作、结果结构分析制造企业实验室建设、体系风险和预算浪费等 CNAS 认可准备场景。",
  path: "/cases",
});

// ========== 第一部分：案例列表 ==========
export default function CasesPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection variant="balanced" eyebrow="CNAS Cases" title="案例解析" description={<p>不做空泛宣传，只拆解企业遇到的问题、采取的动作和最后产生的结果。</p>} />
      <section className="site-shell py-10 md:py-16">
        <SectionTitle title="典型场景" description="按案例标签承接导航入口，所有案例保持问题、动作、结果结构。" />
        <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-3">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.slug} caseItem={caseItem} />
          ))}
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}

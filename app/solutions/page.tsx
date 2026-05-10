import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { SolutionCard } from "@/components/SolutionCard";
import { getOrderedSolutions, industryTaxonomy } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现行业方案列表页。
 * 功能说明：集中展示不同实验室类型的 CNAS 认可实施路径入口。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：方案列表
 */

export const metadata = createPageMetadata({
  title: "行业方案：不同实验室怎么判断实施路径",
  description: `面向${industryTaxonomy.map((industry) => industry.shortTitle).join("、")}等实验室的 CNAS认可路径参考，帮助先判断行业边界，再决定如何启动。`,
  path: "/solutions",
});

// ========== 第一部分：方案列表 ==========
export default function SolutionsPage() {
  const orderedSolutions = getOrderedSolutions();

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        variant="balanced"
        eyebrow="Industry Solutions"
        title="行业方案"
        description={<p>不同实验室的检测项目、能力边界和评审风险并不相同，先判断，再规划，会更稳。</p>}
      />

      <section className="site-shell py-8 md:py-10">
        <SectionTitle title="方案入口" />
        <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
          {orderedSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}

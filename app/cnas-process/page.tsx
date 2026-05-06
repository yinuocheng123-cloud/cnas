import { ArticleList } from "@/components/ArticleList";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getArticlesByCategory, getCategoryBySlug, processStages } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

const category = getCategoryBySlug("cnas-process")!;

export const metadata = createPageMetadata({
  title: category.seoTitle,
  description: category.description,
  path: category.href,
});

export default function CnasProcessPage() {
  const articles = getArticlesByCategory(category.slug);

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS Process"
        title="CNAS认可流程"
        description="这里按实施步骤拆解 CNAS认可路径，重点回答每个阶段要判断什么、准备什么、容易在哪些地方出风险。"
      />

      <section className="site-shell section-space">
        <SectionTitle title="流程拆解" description="流程页不是百科页，而是帮助企业把启动、建设、运行、申请、评审和整改串成可执行路径。" />
        <div className="mt-6 grid gap-4">
          {processStages.map((stage, index) => (
            <article id={stage.id} key={stage.id} className="card scroll-mt-28">
              <p className="text-meta-token font-semibold">STEP {index + 1}</p>
              <h2 className="mt-2 text-heading">{stage.title}</h2>
              <p className="mt-3 text-copy">{stage.description}</p>
              <ul className="mt-4 grid gap-2 text-copy md:grid-cols-3">
                {stage.points.map((point) => (
                  <li key={point} className="border-l-2 border-line pl-3">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="site-shell section-space">
          <SectionTitle title="流程相关文章" description="围绕流程阶段持续扩展文章，后续可按每一步沉淀更多判断清单和FAQ。" />
          <div className="mt-6">
            <ArticleList articles={articles} />
          </div>
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}

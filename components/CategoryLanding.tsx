import { ArticleList } from "@/components/ArticleList";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import type { Article } from "@/src/data/articles";
import type { Category } from "@/src/data/categories";

/*
 * 文件说明：该文件实现内容分类落地页组件。
 * 功能说明：统一 /cnas-basic 等栏目页和 /categories/[category] 聚合页结构。
 *
 * 结构概览：
 *   第一部分：CategoryLanding 组件
 */

// ========== 第一部分：CategoryLanding 组件 ==========
export function CategoryLanding({ category, articles }: { category: Category; articles: Article[] }) {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection eyebrow="CNAS Category" title={category.title} description={category.description} />
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <SectionTitle title="栏目文章" description="按判断型、解释型、问答型结构持续扩展内容。" />
        <div className="mt-6">
          <ArticleList articles={articles} />
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}

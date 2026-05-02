import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import type { Article } from "@/src/data/articles";
import { categories, type Category } from "@/src/data/categories";

/*
 * 文件说明：该文件实现内容分类落地页组件。
 * 功能说明：统一 /cnas-basic 等栏目页和 /categories/[category] 聚合页结构。
 *
 * 结构概览：
 *   第一部分：CategoryLanding 组件
 */

// ========== 第一部分：CategoryLanding 组件 ==========
export function CategoryLanding({ category, articles }: { category: Category; articles: Article[] }) {
  const relatedCategories = categories.filter((item) => item.slug !== category.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection eyebrow="CNAS Category" title={category.title} description={category.description} />
      <section className="site-shell section-space">
        <SectionTitle title="栏目文章" description="按判断型、解释型、问答型结构持续扩展内容。" />
        <div className="mt-6">
          <ArticleList articles={articles} />
        </div>
      </section>
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="site-shell section-space">
          <SectionTitle title="相关推荐" description="继续查看相邻主题，形成完整的 CNAS认可启动前判断路径。" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedCategories.map((item) => (
              <Link key={item.slug} href={item.href} className="card-link">
                <h3 className="text-body font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-copy">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}

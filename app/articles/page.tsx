import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getCmsArticleCategories, getCmsArticlesByCategory } from "@/lib/cms-content";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 /articles GEO 文章列表页。
 * 功能说明：展示第一批 20 篇 CNAS GEO 内容，并按分类分组呈现。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：文章列表页主体
 */

export const metadata = createPageMetadata({
  title: "最新行业内容：CNAS认可路径、准备与评审风险",
  description: "聚合 20 篇 CNAS GEO 文章，覆盖路径判断、认可准备、评审整改、认可后维护和常见问题。",
  path: "/articles",
});

// ========== 第二部分：文章列表页主体 ==========
export default function ArticlesPage() {
  noStore();

  const articleCategories = getCmsArticleCategories();

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS GEO Articles"
        title="最新行业内容"
        description="围绕 CNAS认可路径判断、认可准备、评审整改、认可后维护和常见问题，先补齐第一批基础内容入口。"
      />

      <section className="bg-[#06162c] text-white">
        <div className="site-shell py-8 md:py-10">
          <p className="text-meta font-semibold text-[#d8ad63]">内容体系</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-title">第一批 20 篇 CNAS GEO 内容</h2>
          <p className="mt-3 max-w-4xl text-body leading-7 text-slate-300">
            这些文章不是营销话术，而是把实验室做 CNAS认可时经常搜索、经常误判的问题拆成可阅读、可判断、可继续行动的基础内容。
          </p>
        </div>
      </section>

      <section className="site-shell section-space">
        <SectionTitle title="按分类阅读" description="每组内容先解决一个阶段的问题：先判断路径，再准备能力，再面对评审和后期维护。" />
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {articleCategories.map((category) => (
            <a key={category} href={`#${encodeURIComponent(category)}`} className="rounded-xl border border-line bg-card p-4 text-center text-body font-semibold text-ink shadow-card transition hover:border-primary hover:text-primary">
              {category}
            </a>
          ))}
        </div>
      </section>

      <div className="site-shell pb-10">
        {articleCategories.map((category) => {
          const items = getCmsArticlesByCategory(category);

          return (
            <section key={category} id={encodeURIComponent(category)} className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-meta font-semibold text-primary">共 {items.length} 篇</p>
                  <h2 className="text-heading">{category}</h2>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {items.map((article) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="card-link">
                    <p className="text-meta font-medium uppercase tracking-[0.12em] text-subtle">{article.category}</p>
                    <h3 className="mt-3 text-body font-semibold text-ink">{article.title}</h3>
                    <p className="mt-3 text-copy">{article.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[article.mainKeyword, ...article.relatedKeywords.slice(0, 2)].map((keyword) => (
                        <span key={keyword} className="rounded-lg border border-line px-2 py-1 text-meta text-muted">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-meta-token">发布：{article.publishDate}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CtaBlock />
      <Footer />
    </main>
  );
}

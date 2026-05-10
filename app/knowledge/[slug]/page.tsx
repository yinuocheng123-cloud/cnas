import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ChecklistBlock } from "@/components/ChecklistBlock";
import { CtaBlock } from "@/components/CtaBlock";
import { FaqBlock } from "@/components/FaqBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TagList } from "@/components/TagList";
import { articles, getArticleBySlug, getCategoryBySlug, getRelatedArticles, getRelatedCases, getRelatedSolutions } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现知识库文章详情页。
 * 功能说明：输出文章正文、判断清单、FAQ 和相关推荐，并优化移动端阅读节奏。
 *
 * 结构概览：
 *   第一部分：静态参数与元信息
 *   第二部分：文章详情页
 */

// ========== 第一部分：静态参数与元信息 ==========
export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "CNAS认可知识库：继续查看相关文章",
      description: "CNAS 专业知识库文章。",
      path: "/knowledge",
    });
  }

  return createPageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.description,
    path: `/knowledge/${article.slug}`,
  });
}

// ========== 第二部分：文章详情页 ==========
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryBySlug(article.category);
  const relatedArticles = getRelatedArticles(article);
  const relatedSolutions = (article.industries ?? [])
    .map((industry) => getRelatedSolutions(industry, 1)[0])
    .filter((item, index, self): item is NonNullable<typeof item> => Boolean(item) && self.findIndex((entry) => entry?.slug === item.slug) === index)
    .slice(0, 2);
  const relatedCases = getRelatedCases(article.industries ?? [], undefined, 2);

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <article>
        <header className="bg-paper">
          <div className="site-shell max-w-[680px] px-5 py-6 md:py-10">
            <Breadcrumb items={[{ label: "首页", href: "/" }, { label: "CNAS知识库", href: "/knowledge" }, { label: article.title }]} />
            <h1 className="mt-3 text-[1.8rem] leading-tight text-ink md:mt-4 md:text-display">{article.title}</h1>
            <p className="card mt-4 text-[16px] leading-7">先给结论：{article.answer}</p>
            <div className="mt-4 flex flex-col gap-2.5 text-meta text-muted">
              <p>
                文章分类：
                {category ? (
                  <Link href={category.href} className="font-semibold text-primary">
                    {category.title}
                  </Link>
                ) : (
                  article.category
                )}
              </p>
              <p>更新时间：{article.updatedAt}</p>
              <TagList tags={article.tags} />
            </div>
          </div>
        </header>

        <div className="site-shell max-w-[680px] px-5 py-6 md:py-10">
          <section className="space-y-7">
            {article.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-heading">{section.title}</h2>
                <p className="mt-3 text-[16px] leading-7 text-muted">{section.content}</p>
              </div>
            ))}
          </section>

          <div className="mt-6 grid gap-4">
            <ChecklistBlock title="关键判断清单" items={article.checklist ?? []} />
            <FaqBlock faqs={article.faqs} />
          </div>

          <section className="mt-6">
            <h2 className="text-heading">继续看这些返工判断文章</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
              {relatedArticles.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </section>

          {relatedSolutions.length || relatedCases.length ? (
            <section className="mt-6 rounded-2xl border border-line bg-surface px-4 py-5 md:px-5">
              {relatedSolutions.length ? (
                <div>
                  <h2 className="text-heading">相关行业方案</h2>
                  <div className="mt-3 grid gap-3">
                    {relatedSolutions.map((solution) => (
                      <Link key={solution.slug} href={solution.href} className="card-link gap-2">
                        <h3 className="text-body font-semibold text-ink">{solution.title}</h3>
                        <p className="text-copy">{solution.summary}</p>
                        <span className="text-sm font-medium text-[#4ECDC4]">获取实验室认可路径</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedCases.length ? (
                <div className={relatedSolutions.length ? "mt-5 border-t border-line pt-5" : ""}>
                  <h2 className="text-heading">相关案例</h2>
                  <div className="mt-3 grid gap-3">
                    {relatedCases.map((caseItem: (typeof relatedCases)[number]) => (
                      <Link key={caseItem.slug} href={`/cases#${caseItem.slug}`} className="card-link gap-2">
                        <h3 className="text-body font-semibold text-ink">{caseItem.title}</h3>
                        <p className="text-copy">原本计划：{caseItem.problem}</p>
                        <span className="text-sm font-medium text-[#4ECDC4]">查看问题路径</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className={relatedSolutions.length || relatedCases.length ? "mt-5 border-t border-line pt-5" : ""}>
                <h2 className="text-heading">开始路径诊断</h2>
                <p className="mt-3 text-[16px] leading-7 text-muted">如果看完知识点仍不确定自己属于哪一类实验室，建议先做一次判断，再决定投入顺序。</p>
                <div className="mt-4">
                  <Link href="/diagnosis" className="btn-primary w-full sm:w-fit">
                    开始路径诊断
                  </Link>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </article>
      <CtaBlock />
      <Footer />
    </main>
  );
}

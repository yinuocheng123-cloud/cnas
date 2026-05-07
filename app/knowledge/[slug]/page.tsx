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
import { articles, getArticleBySlug, getCategoryBySlug, getRelatedArticles } from "@/lib/site-data";
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

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <article>
        <header className="bg-paper">
          <div className="site-shell max-w-[680px] px-5 py-7 md:py-12">
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

        <div className="site-shell max-w-[680px] px-5 py-8 md:py-12">
          <section className="space-y-7">
            {article.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-heading">{section.title}</h2>
                <p className="mt-3 text-[16px] leading-7 text-muted">{section.content}</p>
              </div>
            ))}
          </section>

          <div className="mt-8 grid gap-5">
            <ChecklistBlock title="关键判断清单" items={article.checklist ?? []} />
            <FaqBlock faqs={article.faqs} />
          </div>

          <section className="mt-8">
            <h2 className="text-heading">继续看这些判断文章</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
              {relatedArticles.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        </div>
      </article>
      <CtaBlock />
      <Footer />
    </main>
  );
}

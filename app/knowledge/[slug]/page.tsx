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
 * 功能说明：按 GEO 结构生成文章页，包含直接回答、分类标签、正文、清单、FAQ、相关推荐和咨询入口。
 *
 * 结构概览：
 *   第一部分：静态路由与元信息
 *   第二部分：文章详情页面
 */

// ========== 第一部分：静态路由与元信息 ==========
export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "CNAS认可知识库：继续查看相关文章",
      description: "CNAS专业知识库文章。",
      path: "/knowledge",
    });
  }

  return createPageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.description,
    path: `/knowledge/${article.slug}`,
  });
}

// ========== 第二部分：文章详情页面 ==========
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
          <div className="site-shell max-w-4xl py-12">
            <Breadcrumb items={[{ label: "首页", href: "/" }, { label: "CNAS知识库", href: "/knowledge" }, { label: article.title }]} />
            <h1 className="mt-4 text-display text-ink">{article.title}</h1>
            <p className="card mt-5 text-copy">
              {article.answer}
            </p>
            <div className="mt-5 flex flex-col gap-3 text-meta text-muted">
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

        <div className="site-shell grid max-w-4xl gap-10 py-10">
          <section className="space-y-8">
            {article.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-heading">{section.title}</h2>
                <p className="mt-3 text-copy">{section.content}</p>
              </div>
            ))}
          </section>

          <ChecklistBlock title="关键判断清单" items={article.checklist ?? []} />
          <FaqBlock faqs={article.faqs} />

          <section>
            <h2 className="text-heading">相关内容推荐</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
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

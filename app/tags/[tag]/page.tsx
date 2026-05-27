/*
 * 文件说明：该文件实现标签聚合动态页。
 * 功能说明：同时兼容旧知识库标签和 CMS JSON 文章关联词，避免 GEO 文章标签入口出现 404。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：元信息
 *   第三部分：标签聚合页主体
 */

// ========== 第一部分：导入依赖 ==========
import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleList } from "@/components/ArticleList";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getPublishedCmsArticlesSync } from "@/lib/cms-content";
import { getArticlesByTag } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

// ========== 第二部分：元信息 ==========
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return createPageMetadata({
    title: `${decodedTag}标签页：相关问题和文章整理`,
    description: `聚合 ${decodedTag} 相关的 CNAS认可文章、判断清单和常见问题。`,
    path: `/tags/${encodeURIComponent(decodedTag)}`,
  });
}

// ========== 第三部分：标签聚合页主体 ==========
export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  noStore();

  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const matchedArticles = getArticlesByTag(decodedTag);
  const matchedGeoArticles = getPublishedCmsArticlesSync().filter((article) =>
    [article.category, article.mainKeyword, ...article.relatedKeywords, article.title].some((value) => value.includes(decodedTag)),
  );

  if (matchedArticles.length === 0 && matchedGeoArticles.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection eyebrow="CNAS Tag" title={`${decodedTag}相关内容`} description={`围绕 ${decodedTag} 聚合文章、判断清单、FAQ 和相关解决方案入口。`} />
      <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
        {matchedArticles.length > 0 ? (
          <>
            <SectionTitle title="知识库文章" />
            <div className="mt-6">
              <ArticleList articles={matchedArticles} />
            </div>
          </>
        ) : null}

        {matchedGeoArticles.length > 0 ? (
          <div className={matchedArticles.length > 0 ? "mt-10" : ""}>
            <SectionTitle title="CNAS GEO 内容" description="来自 CNAS认可指南内容库的相关文章。" />
            <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
              {matchedGeoArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="card-link">
                  <p className="text-meta font-medium uppercase tracking-[0.12em] text-subtle">{article.category}</p>
                  <h2 className="mt-3 text-body font-semibold text-ink">{article.title}</h2>
                  <p className="mt-3 text-copy">{article.description}</p>
                  <p className="mt-4 text-meta-token">发布：{article.publishDate}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}

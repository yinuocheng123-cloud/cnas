import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleList } from "@/components/ArticleList";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getArticlesByTag, tags } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现标签聚合动态页。
 * 功能说明：根据标签生成文章聚合页和 SEO metadata。
 *
 * 结构概览：
 *   第一部分：静态参数与元信息
 *   第二部分：标签聚合页面
 */

// ========== 第一部分：静态参数与元信息 ==========
export function generateStaticParams() {
  return tags
    .filter((tag) => getArticlesByTag(tag).length > 0)
    .map((tag) => ({
      tag,
    }));
}

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
    path: `/tags/${encodeURIComponent(tag)}`,
  });
}

// ========== 第二部分：标签聚合页面 ==========
export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const matchedArticles = getArticlesByTag(decodedTag);

  if (!tags.includes(decodedTag) || matchedArticles.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS Tag"
        title={`${decodedTag}相关内容`}
        description={`围绕 ${decodedTag} 聚合文章、判断清单、FAQ 和相关解决方案入口。`}
      />
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <SectionTitle title="标签文章" />
        <div className="mt-6">
          <ArticleList articles={matchedArticles} />
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}

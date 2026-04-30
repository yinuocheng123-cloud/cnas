import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryLanding } from "@/components/CategoryLanding";
import { categories, getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现分类聚合动态页。
 * 功能说明：根据分类 slug 生成分类文章聚合页和 SEO metadata。
 *
 * 结构概览：
 *   第一部分：静态参数与元信息
 *   第二部分：分类聚合页面
 */

// ========== 第一部分：静态参数与元信息 ==========
export function generateStaticParams() {
  return categories
    .filter((category) => getArticlesByCategory(category.slug).length > 0)
    .map((category) => ({
      category: category.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return createPageMetadata({
      title: "CNAS内容分类",
      description: "CNAS专业内容分类聚合页。",
      path: "/knowledge",
    });
  }

  return createPageMetadata({
    title: category.title,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

// ========== 第二部分：分类聚合页面 ==========
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category || getArticlesByCategory(category.slug).length === 0) {
    notFound();
  }

  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}

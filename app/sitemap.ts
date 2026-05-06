import type { MetadataRoute } from "next";
import { articles, categories, getArticlesByCategory, getArticlesByTag, solutions, tags } from "@/lib/site-data";
import { siteUrl } from "@/lib/seo";

/*
 * 文件说明：该文件生成站点 sitemap。
 * 功能说明：向搜索引擎声明首页、栏目页、知识库文章和解决方案详情页。
 *
 * 结构概览：
 *   第一部分：静态路径
 *   第二部分：sitemap 生成
 */

// ========== 第一部分：静态路径 ==========
const staticRoutes = ["/", "/knowledge", "/solutions", "/cases", "/services", "/about", "/diagnosis", "/faqs"];

// ========== 第二部分：sitemap 生成 ==========
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...categories.map((category) => category.href),
    ...categories
      .filter((category) => getArticlesByCategory(category.slug).length > 0)
      .map((category) => `/categories/${category.slug}`),
    ...tags
      .filter((tag) => getArticlesByTag(tag).length > 0)
      .map((tag) => `/tags/${encodeURIComponent(tag)}`),
    ...articles.map((article) => `/knowledge/${article.slug}`),
    ...solutions.map((solution) => solution.href),
  ];

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date("2026-05-06"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

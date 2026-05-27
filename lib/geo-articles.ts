/*
 * 文件说明：该文件保留 GEO 文章旧接口的兼容导出。
 * 功能说明：CMS v1.2 后正式文章真实来源转为 data/articles.json，本文件只负责把 JSON 内容适配给旧前台页面和后台统计。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：JSON 内容适配
 *   第三部分：查询函数
 */

// ========== 第一部分：类型定义 ==========
import {
  getCmsArticleBySlug,
  getCmsArticleCategories,
  getCmsArticlesByCategory as getJsonArticlesByCategory,
  getCmsArticlesSync,
  getPublishedCmsArticlesSync,
  type CmsArticle,
  type CmsArticleSection,
  type CmsArticleTableRow,
} from "@/lib/cms-content";

export type GeoArticleCategory =
  | "CNAS认可路径判断"
  | "CNAS认可准备"
  | "CNAS评审整改"
  | "CNAS认可后维护"
  | "CNAS常见问题"
  | string;

export type GeoArticleSection = CmsArticleSection;
export type GeoArticleTableRow = CmsArticleTableRow;

export type GeoArticleFaq = {
  question: string;
  answer: string;
};

export type GeoArticle = CmsArticle;

// ========== 第二部分：JSON 内容适配 ==========
export const geoArticles: GeoArticle[] = getPublishedCmsArticlesSync();
export const allGeoArticles: GeoArticle[] = getCmsArticlesSync();
export const geoArticleCategories: GeoArticleCategory[] = getCmsArticleCategories();

// ========== 第三部分：查询函数 ==========
export function getGeoArticleBySlug(slug: string) {
  return getCmsArticleBySlug(slug);
}

export function getGeoArticlesByCategory(category: GeoArticleCategory) {
  return getJsonArticlesByCategory(category);
}

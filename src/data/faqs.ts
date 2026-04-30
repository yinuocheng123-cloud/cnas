import { articles } from "./articles";

/*
 * 文件说明：该文件维护 CNAS 常见问题聚合数据。
 * 功能说明：从文章 FAQ 中聚合问答，供 /faqs 和 /cnas-faq 使用。
 *
 * 结构概览：
 *   第一部分：聚合 FAQ 数据
 */

// ========== 第一部分：聚合 FAQ 数据 ==========
export const faqs = articles.flatMap((article) =>
  article.faqs.map((faq) => ({
    ...faq,
    articleSlug: article.slug,
    articleTitle: article.title,
  })),
);

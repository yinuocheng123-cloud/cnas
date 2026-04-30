import Link from "next/link";
import type { Article } from "@/src/data/articles";
import { getCategoryBySlug } from "@/src/data/categories";

/*
 * 文件说明：该文件实现文章卡片组件。
 * 功能说明：统一知识库文章入口、分类、摘要和更新时间展示。
 *
 * 结构概览：
 *   第一部分：ArticleCard 组件
 */

// ========== 第一部分：ArticleCard 组件 ==========
export function ArticleCard({ article }: { article: Article }) {
  const category = getCategoryBySlug(article.category);

  return (
    <Link
      href={`/knowledge/${article.slug}`}
      className="rounded border border-slate-200 bg-white p-5 transition hover:border-blue-900"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-900">
        {category?.title ?? article.category}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-slate-950">{article.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{article.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded border border-slate-200 px-2 py-1 text-xs text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">更新：{article.updatedAt}</p>
    </Link>
  );
}

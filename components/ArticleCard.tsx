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
      className="card-link"
    >
      <p className="text-meta-token font-medium uppercase tracking-[0.12em]">
        {category?.title ?? article.category}
      </p>
      <h3 className="mt-3 text-body font-semibold text-ink">{article.title}</h3>
      <p className="mt-3 text-copy">{article.description}</p>
      {article.tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-lg border border-line px-2 py-1 text-meta text-muted">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <p className="mt-4 text-meta-token">更新：{article.updatedAt}</p>
    </Link>
  );
}

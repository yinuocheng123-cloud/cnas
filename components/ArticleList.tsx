import type { Article } from "@/src/data/articles";
import { ArticleCard } from "./ArticleCard";

/*
 * 文件说明：该文件实现文章列表组件。
 * 功能说明：统一知识库、分类页和标签页的文章列表展示。
 *
 * 结构概览：
 *   第一部分：ArticleList 组件
 */

// ========== 第一部分：ArticleList 组件 ==========
export function ArticleList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return <p className="rounded border border-slate-200 bg-white p-5 text-sm text-slate-600">暂无匹配内容。</p>;
  }

  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}

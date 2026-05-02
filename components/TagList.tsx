import Link from "next/link";

/*
 * 文件说明：该文件实现标签列表组件。
 * 功能说明：为文章页、知识库页和标签聚合页提供统一标签入口。
 *
 * 结构概览：
 *   第一部分：TagList 组件
 */

// ========== 第一部分：TagList 组件 ==========
export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="rounded-lg border border-line bg-card px-3 py-1 text-meta text-muted transition hover:border-primary hover:text-primary"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
